<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Supports;

class MarkerColorSupport
{
    public const KEY = 'marker';
    public const ATTR_COLOR_PRESET = 'markerColor';
    public const ATTR_COLOR_CUSTOM = 'customMarkerColor';
    public const CORE_BLOCKS_WITH_SUPPORT = [
        'core/list',
    ];

    public function boostrap(): void
    {
        // Register attributes necessary
        $this->registerBlockAttributes();

        // Modify block rendering
        add_filter(
            'render_block',
            [$this, 'filterBlockRendering'],
            10,
            2
        );

        // Add support to core blocks
        add_filter(
            'register_block_type_args',
            static function (array $args, string $blockType): array {

                if (!in_array($blockType, self::CORE_BLOCKS_WITH_SUPPORT, true)) {
                    return $args;
                }

                if (!array_key_exists('supports', $args)) {
                    $args['supports'] = [];
                }

                if (!array_key_exists('color', $args['supports'])) {
                    $args['supports']['color'] = [];
                }

                $args['supports']['color'][self::KEY] = true;

                return $args;
            },
            10,
            2
        );
    }

    public function registerBlockAttributes(): void
    {
        // Register the block support.
        // @phpstan-ignore no.private.method
        \WP_Block_Supports::get_instance()->register(
            'markerColor',
            [
                'register_attribute' => static function (\WP_Block_Type $blockType): void {

                    $hasSupport = $blockType->supports['color'][self::KEY] ?? null;

                    if (!$hasSupport) {
                        return;
                    }

                    if (!$blockType->attributes) {
                        $blockType->attributes = [];
                    }

                    if (!array_key_exists('style', $blockType->attributes)) {
                        $blockType->attributes['style'] = ['type' => 'object'];
                    }

                    if (!array_key_exists(self::ATTR_COLOR_PRESET, $blockType->attributes)) {
                        $blockType->attributes['markerColor'] = ['type' => 'string'];
                    }

                    if (!array_key_exists(self::ATTR_COLOR_CUSTOM, $blockType->attributes)) {
                        $blockType->attributes[self::ATTR_COLOR_CUSTOM] = ['type' => 'string'];
                    }
                },
            ]
        );
    }

    public function filterBlockRendering(string $blockContent, array $block): string
    {
        $blockType = \WP_Block_Type_Registry::get_instance()->get_registered($block['blockName']);

        if (is_null($blockType)) {
            return $blockContent;
        }

        $blockAttributes = (array) ($block['attrs'] ?? []);
        $hasSupport = block_has_support($blockType, ['color', self::KEY], false);
        $shouldSkipSerialization = wp_should_skip_block_supports_serialization($blockType, 'color', self::KEY);

        if (!$hasSupport || $shouldSkipSerialization) {
            return $blockContent;
        }

        $colorSlug = self::colorSlugFromAttrs($blockAttributes);
        $colorValue = self::colorValueFromAttrs($blockAttributes);

        if (!$colorSlug || !$colorValue) {
            return $blockContent;
        }

        self::registerCss($colorSlug, $colorValue);

        $tags = new \WP_HTML_Tag_Processor($blockContent);

        if ($tags->next_tag()) {
            $tags->add_class("has-marker-color");
            $tags->add_class("has-$colorSlug-marker-color");
        }

        return $tags->get_updated_html();
    }

    private static function colorSlugFromAttrs(array $attributes): ?string
    {
        if (array_key_exists(self::ATTR_COLOR_PRESET, $attributes)) {
            return $attributes[self::ATTR_COLOR_PRESET];
        }

        return array_key_exists(self::ATTR_COLOR_CUSTOM, $attributes)
            ? $attributes[self::ATTR_COLOR_PRESET]
            : null;
    }

    private static function colorValueFromAttrs(array $attributes): ?string
    {
        if (array_key_exists(self::ATTR_COLOR_PRESET, $attributes)) {
            return "var(--wp--preset--color--{$attributes[self::ATTR_COLOR_PRESET]})";
        }

        return array_key_exists(self::ATTR_COLOR_CUSTOM, $attributes)
            ? $attributes[self::ATTR_COLOR_PRESET]
            : null;
    }

    private static function registerCss(string $colorSlug, string $colorValue): void
    {
        // Add --marker-color variable to the block wrapper context
        wp_style_engine_get_stylesheet_from_css_rules(
            [
                [
                    'selector' => ".has-$colorSlug-marker-color",
                    'declarations' => [
                        '--marker-color' => $colorValue,
                    ],
                ],
            ],
            [
                'context' => 'block-supports',
                'prettify' => false,
            ]
        );

        // Use --marker-color variable to set the color for li::marker
        wp_style_engine_get_stylesheet_from_css_rules(
            [
                [
                    'rules_group' => ".has-$colorSlug-marker-color",
                    'selector' => "::marker",
                    'declarations' => [
                        'color' => 'var(--marker-color)',
                    ],
                ],
            ],
            [
                'context' => 'block-supports',
                'prettify' => false,
            ]
        );
    }
}
