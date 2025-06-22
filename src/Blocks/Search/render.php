<?php

declare(strict_types=1);

/**
 * @var array $attributes Block attributes.
 * @var string $content Block default content.
 * @var \WP_Block $block Block instance.
 */

use function Inpsyde\PresentationElements\block;
use function Inpsyde\PresentationElements\isBlockRendererRestRequest;
use function Inpsyde\PresentationElements\renderTag;

$attributes = $attributes ?? [];
// phpcs:disable WordPress.WP.I18n.MissingArgDomain
$placeholderText = $attributes['placeholderText'] ?? __('Search');
// phpcs:enable WordPress.WP.I18n.MissingArgDomain
$buttonOnly = $attributes['buttonOnly'] ?? false;

$searchBlock = block('core/search', [
    'showLabel' => false,
    'buttonPosition' => $buttonOnly ? 'button-only' : 'button-inside',
    'buttonUseIcon' => true,
    'placeholder' => $placeholderText,
]);

if (isBlockRendererRestRequest('enokh-universal-theme/search')) {
    // phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
    echo $searchBlock->render();
    return;
}

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo renderTag(
    'div',
    \get_block_wrapper_attributes([
        'class' => 'blocks-search',
    ]),
    $searchBlock
);
