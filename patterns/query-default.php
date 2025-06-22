<?php

/**
 * Title: Default Query
 * Slug: enokh-universal-theme/query/default
 * Categories: query
 */

declare(strict_types=1);

use function Inpsyde\PresentationElements\block;

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(
    'core/query',
    [
        'displayLayout' => [
            'type' => 'flex',
            'columns' => 3,
        ],
    ],
    [
        block('core/post-template', [], [
            block('core/post-featured-image', ['isLink' => true]),
            block(
                'core/group',
                [
                    "style" => [
                        "spacing" => [
                            "padding" => [
                                "top" => '0',
                                "bottom" => 'var:preset|spacing|50',
                                "left" => 'var:preset|spacing|50',
                                "right" => 'var:preset|spacing|50',
                            ],
                        ],
                    ],
                ],
                [
                    block('core/post-title', ['isLink' => true]),
                    block('core/post-excerpt', [
                        // phpcs:disable WordPress.WP.I18n.MissingArgDomain
                        'moreText' => __('Read more'),
                        // phpcs:enable WordPress.WP.I18n.MissingArgDomain
                        'showMoreOnNewLine' => true,
                        'excerptLength' => 30,
                    ]),
                ]
            ),
        ]),
        block('core/spacer', [
            'height' => 'var(--wp--preset--spacing--50)',
        ]),
        block(
            'core/query-pagination',
            [
                "layout" => [
                    "type" => "flex",
                    "justifyContent" => "center",
                ],
            ],
            [
                block('core/query-pagination-previous'),
                block('core/query-pagination-numbers'),
                block('core/query-pagination-next'),
            ]
        ),
        block('core/spacer', [
            'height' => 'var(--wp--preset--spacing--50)',
        ]),
    ]
)->serialize();
