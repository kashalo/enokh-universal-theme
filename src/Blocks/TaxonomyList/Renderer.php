<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\TaxonomyList;

/**
 * @phpcs:disable Syde.Files.LineLength.TooLong
 */
class Renderer
{
    public function render(array $attributes, string $content, \WP_Block $block): string
    {

        $termQuery = $this->parseTermQuery($attributes, $block);
        $isUseGlobalQuery = !empty($block->context['enokh-blocks/termInheritQuery']);
        $isShowPostCounts = !empty($block->context['enokh-blocks/termShowPostCounts']);

        $content = '';

        /**
         * Archive Template
         */
        if ($isUseGlobalQuery && is_archive() && (is_tax() || is_category())) {
            /** @var \WP_Term $currentTerm */
            $currentTerm = get_queried_object();
            $parentId = $this->termId($currentTerm);
            $termQuery->withParent($parentId);
            $termQuery->withTaxonomy($currentTerm->taxonomy);
        }

        /**
         * Singular Template
         */
        if ($isUseGlobalQuery && is_singular()) {
            $primaryTerm = new \WPSEO_Primary_Term('category', (int) get_the_ID());
            $primaryTermId = $primaryTerm->get_primary_term();
            $term = get_term(intval($primaryTermId));

            if (!($term instanceof \WP_Term)) {
                return $content;
            }

            $parentId = $this->termId($term);
            $termQuery->withParent($parentId);
            $termQuery->withTaxonomy($term->taxonomy);
        }

        $terms = get_terms($termQuery->args());

        /** @var \WP_Term[] $terms */
        foreach ($terms as $term) {
            $innerBlocks = new \WP_Block(
                $block->parsed_block,
                [
                    'termId' => $term->term_id,
                    'taxonomyType' => $term->taxonomy,
                    'termShowPostCounts' => $isShowPostCounts,
                ]
            );
            $blockContent = ($innerBlocks)->render(['dynamic' => false]);

            $content .= $blockContent;
        }

        return $content;
    }

    public function parseTermQuery(array $attributes, \WP_Block $block): TermQuery
    {
        $termQuery = TermQuery::new();
        $queryAttributes = !empty($block->context['enokh-blocks/termQuery'])
            ? $block->context['enokh-blocks/termQuery']
            : [];

        $showEmpty = $queryAttributes['showEmpty'] ?? false;
        $showOnlyTopLevel = $queryAttributes['showOnlyTopLevel'] ?? false;
        $featuredTerm = $queryAttributes['isFeaturedTerm'] ?? null;

        // Push args
        !empty($queryAttributes['taxonomy']) and $termQuery->withTaxonomy($queryAttributes['taxonomy']);
        !empty($queryAttributes['terms_number']) and $termQuery->withNumber($queryAttributes['terms_number']);
        !empty($queryAttributes['offset']) and $termQuery->withOffset($queryAttributes['offset']);
        !empty($queryAttributes['order']) and $termQuery->withOrder($queryAttributes['order']);
        !empty($queryAttributes['orderby']) and $termQuery->withOrderBy($queryAttributes['orderby']);
        !empty($queryAttributes['parent']) and $termQuery->withParent($queryAttributes['parent']);

        $showOnlyTopLevel and $termQuery->withParent(0);

        $showEmpty ? $termQuery->disableHideEmpty() : $termQuery->enableHideEmpty();
        $featuredTerm === 'exclude' and $termQuery->excludeFeatured();
        $featuredTerm === 'only' and $termQuery->onlyFeatured();

        return $termQuery;
    }

    /**
     * @param \WP_Term $term
     * @return int
     */
    private function termId(\WP_Term $term): int
    {

        $children = get_term_children($term->term_id, $term->taxonomy);
        /**
         * If current term has children, uses its ID as parent. If not, uses its parent ID as parent.
         */
        return !empty($children) && !is_wp_error($children)
            ? $term->term_id
            : $term->parent;
    }
}
