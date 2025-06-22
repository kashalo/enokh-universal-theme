<?php

/**
 * Title: Index content
 * Slug: enokh-universal-theme/content/index
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
    block(
        'core/group',
        [
            "layout" => [
                "type" => "constrained",
            ],
        ],
        [
            block('core/query-title', [
                "type" => 'archive',
            ]),
            block('core/pattern', [
                "slug" => "enokh-universal-theme/query/default",
            ]),
        ]
    )
)->serialize();
