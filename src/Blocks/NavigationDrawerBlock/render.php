<?php

declare(strict_types=1);

/**
 * @var array $attributes Block attributes.
 * @var string $content Block default content.
 * @var \WP_Block $block Block instance.
 */

use Enokh\UniversalTheme\Blocks\NavigationDrawerBlock\Elements\Backdrop;
use Enokh\UniversalTheme\Blocks\NavigationDrawerBlock\Elements\Drawer;

use function Inpsyde\PresentationElements\element;
use function Inpsyde\PresentationElements\parseAttributes;

$attributes = $attributes ?? [];
$content = $content ?? '';

/** @var Drawer $drawer */
$drawer = element(Drawer::class);
$drawer->withAttributes(parseAttributes(\get_block_wrapper_attributes()));

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo $drawer->withContent($content)->render();
echo element(Backdrop::class)->render();
