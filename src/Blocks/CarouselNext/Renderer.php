<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselNext;

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

    public function render(array $attributes, string $content): string
    {
        $rootClass = 'enokh-blocks-carousel-next';
        $classNames = [
            $rootClass,
            'swiper-button-next',
            sprintf("%s-%s", $rootClass, ($attributes['uniqueId'] ?? '')),
        ];

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

        $content .= renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-desktop']
            ),
            $this->iconContent($attributes, 'Desktop')
        );
        $content .= renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-tablet']
            ),
            $this->iconContent($attributes, 'Tablet')
        );
        $content .= renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-mobile']
            ),
            $this->iconContent($attributes, 'Mobile')
        );

        return renderTag(
            'button',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
            ]),
            $content
        );
    }

    private function iconContent(array $settings, string $device = ''): string
    {
        $display = $settings['iconDisplay'] ?? [];
        $icon = $this->blockUtility->attributeResponsiveValue('icon', $display, $device, '');
        $iconSet = $this->blockUtility->attributeResponsiveValue(
            'iconGroup',
            $display,
            $device,
            ''
        );

        return icon($iconSet, $icon)->render();
    }
}
