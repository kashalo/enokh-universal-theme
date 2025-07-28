<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselNavigation;

use Enokh\UniversalTheme\Utility\BlockUtility;

use function Inpsyde\PresentationElements\renderTag;
use function Mah\DesignSystem\icon;

class Renderer
{
    private Style $style;
    private BlockUtility $blockUtility;

    public function __construct(Style $style, BlockUtility $blockUtility)
    {
        $this->style = $style;
        $this->blockUtility = $blockUtility;
    }

    public function render(array $attributes): string // phpcs:disable Syde.Functions.FunctionLength.TooLong
    {
        $variant = $attributes['variant'] ?? '';

        $css = $this->style->withSettings($attributes)
            ->generate()
            ->output();

        add_filter(
            $this->blockUtility->cssHookName(),
            static function (array $inlineCss) use ($css, $attributes): array {
                $inlineCss[$attributes['uniqueId']] = $css;

                return $inlineCss;
            }
        );

        $classNames = [
            'enokh-blocks-carousel-navigation',
            'enokh-blocks-carousel-navigation-' . ($attributes['uniqueId'] ?? ''),
        ];

        $iconContent = renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-desktop']
            ),
            $this->iconContent($attributes, 'Desktop')
        );
        $iconContent .= renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-tablet']
            ),
            $this->iconContent($attributes, 'Tablet')
        );
        $iconContent .= renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-mobile']
            ),
            $this->iconContent($attributes, 'Mobile')
        );

        $content = renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => 'enokh-blocks-carousel-navigation__items-wrapper',
            ]),
            renderTag(
                'span',
                get_block_wrapper_attributes(['class' => $this->itemClass($variant)]),
                $this->itemContent($variant, $iconContent)
            )
        );

        return renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
                'data-pagination' => $variant,
            ]),
            $content
        );
    }

    private function iconContent(array $settings, string $device = ''): string
    {
        $shape = $settings['shape'] ?? [];
        $icon = $this->blockUtility->attributeResponsiveValue('icon', $shape, $device, '');
        $iconSet = $this->blockUtility->attributeResponsiveValue('iconGroup', $shape, $device, '');

        return icon($iconSet, $icon)->render();
    }

    private function itemClass(string $variant): string
    {
        if ($variant === 'fraction') {
            return 'enokh-blocks-carousel-navigation__fraction';
        }

        if ($variant === 'element') {
            return 'enokh-blocks-carousel-navigation__element-item';
        }

        return 'enokh-blocks-carousel-navigation__item';
    }

    private function itemContent(string $variant, string $iconContent): string
    {
        if ($variant === 'fraction') {
            return '1/x';
        }

        if ($variant === 'shape') {
            return $iconContent;
        }

        return '';
    }
}
