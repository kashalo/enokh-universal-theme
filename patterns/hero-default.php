<?php

/**
 * Title: Default Post Hero
 * Slug: enokh-universal-theme/hero/default
 * Categories: uncategorized
 */

declare(strict_types=1);

use function Inpsyde\PresentationElements\block;

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(
    'core/group',
    [],
    block(
        'core/columns',
        [
            "layout" => [
                "type" => "constrained",
            ],
            "style" => [
                "spacing" => [
                    "blockGap" => '0',
                    "padding" => [
                        "top" => '0',
                        "bottom" => '0',
                        "left" => '0',
                        "right" => '0',
                    ],
                ],
                "color" => [
                    'background' => 'var(--Enokh--color--brand-primary-90)',
                ],
            ],
        ],
        [
            block(
                'core/column',
                [
                    "layout" => [
                        "type" => "flex",
                        "orientation" => "vertical",
                        "verticalAlignment" => "center",
                    ],
                    "style" => [
                        "layout" => [
                            "selfStretch" => "fixed",
                            "flexSize" => "50% !important",
                        ],
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
                    block('core/post-title', ["level" => 1]),
                    block('core/post-excerpt'),
                ]
            ),
            block(
                'core/column',
                [
                    "style" => [
                        "layout" => [
                            "selfStretch" => "fixed",
                            "flexSize" => "50% !important",
                        ],
                    ],
                ],
                block('core/post-featured-image', [
                    'aspectRatio' => '4/3',
                    'layout' => [
                        'selfStretch' => 'fit',
                    ],
                ]),
            ),
        ]
    )
)->serialize();
