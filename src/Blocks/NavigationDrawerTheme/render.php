<?php

declare(strict_types=1);

/**
 * @var array $attributes Block attributes.
 * @var string $content Block default content.
 * @var \WP_Block $block Block instance.
 */

$attributes = $attributes ?? [];

// phpcs:disable VariableAnalysis.CodeAnalysis.VariableAnalysis.UndefinedVariable
// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo $content;
