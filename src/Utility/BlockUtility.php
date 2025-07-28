<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Utility;

use Enokh\UniversalTheme\Style\InlineCssGenerator;

class BlockUtility
{
    /**
     * @param string $context
     * @param array $attributes
     * @param array $settings
     * @param \WP_Block|null $block
     * @return string
     */
    public function attribute(
        string $context,
        array $attributes = [],
        array $settings = [],
        mixed $block = null
    ): string {

        $attributes = $this->parseAttribute($context, $attributes, $settings, $block);

        $output = '';

        foreach ($attributes as $key => $value) {
            if (!$value && $value !== '0') {
                continue;
            }

            $output .= $value === true
                ? esc_html($key) . ' '
                : sprintf('%s="%s" ', esc_html($key), esc_attr($value));
        }

        return trim($output);
    }

    /**
     * @param string $context
     * @param array $attributes
     * @param array $settings
     * @param mixed|null $block
     * @return array
     */
    public function parseAttribute(
        string $context,
        array $attributes = [],
        array $settings = [],
        mixed $block = null
    ): array {

        $defaults = [
            'class' => sanitize_html_class($context),
        ];

        return wp_parse_args($attributes, $defaults);
    }

    /**
     * @param string $content
     * @param string $blockName
     * @return array
     */
    public function parseBlocks(string $content, string $blockName): array
    {

        $blocks = parse_blocks($content);
        $flattedBlocks = _flatten_blocks($blocks);
        $validBlocks = [];

        if (empty($flattedBlocks)) {
            return $validBlocks;
        }

        foreach ($flattedBlocks as $flattedBlock) {
            if ($flattedBlock['blockName'] !== $blockName) {
                continue;
            }

            $validBlocks[] = $flattedBlock;
        }

        return $validBlocks;
    }

    /**
     * @param string $name
     * @param array $attributes
     * @param string $device
     * @param null|string $fallback
     *
     * @return mixed
     */
    public function attributeResponsiveValue(string $name, array $attributes, string $device, string|null $fallback = null): mixed
    {

        $actualName = $device === 'Desktop' ? $name : $name . $device;

        // Return immediately if has value
        if (
            isset($attributes[$actualName]) &&
            $attributes[$actualName] !== '' &&
            $attributes[$actualName] !== false
        ) {
            return $attributes[$actualName];
        }

        // Make sure this is the desktop value.
        $name = str_replace(['Tablet', 'Mobile'], '', $name);

        $responsiveValue = $attributes[$name] ?? null;

        if ($device === 'Mobile' && !empty($attributes[$name . 'Tablet'])) {
            $responsiveValue = $attributes[$name . 'Tablet'];
        }

        if ($responsiveValue === '' || $responsiveValue === false || $responsiveValue === null) {
            $responsiveValue = $fallback;
        }

        return $responsiveValue;
    }

    /**
     * @return string
     */
    public function cssHookName(): string
    {
        return !did_action('wp_head')
            ? InlineCssGenerator::INLINE_FILTER_HOOK
            : InlineCssGenerator::INLINE_LATE_FILTER_HOOK;
    }
}
