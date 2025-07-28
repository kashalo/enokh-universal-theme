<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta;

use Enokh\UniversalTheme\Meta\SpeciesMetas\Metabox;
use WP_Term;

class SpeciesMetas
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
     * @return SpeciesMetas
     */
    public static function fromTerm(WP_Term $term): SpeciesMetas
    {
        return new self($term);
    }

    public function assocBackgroundColor(): ?string
    {
        if (!$this->term) {
            return null;
        }

        $assocBackgroundColor = get_term_meta($this->term->term_id, Metabox::META_KEY_ASSOC_BACKGROUND_COLOR, true);
        return $assocBackgroundColor !== '#000000' ? $assocBackgroundColor : null;
    }
}
