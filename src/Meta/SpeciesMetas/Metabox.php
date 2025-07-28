<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta\SpeciesMetas;

use MetaboxOrchestra\BoxAction;
use MetaboxOrchestra\BoxInfo;
use MetaboxOrchestra\BoxView;
use MetaboxOrchestra\Entity;
use MetaboxOrchestra\TermMetabox;
use WP_Term;

class Metabox implements TermMetabox
{
    public const ASSOC_BACKGROUND_COLOR = 'assoc_background_color';

    // Meta keys
    public const META_KEY_ASSOC_BACKGROUND_COLOR = '_' . self::ASSOC_BACKGROUND_COLOR;

    //
    public const ALLOWED_TAXONOMY = ['species'];

    /**
     * @param string $show_or_save
     * @param Entity $entity
     *
     * @return BoxInfo
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps, Syde.NamingConventions.VariableName.SnakeCaseVar
    public function create_info(string $show_or_save, Entity $entity): BoxInfo
    {
        return new BoxInfo(
            __('Species Details', 'enokh-blocks'),
            'enokh-blocks-species-details',
            BoxInfo::CONTEXT_NORMAL,
            BoxInfo::PRIORITY_HIGH
        );
    }

    /**
     * @param WP_Term $term
     * @param string $save_or_show
     *
     * @return bool
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps, Syde.NamingConventions.VariableName.SnakeCaseVar
    public function accept_term(WP_Term $term, string $save_or_show): bool
    {
        return in_array(
            $term->taxonomy,
            self::ALLOWED_TAXONOMY,
            true
        );
    }

    /**
     * @param WP_Term $term
     *
     * @return BoxView
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function view_for_term(WP_Term $term): BoxView
    {
        return new View($term);
    }

    /**
     * @param WP_Term $term
     *
     * @return BoxAction
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function action_for_term(WP_Term $term): BoxAction
    {
        return new Action($term);
    }
}
