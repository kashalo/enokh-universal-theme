<?php

/**
 * Title: Hero & Sidebar content
 * Slug: enokh-universal-theme/content/single
 * Inserter: no
 */

declare(strict_types=1);

use function Inpsyde\PresentationElements\block;

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(
    'core/group',
    [
        "tagName" => "main",
        "className" => "site-main",
        "layout" => [
            "type" => "constrained",
        ],
        "style" => [
            "spacing" => [
                "padding" => [
                    "top" => 'var:preset|spacing|50',
                    "bottom" => 'var:preset|spacing|50',
                    "left" => '0',
                    "right" => '0',
                ],
            ],
        ],
    ],
    [
        block('core/pattern', [
            "slug" => 'enokh-universal-theme/hero/default',
        ]),
        block(
            'core/columns',
            [
                "style" => [
                    "spacing" => [
                        "blockGap" => 'var:preset|spacing|70',
                        "padding" => [
                            "top" => 'var:preset|spacing|70',
                        ],
                    ],
                ],
            ],
            [
                block(
                    'core/column',
                    [
                        "style" => [
                            "layout" => [
                                "selfStretch" => "fixed",
                                "flexSize" => "66.66% !important",
                            ],
                        ],
                    ],
                    [
                        block('core/post-content'),
                        block('core/pattern', [
                            "slug" => 'enokh-universal-theme/social/sharing',
                        ]),
                    ]
                ),
                block(
                    'core/column',
                    [
                        "style" => [
                            "layout" => [
                                "selfStretch" => "fixed",
                                "flexSize" => "33.33% !important",
                            ],
                        ],
                    ],
                    block('core/pattern', [
                        "slug" => "enokh-universal-theme/sidebar/default",
                        "tagName" => "aside",
                        "className" => "site-sidebar",
                    ]),
                ),
            ]
        ),
    ]
)->serialize();
