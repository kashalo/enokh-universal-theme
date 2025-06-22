<?php

declare(strict_types=1);

/**
 * @var array $attributes Block attributes.
 * @var string $content Block default content.
 * @var \WP_Block $block Block instance.
 */

use Mah\Blocks\Editor\Blocks\NavigationDrawerToggle\Element;

use function Inpsyde\PresentationElements\element;
use function Inpsyde\PresentationElements\parseAttributes;

$attributes = $attributes ?? [];
$content = $content ?? '';

/** @var Element $element */
$element = element(Element::class);
$element->withArguments($attributes);
$element->withAttributes(parseAttributes(\get_block_wrapper_attributes()));

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo $element->render();
