<?php

/**
 * Title: Default Footer
 * Slug: enokh-universal-theme/footer/default
 * Categories: footer
 * Block Types: core/template-part/footer
 * Inserter: no
 */

declare(strict_types=1);

use Enokh\UniversalTheme\Blocks\Footer\Elements\FooterBlock;

use function Inpsyde\PresentationElements\block;

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(FooterBlock::BLOCK_TYPE)->serialize();
