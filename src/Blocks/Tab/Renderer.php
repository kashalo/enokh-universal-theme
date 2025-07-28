<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Tab;

use function Inpsyde\PresentationElements\renderTag;

class Renderer
{
    public function __construct()
    {
    }

    public function render(array $attributes, string $content): string
    {
        $name = trim($attributes['name'] ?? '');
        $innerTitle = !empty($attributes['innerTitle']) ? trim($attributes['innerTitle']) : $name;

        if (!empty($name) || !empty($innerTitle)) {
            return $this->v1Renderer($attributes, $content);
        }

        $classNames = [
            'mah-tab-item',
        ];

        return renderTag(
            'div',
            get_block_wrapper_attributes([
                'class' => implode(' ', $classNames),
                'role' => 'tabpanel',
            ]),
            $content
        );
    }

    private function v1Renderer(array $attributes, string $content): string
    {
        $name = trim($attributes['name'] ?? '');
        $innerTitle = !empty($attributes['innerTitle']) ? trim($attributes['innerTitle']) : $name;


        ob_start();
        ?>
        <div class="tab-content" role="tabpanel">
            <h2 class="tab-heading" data-name="<?php echo esc_attr($name); ?>"
                data-target="<?php echo esc_attr(sanitize_title($name)); ?>">
                <?php echo esc_html($innerTitle); ?>
            </h2>

            <?php echo $content // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped?>
        </div><!-- /.tab-content -->
        <?php
        return ob_get_clean();
    }
}
