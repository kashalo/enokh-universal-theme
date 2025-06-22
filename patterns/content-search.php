<?php

/**
 * Title: Search content
 * Slug: enokh-universal-theme/content/search
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
        "layout" => [
            "type" => "constrained",
        ],
        "style" => [
            "spacing" => [
                "padding" => [
                    "top" => 'var:preset|spacing|50',
                    "bottom" => 'var:preset|spacing|50',
                    "left" => 'var:preset|spacing|50',
                    "right" => 'var:preset|spacing|50',
                ],
            ],
        ],
    ],
    [
        // phpcs:disable WordPress.WP.I18n.MissingArgDomain
        block('core/heading', ['level' => 1], __('Search')),
        // phpcs:enable WordPress.WP.I18n.MissingArgDomain
        block(
            'enokh-universal-theme/search',
            [
                'fontSize' => 'large',
                'style' => [
                    'spacing' => [
                        'padding' => [
                            "top" => 'var:preset|spacing|30',
                            "bottom" => 'var:preset|spacing|30',
                            "left" => 'var:preset|spacing|30',
                            "right" => 'var:preset|spacing|30',
                        ],
                    ],
                ],
            ],
        ),
        block('core/pattern', [
            "slug" => "enokh-universal-theme/query/default",
        ]),
    ]
)->serialize();
