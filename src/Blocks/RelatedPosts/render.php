<?php

declare(strict_types=1);

/**
 * @var array $attributes Block attributes.
 * @var string $content Block default content.
 * @var \WP_Block $block Block instance.
 */

use function Inpsyde\PresentationElements\block;
use function Inpsyde\PresentationElements\renderTag;

/**
 * @var \WP_Query $wp_query
 * @var \WP_Post|null $post
 * @psalm-suppress InvalidGlobal
 */
global $wp_query, $post;

$queryArgs = [
    'inherit' => false,
    'postType' => 'post',
    "perPage" => 3,
    "pages" => 0,
    "offset" => 0,
    "order" => "desc",
    "orderBy" => "date",
    'exclude' => [],
    'categoryIds' => [],
    'taxQuery' => [],
];

if ($wp_query->is_main_query() && $post instanceof \WP_Post) {
    $queryArgs['exclude'][] = $post->ID;
    $categoryIds = wp_get_post_categories($post->ID);

    if (is_array($categoryIds)) {
        // Ensure uncategorized category is not used to find related posts
        $uncategorizedIndex = array_search(1, $categoryIds, true);
        if ($uncategorizedIndex !== false) {
            unset($categoryIds[$uncategorizedIndex]);
        }

        $queryArgs['categoryIds'] = $categoryIds;
    }
}

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo renderTag(
    'div',
    \get_block_wrapper_attributes(),
    [
        block(
            'core/query',
            [
                'queryId' => \md5(\json_encode($queryArgs)),
                'query' => $queryArgs,
            ],
            block(
                'core/post-template',
                [],
                [
                    block('core/post-featured-image', ['isLink' => true]),
                    block('core/post-title', [
                        'level' => 4,
                        'isLink' => true,
                        'style' => [
                            'margin' => [
                                "top" => '0',
                                "bottom" => '0',
                                "left" => '0',
                                "right" => '0',
                            ],
                        ],
                    ]),
                    block('core/post-excerpt', [
                        'excerptLength' => 30,
                    ]),
                ]
            )
        ),
    ]
);
