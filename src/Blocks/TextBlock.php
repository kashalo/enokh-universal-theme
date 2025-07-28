<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

use Enokh\UniversalTheme\Config\BlockDefaultAttributes;
use Enokh\UniversalTheme\Module\EditorModule;
use Enokh\UniversalTheme\Style\TextStyle;
use Enokh\UniversalTheme\Utility\BlockUtility;
use Enokh\UniversalTheme\Utility\DynamicContentUtility;

class TextBlock
{
    public const NAME = 'enokh-blocks/text';
    public const ICON = 'text';
    public const LOCALIZE_VAR = 'TextBlock';

    private BlockUtility $blockUtility;
    private TextStyle $textStyle;
    private DynamicContentUtility $dynamicContentUtility;

    public function __construct(BlockUtility $blockUtility, TextStyle $textStyle, DynamicContentUtility $dynamicContentUtility)
    {
        $this->blockUtility = $blockUtility;
        $this->textStyle = $textStyle;
        $this->dynamicContentUtility = $dynamicContentUtility;
    }

    public function name(): string
    {
        return self::NAME;
    }

    /**
     * @return array
     */
    public function attributes(): array
    {
        return [];
    }

    public function args(): array
    {
        return [
            'render_callback' => [$this, 'render'],
            'attributes' => $this->attributes(),
            'uses_context' => [
                'termId',
                'taxonomyType',
                'termShowPostCounts',
            ],
        ];
    }

    public function defaults(): array
    {
        $blockDefaults = BlockDefaultAttributes::defaults();
        return array_merge(
            $blockDefaults,
            [
                'element' => 'h2',
                'cssClasses' => '',
                'backgroundColor' => '',
                'textColor' => '',
                'linkColor' => '',
                'linkColorHover' => '',
                'highlightTextColor' => '',
                'fontFamilyFallback' => '',
                'googleFont' => false,
                'googleFontVariants' => '',
                'icon' => '',
                'hasIcon' => false,
                'iconColor' => '',
                'iconLocation' => 'inline',
                'iconLocationTablet' => '',
                'iconLocationMobile' => '',
                'removeText' => false,
                'ariaLabel' => '',
                'estimatedReadingTime' => [
                    'descriptiveText' => 'Estimated reading time: ',
                    'postFix' => 'minutes',
                    'wordsPerMin' => 300,
                ],
                'column' => null,
                'columnTablet' => null,
                'columnMobile' => null,
            ]
        );
    }

    /**
     * @param array $attrs
     * @param string $content
     * @param \WP_Block $block
     * @return string
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong
     */
    public function render(array $attrs, string $content, \WP_Block $block): string
    {
        $settings = wp_parse_args(
            $attrs,
            $this->defaults()
        );

        $css = $this->textStyle->withSettings($settings)
            ->generate()
            ->output();

        add_filter(
            $this->blockUtility->cssHookName(),
            static function (array $inlineCss) use ($css, $settings): array {
                $inlineCss[$settings['uniqueId']] = $css;

                return $inlineCss;
            }
        );

        if (!isset($attrs['useDynamicData']) || !$attrs['useDynamicData']) {
            return $content;
        }

        $dynamicContent = !empty($settings['dynamicContentType'])
            ? $this->dynamicContentUtility->findDynamicContent($settings, $block)
            : wp_strip_all_tags($block->inner_html);

        if (empty($dynamicContent) && empty($attrs['hasIcon'])) {
            return '';
        }

        $iconHtml = $settings['hasIcon']
            ? $this->parseIconHtml($content)
            : '';

        $classNames = [
            'enokh-blocks-text',
            'enokh-blocks-text-' . $settings['uniqueId'],
        ];
        if (!empty($settings['className'])) {
            $classNames[] = $settings['className'];
        }
        if (!empty($settings['hasIcon'])) {
            $classNames[] = 'has-icon';
        }

        $headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div'];
        $tagName = $settings['element'];
        $tagName = in_array($tagName, $headingTags, true) ? $tagName : 'div';

        $output = sprintf(
            '<%1$s %2$s>',
            $tagName,
            $this->blockUtility->attribute(
                'mah-text',
                [
                    'id' => isset($settings['anchor']) ? $settings['anchor'] : null,
                    'class' => implode(' ', $classNames),
                ],
                $settings,
                $block
            )
        );

        $iconLocation = $settings['iconLocation'] ?? '';

        // Append icon before text
        if (!$iconLocation || in_array($iconLocation, ['inline', 'left', 'before'], true)) {
            $output .= $iconHtml;
        }

        $dynamicLink = $this->dynamicContentUtility->dynamicUrl($settings, $block);

        if (!empty($dynamicLink)) {
            /**
             * @psalm-suppress PossiblyInvalidArgument
             */
            $dynamicContent = sprintf(
                '<a href="%s">%s</a>',
                $dynamicLink,
                $dynamicContent
            );
        }

        $output .= is_string($dynamicContent) ? $dynamicContent : '';

        // Append icon after text
        if (in_array($iconLocation, ['right', 'after'], true)) {
            $output .= $iconHtml;
        }

        $output .= sprintf(
            '</%s>',
            $tagName
        );

        return $output;
    }

    // @phpcs:enable Syde.Functions.FunctionLength.TooLong

    public function config(): array
    {
        return [
            'apiVersion' => 2,
            'name' => $this->name(),
            'title' => esc_html__('Enokh Text', 'enokh-blocks'),
            'category' => EditorModule::BLOCK_CATEGORY,
            'icon' => self::ICON,
            'attributes' => $this->attributes(),
        ];
    }

    private function parseIconHtml(string $content): string
    {
        $doc = $this->dynamicContentUtility->loadHtml($content);

        if (!$doc) {
            return '';
        }

        $icon = '';
        $nodes = $doc->getElementsByTagName('span');

        foreach ($nodes as $node) {
            if (!str_contains($node->getAttribute('class'), 'enokh-blocks-icon')) {
                continue;
            }
            $icon = $doc->saveHTML($node);
        }

        return $icon;
    }
}
