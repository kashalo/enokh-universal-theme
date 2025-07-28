<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta;

use Enokh\UniversalTheme\Meta\TermIcon\Metabox;
use WP_Term;

class TermIcon
{
    private ?WP_Term $term;

    /**
     * @param WP_Term $term
     */
    public function __construct(WP_Term $term)
    {
        $this->term = in_array($term->taxonomy, self::allowedTaxonomies(), true) ? $term : null;
    }

    /**
     * @param WP_Term $term
     * @return TermIcon
     */
    public static function fromTerm(WP_Term $term): TermIcon
    {
        return new self($term);
    }

    /**
     * @return string|null
     */
    public function icon(): ?string
    {
        if (!$this->term) {
            return null;
        }

        $value = get_term_meta($this->term->term_id, Metabox::META_KEY_ICON, true);
        return $value ?? null;
    }

    /**
     * @return string|null
     */
    public function iconSet(): ?string
    {
        if (!$this->term) {
            return null;
        }

        $value = get_term_meta($this->term->term_id, Metabox::META_KEY_ICON_SET, true);
        return $value ?? null;
    }

    public static function allowedTaxonomies(): array
    {
        $defaults = ['category', 'species'];
        $taxonomies = get_taxonomies([], 'names');
        return !empty($taxonomies) ? $taxonomies : $defaults;
    }
}
