<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

use Enokh\UniversalTheme\Module\EditorModule;
use Enokh\UniversalTheme\Utility\DynamicContentUtility;

class QueryLoop
{
    public const NAME = 'enokh-blocks/query-loop';
    public const ICON = 'feedback';
    public const LOCALIZE_VAR = 'QueryLoopBlock';
    private GridBlock $gridBlock;
    private DynamicContentUtility $dynamicContentUtility;

    public function __construct(GridBlock $gridBlock, DynamicContentUtility $dynamicContentUtility)
    {
        $this->gridBlock = $gridBlock;
        $this->dynamicContentUtility = $dynamicContentUtility;
    }

    public static function new(GridBlock $gridBlock, DynamicContentUtility $dynamicContentUtility): self
    {
        return new self($gridBlock, $dynamicContentUtility);
    }

    public function name(): string
    {
        return self::NAME;
    }

    /**
     * @return array
     */
    public function attributes(): array
    {
        return [];
    }

    public function args(): array
    {
        return [
            'render_callback' => [$this->gridBlock, 'render'],
            'attributes' => $this->attributes(),
            'provides_context' => [
                'enokh-blocks/query' => 'query',
                'enokh-blocks/queryId' => 'uniqueId',
                'enokh-blocks/inheritQuery' => 'inheritQuery',
            ],
        ];
    }

    public function render(array $attrs, string $content, \WP_Block $block): string
    {
        global $wp_query;
        $query = $this->dynamicContentUtility->setupQuery($block);
        $queryArgs = $query->args();

        $isUseGlobalQuery = (
            isset($block->context['enokh-blocks/inheritQuery']) &&
            $block->context['enokh-blocks/inheritQuery']
        );
        // Global query
        if ($isUseGlobalQuery && $wp_query && isset($wp_query->query_vars) && is_array($wp_query->query_vars)) {
            $query->unsetPostType();
            $query->withArgs(wp_parse_args($query->args(), $wp_query->query_vars));

            if (empty($query->args()['post_type']) && is_singular()) {
                $query->withPostType((string) get_post_type((int) get_the_ID()));
                $query->unsetName();
            }
        }

        $blockQuery = new \WP_Query($query->args());

        $content = '';
        if (!$blockQuery->have_posts()) {
            return $content;
        }

        // @phpstan-ignore while.alwaysTrue
        while ($blockQuery->have_posts()) {
            $blockQuery->the_post();
            $innerBlocks = new \WP_Block(
                $block->parsed_block,
                [
                    'postType' => get_post_type(),
                    'postId' => get_the_ID(),
                ]
            );
            $blockContent = ($innerBlocks)->render(['dynamic' => false]);

            $content .= $blockContent;
        }
        // @phpstan-ignore deadCode.unreachable
        wp_reset_postdata();

        return $content;
    }

    public function config(): array
    {
        return [
            'apiVersion' => 2,
            'name' => $this->name(),
            'title' => esc_html__('Enokh Query Loop', 'enokh-blocks'),
            'category' => EditorModule::BLOCK_CATEGORY,
            'icon' => self::ICON,
            'attributes' => $this->attributes(),
        ];
    }
}
