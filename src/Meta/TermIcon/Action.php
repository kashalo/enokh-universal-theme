<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta\TermIcon;

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
        $icon = filter_input(INPUT_POST, Metabox::ICON, FILTER_SANITIZE_URL);
        $iconSet = filter_input(
            INPUT_POST,
            Metabox::ICON_SET,
            FILTER_CALLBACK,
            [
                'options' => 'sanitize_text_field',
            ]
        );

        update_term_meta($this->term->term_id, Metabox::META_KEY_ICON, $icon);
        update_term_meta($this->term->term_id, Metabox::META_KEY_ICON_SET, $iconSet);

        return true;
    }
}
