<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta\PostCategory;

use MetaboxOrchestra\AdminNotices;
use MetaboxOrchestra\BoxAction;
use WP_Term;

class Action implements BoxAction
{
    private WP_Term $term;

    /**
     * Action constructor.
     *
     * @param WP_Term $term
     */
    public function __construct(WP_Term $term)
    {
        $this->term = $term;
    }

    /**
     * @param AdminNotices $notices
     *
     * @return bool
     */
    public function save(AdminNotices $notices): bool
    {
        $featuredImageId = filter_input(INPUT_POST, Metabox::FEATURED_IMAGE_ID, FILTER_SANITIZE_NUMBER_INT);

        // MetaboxOrchestra handles this
        // @phpcs:ignore WordPress.Security.NonceVerification.Missing
        $isFeaturedTerm = !empty($_POST[Metabox::IS_FEATURED_TERM]);

        update_term_meta($this->term->term_id, Metabox::META_KEY_FEATURED_IMAGE_ID, $featuredImageId);
        update_term_meta($this->term->term_id, Metabox::META_KEY_IS_FEATURED_TERM, $isFeaturedTerm);

        return true;
    }
}
