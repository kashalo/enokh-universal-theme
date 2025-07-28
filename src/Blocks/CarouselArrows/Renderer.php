<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselArrows;

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
        $rootClass = 'enokh-blocks-carousel-arrows';
        $classNames = [
            $rootClass,
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

        return renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
            ]),
            $content
        );
    }
}
