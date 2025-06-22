<?php

/**
 * Title: Header with only logo
 * Slug: enokh-universal-theme/header/logo-only
 * Categories: header
 * Block Types: core/template-part/header
 * Inserter: no
 */

declare(strict_types=1);

use Inpsyde\PresentationElements;
use Enokh\UniversalTheme\Blocks\Header\Elements\HeaderBlock;

use function Inpsyde\PresentationElements\block;

/** @var HeaderBlock $header */
$header = block(HeaderBlock::BLOCK_TYPE);

/**
 * Exclude the following default header blocks:
 * - enokh-universal-theme/navigation
 * - enokh-universal-theme/search
 */
$header->filterBlocks(static function (string|PresentationElements\Contracts\Block $block): bool {
    return is_string($block)
        || ! in_array($block->type(), ['enokh-universal-theme/navigation', 'enokh-universal-theme/search'], true);
});

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo $header->serialize();
