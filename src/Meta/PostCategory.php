<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta;

use Enokh\UniversalTheme\Meta\PostCategory\Metabox;
use WP_Term;

class PostCategory
{
    private ?WP_Term $term;

    /**
     * @param WP_Term $term
     */
    public function __construct(WP_Term $term)
    {
        $this->term = in_array($term->taxonomy, Metabox::ALLOWED_TAXONOMY, true) ? $term : null;
    }

    /**
     * @param WP_Term $term
     * @return PostCategory
     */
    public static function fromTerm(WP_Term $term): PostCategory
    {
        return new self($term);
    }

    /**
     * @return int
     */
    public function featuredImage(): int
    {
        if (!$this->term) {
            return 0;
        }

        $featuredImage = get_term_meta($this->term->term_id, Metabox::META_KEY_FEATURED_IMAGE_ID, true);
        return $featuredImage !== '' ? intval($featuredImage) : 0;
    }
}
