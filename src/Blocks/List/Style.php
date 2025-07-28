<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\List;

use Enokh\UniversalTheme\Style\BlockDefaultStylesTrait;
use Enokh\UniversalTheme\Style\BlockStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;

use function Enokh\UniversalTheme\icon;

/**
 * Class Style
 *
 * Generates and outputs inline CSS styles for the List block,
 * based on block settings and device context.
 *
 * @package Enokh\UniversalTheme\Blocks\List
 *
 * @phpcs:disable Syde.Functions.FunctionLength.TooLong
 */
class Style implements BlockStyle
{
    use BlockDefaultStylesTrait;

    /**
     * @var array<string, mixed>
     */
    protected array $settings;
    private InlineCssGenerator $inlineCssGenerator;

    /**
     * CSS Vars
     */
    public const CSS_VAR_MARKER_COLOUR = '--mah-list-c-marker';
    public const CSS_VAR_TEXT_COLOUR = '--mah-list-c-text';
    public const CSS_VAR_LINK_COLOUR = '--mah-list-c-link';
    public const CSS_VAR_LINK_HOVER_COLOUR = '--mah-list-c-link-hover';

    /**
     * Style constructor.
     *
     * @param InlineCssGenerator $inlineCssGenerator Object to generate inline CSS.
     */
    public function __construct(InlineCssGenerator $inlineCssGenerator)
    {
        $this->settings = [];
        $this->inlineCssGenerator = $inlineCssGenerator;
    }

    /**
     * Set block settings.
     *
     * @param array<string,mixed> $settings Block settings.
     * @return BlockStyle Returns self for chaining.
     */
    public function withSettings(array $settings): BlockStyle
    {
        $this->settings = $settings;

        return $this;
    }

    /**
     * Generate styles for default, Tablet, and Mobile.
     *
     * @return BlockStyle Returns self for chaining.
     */
    public function generate(): BlockStyle
    {
        $this->style($this->settings);
        $this->style($this->settings, 'Tablet');
        $this->style($this->settings, 'Mobile');
        return $this;
    }

    /**
     * Get the generated CSS output.
     *
     * @return string CSS string.
     */
    public function output(): string
    {
        return $this->inlineCssGenerator->output();
    }

    /**
     * Build the CSS selector for this block instance.
     *
     * @param array<string,mixed> $settings Block settings array.
     * @return string Selector string.
     */
    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-list.enokh-blocks-list-%s',
            $settings['uniqueId']
        );
    }

    /**
     * Get the data attribute key for a device context.
     *
     * @param string $device Device suffix (e.g., '', 'Tablet', 'Mobile').
     * @return string Data attribute key.
     */
    private function deviceKey(string $device = ''): string
    {
        return empty($device) ? InlineCssGenerator::ATTR_MAIN_KEY : $device;
    }

    /**
     * Apply all style rules for given device.
     *
     * @param array<string,mixed> $settings Block settings.
     * @param string $device Device suffix ('' for main, 'Tablet', 'Mobile').
     */
    private function style(array $settings, string $device = ''): void
    {
        $selector = $this->blockSelector($this->settings);
        $deviceKey = $this->deviceKey($device);
        $colours = $this->settings['colors'] ?? [];
        $listPosition = $this->settings["listPosition{$device}"] ?? '';
        $listSpacing = $this->settings['listSpacing'] ?? [];

        $this->columnStyle($device);
        $this->orderedStyle($device);
        $this->bulletStyle($device);
        $this->typographyStyle(
            $selector,
            $this->settings,
            $device
        );
        $this->spacingStyle(
            $selector,
            $this->settings,
            $device
        );
        $this->spacingStyle(
            sprintf("%s li", $selector),
            ['spacing' => $listSpacing],
            $device
        );
        $this->borderStyle(
            $selector,
            $this->settings,
            $device
        );
        $this->colorStyle(
            $selector,
            $colours,
            $device
        );

        $this->inlineCssGenerator
            ->withProperty(
                $deviceKey,
                $selector,
                self::CSS_VAR_LINK_COLOUR,
                $colours["linkColor{$device}"] ?? ''
            )
            ->withProperty(
                $deviceKey,
                sprintf('%s a', $selector),
                'color',
                sprintf("var(%s)", self::CSS_VAR_LINK_COLOUR),
            );

        $this->inlineCssGenerator
            ->withProperty(
                $deviceKey,
                $selector,
                self::CSS_VAR_LINK_HOVER_COLOUR,
                $colours["linkColorHover{$device}"] ?? ''
            )
            ->withProperty(
                $deviceKey,
                sprintf('%s a:hover', $selector),
                'color',
                sprintf("var(%s)", self::CSS_VAR_LINK_HOVER_COLOUR),
            );

        $this->inlineCssGenerator
            ->withProperty(
                $deviceKey,
                $selector,
                self::CSS_VAR_MARKER_COLOUR,
                $colours["markerColor{$device}"] ?? ''
            )
            ->withProperty(
                $deviceKey,
                sprintf('%s ::marker', $selector),
                'color',
                sprintf("var(%s)", self::CSS_VAR_MARKER_COLOUR),
            );

        if (!empty($listPosition)) {
            $this->inlineCssGenerator
                ->withProperty(
                    $deviceKey,
                    $selector,
                    'list-style-position',
                    $this->settings["listPosition{$device}"] ?? ''
                );

            $this->inlineCssGenerator
                ->withProperty(
                    $deviceKey,
                    $selector . ' .enokh-blocks-list-item__content',
                    'display',
                    'inline',
                );
        }
    }

    /**
     * Apply CSS for column layout.
     *
     * @param string $device Device suffix.
     */
    private function columnStyle(string $device = ''): void
    {
        $selector = $this->blockSelector($this->settings);
        $deviceKey = $this->deviceKey($device);
        $propertyKey = sprintf('column%s', $device);
        $gapPropertyKey = sprintf('columnGap%s', $device);

        if (empty($this->settings[$propertyKey])) {
            return;
        }

        $property = 'columns';
        $this->inlineCssGenerator
            ->withProperty(
                $deviceKey,
                $selector,
                $property,
                $this->settings[$propertyKey]
            )
            ->withProperty(
                $deviceKey,
                $selector,
                'column-gap',
                $this->settings[$gapPropertyKey] ?? ''
            );
    }

    /**
     * Apply CSS for unordered list style.
     *
     * @param string $device Device suffix.
     */
    private function unorderedStyle(string $device = ''): void
    {
        $listType = $this->settings['listType'] ?? '';

        if ($listType !== 'ul') {
            return;
        }

        $this->inlineCssGenerator->withProperty(
            $this->deviceKey($device),
            $this->blockSelector($this->settings),
            'list-style',
            'none'
        );
    }

    /**
     * Apply CSS for ordered list style.
     *
     * @param string $device Device suffix.
     */
    private function orderedStyle(string $device = ''): void
    {
        $listType = $this->settings['listType'] ?? '';

        if ($listType !== 'ol') {
            return;
        }

        $propertyKey = sprintf('listStyle%s', $device);

        if (
            empty($this->settings['numerical']) ||
            empty($this->settings['numerical'][$propertyKey])
        ) {
            return;
        }

        $this->inlineCssGenerator->withProperty(
            $this->deviceKey($device),
            $this->blockSelector($this->settings),
            'list-style-type',
            $this->settings['numerical'][$propertyKey]
        );
    }

    /**
     * Apply CSS for custom bullet (icon) style.
     *
     * @param string $device Device suffix.
     */
    private function bulletStyle(string $device = ''): void
    {
        $marker = $this->settings['marker'] ?? [];

        if (
            empty($marker['icon']) ||
            empty($marker['iconGroup'])
        ) {
            return;
        }

        $selector = $this->blockSelector($this->settings);
        $deviceKey = $this->deviceKey($device);
        $iconSizeKey = sprintf('size%s', $device);
        $bulletSelector = sprintf('%s > li > .enokh-blocks-list-item__has-bullet:before', $selector);
        $bulletWrapperSelector = sprintf('%s > li > .enokh-blocks-list-item__has-bullet', $selector);
        $colours = $this->settings['colors'] ?? [];


        if (!empty($marker[$iconSizeKey])) {
            $this->inlineCssGenerator
                ->withProperty(
                    $deviceKey,
                    $bulletSelector,
                    'width',
                    $marker[$iconSizeKey]
                )
                ->withProperty(
                    $deviceKey,
                    $bulletSelector,
                    'height',
                    $marker[$iconSizeKey]
                )
                ->withProperty(
                    $deviceKey,
                    $bulletSelector,
                    '-webkit-mask-size',
                    sprintf('%1$s %1$s', $marker[$iconSizeKey])
                )
                ->withProperty(
                    $deviceKey,
                    $bulletSelector,
                    'mask-size',
                    sprintf('%1$s %1$s', $marker[$iconSizeKey])
                );
        }

        $this->spacingStyle(
            $bulletSelector,
            $marker,
            $device
        );

        $renderedIcon = icon($marker['iconGroup'], $marker['icon'])->render();

        $cssProperties = [
            'background-color' => sprintf("var(%s, currentColor)", self::CSS_VAR_MARKER_COLOUR),
            'mask-image' => sprintf("url('data:image/svg+xml,%s')", $renderedIcon),
            '-webkit-mask-image' => sprintf("url('data:image/svg+xml,%s')", $renderedIcon),
        ];

        $alignItems = $marker[sprintf('alignItems%s', $device)] ?? '';
        $computedAlignItems =
            $alignItems === 'center'
                ? $alignItems
                : sprintf(
                    "flex-%s",
                    $alignItems === 'top' ? 'start' : 'end'
                );

        $this->unorderedStyle($device);

        $this->inlineCssGenerator
            ->withProperty(
                $deviceKey,
                $selector,
                self::CSS_VAR_MARKER_COLOUR,
                $colours["markerColor{$device}"] ?? ''
            );
        $this->inlineCssGenerator
            ->withProperty(
                $deviceKey,
                $bulletWrapperSelector,
                'align-items',
                $computedAlignItems
            );

        foreach ($cssProperties as $cssProperty => $cssValue) {
            $this->inlineCssGenerator->withProperty(
                $deviceKey,
                $bulletSelector,
                $cssProperty,
                $cssValue,
            );
        }
    }
}

// @phpcs:enable Syde.Functions.FunctionLength.TooLong
