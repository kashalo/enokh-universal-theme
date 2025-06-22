<?php

/**
 * Title: Social Sharing
 * Slug: enokh-universal-theme/social/sharing
 * Categories: uncategorized
 */

declare(strict_types=1);

use function Inpsyde\PresentationElements\block;

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(
    'core/group',
    [
        "style" => [
            "spacing" => [
                "margin" => [
                    "bottom" => 'var:preset|spacing|70',
                ],
                "padding" => [
                    "top" => 'var:preset|spacing|50',
                    "bottom" => 'var:preset|spacing|50',
                    "left" => 'var:preset|spacing|50',
                    "right" => 'var:preset|spacing|50',
                ],
            ],
            "color" => [
                'background' => 'var(--Enokh--color--neutral-90)',
            ],
        ],
    ],
    block('core/pattern', [
        'slug' => 'enokh-universal-theme/social/links',
    ])
)->serialize();
