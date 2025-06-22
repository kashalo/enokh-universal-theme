<?php

/**
 * Title: Content: 404
 * Slug: enokh-universal-theme/content/404
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
        block(
            'core/heading',
            ['level' => 1],
            esc_html_x(
                'Page not found',
                'Error code for a webpage that is not found.',
                'enokh-universal-theme'
            )
        ),
        block(
            'core/paragraph',
            [],
            esc_html_x(
                'The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.',
                'Message to convey that a webpage could not be found',
                'enokh-universal-theme'
            )
        ),
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
    ]
)->serialize();
