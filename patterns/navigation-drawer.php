<?php

/**
 * Title: Navigation Drawer
 * Slug: enokh-universal-theme/navigation-drawer
 * Categories: sidebar
 * Inserter: no
 */

declare(strict_types=1);


use Enokh\UniversalTheme\Blocks\NavigationDrawerTheme\Elements\NavigationDrawerBlock;
use function Inpsyde\PresentationElements\block;

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(NavigationDrawerBlock::BLOCK_TYPE)->serialize();
