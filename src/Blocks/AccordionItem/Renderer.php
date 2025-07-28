<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\AccordionItem;

use Enokh\UniversalTheme\Blocks\BlockRenderer;

use function Inpsyde\PresentationElements\renderTag;

class Renderer implements BlockRenderer
{
    public function __construct(private readonly \Enokh\UniversalTheme\Template\Renderer $templateRenderer)
    {
    }

    public function defaults(): array
    {
        return [
            'heading' => '',
            'title' => '',
            'isOpen' => false,
        ];
    }

    public function render(array $attributes, string $content): string
    {
        if (empty($attributes['uniqueId'])) {
            return $this->v1Renderer($attributes, $content);
        }

        $isOpen = $attributes['isOpen'] ?? false;

        $classNames = [
            'enokh-blocks-accordion-item',
        ];

        if ($isOpen) {
            $classNames[] = "active";
        }

        return renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
            ]),
            $content
        );
    }

    private function v1Renderer(array $attributes, string $content): string
    {
        $headerClasses = ['enokh-blocks-accordion__header'];
        $contentClasses = ['enokh-blocks-accordion__content'];
        $ariaExpanded = 'false';
        $isOpen = $attributes['isOpen'] ?? false;
        $heading = $attributes['heading'] ?? '';
        $title = $attributes['title'] ?? '';

        if ($isOpen) {
            $headerClasses[] = 'is-active';
            $contentClasses[] = 'is-active';
            $ariaExpanded = 'true';
        }

        ob_start();
        ?>
        <button class="<?php echo esc_attr(implode(' ', $headerClasses)); ?>"
                aria-expanded="<?php echo esc_attr($ariaExpanded); ?>" type="button">
            <span><?php echo wp_kses_post($heading); ?></span>
            <span class="enokh-blocks-accordion__header-icon" aria-hidden="true">
            <?php $this->templateRenderer->svgLoader('chevron-down', true); ?></span>
        </button>

        <div class="<?php echo esc_attr(implode(' ', $contentClasses)); ?>"
            aria-expanded="<?php echo esc_attr($ariaExpanded); ?>">
            <?php if (!empty($title)) : ?>
                <h2 class="enokh-blocks-accordion__label">
                    <?php echo wp_kses_post($title); ?>
                </h2>
            <?php endif; ?>

            <?php if (!empty($content)) : ?>
                <div class="enokh-blocks-accordion__description">
                    <?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped, Syde.Files.LineLength.TooLong ?>
                </div>
            <?php endif; ?>
        </div> <!-- /.accordion-content -->
        <?php
        return (string) ob_get_clean();
    }
}
