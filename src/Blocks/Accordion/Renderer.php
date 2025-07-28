<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Accordion;

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
        if (empty($attributes['uniqueId'])) {
            return $this->v1Renderer($attributes, $content);
        }

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
            'enokh-blocks-accordion',
            'enokh-blocks-accordion-' . ($attributes['uniqueId']),
        ];

        return renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
                'id' => 'enokh-blocks-accordion-' . ($attributes['uniqueId']),
                'data-enokh-accordion' => '',
            ]),
            $content
        );
    }

    private function v1Renderer(array $attributes, string $content): string
    {
        ob_start();
        ?>
        <div class="enokh-blocks-accordion">
            <?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            ?>
        </div>
        <?php
        return (string) ob_get_clean();
    }
}
