<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

class QueryLoopBlockQuery
{
    /**
     * @var array<string, mixed>
     */
    private array $args = [];

    public static function new(): self
    {
        return new self();
    }

    private function __construct()
    {
    }

    public function withPage(int $page): self
    {
        $this->args['paged'] = $page;

        return $this;
    }

    public function withTaxQuery(array $taxQuery): self
    {

        $this->args['tax_query'] = $taxQuery;
        return $this;
    }

    public function withDateQuery(array $dateArgs): self
    {
        $this->args['date_query'] = $dateArgs;
        return $this;
    }

    public function args(): array
    {
        return $this->args;
    }

    public function unsetOffset(): self
    {
        if (empty($this->args['offset'])) {
            return $this;
        }

        unset($this->args['offset']);
        return $this;
    }

    public function withPostType(string $postType): self
    {
        $this->args['post_type'] = $postType;
        return $this;
    }

    public function withPerPage(int $perPage): self
    {

        $this->args['posts_per_page'] = $perPage;
        return $this;
    }

    public function withSearchTerm(string $search): self
    {
        $this->args['s'] = $search;
        return $this;
    }

    public function withOrder(string $order): self
    {
        $this->args['order'] = $order;
        return $this;
    }

    public function withOrderBy(string $orderby): self
    {
        $this->args['orderby'] = $orderby;
        return $this;
    }

    public function withPostStatus(array $status): self
    {
        $this->args['post_status'] = $status;
        return $this;
    }

    public function withOffset(int|float $offset): self
    {
        $this->args['offset'] = absint($offset);
        return $this;
    }

    public function withPostNotIn(array $posts): self
    {
        $this->args['post__not_in'] = $posts;
        return $this;
    }

    public function withPostIn(array $posts): self
    {
        $this->args['post__in'] = $posts;
        return $this;
    }

    public function withPostParentIn(array $posts): self
    {
        $this->args['post_parent__in'] = $posts;
        return $this;
    }

    public function withPostParentNotIn(array $posts): self
    {
        $this->args['post_parent__not_in'] = $posts;
        return $this;
    }

    public function withAuthorIn(array $authors): self
    {
        $this->args['author__in'] = $authors;
        return $this;
    }

    public function withAuthorNotIn(array $authors): self
    {
        $this->args['author__not_in'] = $authors;
        return $this;
    }

    public function ignoreStickyPosts(): self
    {
        if (empty($this->args['ignore_sticky_posts'])) {
            return $this;
        }

        unset($this->args['ignore_sticky_posts']);
        return $this;
    }

    public function excludeStickyPosts(array $args): self
    {
        $stickyPosts = get_option('sticky_posts');
        $postNotIn = isset($args['exclude']) && is_array($args['exclude']) ? $args['exclude'] : [];
        $this->args['post__not_in'] = array_merge($stickyPosts, $postNotIn);

        return $this;
    }

    public function onlyStickyPosts(array $args): self
    {
        $stickyPosts = get_option('sticky_posts');
        $this->args['ignore_sticky_posts'] = true;
        // Want nothing to be display of no stickies
        $this->args['post__in'] = !empty($stickyPosts) ? $stickyPosts : [-1];

        return $this;
    }

    public function withArgs(array $args): self
    {
        $this->args = $args;
        return $this;
    }

    public function unsetPostType(): self
    {
        if (empty($this->args['post_type'])) {
            return $this;
        }

        unset($this->args['post_type']);
        return $this;
    }

    public function unsetName(): self
    {
        if (empty($this->args['name'])) {
            return $this;
        }

        unset($this->args['name']);
        return $this;
    }

    public function excludeCurrentPost(array $args): self
    {
        $currentPostId = get_the_ID();
        if (empty($currentPostId)) {
            return $this;
        }

        $postNotIn = isset($args['exclude']) && is_array($args['exclude']) ? $args['exclude'] : [];
        $this->args['post__not_in'] = array_merge([$currentPostId], $postNotIn);

        return $this;
    }
}
