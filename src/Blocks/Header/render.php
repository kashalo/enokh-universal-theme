<?php

declare(strict_types=1);

/**
 * @var array $attributes Block attributes.
 * @var string $content Block default content.
 * @var \WP_Block $block Block instance.
 */

use Enokh\UniversalTheme\Blocks\Header\Elements\HeaderBlock;

use function Inpsyde\PresentationElements\renderTag;

$attributes = $attributes ?? [];
$content = $content ?? '';

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo renderTag(
    'div',
    \get_block_wrapper_attributes([
        'class' => HeaderBlock::CLASS_WRAPPER,
    ]),
    $content
);
