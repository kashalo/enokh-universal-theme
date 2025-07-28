<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

use Enokh\UniversalTheme\Meta\PostCategory;
use Enokh\UniversalTheme\Module\EditorModule;
use Enokh\UniversalTheme\Provider\EditorProvider;

class TermFeaturedImageBlock
{
    public const NAME = 'enokh-blocks/term-featured-image';
    public const ICON = 'text';
    public const LOCALIZE_VAR = 'TermFeaturedImageBlock';

    public function __construct()
    {
    }

    public function name(): string
    {
        return self::NAME;
    }

    /**
     * @return array
     */
    public function attributes(): array
    {
        return [];
    }

    public function args(): array
    {
        return [
            'render_callback' => [$this, 'render'],
            'attributes' => $this->attributes(),
        ];
    }

    public function defaults(): array
    {
        return [
            'aspectRatio' => '',
            'width' => '',
            'height' => '',
            'scale' => 'cover',
            'sizeSlug' => '',
            'rel' => '',
        ];
    }

    /**
     * @param array $attrs
     * @param string $content
     * @param \WP_Block $block
     * @return string
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Generic.Metrics.CyclomaticComplexity.TooHigh, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    public function render(array $attrs, string $content, \WP_Block $block): string
    {
        if (!is_category() && !is_tag() && !is_tax()) {
            return '';
        }

        $term = get_queried_object();

        if (!($term instanceof \WP_Term)) {
            return '';
        }

        $postCategory = PostCategory::fromTerm($term);

        if (empty($postCategory->featuredImage())) {
            return '';
        }

        $attrs = wp_parse_args($attrs, $this->defaults());
        $attr = $this->borderAttributes($attrs);
        $featuredImageId = $postCategory->featuredImage();
        $extraStyles = '';

        // Aspect ratio with a height set needs to override the default width/height.
        if (!empty($attrs['aspectRatio'])) {
            $extraStyles .= 'width:100%;height:100%;';
        } elseif (!empty($attrs['height'])) {
            $extraStyles .= "height:{$attrs['height']};";
        }

        if (!empty($attrs['scale'])) {
            $extraStyles .= "object-fit:{$attrs['scale']};";
        }

        if (!empty($extraStyles)) {
            $attr['style'] = empty($attr['style']) ? $extraStyles : $attr['style'] . $extraStyles;
        }

        $featuredImage = wp_get_attachment_image($featuredImageId, 'full', false, $attr);
        if (!$featuredImage) {
            return '';
        }

        /**
         * @psalm-suppress TypeDoesNotContainType
         */
        $aspectRatio = $attrs['aspectRatio'] !== ''
            ? esc_attr(safecss_filter_attr('aspect-ratio:' . $attrs['aspectRatio'])) . ';'
            : '';
        $width = !empty($attrs['width'])
            ? esc_attr(safecss_filter_attr('width:' . $attrs['width'])) . ';'
            : '';
        $height = !empty($attrs['height'])
            ? esc_attr(safecss_filter_attr('height:' . $attrs['height'])) . ';'
            : '';
        $wrapperAttributes = !$height && !$width && !$aspectRatio ? get_block_wrapper_attributes() : get_block_wrapper_attributes(['style' => $aspectRatio . $width . $height]);
        return "<figure {$wrapperAttributes}>{$featuredImage}</figure>";
    }

    public function config(): array
    {
        return [
            'apiVersion' => 2,
            'name' => $this->name(),
            'title' => esc_html__('Enokh Term Featured Image', 'enokh-blocks'),
            'category' => EditorModule::BLOCK_CATEGORY,
            'icon' => self::ICON,
            'attributes' => $this->attributes(),
        ];
    }

    public function borderAttributes(array $attributes): array
    {
        $borderStyles = [];
        $sides = ['top', 'right', 'bottom', 'left'];

        // Border radius.
        if (isset($attributes['style']['border']['radius'])) {
            $borderStyles['radius'] = $attributes['style']['border']['radius'];
        }

        // Border style.
        if (isset($attributes['style']['border']['style'])) {
            $borderStyles['style'] = $attributes['style']['border']['style'];
        }

        // Border width.
        if (isset($attributes['style']['border']['width'])) {
            $borderStyles['width'] = $attributes['style']['border']['width'];
        }

        // Border color.
        $presetColor = array_key_exists(
            'borderColor',
            $attributes
        ) ? "var:preset|color|{$attributes['borderColor']}" : null;
        $customColor = $attributes['style']['border']['color'] ?? null;
        $borderStyles['color'] = $presetColor ? $presetColor : $customColor;

        // Individual border styles e.g. top, left etc.
        foreach ($sides as $side) {
            $border = $attributes['style']['border'][$side] ?? [];
            $borderStyles[$side] = [
                'color' => $border['color'] ?? null,
                'style' => $border['style'] ?? null,
                'width' => $border['width'] ?? null,
            ];
        }

        $styles = wp_style_engine_get_styles(['border' => $borderStyles]);
        $attributes = [];
        if (!empty($styles['classnames'])) {
            $attributes['class'] = $styles['classnames'];
        }
        if (!empty($styles['css'])) {
            $attributes['style'] = $styles['css'];
        }
        return $attributes;
    }

    // @phpcs:enable Syde.Functions.FunctionLength.TooLong, Generic.Metrics.CyclomaticComplexity.TooHigh
}
