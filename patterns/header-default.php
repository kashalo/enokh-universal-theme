<?php

/**
 * Title: Default Header
 * Slug: enokh-universal-theme/header/default
 * Categories: header
 * Block Types: core/template-part/header
 * Inserter: no
 */

declare(strict_types=1);

use Enokh\UniversalTheme\Blocks\Header\Elements\HeaderBlock;

use function Inpsyde\PresentationElements\block;
// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(HeaderBlock::BLOCK_TYPE)->serialize();
