<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Style;

use Enokh\UniversalTheme\Meta\SpeciesMetas;

class InlineCssGenerator
{
    public const ATTR_MAIN_KEY = 'main';
    public const ATTR_DESKTOP_KEY = 'desktop';
    public const ATTR_TABLET_KEY = 'tablet';
    public const ATTR_TABLET_ONLY_KEY = 'tablet-only';
    public const ATTR_MOBILE_KEY = 'mobile';
    public const MEDIA_QUERY_ORDER = [
        self::ATTR_MAIN_KEY,
        self::ATTR_DESKTOP_KEY,
        self::ATTR_TABLET_KEY,
        self::ATTR_TABLET_ONLY_KEY,
        self::ATTR_MOBILE_KEY,
    ];
    public const INLINE_FILTER_HOOK = 'enokh-blocks_css_inline';
    public const INLINE_LATE_FILTER_HOOK = 'enokh-blocks_css_inline_late';

    /**
     * @var array<string, mixed>
     */
    protected array $data = [
        self::ATTR_MAIN_KEY => [],
        self::ATTR_DESKTOP_KEY => [],
    ];

    public function __construct()
    {
    }

    public function new(): self
    {
        return new self();
    }

    /**
     * @param string $key
     * @param string $selector
     * @return $this
     */
    public function withSelector(string $key, string $selector): self
    {
        if (empty($selector)) {
            return $this;
        }

        $this->data[$key][$selector] = [];
        return $this;
    }

    /**
     * @param string $key
     * @param string $selector
     * @param string $property
     * @param mixed $value
     * @param string $unit
     * @return $this
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    public function withProperty(
        string $key,
        string $selector,
        string $property,
        mixed $value,
        string $unit = ''
    ): self {

        if (empty($value) && !is_numeric($value)) {
            return $this;
        }

        if (
            is_array($value) &&
            !array_filter(
                $value,
                static function (mixed $filteringValue): bool {
                    return is_numeric($filteringValue) || $filteringValue;
                }
            )
        ) {
            return $this;
        }

        $key = strtolower($key);
        if (empty($this->data[$key][$selector])) {
            $this->data[$key][$selector] = [];
        }

        if (is_array($value)) {
            $valueTop = $this->hasNumber($value[0]);
            $valueRight = $this->hasNumber($value[1]);
            $valueBottom = $this->hasNumber($value[2]);
            $valueLeft = $this->hasNumber($value[3]);

            if ($valueTop && $valueRight && $valueBottom && $valueLeft) {
                $value = $this->makeShorthand($value[0], $value[1], $value[2], $value[3], $unit);

                if ($property === 'border-width') {
                    $this->data[$key][$selector][] = 'border-style: solid;';
                }

                $this->data[$key][$selector][] = sprintf("%s: %s;", $property, $value);
                return $this;
            }

            if ($valueTop) {
                $propertyTop = $property . '-top';
                $unitTop = $unit;

                if ($property === 'border-radius') {
                    $propertyTop = 'border-top-left-radius';
                } elseif ($property === 'border-width') {
                    $propertyTop = 'border-top-width';
                    $this->data[$key][$selector][] = 'border-top-style: solid;';
                }

                if (!is_numeric($value[0]) || $value[0] === 0 || (string) $value[0] === '0') {
                    $unitTop = '';
                }

                $this->data[$key][$selector][] = sprintf(
                    "%s: %s%s;",
                    $propertyTop,
                    $value[0],
                    $unitTop
                );
            }

            if ($valueRight) {
                $propertyRight = $property . '-right';
                $unitRight = $unit;

                if ($property === 'border-radius') {
                    $propertyRight = 'border-top-right-radius';
                } elseif ($property === 'border-width') {
                    $propertyRight = 'border-right-width';
                    $this->data[$key][$selector][] = 'border-right-style: solid;';
                }

                if (!is_numeric($value[1]) || $value[1] === 0 || (string) $value[1] === '0') {
                    $unitRight = '';
                }

                $this->data[$key][$selector][] = sprintf(
                    "%s: %s%s;",
                    $propertyRight,
                    $value[1],
                    $unitRight
                );
            }

            if ($valueBottom) {
                $propertyBottom = $property . '-bottom';
                $unitBottom = $unit;

                if ($property === 'border-radius') {
                    $propertyBottom = 'border-bottom-right-radius';
                } elseif ($property === 'border-width') {
                    $propertyBottom = 'border-bottom-width';
                    $this->data[$key][$selector][] = 'border-bottom-style: solid;';
                }

                if (!is_numeric($value[2]) || $value[2] === 0 || (string) $value[2] === '0') {
                    $unitBottom = '';
                }
                $this->data[$key][$selector][] = sprintf(
                    "%s: %s%s;",
                    $propertyBottom,
                    $value[2],
                    $unitBottom
                );
            }

            if ($valueLeft) {
                $propertyLeft = $property . '-left';
                $unitLeft = $unit;

                if ($property === 'border-radius') {
                    $propertyLeft = 'border-bottom-left-radius';
                } elseif ($property === 'border-width') {
                    $propertyLeft = 'border-left-width';
                    $this->data[$key][$selector][] = 'border-left-style: solid;';
                }

                if (!is_numeric($value[3]) || $value[3] === 0 || (string) $value[3] === '0') {
                    $unitLeft = '';
                }

                $this->data[$key][$selector][] = sprintf(
                    "%s: %s%s;",
                    $propertyLeft,
                    $value[3],
                    $unitLeft
                );
            }

            return $this;
        }

        // Add our unit to our value if it exists.
        if ($unit && is_numeric($value)) {
            $value = sprintf("%d%s", $value, $unit);
        }

        $this->data[$key][$selector][] = sprintf("%s: %s;", $property, $value);

        return $this;
    }

    /**
     * @param string $selector
     * @param string $property
     * @param mixed $value
     * @param string $unit
     * @return $this
     */
    public function withMainProperty(string $selector, string $property, mixed $value, string $unit = ''): self
    {
        $this->withProperty(self::ATTR_MAIN_KEY, $selector, $property, $value, $unit);

        return $this;
    }

    /**
     * @return string
     */
    public function output(): string
    {
        $output = '';

        foreach (self::MEDIA_QUERY_ORDER as $media) {
            if (empty($this->data[$media])) {
                continue;
            }

            $rules = $this->data[$media];
            $output .= $this->rulesOutput($rules, $media);
        }

        // Reset
        $this->data = [];

        return $output;
    }

    /**
     * @param array $rules
     * @param string $media
     * @return string
     */
    private function rulesOutput(array $rules, string $media): string
    {
        $output = '';
        if (empty($rules)) {
            return $output;
        }

        foreach ($rules as $selector => $properties) {
            if (empty($properties)) {
                continue;
            }
            $output .= sprintf('%s {%s}', $selector, implode('', $properties));
        }

        if ($media !== self::ATTR_MAIN_KEY) {
            $output = sprintf(
                '@media %1$s {%2$s}',
                $this->mediaQuery(strtolower($media)),
                $output
            );
        }

        return $output;
    }

    /**
     * @param string|null $hex
     * @param string|int|null $alpha
     * @return string
     *
     * @phpcs:disable Syde.NamingConventions.ElementNameMinimalLength.TooShort
     */
    public function hex2rgba(?string $hex, mixed $alpha): string
    {
        if (!$hex) {
            return '';
        }

        if ($alpha === 1 || !is_numeric($alpha)) {
            return $hex;
        }

        if (isset($hex[0]) && $hex[0] !== '#') {
            return $hex;
        }

        $hex = str_replace('#', '', $hex);

        if (strlen($hex) === 3) {
            $r = hexdec(substr($hex, 0, 1) . substr($hex, 0, 1));
            $g = hexdec(substr($hex, 1, 1) . substr($hex, 1, 1));
            $b = hexdec(substr($hex, 2, 1) . substr($hex, 2, 1));

            return sprintf("rgba(%s, %s, %s, %d)", $r, $g, $b, $alpha);
        }
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));

        return sprintf("rgba(%s, %s, %s, %d)", $r, $g, $b, $alpha);
    }

    // @phpcs:enable

    /**
     * @param array $settings
     * @return string
     */
    public function backgroundImageUrl(array $settings): string
    {
        if (
            $settings['useDynamicData'] &&
            $settings['dynamicContentType'] === 'featured-image'
        ) {
            $postId = $settings['dynamicSource'] === 'current-post'
                ? get_the_ID()
                : ($settings['postId'] ?? '');
            $postThumbnail = get_the_post_thumbnail_url(
                intval($postId),
                $settings['bgImageSize'] ?? 'full'
            );

            return $postThumbnail ?: '';
        }

        if (!empty($settings['bgImage']['id'])) {
            $imageSrc = wp_get_attachment_image_src(
                $settings['bgImage']['id'],
                $settings['bgImageSize']
            );

            return is_array($imageSrc) ? $imageSrc[0] : $settings['bgImage']['image']['url'];
        }

        if (isset($settings['bgImage']['image']['url'])) {
            return $settings['bgImage']['image']['url'];
        }

        return '';
    }

    /**
     * @param string $type
     * @param array $settings
     * @return string
     *
     * @phpcs:disabled Syde.Functions.FunctionLength.TooLong
     */
    public function backgroundImageCss(string $type, array $settings): string
    {
        $gradient = '';

        if ($settings['gradient']) {
            $gradientColorStopOneValue = '';
            $gradientColorStopTwoValue = '';
            $gradientColorOneValue = $this->hex2rgba(
                $settings['gradientColorOne'],
                $settings['gradientColorOneOpacity']
            );
            $gradientColorTwoValue = $this->hex2rgba(
                $settings['gradientColorTwo'],
                $settings['gradientColorTwoOpacity']
            );

            if ($settings['gradientColorOne'] && $settings['gradientColorStopOne'] !== '') {
                $gradientColorStopOneValue = ' ' . $settings['gradientColorStopOne'] . '%';
            }

            if ($settings['gradientColorTwo'] && $settings['gradientColorStopTwo'] !== '') {
                $gradientColorStopTwoValue = ' ' . $settings['gradientColorStopTwo'] . '%';
            }

            $gradient = sprintf(
                "linear-gradient(%sdeg, %s%s, %s%s)",
                $settings['gradientDirection'],
                $gradientColorOneValue,
                $gradientColorStopOneValue,
                $gradientColorTwoValue,
                $gradientColorStopTwoValue
            );
        }

        if ($type === 'gradient') {
            return $gradient;
        }

        $backgroundImage = '';
        $hasBackground = $settings['bgImage'] ||
            ($settings['useDynamicData'] && $settings['dynamicContentType'] === 'featured-image');
        if ($hasBackground) {
            $url = $this->backgroundImageUrl($settings);
            $backgroundImage = sprintf("url(%s)", esc_url($url));

            if (
                $settings['bgImageInline'] &&
                $settings['bgOptions']['selector'] !== 'element'
            ) {
                $backgroundImage = 'var(--background-image)';
            }
        }

        // @phpcs:enable
        return $backgroundImage;
    }

    /**
     * @param string|int|null $value
     * @return bool
     */
    private function hasNumber(mixed $value): bool
    {
        return $value || $value === 0 || $value === '0';
    }

    /**
     * @param string|int $top
     * @param string|int $right
     * @param string|int $bottom
     * @param string|int $left
     * @param string|null $unit
     * @return string
     */
    public function makeShorthand(
        mixed $top,
        mixed $right,
        mixed $bottom,
        mixed $left,
        ?string $unit
    ): string {

        if ($top === '' && $right === '' && $bottom === '' && $left === '') {
            return '';
        }

        $values = [$top, $right, $bottom, $left];

        foreach ($values as $key => $value) {
            if (!$value) {
                $values[$key] = $value;
                continue;
            }

            if (is_numeric($value) && $unit) {
                $value = sprintf("%s%s", floatval($value), $unit);
            } elseif ($value === '0px') {
                $value = '0';
            }

            $values[$key] = $value;
        }

        return implode(' ', $values);
    }

    /**
     * Add border color CSS.
     *
     * @param array $settings Block settings.
     * @param string $state The state we're adding to.
     */
    public function borderColourCss(array $settings, string $state = '', string $device = ''): array
    {
        $borders = $settings['borders'];
        $borderColourCss = [];

        if (empty($borders)) {
            return $borderColourCss;
        }

        $colors = [
            'border-top-color' => 'borderTopColor',
            'border-right-color' => 'borderRightColor',
            'border-bottom-color' => 'borderBottomColor',
            'border-left-color' => 'borderLeftColor',
        ];

        $borderColourValues = [];
        foreach ($colors as $property => $valueName) {
            $value = $settings['borders'][$valueName . $state . $device] ?? '';

            if (empty($value)) {
                continue;
            }

            $borderColourValues[$property] = $value;
        }

        return $borderColourValues;
    }

    /**
     * @param array $effectData
     * @param array $settings
     * @param string $selector
     * @param int $key
     * @return array
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    public function effectSelector(array $effectData, array $settings, string $selector, int $key): array
    {
        $state = '';
        $device = '';
        $backgroundType = '';

        if (!empty($effectData[$key]['state']) && $effectData[$key]['state'] !== 'normal') {
            $state = $effectData[$key]['state'];
        }

        if (!empty($effectData[$key]['device']) && $effectData[$key]['device'] !== 'all') {
            $device = $effectData[$key]['device'];
        }

        if (isset($effectData[$key]['type'])) {
            if ($effectData[$key]['type'] === 'background') {
                $backgroundType = 'background';
            } elseif ($effectData[$key]['type'] === 'gradient') {
                $backgroundType = 'gradient';
            }
        }

        $element = sprintf("element%s%s%s", $backgroundType, $state, $device);

        if (!empty($effectData[$key]['target']) && $effectData[$key]['target'] !== 'self') {
            $element = sprintf(
                "%s%s%s%s",
                $effectData[$key]['target'],
                $backgroundType,
                $state,
                $device
            );

            if (
                $effectData[$key]['target'] === 'customSelector' &&
                !empty($effectData[$key]['customSelector'])
            ) {
                $element = sprintf(
                    "%s%s%s%s",
                    $effectData[$key]['customSelector'],
                    $backgroundType,
                    $state,
                    $device
                );
            }
        }

        if ($state === 'hover') {
            $state = ':hover';
        }

        $effectSelector = $selector . $state;

        if (isset($effectData[$key]['target']) && $effectData[$key]['target'] !== 'self') {
            if ($effectData[$key]['target'] === 'innerContainer') {
                // @phpcs:disable Syde.Files.LineLength.TooLong
                $effectSelector = sprintf(
                    ".enokh-blocks-container-%s%s > .enokh-blocks-inside-container",
                    $settings['uniqueId'],
                    $state
                );
                // @phpcs:enable
            }

            if ($effectData[$key]['target'] === 'backgroundImage') {
                $effectSelector = sprintf("%s%s:before", $selector, $state);
            }

            if ($effectData[$key]['target'] === 'icon') {
                $effectSelector = sprintf(
                    "%s%s .enokh-blocks-icon",
                    $selector,
                    $state
                );
            }

            if ($effectData[$key]['target'] === 'customSelector') {
                $effectSelector = sprintf(
                    "%s%s %s",
                    $selector,
                    $state,
                    $effectData[$key]['customSelector']
                );
            }

            if ($effectData[$key]['target'] === 'pseudo-element') {
                $effectSelector = sprintf("%s%s:before", $selector, $state);

                if (isset($effectData[$key]['direction'])) {
                    $effectSelector = sprintf("%s%s:after", $selector, $state);
                }
            }
        }

        return [
            'element' => $element,
            'selector' => $effectSelector,
        ];
    }

    // @phpcs:enable

    public function mediaQuery(string $media): string
    {

        $queries = apply_filters(
            'enokh-blocks.media-queries',
            [
                'desktop' => '(min-width: 1025px)',
                'tablet' => '(max-width: 1024px)',
                'tablet-only' => '(max-width: 1024px) and (min-width: 768px)',
                'mobile' => '(max-width: 767px)',
            ]
        );

        return $queries[$media] ?? '';
    }

    public function backgroundColour(array $settings): string
    {
        if (
            !$settings['useDynamicData'] || $settings['dynamicContentType'] !== 'species-term'
        ) {
            return '';
        }

        $postId = $settings['dynamicSource'] === 'current-post'
            ? get_the_ID()
            : ($settings['postId'] ?? '');
        $speciesList = get_the_terms(intval($postId), 'species');

        if (empty($speciesList) || is_wp_error($speciesList)) {
            return '';
        }

        /** @var \WP_Term $term */
        $term = array_pop($speciesList);
        $speciesMetas = SpeciesMetas::fromTerm($term);

        return $speciesMetas->assocBackgroundColor() ?: '';
    }
}
