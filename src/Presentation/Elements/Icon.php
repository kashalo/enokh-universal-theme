<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation\Elements;

use Enokh\UniversalTheme\Presentation\ElementPackage;
use Enokh\UniversalTheme\Presentation\Icon\IconSetRegistry;
use Inpsyde\PresentationElements;
use Mah\DesignSystem\Presentation;

class Icon extends PresentationElements\Element\BaseElement
{
    // Presentation classes
    public const CLASS_MAIN = 'mah-icon';

    // HTML Attributes
    public const ATTR_ICON_SET = 'data-icon-set';
    public const ATTR_ICON_NAME = 'data-icon-name';

    // Arguments
    public const ARG_ICON_SET = 'iconSet';
    public const ARG_ICON_NAME = 'iconName';

    private const CACHE_KEY_ATTRS = 'attrs';
    private const CACHE_KEY_CONTENT = 'content';
    private array $cache = [];

    public static function name(): string
    {
        return 'enokh-design-system/icon';
    }

    public function __construct(private  IconSetRegistry $iconRegistry)
    {
    }

    public function withIcon(string $iconSet, string $iconName): self
    {
        if ($this->iconRegistry->byName($iconSet)?->hasIcon($iconName)) {
            $this->withArgument(self::ARG_ICON_SET, $iconSet);
            $this->withArgument(self::ARG_ICON_NAME, $iconName);
        }

        return $this;
    }

    public function render(): string
    {
        $iconSet = (string)$this->argument(self::ARG_ICON_SET);
        $iconName = (string)$this->argument(self::ARG_ICON_NAME);

        if (!$iconSet || !$iconName || !$this->loadSvg($iconSet, $iconName)) {
            return '';
        }

        foreach ($this->svgAttributes($iconSet, $iconName) as $attribute => $value) {
            $this->withAttribute($attribute, $value);
        }

        $this->prependToAttribute('class', [
            self::CLASS_MAIN,
            sprintf('%s--%s', self::CLASS_MAIN, $iconName),
            sprintf('%s--%s--%s', self::CLASS_MAIN, $iconSet, $iconName),
        ]);
        $this->withAttribute('alt', 'icon: ' . $iconName);
        $this->withAttribute(self::ATTR_ICON_SET, $iconSet);
        $this->withAttribute(self::ATTR_ICON_NAME, $iconName);
            $this->attribute('height') ?? $this->withAttribute('height', '1em');
            $this->attribute('width') ?? $this->withAttribute('width', '1em');
            $this->attribute('role') ?? $this->withAttribute('role', 'img');
            $this->attribute('xmlns') ?? $this->withAttribute('xmlns', 'http://www.w3.org/2000/svg');

        return PresentationElements\renderTag(
            'svg',
            $this->attributes(),
            $this->svgContent($iconSet, $iconName)
        );
    }

    private function loadSvg(string $iconSet, string $iconName): bool
    {
        $cacheKey = $this->iconCacheKey($iconSet, $iconName);

        if (isset($this->cache[$cacheKey])) {
            return true;
        }

        $iconPath = $this->iconRegistry->byName($iconSet)?->iconPath($iconName);

        if (is_null($iconPath) || $iconPath === '') {
            return false;
        }

        $encoded = (string)mb_convert_encoding(
            (string)file_get_contents($iconPath . '.svg'),
            'HTML-ENTITIES',
            "UTF-8"
        );

        if (!$encoded) {
            return false;
        }

        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
        // @phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
        @$dom->loadXML($encoded);
        libxml_clear_errors();

        $svg = $dom->getElementsByTagName('svg')->item(0);

        if (!$svg instanceof \DOMNode) {
            return false;
        }

        $attrs = [];

        if ($svg->attributes instanceof \DOMNamedNodeMap) {
            for ($i = 0; $i < $svg->attributes->length; ++$i) {
                $item = $svg->attributes->item($i);
                $item && $attrs[$item->nodeName] = $item->nodeValue;
            }
        }

        $this->cache[$cacheKey] = [
            self::CACHE_KEY_ATTRS => $attrs,
            self::CACHE_KEY_CONTENT => implode('', array_map(
            /** @psalm-suppress InvalidClass */
                fn(\DOMNode $node): string => trim($dom->saveHTML($node)),
                iterator_to_array($svg->childNodes)
            )),
        ];

        return true;
    }

    private function svgAttributes(string $iconSet, string $iconName): array
    {
        $cacheKey = $this->iconCacheKey($iconSet, $iconName);

        return isset($this->cache[$cacheKey])
            ? ($this->cache[$cacheKey][self::CACHE_KEY_ATTRS] ?? [])
            : [];
    }

    private function svgContent(string $iconSet, string $iconName): string
    {
        $cacheKey = $this->iconCacheKey($iconSet, $iconName);

        return isset($this->cache[$cacheKey])
            ? ($this->cache[$cacheKey][self::CACHE_KEY_CONTENT] ?? '')
            : '';
    }

    private function iconCacheKey(string $iconSet, string $iconName): string
    {
        return sprintf('%s_%s', $iconSet, $iconName);
    }
}
