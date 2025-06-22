<?php

/**
 * Title: Default Sidebar
 * Slug: enokh-universal-theme/sidebar/default
 * Categories: uncategorized
 */

declare(strict_types=1);

use function Inpsyde\PresentationElements\block;

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(
    'core/group',
    [],
    [
        block('enokh-universal-theme/related-posts'),
    ]
)->serialize();
