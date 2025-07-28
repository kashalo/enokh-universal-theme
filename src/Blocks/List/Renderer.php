<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\List;

use Enokh\UniversalTheme\Blocks\BlockRenderer;
use Enokh\UniversalTheme\Utility\BlockUtility;

use function Inpsyde\PresentationElements\renderTag;

class Renderer implements BlockRenderer
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

        $tag = $attributes['listType'] ?? 'ul';
        $classNames = [
            'enokh-blocks-list',
            'enokh-blocks-list-' . $attributes['uniqueId'],
        ];

        $start = !empty($attributes['numerical']['startValue'])
            ? $attributes['numerical']['startValue']
            : null;
        $reversed = !empty($attributes['numerical']['reverseOrder']);

        $blockAttributes = [
            'class' => implode(' ', $classNames),
            'start' => $start,
            'reversed' => $reversed ? 'true' : null,
        ];

        return renderTag(
            $tag,
            get_block_wrapper_attributes(
                array_filter($blockAttributes)
            ),
            $content
        );
    }
}
