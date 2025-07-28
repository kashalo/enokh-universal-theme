<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Style;

trait BlockDefaultStylesTrait
{
    /**
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @return bool
     */
    public function spacingStyle(string $blockSelector, array $settings, string $device = ''): bool
    {
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
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function typographyStyle(
        string $blockSelector,
        array $settings,
        string $device = ''
    ): bool {

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
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @return bool
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    private function borderStyle(string $blockSelector, array $settings, string $device = ''): bool
    {

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
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function bordersHoverStyle(string $blockSelector, array $settings, string $device = ''): bool
    {
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
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @return bool
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong
     */
    private function colorStyle(string $blockSelector, array $settings, string $device = ''): bool
    {
        $textColor = sprintf('textColor%s', $device);
        $textColorHover = sprintf('textColorHover%s', $device);
        $textColorCurrent = sprintf('textColorCurrent%s', $device);
        $backgroundColor = sprintf('backgroundColor%s', $device);
        $backgroundColorHover = sprintf('backgroundColorHover%s', $device);
        $backgroundColorCurrent = sprintf('backgroundColorCurrent%s', $device);
        $defaultOpacity = 1;
        $deviceKey = empty($device) ? InlineCssGenerator::ATTR_MAIN_KEY : $device;

        $visitedSelector = sprintf(", %s:visited", $blockSelector);
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            sprintf("%s%s", $blockSelector, $visitedSelector),
            'background-color',
            $this->inlineCssGenerator->hex2rgba(
                $settings[$backgroundColor] ?? '',
                $defaultOpacity
            )
        );
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            sprintf("%s%s", $blockSelector, $visitedSelector),
            'color',
            $settings[$textColor] ?? ''
        );

        // Hover active focus states
        $statesSelector = sprintf('%1$s:hover, %1$s:active, %1$s:focus', $blockSelector);
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            $statesSelector,
            'background-color',
            $this->inlineCssGenerator->hex2rgba(
                $settings[$backgroundColorHover] ?? '',
                $defaultOpacity
            )
        );
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            $statesSelector,
            'color',
            $settings[$textColorHover] ?? ''
        );

        // Current
        $currentSelector = sprintf(
            '%1$s.enokh-blocks-block-is-current, %1$s.enokh-blocks-block-is-current:hover, %1$s.enokh-blocks-block-is-current:active, %1$s.enokh-blocks-block-is-current:focus, %1$s.enokh-blocks-block-is-current:visited, [aria-selected="true"] > %1$s', // @phpcs:ignore Syde.Files.LineLength.TooLong
            $blockSelector
        );
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            $currentSelector,
            'background-color',
            $this->inlineCssGenerator->hex2rgba(
                $settings[$backgroundColorCurrent] ?? '',
                $defaultOpacity
            )
        );
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            $currentSelector,
            'color',
            $settings[$textColorCurrent] ?? ''
        );

        return true;
    }

    // @phpcs:enable

    /**
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @return bool
     */
    public function sizingStyle(string $blockSelector, array $settings, string $device = ''): bool
    {
        $options = [
            'width' => 'width',
            'height' => 'height',
            'min-width' => 'minWidth',
            'min-height' => 'minHeight',
            'max-width' => 'maxWidth',
            'max-height' => 'maxHeight',
            'aspect-ratio' => 'aspectRatio',
        ];

        if (!empty($settings['isGrid'])) {
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
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @param string $displayAttrPrefix
     * @return bool
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong
     */
    public function layoutStyle(
        string $blockSelector,
        array $settings,
        string $device = '',
        string $displayAttrPrefix = 'display'
    ): bool {

        $includeAdminBar = $settings['includeAdminBar'] ?? false;
        $options = [
            'display' => $displayAttrPrefix,
            'flex-direction' => 'flexDirection',
            'flex-wrap' => 'flexWrap',
            'align-items' => 'alignItems',
            'justify-content' => 'justifyContent',
            'column-gap' => 'columnGap',
            'row-gap' => 'rowGap',
            'z-index' => 'zindex',
            'position' => 'position',
            'overflow-x' => 'overflowX',
            'overflow-y' => 'overflowY',
            '--enokh-blocks-margin-left' => 'columnGap',
            '--enokh-blocks-row-gap' => 'rowGap',
        ];
        $position = $settings['position' . $device] ?? '';

        if (
            $position === 'absolute' ||
            $position === 'fixed'
        ) {
            $options = $options + [
                'top' => 'absoluteTop',
                'bottom' => 'absoluteBottom',
                'left' => 'absoluteLeft',
                'right' => 'absoluteRight',
            ];
        }

        if ($position === 'sticky') {
            $options = $options + [
                'top' => 'stickyTop',
                'bottom' => 'stickyBottom',
            ];
        }

        foreach ($options as $property => $option) {
            $value = $settings[$option . $device] ?? '';

            if (empty($value)) {
                continue;
            }

            /** Add admin bar height to sticky top */
            if ($includeAdminBar && str_contains($option, 'stickyTop')) {
                $value = "calc({$value} + calc(var(--wp-admin--admin-bar--height, 0px)))";
            }

            /**
             * Necessary for sticky behaviors per device breakpoint
             * @link https://inpsyde.atlassian.net/browse/MOWE-149
             */
            if ($position === 'sticky' && str_contains($option, 'position')) {
                $this->stickyStyle($blockSelector, $settings, $device);
                continue;
            }

            empty($device)
                ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $value)
                : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $value);
        }

        return true;
    }

    // @phpcs:enable

    /**
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     *
     * @return void
     */
    private function stickyStyle(string $blockSelector, array $settings, string $device = ''): void
    {
        // Get configured scroll event
        $evt = $settings['stickyOnScroll' . $device] ?? '';

        // Always define styles for both scrolling up and down, otherwise it will not work per device
        $eventStyles = [
            ".has-scrolled-up $blockSelector" => !$evt || $evt === 'up' ? 'sticky' : 'static',
            ".has-scrolled-down $blockSelector" => !$evt || $evt === 'down' ? 'sticky' : 'static',
        ];

        foreach ($eventStyles as $selector => $value) {
            empty($device)
                ? $this->inlineCssGenerator->withMainProperty($selector, 'position', $value)
                : $this->inlineCssGenerator->withProperty($device, $selector, 'position', $value);
        }
    }

    /**
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @return bool
     */
    public function flexChildStyle(
        string $blockSelector,
        array $settings,
        string $device = ''
    ): bool {

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
     * @param string $blockSelector
     * @param array $attributes
     * @param string $device
     * @return bool
     */
    private function lineClampStyle(string $blockSelector, array $attributes, string $device = ''): bool
    {
        $typography = $attributes['typography'] ?? [];
        $lineClampKey = 'lineClamp' . $device;
        $lineClamp = $typography[$lineClampKey] ?? null;
        $hasLineClamp = $lineClamp !== null && $lineClamp !== '' && $lineClamp !== 0;

        if (!$hasLineClamp) {
            return true;
        }

        $styles = [
            'line-clamp' => $lineClamp,
            '-webkit-line-clamp' => $lineClamp,
            'display' => '-webkit-box',
            'overflow-x' => 'hidden',
            'overflow-y' => 'hidden',
            '-webkit-box-orient' => 'vertical',
            'box-orient' => 'vertical',
            'text-overflow' => 'ellipsis',
        ];

        foreach ($styles as $property => $value) {
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
     * Apply a generic color group style based on a group key and property.
     *
     * @param string $blockSelector CSS selector for the block.
     * @param array  $settings      Block settings array (contains color values).
     * @param string $group         The setting group key (e.g., 'textColor', 'backgroundColor').
     * @param string $property      The CSS property to apply (e.g., 'color', 'background-color').
     * @param string $state         Optional state suffix (e.g., 'Hover', 'Current').
     * @param string $device        Optional device suffix (e.g., '', 'Tablet', 'Mobile').
     * @return bool
     */
    public function colourGroupStyle(
        string $blockSelector,
        array $settings,
        string $group,
        string $property,
        string $state = '',
        string $device = ''
    ): bool {
        // Build the attribute key with optional state and device suffixes.
        $key = $group . $state . $device;
        $value = $settings[$key] ?? '';

        if ($value === '') {
            return true;
        }

        empty($device)
            ? $this->inlineCssGenerator->withMainProperty($blockSelector, $property, $value)
            : $this->inlineCssGenerator->withProperty($device, $blockSelector, $property, $value);

        return true;
    }
}
