<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation\Template;

use function Inpsyde\PresentationElements\block;

/**
 * We need to render blocks before wp_head() so that
 * the style engine can output generated styles
 *
 * @link https://developer.wordpress.org/reference/classes/wp_style_engine/
 * @link https://developer.wordpress.org/block-editor/reference-guides/packages/packages-style-engine/
 */
class ConstrainedTemplate
{
    private static string $header = '';
    private static string $main = '';
    private static string $footer = '';

    /**
     * This method must be called before wp_head action so that
     * wp_enqueue_stored_styles() can be output for block supports
     *
     * @return void
     */
    public static function bootstrap(): void
    {
        ob_start();
        block_header_area();
        self::$header = ob_get_clean();

        ob_start();
        block_footer_area();
        self::$footer = ob_get_clean();
    }

    public static function renderHeader(): string
    {
        return self::$header;
    }

    public static function renderFooter(): string
    {
        return self::$footer;
    }
}
