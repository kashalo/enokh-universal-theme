<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta;

class ExcludeFromSearch
{
    public const NAME = 'enokh-blocks__exclude-from-search';

    /**
     * @return string
     */
    public function name(): string
    {
        return self::NAME;
    }

    /**
     * @return array
     */
    public function args(): array
    {
        return [
            'type' => 'boolean',
            'single' => true,
            'show_in_rest' => true,
            'auth_callback' => static function (): bool {
                return current_user_can('edit_posts');
            },
        ];
    }

    /**
     * @param \WP_Query $query
     * @return \WP_Query
     */
    public function filter(\WP_Query $query): \WP_Query
    {

        if (is_admin() || !$query->is_search()) {
            return $query;
        }

        $metaQuery = $query->get('meta_query');
        $metaQuery = is_array($metaQuery) ? $metaQuery : [];
        $metaQuery[] = [
            'relation' => 'OR',
            [
                'key' => self::NAME,
                'compare' => 'NOT EXISTS',
            ],
            [
                'key' => self::NAME,
                'value' => '1',
                'compare' => '!=',
            ],
        ];
        $query->set('meta_query', $metaQuery);

        return $query;
    }
}
