<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Style;

use Enokh\UniversalTheme\Utility\BlockUtility;

class ContainerStyle implements BlockStyle
{
    use BlockDefaultStylesTrait;

    /**
     * @var array<string, mixed>
     */
    protected array $settings;
    private InlineCssGenerator $inlineCssGenerator;
    private BlockUtility $blockUtility;

    /**
     * @param InlineCssGenerator $inlineCssGenerator
     */
    public function __construct(InlineCssGenerator $inlineCssGenerator, BlockUtility $blockUtility)
    {
        $this->settings = [];
        $this->inlineCssGenerator = $inlineCssGenerator;
        $this->blockUtility = $blockUtility;
    }

    /**
     * @param array $settings
     * @return $this
     */
    public function withSettings(array $settings): self
    {
        $this->settings = $settings;

        return $this;
    }

    /**
     * @return $this
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    public function generate(): self
    {
        $blockSelector = sprintf(
            '.enokh-blocks-container-%s',
            $this->settings['uniqueId']
        );

        $this->inlineCssGenerator->withSelector(InlineCssGenerator::ATTR_MAIN_KEY, $blockSelector);
        $this->inlineCssGenerator->withMainProperty(
            $blockSelector,
            'background-color',
            $this->inlineCssGenerator->hex2rgba(
                $this->settings['backgroundColor'],
                $this->settings['backgroundColorOpacity']
            )
        );
        $this->inlineCssGenerator->withMainProperty(
            $blockSelector,
            'color',
            $this->settings['textColor']
        );

        $this->gridItemStyle($this->settings) &&
        $this->sizingStyle($this->settings) &&
        $this->layoutStyle($blockSelector, $this->settings) &&
        $this->typographyStyle($this->settings) &&
        $this->flexChildStyle($this->settings) &&
        $this->spacingStyle($this->settings) &&
        $this->borderStyle($this->settings) &&
        $this->backgroundsStyle($this->settings) &&
        $this->pseudoBeforeElementStyle($this->settings) &&
        $this->pseudoAfterElementStyle($this->settings) &&
        $this->bordersHoverStyle($this->settings) &&
        $this->anchorLinkStyle($this->settings) &&
        $this->shapesStyle($this->settings) &&
        $this->advancedBackgroundStyle($this->settings) &&
        $this->boxShadowStyle($this->settings) &&
        $this->textShadowStyle($this->settings) &&
        $this->displayStyle($this->settings) &&
        $this->transformStyle($this->settings) &&
        $this->lineClampStyle($blockSelector, $this->settings);
        $this->transformStyle($this->settings) &&
        $this->opacityStyle($this->settings) &&
        $this->transitionStyle($this->settings);
        $this->dividerStyle($this->settings);

        // Tablet
        $this->tabletStyle($this->settings) &&
        $this->mobileStyle($this->settings);

        /**
         * Push display block for link when default selected.
         */
        if ($this->settings['linkType'] === 'wrapper' && empty($this->settings['display'])) {
            $this->inlineCssGenerator->withMainProperty(
                $blockSelector,
                'display',
                'block'
            );
        }

        return $this;
    }

    /**
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function sizingStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $isCarouselItem = $settings['isCarouselItem'] ?? false;
        $options = [
            'width' => 'width',
            'height' => 'height',
            'min-width' => 'minWidth',
            'min-height' => 'minHeight',
            'max-width' => 'maxWidth',
            'max-height' => 'maxHeight',
            'aspect-ratio' => 'aspectRatio',
        ];

        if (!empty($settings['isGrid']) || !empty($settings['isCarouselItem'])) {
            unset($options['width']);
            unset($options['min-width']);
            unset($options['max-width']);
        }

        // MainCss
        foreach ($options as $property => $option) {
            $optionName = $option . $device;
            $value = $settings['sizing'][$optionName] ?? '';

            if ($property === 'max-width' && !empty($settings['useGlobalMaxWidth']) && !$device) {
                $value = $settings['containerWidth'] ?? '';
            }

            if (empty($value)) {
                continue;
            }

            empty($device)
                ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $value)
                : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $value);
        }

        return true;
    }

    /**
     * @param array $settings
     * @return string
     */
    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-container-%s',
            $settings['uniqueId']
        );
    }

    /**
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function typographyStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $options = [
            'font-family' => 'fontFamily',
            'font-size' => 'fontSize',
            'line-height' => 'lineHeight',
            'letter-spacing' => 'letterSpacing',
            'font-weight' => 'fontWeight',
            'text-transform' => 'textTransform',
            'text-align' => 'textAlign',
        ];

        foreach ($options as $property => $option) {
            $optionName = $option . $device;
            $value = $settings['typography'][$optionName] ?? '';

            if (empty($value)) {
                continue;
            }

            empty($device)
                ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $value)
                : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $value);
        }

        return true;
    }

    /**
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function flexChildStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $options = [
            'flex-grow' => 'flexGrow',
            'flex-shrink' => 'flexShrink',
            'flex-basis' => 'flexBasis',
            'order' => 'order',
        ];

        foreach ($options as $property => $option) {
            $value = $settings[$option . $device] ?? '';

            if ($value === '') {
                continue;
            }

            empty($device)
                ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $value)
                : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $value);
        }

        return true;
    }

    /**
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function spacingStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $paddingValues = array_map(
            static function (string $attribute) use ($device, $settings): string {
                $name = $attribute . $device;
                $array = $settings['spacing'];
                return $array[$name] ?? '';
            },
            [
                'paddingTop',
                'paddingRight',
                'paddingBottom',
                'paddingLeft',
            ]
        );
        $property = 'padding';
        empty($device)
            ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $paddingValues)
            : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $paddingValues);

        $marginValues = array_map(
            static function (string $attribute) use ($device, $settings): string {
                $name = $attribute . $device;
                return $settings['spacing'][$name] ?? '';
            },
            [
                'marginTop',
                'marginRight',
                'marginBottom',
                'marginLeft',
            ]
        );

        $property = 'margin';
        empty($device)
            ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $marginValues)
            : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $marginValues);

        return true;
    }

    /**
     * @param array $settings
     * @param string $device
     * @return bool
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh
     */
    private function borderStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);

        $borderRadiusValues = array_map(
            static function (string $attribute) use ($device, $settings): string {
                return $settings['borders'][$attribute . $device] ?? '';
            },
            [
                'borderTopLeftRadius',
                'borderTopRightRadius',
                'borderBottomRightRadius',
                'borderBottomLeftRadius',
            ]
        );

        $property = 'border-radius';
        empty($device)
            ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $borderRadiusValues)
            : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $borderRadiusValues);

        $borders = [
            'border-top' => [
                'border-top-width' => 'borderTopWidth',
                'border-top-style' => 'borderTopStyle',
                'border-top-color' => 'borderTopColor',
            ],
            'border-right' => [
                'border-right-width' => 'borderRightWidth',
                'border-right-style' => 'borderRightStyle',
                'border-right-color' => 'borderRightColor',
            ],
            'border-bottom' => [
                'border-bottom-width' => 'borderBottomWidth',
                'border-bottom-style' => 'borderBottomStyle',
                'border-bottom-color' => 'borderBottomColor',
            ],
            'border-left' => [
                'border-left-width' => 'borderLeftWidth',
                'border-left-style' => 'borderLeftStyle',
                'border-left-color' => 'borderLeftColor',
            ],
        ];

        $borderValues = [];

        foreach ($borders as $property => $values) {
            foreach ($values as $propertyName => $valueName) {
                $value = $settings['borders'][$valueName . $device] ?? '';

                if ($value || is_numeric($value)) {
                    $borderValues[$property][$propertyName] = $value;
                }
            }
        }

        if (empty($borderValues)) {
            return true;
        }

        foreach ($borderValues as $shorthandProperty => $values) {
            $numberOfValues = count($values);

            if ($numberOfValues === 3) {
                // Use the shorthand property with all three values.
                $stringBorderValues = trim(implode(' ', array_values($values)));
                empty($device)
                    ? $this->inlineCssGenerator->withMainProperty(
                        $blockSelector,
                        $shorthandProperty,
                        $stringBorderValues
                    )
                    : $this->inlineCssGenerator->withProperty(
                        $device,
                        $blockSelector,
                        $shorthandProperty,
                        $stringBorderValues
                    );

                continue;
            }

            foreach ($values as $property => $value) {
                empty($device)
                    ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $value)
                    : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $value);
            }
        }

        // @phpcs:enable
        return true;
    }

    /**
     * @param array $settings
     * @return bool
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    private function backgroundsStyle(array $settings): bool
    {
        $blockSelector = $this->blockSelector($settings);

        if (!isset($settings['bgOptions']['selector'])) {
            $settings['bgOptions']['selector'] = 'element';
        }
        // Background
        $backgroundImageValue = $this->inlineCssGenerator->backgroundImageCss('image', $settings);
        $gradientValue = $this->inlineCssGenerator->backgroundImageCss('gradient', $settings);
        $hasBgImage = $settings['bgImage'] ||
            ($settings['useDynamicData'] && $settings['dynamicContentType'] === 'featured-image');

        if (
            $hasBgImage &&
            $settings['bgOptions']['selector'] === 'element' && $backgroundImageValue
        ) {
            if (
                !$settings['bgImageInline']
            ) {
                $this->inlineCssGenerator->withMainProperty(
                    $blockSelector,
                    'background-image',
                    $backgroundImageValue
                );
            }

            $this->inlineCssGenerator->withMainProperty(
                $blockSelector,
                'background-repeat',
                $settings['bgOptions']['repeat']
            );
            $this->inlineCssGenerator->withMainProperty(
                $blockSelector,
                'background-position',
                $settings['bgOptions']['position']
            );
            $this->inlineCssGenerator->withMainProperty(
                $blockSelector,
                'background-size',
                $settings['bgOptions']['size']
            );
            $this->inlineCssGenerator->withMainProperty(
                $blockSelector,
                'background-attachment',
                $settings['bgOptions']['attachment']
            );
        } elseif ($settings['gradient'] && $settings['gradientSelector'] === 'element') {
            $this->inlineCssGenerator->withMainProperty(
                $blockSelector,
                'background-image',
                $gradientValue
            );
        }

        // @phpcs:enable
        return true;
    }

    /**
     * @param array $settings
     * @return bool
     */
    private function pseudoBeforeElementStyle(array $settings): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $pseudoBeforeSelector = sprintf("%s:before", $blockSelector);

        $hasBgImage = $settings['bgImage'] ||
            ($settings['useDynamicData'] && $settings['dynamicContentType'] !== '');
        $backgroundImageValue = $this->inlineCssGenerator->backgroundImageCss('image', $settings);

        if (!$hasBgImage || $settings['bgOptions']['selector'] !== 'pseudo-element') {
            return true;
        }
        // @phpcs:disable Syde.Files.LineLength.TooLong
        $this->inlineCssGenerator->withMainProperty($pseudoBeforeSelector, 'content', '""')
            ->withMainProperty($pseudoBeforeSelector, 'background-image', $backgroundImageValue)
            ->withMainProperty($pseudoBeforeSelector, 'background-repeat', $settings['bgOptions']['repeat'])
            ->withMainProperty($pseudoBeforeSelector, 'background-position', $settings['bgOptions']['position'])
            ->withMainProperty($pseudoBeforeSelector, 'background-size', $settings['bgOptions']['size'])
            ->withMainProperty($pseudoBeforeSelector, 'background-attachment', $settings['bgOptions']['attachment'])
            ->withMainProperty($pseudoBeforeSelector, 'z-index', '0')
            ->withMainProperty($pseudoBeforeSelector, 'position', 'absolute')
            ->withMainProperty($pseudoBeforeSelector, 'top', '0')
            ->withMainProperty($pseudoBeforeSelector, 'right', '0')
            ->withMainProperty($pseudoBeforeSelector, 'bottom', '0')
            ->withMainProperty($pseudoBeforeSelector, 'left', '0')
            ->withMainProperty($pseudoBeforeSelector, 'transition', 'inherit');
        // @phpcs:enable
        $this->inlineCssGenerator->withMainProperty(
            $pseudoBeforeSelector,
            'border-radius',
            [
                $settings['borders']['borderTopLeftRadius'] ?? '',
                $settings['borders']['borderTopRightRadius'] ?? '',
                $settings['borders']['borderBottomRightRadius'] ?? '',
                $settings['borders']['borderBottomLeftRadius'] ?? '',
            ]
        );
        $this->inlineCssGenerator->withMainProperty(
            $pseudoBeforeSelector,
            'pointer-events',
            'none'
        );

        if (
            isset($settings['bgOptions']['opacity']) &&
            $settings['bgOptions']['opacity'] !== 1
        ) {
            $this->inlineCssGenerator->withMainProperty(
                $pseudoBeforeSelector,
                'opacity',
                $settings['bgOptions']['opacity']
            );
        }

        return true;
    }

    /**
     * @param array $settings
     * @return bool
     */
    private function pseudoAfterElementStyle(array $settings): bool
    {
        if (!$settings['gradient'] || $settings['gradientSelector'] !== 'pseudo-element') {
            return true;
        }

        $blockSelector = $this->blockSelector($settings);
        $selector = sprintf("%s:after", $blockSelector);
        $gradientValue = $this->inlineCssGenerator->backgroundImageCss('gradient', $settings);

        $this->inlineCssGenerator->withMainProperty($selector, 'content', '""')
            ->withMainProperty($selector, 'background-image', $gradientValue)
            ->withMainProperty($selector, 'z-index', '0')
            ->withMainProperty($selector, 'position', 'absolute')
            ->withMainProperty($selector, 'top', '0')
            ->withMainProperty($selector, 'right', '0')
            ->withMainProperty($selector, 'bottom', '0')
            ->withMainProperty($selector, 'left', '0')
            ->withMainProperty($selector, 'pointer-events', 'none');

        return true;
    }

    /**
     * @param array $settings
     * @return bool
     */
    private function bordersHoverStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $selector = sprintf("%s:hover", $blockSelector);

        $borderColours = $this->inlineCssGenerator->borderColourCss($settings, 'Hover', $device);

        if (empty($borderColours)) {
            return true;
        }

        $propertyDevice = !empty($device) ? $device : InlineCssGenerator::ATTR_MAIN_KEY;
        foreach ($borderColours as $property => $value) {
            $this->inlineCssGenerator->withProperty($propertyDevice, $selector, $property, $value);
        }

        return true;
    }

    /**
     * @param array $settings
     * @return bool
     */
    private function anchorLinkStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $normalSelector = sprintf("%s a", $blockSelector);
        $visitedSelector = sprintf("%s a:visited", $blockSelector);
        $hoverSelector = sprintf("%s a:hover", $blockSelector);
        $key = 'color';

        if (!empty($device)) {
            $linkColorName = sprintf("linkColor%s", $device);
            $linkColorHoverName = sprintf("linkColorHover%s", $device);
            $this->inlineCssGenerator->withProperty($device, $normalSelector, $key, $settings[$linkColorName] ?? '');
            $this->inlineCssGenerator->withProperty($device, $visitedSelector, $key, $settings[$linkColorName] ?? '');
            $this->inlineCssGenerator->withProperty(
                $device,
                $hoverSelector,
                $key,
                $settings[$linkColorHoverName] ?? ''
            );

            return true;
        }

        $this->inlineCssGenerator->withMainProperty($normalSelector, $key, $settings['linkColor']);
        $this->inlineCssGenerator->withMainProperty($visitedSelector, $key, $settings['linkColor']);
        $this->inlineCssGenerator->withMainProperty($hoverSelector, $key, $settings['linkColorHover']);

        return true;
    }

    /**
     * @return string
     */
    public function output(): string
    {
        return $this->inlineCssGenerator->output();
    }

    /**
     * @param array $settings
     * @return bool
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong
     */
    private function shapesStyle(array $settings): bool
    {
        if (empty($settings['shapeDividers'])) {
            return true;
        }
        $selector = $this->blockSelector($settings);
        $shapeDefault = $this->shapeDefault();

        $shapeDividers = (array) $settings['shapeDividers'];
        foreach ($shapeDividers as $index => $options) {
            $shapeNumber = (int) $index + 1;
            $shapeSelector = sprintf(
                '%1$s > .%3$s-shapes .%3$s-shape-%2$d',
                $selector,
                $shapeNumber,
                "enokh-blocks"
            );
            $shapeSvgSelector = sprintf(
                '%1$s > .%3$s-shapes .%3$s-shape-%2$d svg',
                $selector,
                $shapeNumber,
                "enokh-blocks"
            );
            $shapeOptions = wp_parse_args($options, $shapeDefault);
            $shapeTransforms = [];

            // @phpstan-ignore logicalAnd.resultUnused
            $shapeOptions['location'] === 'top' and $shapeTransforms[] = 'scaleY(-1)';
            // @phpstan-ignore logicalAnd.resultUnused
            $shapeOptions['flipHorizontally'] and $shapeTransforms[] = 'scaleX(-1)';

            $this->inlineCssGenerator
                ->withMainProperty(
                    $shapeSelector,
                    'color',
                    $this->inlineCssGenerator->hex2rgba(
                        $shapeOptions['color'],
                        $shapeOptions['colorOpacity']
                    )
                )
                ->withMainProperty($shapeSelector, 'z-index', $shapeOptions['zindex']);

            ($shapeOptions['location'] === 'top' || $shapeOptions['location'] === 'bottom') and
            $this->inlineCssGenerator
                ->withMainProperty($shapeSelector, 'left', '0')
                ->withMainProperty($shapeSelector, 'right', '0');

            $shapeOptions['location'] === 'bottom' and $this->inlineCssGenerator
                ->withMainProperty($shapeSelector, 'bottom', '-1px');

            $shapeOptions['location'] === 'top' and $this->inlineCssGenerator
                ->withMainProperty($shapeSelector, 'top', '-1px');

            !empty($shapeTransforms) and $this->inlineCssGenerator
                ->withMainProperty($shapeSelector, 'transform', implode(' ', $shapeTransforms));

            $shapeWidth = $shapeOptions['width'] . '%';

            // @phpstan-ignore logicalAnd.resultUnused
            (int) $shapeOptions['width'] === 100 and
            $shapeWidth = 'calc(' . $shapeWidth . ' + 1.3px)';

            // Svg
            $this->inlineCssGenerator
                ->withMainProperty($shapeSvgSelector, 'height', $shapeOptions['height'], 'px')
                ->withMainProperty($shapeSvgSelector, 'width', $shapeWidth);

            if ($shapeOptions['location'] === 'top' || $shapeOptions['location'] === 'bottom') {
                $this->inlineCssGenerator
                    ->withMainProperty($shapeSvgSelector, 'position', 'relative')
                    ->withMainProperty($shapeSvgSelector, 'left', '50%')
                    ->withMainProperty($shapeSvgSelector, 'transform', 'translateX(-50%)')
                    ->withMainProperty($shapeSvgSelector, 'min-width', '100%');
            }
        }

        // @phpcs:enable
        return true;
    }

    /**
     * @return array
     */
    public function shapeDefault(): array
    {

        return [
            'shape' => 'enokh-blocks-waves-1',
            'location' => 'bottom',
            'height' => 200,
            'heightTablet' => '',
            'heightMobile' => '',
            'width' => 100,
            'widthTablet' => '',
            'widthMobile' => '',
            'flipHorizontally' => false,
            'zindex' => '',
            'color' => '#000000',
            'colorOpacity' => 1,
        ];
    }

    /**
     * @param array $settings
     * @return bool
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh
     */
    private function tabletStyle(array $settings): bool
    {
        $device = 'Tablet';
        $blockSelector = $this->blockSelector($settings);

        $this->sizingStyle($settings, $device);
        $this->layoutStyle($blockSelector, $settings, $device);
        $this->flexChildStyle($settings, $device);
        $this->typographyStyle($settings, $device);
        $this->spacingStyle($settings, $device);
        $this->borderStyle($settings, $device);
        $this->anchorLinkStyle($settings, $device);
        $this->bordersHoverStyle($settings, $device);
        $this->dividerStyle($settings, $device);

        $hasBgImage = $settings['bgImage'] ||
            ($settings['useDynamicData'] && $settings['dynamicContentType'] !== '');

        // Colours
        $this->inlineCssGenerator->withProperty(
            $device,
            $blockSelector,
            'background-color',
            $this->inlineCssGenerator->hex2rgba(
                $this->settings['backgroundColorTablet'] ?? '',
                $this->settings['backgroundColorOpacityTablet'] ?? ''
            )
        );
        $this->inlineCssGenerator->withProperty(
            $device,
            $blockSelector,
            'color',
            $this->settings['textColorTablet']
        );

        /**
         * Container before pseudo selector for tablet
         */
        if ($hasBgImage && $settings['bgOptions']['selector'] === 'pseudo-element') {
            $beforeSelector = sprintf("%s:before", $blockSelector);
            $this->inlineCssGenerator->withProperty(
                $device,
                $beforeSelector,
                'border-radius',
                [
                    $settings['borders']['borderTopLeftRadiusTablet'] ?? '',
                    $settings['borders']['borderTopRightRadiusTablet'] ?? '',
                    $settings['borders']['borderBottomRightRadiusTablet'] ?? '',
                    $settings['borders']['borderBottomLeftRadiusTablet'] ?? '',
                ]
            );
        }

        /**
         * Shapes
         */
        if (!empty($settings['shapeDividers'])) {
            $shapeDefault = $this->shapeDefault();

            foreach ((array) $settings['shapeDividers'] as $index => $options) {
                $shapeNumber = (int) $index + 1;

                $shapeOptions = wp_parse_args(
                    $options,
                    $shapeDefault
                );

                $shapeSelector = sprintf(
                    '%1$s > .%3$s-shapes .%3$s-shape-%2$d svg',
                    $blockSelector,
                    $shapeNumber,
                    'enokh-blocks'
                );
                $this->inlineCssGenerator->withProperty(
                    $device,
                    $shapeSelector,
                    'height',
                    $shapeOptions['heightTablet'],
                    'px'
                );
                $this->inlineCssGenerator->withProperty(
                    $device,
                    $shapeSelector,
                    'width',
                    $shapeOptions['widthTablet'],
                    '%'
                );

                if (
                    (int) $shapeOptions['widthTablet'] > 0 &&
                    (int) $shapeOptions['widthTablet'] !== 100
                ) {
                    $this->inlineCssGenerator
                        ->withProperty($device, $shapeSelector, 'left', '0%')
                        ->withProperty($device, $shapeSelector, 'transform', 'translateX(0%)')
                        ->withProperty($device, $shapeSelector, 'min-width', 'unset');
                }
            }
        }

        $this->lineClampStyle($blockSelector, $this->settings, $device);

        return true;
    }

    // @phpcs:enable

    /**
     * @param array $settings
     * @return bool
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    private function advancedBackgroundStyle(array $settings): bool
    {
        if (!$settings['useAdvancedBackgrounds'] || empty($settings['advancedBackgrounds'])) {
            return true;
        }

        $backgroundData = $this->advancedBackgroundData($settings);

        if (empty($backgroundData)) {
            return true;
        }

        $blockSelector = $this->blockSelector($settings);
        $hasPseudoBefore = false;
        $hasPseudoAfter = false;

        foreach ($backgroundData as $target => $data) {
            $settingKey = $this->deviceKey($data['device'] ?? '');

            if ($data['type'] === 'gradient') {
                if ($data['target'] === 'pseudo-element' && !$hasPseudoAfter) {
                    $this->inlineCssGenerator
                        ->withProperty($settingKey, $data['selector'], 'content', '""')
                        ->withProperty($settingKey, $data['selector'], 'z-index', '0')
                        ->withProperty($settingKey, $data['selector'], 'position', 'absolute')
                        ->withProperty($settingKey, $data['selector'], 'top', '0')
                        ->withProperty($settingKey, $data['selector'], 'right', '0')
                        ->withProperty($settingKey, $data['selector'], 'bottom', '0')
                        ->withProperty($settingKey, $data['selector'], 'left', '0');

                    $this->inlineCssGenerator
                        ->withProperty($settingKey, $blockSelector, 'position', 'relative')
                        ->withProperty($settingKey, $blockSelector, 'overflow', 'hidden');

                    if ($data['device'] === 'all') {
                        $hasPseudoAfter = true;
                    }
                }

                $this->inlineCssGenerator->withProperty(
                    $settingKey,
                    $data['selector'],
                    'background-image',
                    $data['gradient']
                );
            }

            if ($data['type'] === 'image') {
                $bgImageUrl = $data['url'];

                if (!empty($data['id'])) {
                    $imageSrc = wp_get_attachment_image_src($data['id'], $data['imageSize']);
                    $bgImageUrl = is_array($imageSrc) ? $imageSrc[0] : $data['url'];
                }

                if ($data['target'] === 'pseudo-element' && !$hasPseudoBefore) {
                    $this->inlineCssGenerator
                        ->withProperty($settingKey, $data['selector'], 'content', '""')
                        ->withProperty($settingKey, $data['selector'], 'z-index', '0')
                        ->withProperty($settingKey, $data['selector'], 'position', 'absolute')
                        ->withProperty($settingKey, $data['selector'], 'top', '0')
                        ->withProperty($settingKey, $data['selector'], 'right', '0')
                        ->withProperty($settingKey, $data['selector'], 'bottom', '0')
                        ->withProperty($settingKey, $data['selector'], 'left', '0')
                        ->withProperty($settingKey, $blockSelector, 'position', 'relative')
                        ->withProperty($settingKey, $blockSelector, 'overflow', 'hidden');

                    if ($data['device'] === 'all' || $data['device'] === 'desktop') {
                        $shortHandBorder = $this->inlineCssGenerator->makeShorthand(
                            $settings['borderRadiusTopLeft'],
                            $settings['borderRadiusTopRight'],
                            $settings['borderRadiusBottomRight'],
                            $settings['borderRadiusBottomLeft'],
                            $settings['borderRadiusUnit']
                        );
                        $this->inlineCssGenerator->withProperty(
                            $settingKey,
                            $blockSelector,
                            'border-radius',
                            $shortHandBorder
                        );
                    } elseif ($data['device'] === 'tablet') {
                        $this->inlineCssGenerator->withProperty($settingKey, $blockSelector, 'border-radius', [
                            $settings['borderRadiusTopLeftTablet'],
                            $settings['borderRadiusTopRightTablet'],
                            $settings['borderRadiusBottomRightTablet'],
                            $settings['borderRadiusBottomLeftTablet'],
                        ], $settings['borderRadiusUnit']);
                    } elseif ($data['device'] === 'mobile') {
                        $this->inlineCssGenerator->withProperty($settingKey, $blockSelector, 'border-radius', [
                            $settings['borderRadiusTopLeftMobile'],
                            $settings['borderRadiusTopRightMobile'],
                            $settings['borderRadiusBottomRightMobile'],
                            $settings['borderRadiusBottomLeftMobile'],
                        ], $settings['borderRadiusUnit']);
                    }

                    if ($data['device'] === 'all') {
                        $hasPseudoBefore = true;
                    }
                }

                $this->inlineCssGenerator
                    ->withProperty(
                        $settingKey,
                        $data['selector'],
                        'background-image',
                        $bgImageUrl ? 'url(' . $bgImageUrl . ')' : ''
                    )
                    ->withProperty(
                        $settingKey,
                        $data['selector'],
                        'background-size',
                        $data['size']
                    )
                    ->withProperty(
                        $settingKey,
                        $data['selector'],
                        'background-position',
                        $data['position']
                    )
                    ->withProperty(
                        $settingKey,
                        $data['selector'],
                        'background-repeat',
                        $data['repeat']
                    )
                    ->withProperty(
                        $settingKey,
                        $data['selector'],
                        'background-attachment',
                        $data['attachment']
                    );
            }
        }

        // @phpcs:enable
        return true;
    }

    /**
     * @param array $settings
     * @return array
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, Syde.Files.LineLength.TooLong, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    private function advancedBackgroundData(array $settings): array
    {
        $backgroundData = [];

        if (!$settings['useAdvancedBackgrounds'] || empty($settings['advancedBackgrounds'])) {
            return $backgroundData;
        }

        foreach ($settings['advancedBackgrounds'] as $key => $value) {
            $backgroundSelector = $this->inlineCssGenerator->effectSelector(
                $settings['advancedBackgrounds'],
                $settings,
                '.enokh-blocks-container-' . $settings['uniqueId'],
                $key
            );
            $element = $backgroundSelector['element'];
            $effectSelector = $backgroundSelector['selector'];

            if ($value['type'] === 'gradient') {
                $gradientColorStopOneValue = '';
                $gradientColorStopTwoValue = '';
                $colorOneOpacity = $value['colorOneOpacity'] ?? 1;
                $colorTwoOpacity = $value['colorTwoOpacity'] ?? 1;

                $gradientColorOneValue = $this->inlineCssGenerator->hex2rgba(
                    $value['colorOne'],
                    $colorOneOpacity
                );
                $gradientColorTwoValue = $this->inlineCssGenerator->hex2rgba(
                    $value['colorTwo'],
                    $colorTwoOpacity
                );

                if ($value['colorOne'] && isset($value['stopOne']) && $value['stopOne'] !== '') {
                    $gradientColorStopOneValue = sprintf(" %s%%", $value['stopOne']);
                }

                if ($value['colorTwo'] && isset($value['stopTwo']) && $value['stopTwo'] !== '') {
                    $gradientColorStopTwoValue = sprintf(" %s%%", $value['stopTwo']);
                }

                $gradient = sprintf(
                    "linear-gradient(%sdeg, %s%s, %s%s)",
                    $value['direction'],
                    $gradientColorOneValue,
                    $gradientColorStopOneValue,
                    $gradientColorTwoValue,
                    $gradientColorStopTwoValue
                );

                $backgroundData[$element]['selector'] = $effectSelector;
                $backgroundData[$element]['state'] = !empty($value['state']) ? $value['state'] : 'normal';
                $backgroundData[$element]['gradient'] = $gradient;
                $backgroundData[$element]['device'] = !empty($value['device']) ? $value['device'] : 'all';
                $backgroundData[$element]['target'] = !empty($value['target']) ? $value['target'] : 'self';
                $backgroundData[$element]['type'] = $value['type'];
            }

            if ($value['type'] === 'image') {
                $backgroundData[$element]['selector'] = $effectSelector;
                $backgroundData[$element]['state'] = !empty($value['state']) ? $value['state'] : 'normal';
                $backgroundData[$element]['device'] = !empty($value['device']) ? $value['device'] : 'all';
                $backgroundData[$element]['target'] = !empty($value['target']) ? $value['target'] : 'self';
                $backgroundData[$element]['type'] = $value['type'];
                $backgroundData[$element]['url'] = $value['url'];
                $backgroundData[$element]['id'] = $value['id'];
                $backgroundData[$element]['imageSize'] = $value['imageSize'];
                $backgroundData[$element]['size'] = $value['size'];
                $backgroundData[$element]['position'] = $value['position'];
                $backgroundData[$element]['repeat'] = $value['repeat'];
                $backgroundData[$element]['attachment'] = $value['attachment'];
            }
        }

        // @phpcs:enable
        return $backgroundData;
    }

    /**
     * @param array $settings
     * @return bool
     */
    private function boxShadowStyle(array $settings): bool
    {
        if (!$settings['useBoxShadow'] || empty($settings['boxShadows'])) {
            return true;
        }

        $boxShadowData = $this->boxShadowData($settings);

        if (empty($boxShadowData)) {
            return true;
        }

        foreach ($boxShadowData as $target => $data) {
            $settingKey = $this->deviceKey($data['device'] ?? '');
            if (empty($data['boxShadow'])) {
                continue;
            }
            $this->inlineCssGenerator->withProperty(
                $settingKey,
                $data['selector'],
                'box-shadow',
                $data['boxShadow']
            );
        }
        return true;
    }

    /**
     * @param array $settings
     * @return array
     * @phpcs:disable Syde.Files.LineLength.TooLong
     */
    private function boxShadowData(array $settings): array
    {
        $boxShadowData = [];
        $blockSelector = $this->blockSelector($settings);

        foreach ($settings['boxShadows'] as $key => $value) {
            $boxShadowSelector = $this->inlineCssGenerator->effectSelector(
                $settings['boxShadows'],
                $settings,
                $blockSelector,
                $key
            );

            $element = $boxShadowSelector['element'];
            $effectSelector = $boxShadowSelector['selector'];

            $boxShadowData[$element]['selector'] = $effectSelector;
            $boxShadowData[$element]['state'] = !empty($value['state']) ? $value['state'] : 'normal';
            $boxShadowData[$element]['device'] = !empty($value['device']) ? $value['device'] : 'all';
            $boxShadowColorOpacity = $value['colorOpacity'] ?? 1;

            $boxShadow = sprintf(
                '%1$s %2$s %3$s %4$s %5$s %6$s',
                $value['inset'] ? 'inset' : '',
                $value['xOffset'] ? $value['xOffset'] . 'px' : 0,
                $value['yOffset'] ? $value['yOffset'] . 'px' : 0,
                $value['blur'] ? $value['blur'] . 'px' : 0,
                $value['spread'] ? $value['spread'] . 'px' : 0,
                $this->inlineCssGenerator->hex2rgba($value['color'], $boxShadowColorOpacity)
            );

            $boxShadowData[$element]['boxShadow'] = $boxShadow;
        }
        // @phpcs:enable
        return $boxShadowData;
    }

    /**
     * @param string $device
     * @return string
     */
    private function deviceKey(string $device): string
    {
        if ($device === 'desktop') {
            return InlineCssGenerator::ATTR_DESKTOP_KEY;
        }

        if ($device === 'tablet-only') {
            return InlineCssGenerator::ATTR_TABLET_ONLY_KEY;
        }

        if ($device === 'tablet') {
            return InlineCssGenerator::ATTR_TABLET_KEY;
        }

        if ($device === 'mobile') {
            return InlineCssGenerator::ATTR_MOBILE_KEY;
        }

        return InlineCssGenerator::ATTR_MAIN_KEY;
    }

    /**
     * @param array $settings
     * @return bool
     */
    private function textShadowStyle(array $settings): bool
    {
        if (!$settings['useTextShadow'] || empty($settings['textShadows'])) {
            return true;
        }

        $textShadowData = $this->textShadowData($settings);

        if (empty($textShadowData)) {
            return true;
        }

        foreach ($textShadowData as $target => $data) {
            $settingKey = $this->deviceKey($data['device'] ?? '');

            if (empty($data['textShadow'])) {
                continue;
            }
            $this->inlineCssGenerator->withProperty(
                $settingKey,
                $data['selector'],
                'text-shadow',
                $data['textShadow']
            );
        }

        return true;
    }

    /**
     * @param array $settings
     * @return array
     * @phpcs:disable Syde.Files.LineLength.TooLong
     */
    private function textShadowData(array $settings): array
    {
        $textShadowData = [];
        $blockSelector = $this->blockSelector($settings);

        foreach ($settings['textShadows'] as $key => $value) {
            $textShadowSelector = $this->inlineCssGenerator->effectSelector(
                $settings['textShadows'],
                $settings,
                $blockSelector,
                $key
            );

            $element = $textShadowSelector['element'];
            $effectSelector = $textShadowSelector['selector'];

            $textShadowData[$element]['selector'] = $effectSelector;
            $textShadowData[$element]['state'] = !empty($value['state']) ? $value['state'] : 'normal';
            $textShadowData[$element]['device'] = !empty($value['device']) ? $value['device'] : 'all';
            $textShadowColorOpacity = $value['colorOpacity'] ?? 1;

            $textShadowData[$element]['textShadow'] = sprintf(
                '%1$s %2$s %3$s %4$s',
                $this->inlineCssGenerator->hex2rgba($value['color'], $textShadowColorOpacity),
                $value['xOffset'] ? $value['xOffset'] . 'px' : 0,
                $value['yOffset'] ? $value['yOffset'] . 'px' : 0,
                $value['blur'] ? $value['blur'] . 'px' : 0
            );
        }
        // @phpcs:enable
        return $textShadowData;
    }

    /**
     * @param array $settings
     * @return bool
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    private function mobileStyle(array $settings): bool
    {
        $device = 'Mobile';
        $blockSelector = $this->blockSelector($settings);

        $this->sizingStyle($settings, $device);
        $this->layoutStyle($blockSelector, $settings, $device);
        $this->flexChildStyle($settings, $device);
        $this->typographyStyle($settings, $device);
        $this->spacingStyle($settings, $device);
        $this->borderStyle($settings, $device);
        $this->anchorLinkStyle($settings, $device);
        $this->bordersHoverStyle($settings, $device);
        $this->dividerStyle($settings, $device);

        // Colours
        $this->inlineCssGenerator->withProperty(
            $device,
            $blockSelector,
            'background-color',
            $this->inlineCssGenerator->hex2rgba(
                $this->settings["backgroundColor{$device}"] ?? '',
                $this->settings["backgroundColorOpacity{$device}"] ?? ''
            )
        );
        $this->inlineCssGenerator->withProperty(
            $device,
            $blockSelector,
            'color',
            $this->settings["textColor{$device}"]
        );

        $hasBgImage = $settings['bgImage'] ||
            ($settings['useDynamicData'] && $settings['dynamicContentType'] !== '');

        /**
         * Container before pseudo selector for mobile
         */
        if ($hasBgImage && $settings['bgOptions']['selector'] === 'pseudo-element') {
            $beforeSelector = sprintf("%s:before", $blockSelector);
            $this->inlineCssGenerator->withProperty(
                $device,
                $beforeSelector,
                'border-radius',
                [
                    $settings['borders']['borderTopLeftRadiusMobile'] ?? '',
                    $settings['borders']['borderTopRightRadiusMobile'] ?? '',
                    $settings['borders']['borderBottomRightRadiusMobile'] ?? '',
                    $settings['borders']['borderBottomLeftRadiusMobile'] ?? '',
                ]
            );
        }

        /**
         * Shapes
         */
        if (!empty($settings['shapeDividers'])) {
            $shapeDefault = $this->shapeDefault();

            foreach ((array) $settings['shapeDividers'] as $index => $options) {
                $shapeNumber = (int) $index + 1;

                $shapeOptions = wp_parse_args(
                    $options,
                    $shapeDefault
                );

                $shapeSelector = sprintf(
                    '%1$s > .%3$s-shapes .%3$s-shape-%2$d svg',
                    $blockSelector,
                    $shapeNumber,
                    'enokh-blocks'
                );
                $this->inlineCssGenerator->withProperty(
                    $device,
                    $shapeSelector,
                    'height',
                    $shapeOptions['heightMobile'],
                    'px'
                );
                $this->inlineCssGenerator->withProperty(
                    $device,
                    $shapeSelector,
                    'width',
                    $shapeOptions['widthMobile'],
                    '%'
                );

                if (
                    (int) $shapeOptions['widthMobile'] > 0 &&
                    (int) $shapeOptions['widthMobile'] !== 100
                ) {
                    $this->inlineCssGenerator
                        ->withProperty($device, $shapeSelector, 'left', '0%')
                        ->withProperty($device, $shapeSelector, 'transform', 'translateX(0%)')
                        ->withProperty($device, $shapeSelector, 'min-width', 'unset');
                }
            }
        }

        if ($hasBgImage && $settings['bgOptions']['attachment'] === 'fixed') {
            $backgroundAttSelect = '';
            if ($settings['bgOptions']['selector'] === 'element') {
                $backgroundAttSelect = $blockSelector;
            }

            if ($settings['bgOptions']['selector'] === 'pseudo-element') {
                $backgroundAttSelect = sprintf("%s:before", $blockSelector);
            }

            $this->inlineCssGenerator->withProperty(
                $device,
                $backgroundAttSelect,
                'background-attachment',
                'initial'
            );
        }

        $this->lineClampStyle($blockSelector, $this->settings, $device);

        return true;
    }

    // @phpcs:enable

    /**
     * @param array $settings
     * @return bool
     */
    private function displayStyle(array $settings): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $hideOnDesktop = $settings['hideOnDesktop'] ?? false;
        $hideOnTablet = $settings['hideOnTablet'] ?? false;
        $hideOnMobile = $settings['hideOnMobile'] ?? false;

        if ($hideOnDesktop) {
            $this->inlineCssGenerator->withProperty(
                InlineCssGenerator::ATTR_DESKTOP_KEY,
                $blockSelector,
                'display',
                'none !important',
            );
        }

        if ($hideOnTablet) {
            $this->inlineCssGenerator->withProperty(
                InlineCssGenerator::ATTR_TABLET_ONLY_KEY,
                $blockSelector,
                'display',
                'none !important',
            );
        }

        if ($hideOnMobile) {
            $this->inlineCssGenerator->withProperty(
                InlineCssGenerator::ATTR_MOBILE_KEY,
                $blockSelector,
                'display',
                'none !important',
            );
        }

        return true;
    }

    /**
     * @param array $settings
     * @return bool
     */
    private function gridItemStyle(array $settings): bool
    {

        if (!$settings['isGrid']) {
            return true;
        }

        $isCarouselItem = $settings['isCarouselItem'] ?? false;
        $blockSelector = sprintf(
            '.%1$s-grid-wrapper > .%1$s-grid-column-%2$s',
            'enokh-blocks',
            $settings['uniqueId']
        );

        if (!$isCarouselItem) {
            $this->inlineCssGenerator
                ->withMainProperty($blockSelector, 'width', $settings['sizing']['width'] ?? '');
        }

        $this->inlineCssGenerator
            ->withMainProperty($blockSelector, 'flex-grow', $settings['flexGrow'])
            ->withMainProperty($blockSelector, 'flex-shrink', $settings['flexShrink'])
            ->withMainProperty($blockSelector, 'flex-basis', $settings['flexBasis'])
            ->withMainProperty($blockSelector, 'order', $settings['order']);

        // Tablet
        $tablet = InlineCssGenerator::ATTR_TABLET_KEY;
        if (!$isCarouselItem) {
            $this->inlineCssGenerator
                ->withProperty(
                    $tablet,
                    $blockSelector,
                    'width',
                    $settings['sizing']['widthTablet'] ?? ''
                );
        }

        $this->inlineCssGenerator
            ->withProperty($tablet, $blockSelector, 'order', $settings['orderTablet']);

        //Mobile
        $mobile = InlineCssGenerator::ATTR_MOBILE_KEY;
        if (!$isCarouselItem) {
            $this->inlineCssGenerator
                ->withProperty(
                    $mobile,
                    $blockSelector,
                    'width',
                    $settings['sizing']['widthMobile'] ?? ''
                );
        }
        $this->inlineCssGenerator
            ->withProperty($mobile, $blockSelector, 'order', $settings['orderMobile']);

        return true;
    }

    private function transformStyle(array $settings): bool
    {
        if (!$settings['useTransform'] || empty($settings['transforms'])) {
            return true;
        }

        $transformData = $this->transformData($settings);

        if (empty($transformData)) {
            return true;
        }

        foreach ($transformData as $target => $data) {
            $settingKey = $this->deviceKey($data['device'] ?? '');

            if (empty($data['transforms'])) {
                continue;
            }

            $this->inlineCssGenerator->withProperty(
                $settingKey,
                $data['selector'],
                'transform',
                implode(' ', $data['transforms'])
            );
        }

        return true;
    }

    /**
     * @param array $settings
     * @return array
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    private function transformData(array $settings): array
    {

        $transformData = [];
        $blockSelector = $this->blockSelector($settings);

        // closure map for building transform strings by type
        $transformBuilders = [
            'translate' => static function (array $transformSettings): string | null {
                $translateX = !empty($transformSettings['translateX'])
                    ? $transformSettings['translateX']
                    : '0';
                $translateY = !empty($transformSettings['translateY'])
                    ? $transformSettings['translateY']
                    : '0';

                return ($translateX || $translateY)
                    ? sprintf('translate3d(%s,%s,0)', $translateX, $translateY)
                    : null;
            },
            'rotate' => static function (array $transformSettings): string | null {
                return !empty($transformSettings['rotate'])
                    ? sprintf('rotate(%sdeg)', (float) $transformSettings['rotate'])
                    : null;
            },
            'scale' => static function (array $transformSettings): string | null {
                return !empty($transformSettings['scale'])
                    ? sprintf('scale(%s)', (float) $transformSettings['scale'])
                    : null;
            },
        ];


        if (!$settings['useTransform'] || !$settings['transforms']) {
            return $transformData;
        }

        foreach ($settings['transforms'] as $key => $value) {
            $selectorData = $this->inlineCssGenerator->effectSelector(
                $settings['transforms'],
                $settings,
                $blockSelector,
                $key
            );
            $transformType = $value['type'];
            $element = $selectorData['element'];
            $effectSelector = $selectorData['selector'];

            $transformData[$element]['selector'] = $effectSelector;
            $transformData[$element]['state'] = !empty($value['state'])
                ? $value['state']
                : 'normal';
            $transformData[$element]['device'] = !empty($value['device'])
                ? $value['device']
                : 'all';

            // use builder closure if available
            if (empty($transformBuilders[$transformType])) {
                continue;
            }

            $style = $transformBuilders[$transformType]($value);

            if ($style) {
                $transformData[$element]['transforms'][] = $style;
            }
        }

        return $transformData;
    }

    /**
     * @param array $settings
     * @return bool
     */
    private function opacityStyle(array $settings): bool
    {
        if (empty($settings['useOpacity'])) {
            return true;
        }

        $opacityData = [];

        foreach ($settings['opacities'] as $key => $value) {
            $opacitySelector = $this->inlineCssGenerator->effectSelector(
                $settings['opacities'],
                $settings,
                $this->blockSelector($settings),
                $key
            );
            $element = $opacitySelector['element'];
            $effectSelector = $opacitySelector['selector'];

            $opacityData[$element]['selector'] = $effectSelector;
            $opacityData[$element]['state'] = !empty($value['state']) ? $value['state'] : 'normal';
            $opacityData[$element]['opacity'] = $value['opacity'];
            $opacityData[$element]['device'] = !empty($value['device']) ? $value['device'] : 'all';
        }

        if (empty($opacityData)) {
            return true;
        }

        foreach ($opacityData as $target => $data) {
            if ($data['opacity'] === '') {
                continue;
            }

            $this->inlineCssGenerator->withProperty(
                $this->deviceKey($data['device']),
                $data['selector'],
                'opacity',
                $data['opacity']
            );
        }

        return true;
    }

    private function transitionStyle(array $settings): bool
    {
        if (empty($settings['useTransition'])) {
            return true;
        }

        $transitionData = [];

        foreach ($settings['transitions'] as $key => $value) {
            $transitionSelector = $this->inlineCssGenerator->effectSelector(
                $settings['transitions'],
                $settings,
                $this->blockSelector($settings),
                $key
            );

            $element = $transitionSelector['element'];
            $effectSelector = $transitionSelector['selector'];

            $transitionData[$element]['selector'] = $effectSelector;
            $transitionData[$element]['state'] = !empty($value['state'])
                ? $value['state']
                : 'normal';
            $transitionData[$element]['device'] = !empty($value['device'])
                ? $value['device']
                : 'all';

            $transitions = [
                $value['property'] ?: 'all',
                $value['duration'] || $value['duration'] === 0
                    ? $value['duration'] . 's'
                    : 0.5 . 's',
                $value['timingFunction'] ?: 'ease',
                $value['delay'] || $value['delay'] === 0
                    ? $value['delay'] . 's'
                    : '',
            ];

            $transitions = implode(' ', $transitions);

            $transitionData[$element]['transitions'][] = $transitions;
        }

        if (empty($transitionData)) {
            return true;
        }

        foreach ($transitionData as $target => $data) {
            $this->inlineCssGenerator->withProperty(
                $this->deviceKey($data['device']),
                $data['selector'],
                'transition',
                implode(' ', $data['transitions'])
            );
        }

        return true;
    }

    // @phpcs:enable

    /**
     * @param array $attributes
     * @param string $device
     * @return bool
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong
     */
    private function dividerStyle(array $attributes, string $device = ''): bool
    {
        if (empty($attributes['divider'])) {
            return true;
        }

        $settings = $attributes['divider'];


        $blockSelector = sprintf(
            "%s > .enokh-blocks-container::before",
            $this->blockSelector($attributes)
        );
        $orientation = $this->blockUtility->attributeResponsiveValue(
            'orientation',
            $settings,
            $device,
            ''
        );
        $thickness = $this->blockUtility->attributeResponsiveValue(
            'thickness',
            $settings,
            $device,
            ''
        );
        $style = $this->blockUtility->attributeResponsiveValue(
            'style',
            $settings,
            $device,
            ''
        );
        $color = $this->blockUtility->attributeResponsiveValue(
            'color',
            $settings,
            $device,
            ''
        );

        $options = [];

        if ($orientation === 'horizontal') {
            $options = [
                'border-bottom' => 'none',
                'border-left' => sprintf("%s %s %s", $thickness, $style, $color),
                'left' => sprintf(
                    "calc(calc(calc(var(--enokh-blocks-margin-left,0) / 2) + calc(%s / 2)) * -1)",
                    $thickness
                ),
                'height' => '100%',
                'width' => 'auto',
            ];
        }


        if ($orientation === 'vertical') {
            $options = [
                'border-bottom' => sprintf("%s %s %s", $thickness, $style, $color),
                'border-left' => 'none',
                'left' => 'unset',
                'bottom' => sprintf(
                    "calc(calc(calc(var(--enokh-blocks-row-gap,0) / 2) + calc(%s / 2)) * -1)",
                    $thickness
                ),
                'height' => 'auto',
                'width' => '100%',
            ];
        }


        foreach ($options as $property => $value) {
            if ($value === '') {
                continue;
            }

            empty($device)
                ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $value)
                : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $value);
        }

        return true;
    }

    //@phpcs:enable
}
