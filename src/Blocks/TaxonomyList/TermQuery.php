<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\TaxonomyList;

use Enokh\UniversalTheme\Meta\PostCategory\Metabox;

class TermQuery
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

    public function withTaxonomy(string $taxonomy): self
    {
        $this->args['taxonomy'] = $taxonomy;

        return $this;
    }

    public function withOrderBy(string $orderBy): self
    {
        $this->args['orderby'] = $orderBy;

        return $this;
    }

    public function withOrder(string $order): self
    {
        $this->args['order'] = $order;

        return $this;
    }

    public function enableHideEmpty(): self
    {
        $this->args['hide_empty'] = true;
        return $this;
    }

    public function disableHideEmpty(): self
    {
        $this->args['hide_empty'] = false;
        return $this;
    }

    public function withExclude(array $ids): self
    {
        $this->args['exclude'] = $ids;
        return $this;
    }

    public function withNumber(int|string $number): self
    {
        $this->args['number'] = $number;
        return $this;
    }

    public function withOffset(int $offset): self
    {
        $this->args['offet'] = $offset;
        return $this;
    }

    public function withParent(int $parent): self
    {
        $this->args['parent'] = $parent;
        return $this;
    }

    public function withMetaKey(string $metaKey): self
    {
        $this->args['meta_key'] = $metaKey;
        return $this;
    }

    public function withMetaValue(mixed $metaValue): self
    {
        $this->args['meta_value'] = $metaValue;
        return $this;
    }

    public function onlyFeatured(): self
    {
        $this->withMetaKey(Metabox::META_KEY_IS_FEATURED_TERM);
        $this->withMetaValue(1);
        return $this;
    }

    public function excludeFeatured(): self
    {
        $newArgs = $this->args();
        $newArgs['meta_key'] = Metabox::META_KEY_IS_FEATURED_TERM;
        $newArgs['meta_value'] = true;
        $newArgs['fields'] = 'ids';
        $ids = get_terms($newArgs);
        /** Exclude featured items */
        !empty($ids) and $this->withExclude($ids);

        return $this;
    }

    /**
     * @return array
     */
    public function args(): array
    {
        return $this->args;
    }

    public function withArgs(array $args): self
    {
        $this->args = $args;
        return $this;
    }
}
