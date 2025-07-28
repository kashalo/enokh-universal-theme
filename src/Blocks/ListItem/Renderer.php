<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\ListItem;

use Enokh\UniversalTheme\Utility\BlockUtility;

class Renderer
{
    private Style $style;
    private BlockUtility $blockUtility;

    public function __construct(Style $style, BlockUtility $blockUtility)
    {
        $this->style = $style;
        $this->blockUtility = $blockUtility;
    }

    public function render(array $attributes, string $content, \WP_Block $block): string
    {
        $css = $this->style->withSettings($attributes)
            ->generate()
            ->output();

        add_filter(
            $this->blockUtility->cssHookName(),
            static function (array $inlineCss) use ($css, $attributes): array {
                $inlineCss[$attributes['uniqueId']] = $css;

                return $inlineCss;
            },
            999
        );

        return $content;
    }
}
