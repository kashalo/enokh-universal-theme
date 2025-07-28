<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Utility;

use Enokh\UniversalTheme\Blocks\QueryLoopBlockQuery;

class DynamicContentUtility
{
    /**
     * @param array $attrs
     * @param \WP_Block $block
     * @return string
     * @phpcs:disable
     */
    public function dynamicUrl(array $attrs, \WP_Block $block): string
    {
        $id = $this->selectedPostId($attrs);
        $linkType = $attrs['dynamicLinkType'] ?? '';
        $url = '';

        if ('single-post' === $linkType) {
            $url = (string)get_permalink($id);
        }

        if ('term-archive' === $linkType) {
            $termId = $block->context['termId'] ?? 0;
            $url = (string)get_term_link($termId);
        }

        if ('pagination-next' === $linkType) {
            $pageKey = $this->pageKey($block);
            $page = $this->pageQuery($block);
            $maxPage = isset($block->context['enokh-blocks/query']['pages']) ?
                (int)$block->context['enokh-blocks/query']['pages'] :
                0;

            /**
             * @psalm-suppress InvalidGlobal
             */
            global $wp_query;

            $query = $this->setupQuery($block);
            $queryArgs = $query->args();

            $isUseGlobalQuery = (
                isset($block->context['enokh-blocks/inheritQuery']) &&
                $block->context['enokh-blocks/inheritQuery']
            );
            // Global query
            if ($isUseGlobalQuery && $wp_query && isset($wp_query->query_vars) && is_array($wp_query->query_vars)) {
                $query->unsetOffset();
                $query->withArgs(wp_parse_args($queryArgs, $wp_query->query_vars));

                if (empty($queryArgs['post_type']) && is_singular()) {
                    $query->withPostType((string)get_post_type((int)get_the_ID()));
                }
            }

            $customQuery = new \WP_Query($query->args());
            $customQueryMaxPages = intval($customQuery->max_num_pages);

            if ($customQueryMaxPages && $customQueryMaxPages !== $page) {
                $url = esc_url(add_query_arg($pageKey, $page + 1));
            }

            wp_reset_postdata();

        }

        if ('pagination-prev' === $linkType) {
            $pageKey = $this->pageKey($block);
            $page = $this->pageQuery($block);

            if (1 !== $page) {
                $url = esc_url(add_query_arg($pageKey, $page - 1));
            }
        }

        if ($linkType === 'send-email') {
            $postTitle = $this->postTitleContent($attrs);
            $permalink = (string)get_the_permalink($id);
            $url = sprintf('mailto:?subject=%s&body=%s', rawurlencode($postTitle), urlencode($permalink));
        }

        if ($linkType === 'facebook') {
            $permalink = (string)get_the_permalink($id);
            $url = sprintf('https://www.facebook.com/sharer.php?u=%s', urlencode($permalink));
        }

        if ($linkType === 'x') {
            $permalink = (string)get_the_permalink($id);
            $url = sprintf("https://twitter.com/intent/tweet?url=%s", urlencode($permalink));
        }

        if ($linkType === 'pinterest') {
            $permalink = (string)get_the_permalink($id);
            $url = sprintf("https://pinterest.com/pin/create/button/?url=%s", urlencode($permalink));
        }

        if ($linkType === 'line') {
            $permalink = (string)get_the_permalink($id);
            $url = sprintf("https://social-plugins.line.me/lineit/share?url=%s", urlencode($permalink));
        }

        if ($linkType === 'linkedIn') {
            $permalink = (string)get_the_permalink($id);
            $url = sprintf("https://www.linkedin.com/sharing/share-offsite/?url=%s", urlencode($permalink));
        }

        if ($linkType === 'reddit') {
            $postTitle = $this->postTitleContent($attrs);
            $permalink = (string)get_the_permalink($id);
            $url = sprintf("https://reddit.com/submit?url=%s&title=%s", urlencode($permalink), urlencode($postTitle));
        }

        if ($linkType === 'whatsapp') {
            $postTitle = $this->postTitleContent($attrs);
            $permalink = (string)get_the_permalink($id);
            $url = "https://api.whatsapp.com/send?phone=&text=".urlencode($postTitle)."%20".urlencode($permalink);
        }

        if ($linkType === 'copy-link' || $linkType === 'print') {
            $permalink = (string)get_the_permalink($id);
            $url = $permalink;
        }

        return $url;
    }

    // @phpcs:enable

    public function selectedPostId(array $attrs): int
    {
        return isset($attrs['dynamicSource'], $attrs['postId']) &&
        $attrs['dynamicSource'] !== 'current-post'
            ? absint($attrs['postId'])
            : (int) get_the_ID();
    }

    public function findDynamicContent(array $attrs, \WP_Block $block): string|array
    {

        if ($attrs['dynamicContentType'] === 'post-title') {
            return $this->postTitleContent($attrs);
        }

        if ($attrs['dynamicContentType'] === 'post-excerpt') {
            return $this->postExcerptContent($attrs);
        }

        if ($attrs['dynamicContentType'] === 'post-date') {
            return $this->postDateContent($attrs);
        }

        if ($attrs['dynamicContentType'] === 'pagination-numbers') {
            return $this->paginationLinks($attrs, $block);
        }

        if ($attrs['dynamicContentType'] === 'primary-term') {
            return $this->postPrimaryCategory($attrs);
        }

        if ($attrs['dynamicContentType'] === 'species-term') {
            return $this->postSpeciesTerm($attrs);
        }

        if ($attrs['dynamicContentType'] === 'estimated-reading-time') {
            return $this->postEstimatedReadingTime($attrs);
        }

        if ($attrs['dynamicContentType'] === 'term-title') {
            return $this->termTitle($attrs, $block);
        }

        if ($attrs['dynamicContentType'] === 'term-description') {
            return $this->termDescription($attrs, $block);
        }

        return '';
    }

    public function postTitleContent(array $attrs): string
    {
        return get_the_title($this->selectedPostId($attrs));
    }

    private function postExcerptContent(array $attrs): string
    {
        $excerptLength = static function (int $length) use ($attrs): int {
            return $attrs['excerptLength'] ?? $length;
        };

        // Add filter
        add_filter(
            'excerpt_length',
            $excerptLength,
            100
        );

        $excerpt = get_the_excerpt($this->selectedPostId($attrs));

        // Remove filter to reset to default excerpt length
        remove_filter(
            'excerpt_length',
            $excerptLength,
            100
        );

        return $excerpt;
    }

    private function postDateContent(array $attrs): string
    {
        return (string) get_the_date('', $this->selectedPostId($attrs));
    }

    /**
     * @param array $attrs
     * @param \WP_Block $block
     * @return array
     * @phpcs:disable Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, Syde.Functions.FunctionLength.TooLong, WordPress.Security.NonceVerification.Recommended, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    private function paginationLinks(array $attrs, \WP_Block $block): array
    {

        $pageKey = $this->pageKey($block);
        $page = $this->pageQuery($block);
        $maxPage = isset($block->context['enokh-blocks/query']['pages'])
            ? (int) $block->context['enokh-blocks/query']['pages']
            : 0;

        /**
         * @psalm-suppress InvalidGlobal
         */
        global $wp_query;

        $query = $this->setupQuery($block);
        $queryArgs = $query->args();
        $isUseGlobalQuery = (
            isset($block->context['enokh-blocks/inheritQuery']) &&
            $block->context['enokh-blocks/inheritQuery']
        );
        // Global query
        if ($isUseGlobalQuery && $wp_query && isset($wp_query->query_vars) && is_array($wp_query->query_vars)) {
            $query->unsetOffset();
            $query->withArgs(wp_parse_args($queryArgs, $wp_query->query_vars));

            if (empty($queryArgs['post_type']) && is_singular()) {
                $query->withPostType((string) get_post_type((int) get_the_ID()));
            }
        }

        $blockQuery = new \WP_Query($query->args());

        // Switch to custom query
        $prevWpQuery = $wp_query;
        $wp_query = $blockQuery;
        $total = intval(!$maxPage || $maxPage > $wp_query->max_num_pages ? $wp_query->max_num_pages : $maxPage);

        $paginateArgs = [
            'base' => '%_%',
            'format' => "?$pageKey=%#%",
            'current' => max(1, $page),
            'total' => $total,
            'prev_next' => false,
        ];

        /**
         * @see https://core.trac.wordpress.org/ticket/53868
         * Need this to prevent page 1 from being just a text
         */
        if ($page !== 1) {
            $paginateArgs['add_args'] = ['arg' => ''];
        }

        $paged = intval(empty($_GET['paged']) ? null : $_GET['paged']);

        if ($paged) {
            $paginateArgs['add_args'] = ['paged' => $paged];
        }

        $links = paginate_links($paginateArgs);
        $wp_query = $prevWpQuery;
        wp_reset_postdata();

        if (empty($links)) {
            return [];
        }

        $doc = $this->loadHtml($links);

        if (!$doc) {
            return [];
        }

        $data = [];
        $htmlNodes = $doc->getElementsByTagName('*');

        foreach ($htmlNodes as $index => $node) {
            $classes = $node->getAttribute('class') ? $node->getAttribute('class') : '';

            if ($node->getAttribute('aria-current')) {
                $classes = str_replace('current', 'enokh-blocks-block-is-current', $classes);
            }

            if ($node->tagName === 'span' || $node->tagName === 'a') {
                $data[$index]['href'] = $node->getAttribute('href')
                    ? $node->getAttribute('href')
                    : '';
                $data[$index]['aria-current'] = $node->getAttribute('aria-current')
                    ? $node->getAttribute('aria-current')
                    : '';
                $data[$index]['class'] = $classes;

                foreach ($node->childNodes as $childNode) {
                    $data[$index]['content'] = $doc->saveHTML($childNode);
                }
            }
        }

        $paginateLnks = array_values($data);
        $linkItems = [];

        foreach ($paginateLnks as $index => $link) {
            $ariaLabel = is_numeric($link['content'] ?? '')
                ? sprintf("%s %d", __('Page', 'enokh-blocks'), $link['content'] ?? '')
                : __('ellipsis', 'enokh-blocks');
            $linkItems[$index] = [
                'content' => $link['content'] ?? '',
                'attributes' => [
                    'href' => $link['href'] ?? '',
                    'aria-current' => $link['aria-current'] ?? '',
                    'class' => $link['class'] ?? '',
                    'aria-label' => $ariaLabel,
                ],
            ];
        }

        if (empty($linkItems)) {
            return [];
        }

        return $linkItems;
    }

    // @phpcs:enable Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, Syde.Functions.FunctionLength.TooLong, WordPress.Security.NonceVerification.Recommended, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh

    /**
     * @param string|string[] $content
     * @return \DOMDocument|null
     */
    public function loadHtml(mixed $content): ?\DOMDocument
    {

        if (!class_exists('DOMDocument')) {
            return null;
        }

        $content = is_array($content) ? implode('', $content) : $content;
        $doc = new \DOMDocument();

        libxml_use_internal_errors(true);
        $doc->loadHTML(
            sprintf(
                '<html><head><meta http-equiv="Content-Type" content="text/html; charset=%s"></head><body>%s</body></html>', // @phpcs:ignore Syde.Files.LineLength.TooLong
                esc_attr(get_bloginfo('charset')),
                $content
            )
        );
        libxml_use_internal_errors(false);

        return $doc;
    }

    public function setupQuery(\WP_Block $block): QueryLoopBlockQuery // @phpcs:ignore Generic.Metrics.CyclomaticComplexity.TooHigh, Syde.Functions.FunctionLength.TooLong
    {

        $query = QueryLoopBlockQuery::new();
        $pageKey = $this->pageKey($block);
        $page = $this->pageQuery($block);
        $queryAttributes = !empty($block->context['enokh-blocks/query'])
            ? $block->context['enokh-blocks/query']
            : [];
        $queryAttributes['paged'] = $page;
        $query = $query->withPage($queryAttributes['paged']);

        // Tax Query Exclude Tax Query
        $termArgs = $this->termQueryArgs($queryAttributes);
        $excludeTermArgs = $this->excludeTermQueryArgs($queryAttributes);
        $taxomonies = !empty($termArgs)
            ? array_merge($termArgs, $excludeTermArgs)
            : $excludeTermArgs;
        !empty($taxomonies) and $query->withTaxQuery($taxomonies);

        // Dates Query
        $dateArgs = $this->dateQueryArgs($queryAttributes);
        $dateArgs and $query->withDateQuery($dateArgs);

        // @phpcs:disable Syde.Files.LineLength.TooLong
        !empty($queryAttributes['post_type']) and $query->withPostType($queryAttributes['post_type']);
        !empty($queryAttributes['per_page']) and $query->withPerPage(intval($queryAttributes['per_page']));
        !empty($queryAttributes['search']) and $query->withSearchTerm($queryAttributes['search']);
        !empty($queryAttributes['order']) and $query->withOrder($queryAttributes['order']);
        !empty($queryAttributes['orderby']) and $query->withOrderBy($queryAttributes['orderby']);
        !empty($queryAttributes['status']) and $query->withPostStatus($queryAttributes['status']);
        !empty($queryAttributes['author']) and $query->withAuthorIn($queryAttributes['author']);
        !empty($queryAttributes['author_exclude']) and $query->withAuthorNotIn($queryAttributes['author_exclude']);
        !empty($queryAttributes['exclude']) and $query->withPostNotIn($queryAttributes['exclude']);
        !empty($queryAttributes['include']) and $query->withPostIn($queryAttributes['include']);
        !empty($queryAttributes['parent']) and $query->withPostParentIn($queryAttributes['parent']);
        !empty($queryAttributes['parent_exclude']) and $query->withPostParentNotIn($queryAttributes['parent_exclude']);
        // @phpcs:enable

        // Offset
        if (!empty($queryAttributes['per_page'])) {
            $offset = !empty($queryAttributes['offset']) ? absint($queryAttributes['offset']) : 0;
            $offset = ($queryAttributes['per_page'] * ($page - 1)) + $offset;
            $query->withOffset($offset);
        }

        // Sticky posts
        $stickyPosts = !empty($queryAttributes['stickyPosts'])
            ? $queryAttributes['stickyPosts']
            : '';
        if ($stickyPosts === 'ignore') {
            $query->ignoreStickyPosts();
        }
        if ($stickyPosts === 'exclude') {
            $query->excludeStickyPosts($queryAttributes);
        }
        if ($stickyPosts === 'only') {
            $query->onlyStickyPosts($queryAttributes);
        }

        // Always exclude the current post
        if (is_singular()) {
            $query->excludeCurrentPost($queryAttributes);
        }

        return $query;
    }

    private function termQueryArgs(array $args): array
    {
        if (empty($args['tax_query'])) {
            return [];
        }

        return array_map(
            static function (array $taxonomy): array {
                return [
                    'taxonomy' => $taxonomy['taxonomy'],
                    'field' => 'term_id',
                    'terms' => $taxonomy['terms'],
                    'operator' => 'IN',
                    'include_children' => $taxonomy['includeChildren'] ?? true,
                ];
            },
            $args['tax_query']
        );
    }

    private function dateQueryArgs(array $args): array
    {
        $before = $args['date_query_before'] ?? null;
        $after = $args['date_query_after'] ?? null;

        $dates = [
            'before' => $before,
            'after' => $after,
            'inclusive' => ($before || $after) ? true : null,
        ];

        return array_filter($dates);
    }

    private function excludeTermQueryArgs(array $queryAttributes): array
    {
        if (empty($queryAttributes['tax_query_exclude'])) {
            return [];
        }

        return array_map(
            static function (array $taxonomy): array {
                return [
                    'taxonomy' => $taxonomy['taxonomy'],
                    'field' => 'term_id',
                    'terms' => $taxonomy['terms'],
                    'operator' => 'NOT IN',
                    'include_children' => $taxonomy['includeChildren'] ?? true,
                ];
            },
            $queryAttributes['tax_query_exclude']
        );
    }

    public function filterRenderedBlocks(string $blockContent, array $block, \WP_Block $instance): string
    {

        $attributes = $block['attrs'] ?? [];

        if (
            empty($attributes) ||
            !is_array($attributes) ||
            empty($attributes['dynamicLinkType']) ||
            empty($attributes['dynamicLinkRemoveIfEmpty'])
        ) {
            return $blockContent;
        }

        $dynamicLink = $this->dynamicUrl($attributes, $instance);

        if (!$dynamicLink) {
            return '';
        }

        return $blockContent;
    }

    private function pageKey(\WP_Block $block): string
    {

        return isset($block->context['enokh-blocks/queryId'])
            ? sprintf("query-%s-page", $block->context['enokh-blocks/queryId'])
            : 'query-page';
    }

    private function pageQuery(\WP_Block $block): int
    {
        $pageKey = $this->pageKey($block);
        return intval($_GET[$pageKey] ?? 1); // @phpcs:ignore WordPress.Security.NonceVerification.Recommended
    }

    private function postPrimaryCategory(array $attrs): string
    {
        $primaryTerm = new \WPSEO_Primary_Term('category', $this->selectedPostId($attrs));
        $primaryTermId = $primaryTerm->get_primary_term();
        if (empty($primaryTermId) || !is_int($primaryTermId)) {
            return '';
        }
        $term = get_term($primaryTermId);
        return ($term instanceof \WP_Term) ? $term->name : '';
    }

    private function postEstimatedReadingTime(array $attrs): string
    {
        $content = get_the_content(null, false, $this->selectedPostId($attrs));
        $estimatedReadingTime = $attrs['estimatedReadingTime'] ?? [];
        $descriptiveText = $estimatedReadingTime['descriptiveText'] ?? '';
        $postFix = $estimatedReadingTime['postFix'] ?? '';
        $wordsPerMin = intval($estimatedReadingTime['wordsPerMin'] ?? 300);

        // Calculate estimated reading time
        $word = str_word_count(wp_strip_all_tags($content));
        $minutes = ceil($word / $wordsPerMin);

        return sprintf(
            "%s %d %s",
            $descriptiveText,
            $minutes,
            $postFix
        );
    }

    public function parsedAriaLabel(array $attrs, string $ariaLabel): string
    {
        $postId = $this->selectedPostId($attrs);
        $postTitle = get_the_title($postId);
        $placeholders = ['{post_id}', '{post_title}'];
        $replacements = [(string) $postId, $postTitle];

        return str_replace($placeholders, $replacements, $ariaLabel);
    }

    private function termTitle(array $attrs, \WP_Block $block): string
    {
        $termId = $block->context['termId'] ?? 0;
        $taxonomy = $block->context['taxonomyType'] ?? '';
        $isShowPostCounts = !empty($block->context['termShowPostCounts']);

        $term = get_term($termId, $taxonomy);

        if (is_wp_error($term)) {
            return '';
        }

        return $isShowPostCounts ? sprintf("%s (%d)", $term->name, $term->count) : $term->name;
    }

    private function termDescription(array $attrs, \WP_Block $block): string
    {
        $termId = $block->context['termId'] ?? 0;
        $taxonomy = $block->context['taxonomyType'] ?? '';

        $term = get_term($termId, $taxonomy);

        return !is_wp_error($term) ? $term->description : '';
    }

    private function postSpeciesTerm(array $attrs): string
    {
        $postId = $this->selectedPostId($attrs);
        $speciesList = get_the_terms($postId, 'species');

        if (empty($speciesList) || is_wp_error($speciesList)) {
            return __('No species', 'enokh-blocks');
        }

        /** @var \WP_Term $term */
        $term = array_pop($speciesList);

        return $term->name;
    }
}
