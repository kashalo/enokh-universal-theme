<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta\TermIcon;

use Enokh\UniversalTheme\Meta\TermIcon;
use MetaboxOrchestra\BoxAction;
use MetaboxOrchestra\BoxInfo;
use MetaboxOrchestra\BoxView;
use MetaboxOrchestra\Entity;
use MetaboxOrchestra\TermMetabox;
use WP_Term;

class Metabox implements TermMetabox
{
    public const ICON = 'icon';
    public const ICON_SET = 'icon_set';

    // Meta keys
    public const META_KEY_ICON = '_' . self::ICON;
    public const META_KEY_ICON_SET = '_' . self::ICON_SET;

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
            __('Icon', 'enokh-blocks'),
            'enokh-blocks-admin-term-icon',
            BoxInfo::CONTEXT_SIDE,
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
        $taxonomies = TermIcon::allowedTaxonomies();
        return in_array(
            $term->taxonomy,
            $taxonomies,
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
