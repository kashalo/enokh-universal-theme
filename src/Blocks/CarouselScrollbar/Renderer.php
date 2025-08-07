<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselScrollbar;

use function Inpsyde\PresentationElements\renderTag;

class Renderer
{
    private Style $style;

    public function __construct(Style $style)
    {
        $this->style = $style;
    }

    public function render(array $attributes, string $content): string
    {
        $classNames = [
            'enokh-blocks-carousel-scrollbar',
            'swiper-scrollbar',
            'enokh-blocks-carousel-scrollbar-' . ($attributes['uniqueId'] ?? ''),
        ];

        $css = $this->style->withSettings($attributes)
            ->generate()
            ->output();

        add_filter('enokh-blocks_css_inline', static function ($inlineCss) use ($css, $attributes) {
            $inlineCss[$attributes['uniqueId']] = $css;

            return $inlineCss;
        });

        return renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
                'data-drag-size' => $this->dragSizing($attributes),
                'data-drag-size-tablet' => $this->dragSizing($attributes, 'Tablet'),
                'data-drag-size-mobile' => $this->dragSizing($attributes, 'Mobile'),
            ]),
            $content
        );
    }

    private function dragSizing(array $settings, string $device = ''): string
    {
        $sizing = $settings['sizing'] ?? [];

        if (
            empty($sizing) ||
            empty($sizing["drag{$device}"]) ||
            $sizing["drag{$device}"] === 'auto'
        ) {
            return 'auto';
        }

        return (string) intval($sizing["drag{$device}"]);
    }
}
