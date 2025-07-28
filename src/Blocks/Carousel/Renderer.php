<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Carousel;

use Enokh\UniversalTheme\Utility\BlockUtility;

use function Inpsyde\PresentationElements\renderTag;

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
            'enokh-blocks-carousel',
            'enokh-blocks-carousel-' . ($attributes['uniqueId'] ?? ''),
        ];

        $wrapperClassNames = [
            'enokh-blocks-carousel-wrapper',
            'enokh-blocks-carousel-wrapper-' . ($attributes['uniqueId'] ?? ''),
        ];

        $wrapper = renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $wrapperClassNames),
                'data-speed' => $attributes['speed'] ?? '',
                'data-effect' => $attributes['variant'] ?? '',
                'data-space-between-tablet' => $attributes['spaceBetweenTablet'] ?? '10',
                'data-space-between-mobile' => $attributes['spaceBetweenMobile'] ?? '10',
                'data-space-between' => $attributes['spaceBetween'] ?? '10',
                'data-item-per-slide' => $attributes['itemPerSlide'] ?? '1',
                'data-item-per-slide-tablet' => $attributes['itemPerSlideTablet'] ?? '1',
                'data-item-per-slide-mobile' => $attributes['itemPerSlideMobile'] ?? '1',
                'data-slides-per-group' => $attributes['slidesPerGroup'] ?? '1',
                'data-slides-per-group-tablet' => $attributes['slidesPerGroupTablet'] ?? '1',
                'data-slides-per-group-mobile' => $attributes['slidesPerGroupMobile'] ?? '1',
                'data-loop' => ($attributes['loop'] ?? false) ? "true" : "false",
                'data-autoplay' => ($attributes['autoplay'] ?? false) ? "true" : "false",
                'data-autoplay-delay' => $attributes['autoPlayDelay'] ?? '3000',
                'data-auto-items-per-slide' =>
                    ($attributes['autoItemsPerSlide'] ?? false) ? "true" : "false",
            ]),
            $content
        );

        return renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
            ]),
            $wrapper
        );
    }
}
