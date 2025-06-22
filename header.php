<?php

declare(strict_types=1);

use Enokh\UniversalTheme\Presentation\Template\ConstrainedTemplate;

/**
 * We need to render blocks before wp_head() so that
 * the style engine can output generated styles
 *
 * @link https://developer.wordpress.org/reference/classes/wp_style_engine/
 * @link https://developer.wordpress.org/block-editor/reference-guides/packages/packages-style-engine/
 */
ConstrainedTemplate::bootstrap(); ?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <div class="wp-site-blocks">
        <?php echo ConstrainedTemplate::renderHeader(); ?>
        <main class="wp-block-group is-layout-constrained wp-block-group-is-layout-constrained">
