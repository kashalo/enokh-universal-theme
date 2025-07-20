<?php

declare(strict_types=1);

/**
 * @var array $attributes Block attributes.
 * @var string $content Block default content.
 * @var \WP_Block $block Block instance.
 */

use function Inpsyde\PresentationElements\isBlockRendererRestRequest;
use function Inpsyde\PresentationElements\renderTag;

$attributes = $attributes ?? [];
$menuLocation = $attributes['menuLocation'] ?? null;
$menuAriaLabel = $attributes['ariaLabel'] ?? null;

if (!$menuLocation || !\has_nav_menu($menuLocation)) {
    return;
}

if (empty($menuAriaLabel)) {
    $menuAriaLabel = wp_get_nav_menu_name($menuLocation) ?: $menuLocation;
}

$menu = \wp_nav_menu([
    'container' => '',
    'menu_class' => '',
    'menu_id' => '',
    'theme_location' => $menuLocation,
    'echo' => false,
]);

if (isBlockRendererRestRequest('enokh-universal-theme/navigation')) {
    // phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
    echo $menu;
    return;
}

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo renderTag(
    'nav',
    \get_block_wrapper_attributes([
        'class' => "enokh-blocks-navigation has-menu-location uses-$menuLocation-menu-location",
        'aria-label' => $menuAriaLabel,
    ]),
    $menu
);
