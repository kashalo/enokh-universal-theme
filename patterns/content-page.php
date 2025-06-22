<?php

/**
 * Title: Page content
 * Slug: enokh-universal-theme/content/page
 * Inserter: no
 */

declare(strict_types=1);

use function Inpsyde\PresentationElements\block;

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(
    'core/group',
    [
        'tagName' => 'main',
        "className" => "site-main",
    ],
    block('core/post-content', [
        "layout" => [
            "type" => "constrained",
        ],
    ])
)->serialize();
