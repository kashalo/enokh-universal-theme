<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselPlayPause;

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
        $rootClass = 'enokh-blocks-carousel-play-pause';
        $classNames = [
            $rootClass,
            sprintf("%s-%s", $rootClass, ($attributes['uniqueId'] ?? '')),
            'stop',
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
            'button',
            get_block_wrapper_attributes([
                'class' => 'play-button',
            ]),
            $this->playButtonContent($attributes)
        );

        $content .= renderTag(
            'button',
            get_block_wrapper_attributes([
                'class' => 'pause-button',
            ]),
            $this->pauseButtonContent($attributes)
        );

        return renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
            ]),
            $content
        );
    }

    private function playButtonContent(array $attributes): string
    {
        $content = renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-desktop']
            ),
            $this->iconContent($attributes, 'play', 'Desktop')
        );
        $content .= renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-tablet']
            ),
            $this->iconContent($attributes, 'play', 'Tablet')
        );
        $content .= renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-mobile']
            ),
            $this->iconContent($attributes, 'play', 'Mobile')
        );

        return $content;
    }

    private function pauseButtonContent(array $attributes): string
    {
        $content = renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-desktop']
            ),
            $this->iconContent($attributes, 'pause', 'Desktop')
        );
        $content .= renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-tablet']
            ),
            $this->iconContent($attributes, 'pause', 'Tablet')
        );
        $content .= renderTag(
            'span',
            get_block_wrapper_attributes(
                ['class' => 'visible-mobile']
            ),
            $this->iconContent($attributes, 'pause', 'Mobile')
        );

        return $content;
    }

    private function iconContent(array $settings, string $type, string $device = ''): string
    {
        $display = $settings['display'] ?? [];
        $icon = $this->blockUtility->attributeResponsiveValue("{$type}Icon", $display, $device, '');
        $iconSet = $this->blockUtility->attributeResponsiveValue(
            "{$type}IconGroup",
            $display,
            $device,
            ''
        );

        return icon($iconSet, $icon)->render();
    }
}
