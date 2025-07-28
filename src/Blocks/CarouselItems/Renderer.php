<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselItems;

use function Inpsyde\PresentationElements\renderTag;

class Renderer
{
    public function render(array $attributes, string $content): string
    {
        $classNames = [
            'enokh-blocks-carousel-items__container',
            'swiper-wrapper',
            'enokh-blocks-carousel-items__container-' . ($attributes['uniqueId'] ?? ''),
        ];
        return renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
            ]),
            $content
        );
    }
}
