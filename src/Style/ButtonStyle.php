<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Style;

class ButtonStyle implements BlockStyle
{
    use BlockDefaultStylesTrait;

    /**
     * @var array<string, mixed>
     */
    protected array $settings;
    private InlineCssGenerator $inlineCssGenerator;

    /**
     * @param InlineCssGenerator $inlineCssGenerator
     */
    public function __construct(InlineCssGenerator $inlineCssGenerator)
    {
        $this->settings = [];
        $this->inlineCssGenerator = $inlineCssGenerator;
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
     * @inheritDoc
     */
    public function generate(): BlockStyle
    {
        $this->mainStyle($this->settings);
        $this->tabletStyle($this->settings);
        $this->mobileStyle($this->settings);

        return $this;
    }

    /**
     * @param array $settings
     * @return void
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong
     */
    private function mainStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);
        $this->inlineCssGenerator->withMainProperty($blockSelector, 'text-decoration', 'none');

        $this->colorStyle($this->settings) &&
        $this->sizingStyle($this->settings) &&
        $this->layoutStyle($blockSelector, $this->settings) &&
        $this->typographyStyle($this->settings) &&
        $this->flexChildStyle($this->settings) &&
        $this->spacingStyle($this->settings) &&
        $this->borderStyle($this->settings) &&
        $this->bordersColorsStyle($this->settings);

        /**
         * Effects
         */
        $this->textShadowStyle($this->settings);
        $this->typographyEffectsStyle($this->settings);
    }

    /**
     * @param array $settings
     * @return string
     */
    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-button-%s',
            $settings['uniqueId']
        );
    }

    /**
     * @param array $settings
     * @param string $device
     * @return bool
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong
     */
    private function colorStyle(array $settings, string $device = ''): bool
    {
        $defaultOpacity = 1;
        $deviceKey = empty($device) ? InlineCssGenerator::ATTR_MAIN_KEY : $device;
        $blockSelector = $this->blockSelector($settings);
        $stateConfigs = $this->stateSelectors($blockSelector);

        foreach ($stateConfigs as $state => $selector) {
            $stateKey = $state === 'Default' ? '' : $state;
            $textColorKey = sprintf('textColor%s%s', $stateKey, $device);
            $backgroundColorKey = sprintf('backgroundColor%s%s', $stateKey, $device);

            !empty($this->settings[$backgroundColorKey]) and $this->inlineCssGenerator->withProperty(
                $deviceKey,
                $selector,
                'background-color',
                $this->inlineCssGenerator->hex2rgba(
                    $this->settings[$backgroundColorKey],
                    $defaultOpacity
                )
            );
            !empty($this->settings[$textColorKey]) and $this->inlineCssGenerator->withProperty(
                $deviceKey,
                $selector,
                'color',
                $this->settings[$textColorKey]
            );
        }

        return true;
    }

    /**
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function sizingStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $options = [
            'width' => 'width',
            'height' => 'height',
            'min-width' => 'minWidth',
            'min-height' => 'minHeight',
            'max-width' => 'maxWidth',
            'max-height' => 'maxHeight',
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
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function typographyStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $stateConfigs = $this->stateSelectors($blockSelector);

        $options = [
            'font-family' => 'fontFamily',
            'font-size' => 'fontSize',
            'line-height' => 'lineHeight',
            'letter-spacing' => 'letterSpacing',
            'font-weight' => 'fontWeight',
            'text-transform' => 'textTransform',
            'text-align' => 'textAlign',
        ];

        foreach ($stateConfigs as $selector) {
            foreach ($options as $property => $option) {
                $optionName = $option . $device;
                $value = $settings['typography'][$optionName] ?? '';

                if (empty($value)) {
                    continue;
                }

                empty($device)
                    ? $this->inlineCssGenerator->withMainProperty($selector, $property, $value)
                    : $this->inlineCssGenerator->withProperty($device, $selector, $property, $value);
            }
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
        $stateConfigs = $this->stateSelectors($blockSelector);
        foreach ($stateConfigs as $state => $selector) {
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
                ? $this->inlineCssGenerator->withMainProperty($selector, $property, $paddingValues)
                : $this->inlineCssGenerator->withProperty($device, $selector, $property, $paddingValues);

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
                ? $this->inlineCssGenerator->withMainProperty($selector, $property, $marginValues)
                : $this->inlineCssGenerator->withProperty($device, $selector, $property, $marginValues);
        }

        return true;
    }

    /**
     * @param array $settings
     * @param string $device
     * @return bool
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    private function borderStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $deviceKey = $device ?: InlineCssGenerator::ATTR_MAIN_KEY;
        $stateConfigs = $this->stateSelectors(".enokh-blocks-button{$blockSelector}");

        // Prepare values
        $borderRadiusValues = array_map(
            static fn (string $attribute): string =>
                $settings['borders'][$attribute . $device] ?? '',
            [
                'borderTopLeftRadius',
                'borderTopRightRadius',
                'borderBottomRightRadius',
                'borderBottomLeftRadius',
            ]
        );

        $sides = ['Top', 'Right', 'Bottom', 'Left'];
        $borderWidths = [];
        $borderStyles = [];

        foreach ($sides as $side) {
            $width = $settings['borders']["border{$side}Width{$device}"] ?? '';
            $style = $settings['borders']["border{$side}Style{$device}"] ?? '';

            $sideKey = strtolower($side);

            if ($width !== '') {
                $borderWidths["border-{$sideKey}-width"] = $width;
            }

            if ($style !== '') {
                $borderStyles["border-{$sideKey}-style"] = $style;
            }
        }

        foreach ($stateConfigs as $selector) {
            if (!empty(array_filter($borderRadiusValues))) {
                $this->inlineCssGenerator->withProperty(
                    $deviceKey,
                    $selector,
                    'border-radius',
                    $borderRadiusValues
                );
            }

            foreach ($borderWidths as $property => $value) {
                $this->inlineCssGenerator->withProperty($deviceKey, $selector, $property, $value);
            }

            foreach ($borderStyles as $property => $value) {
                $this->inlineCssGenerator->withProperty($deviceKey, $selector, $property, $value);
            }
        }

        return true;
    }

    /**
     *
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function bordersColorsStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $deviceKey = $device ?: InlineCssGenerator::ATTR_MAIN_KEY;
        $stateConfigs = $this->stateSelectors($blockSelector);

        foreach ($stateConfigs as $state => $selector) {
            $stateKey = $state === 'Default' ? '' : $state;
            $borderColors = $this->inlineCssGenerator->borderColourCss($settings, $stateKey, $device);
            if (empty($borderColors)) {
                continue;
            }

            foreach ($borderColors as $property => $value) {
                $this->inlineCssGenerator->withProperty($deviceKey, $selector, $property, $value);
            }
        }

        return true;
    }

    /** @phpcs:enable */

    private function tabletStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);
        $device = 'Tablet';
        $this->colorStyle($this->settings, $device) &&
        $this->sizingStyle($this->settings, $device) &&
        $this->layoutStyle($blockSelector, $this->settings, $device) &&
        $this->typographyStyle($this->settings, $device) &&
        $this->flexChildStyle($this->settings, $device) &&
        $this->spacingStyle($this->settings, $device) &&
        $this->borderStyle($this->settings, $device);
        $this->bordersColorsStyle($this->settings, $device);
    }

    private function mobileStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);
        $device = 'Mobile';
        $this->colorStyle($this->settings, $device) &&
        $this->sizingStyle($this->settings, $device) &&
        $this->layoutStyle($blockSelector, $this->settings, $device) &&
        $this->typographyStyle($this->settings, $device) &&
        $this->flexChildStyle($this->settings, $device) &&
        $this->spacingStyle($this->settings, $device) &&
        $this->borderStyle($this->settings, $device);
        $this->bordersColorsStyle($this->settings, $device);
    }

    /**
     * @inheritDoc
     */
    public function output(): string
    {
        return $this->inlineCssGenerator->output();
    }

    /**
     * Returns an array of standard block state selectors used across styles.
     *
     * @param string $blockSelector
     * @return array<string, string>
     */
    private function stateSelectors(string $blockSelector): array
    {
        /**
         * Default
         */
        $defaultSelectors = [
            $blockSelector,
            sprintf('%s:visited', $blockSelector),
        ];
        /**
         * Visited
         */
        $visitedSelectors = [
            sprintf('%s:visited', $blockSelector),
        ];
        /**
         * Hover
         */
        $hoverStatesSelectors = [
            sprintf('%1$s:hover', $blockSelector),
            sprintf('%1$s:focus', $blockSelector),
            sprintf('.enokh-blocks-accordion-header:hover > %1$s', $blockSelector),
        ];
        /**
         * Pressed
         */
        $pressedSelectors = [
            sprintf('%1$s:active', $blockSelector),
        ];
        /**
         * Disabled
         */
        $disabledSelectors = [
            sprintf('%1$s:disabled', $blockSelector),
            sprintf('%1$s[disabled]', $blockSelector),
            sprintf('%1$s[disabled]:hover', $blockSelector),
        ];
        /**
         * Current
         */
        $currentStates = ['', ':hover', ':active', ':focus', ':visited'];
        $currentSelectors = array_map(
            static fn (string $state): string =>
            sprintf('%s.enokh-blocks-block-is-current%s', $blockSelector, $state),
            $currentStates
        );
        $currentSelectors[] = sprintf('[aria-selected="true"] %s', $blockSelector);
        $currentSelectors[] = sprintf('%s[aria-expanded="true"]', $blockSelector);

        $defaultSelector = implode(', ', $defaultSelectors);
        $hoverSelector = implode(', ', $hoverStatesSelectors);
        $currentSelector = implode(', ', $currentSelectors);
        $pressedSelector = implode(', ', $pressedSelectors);
        $disabledSelector = implode(', ', $disabledSelectors);

        return [
            'Default' => $defaultSelector,
            'Hover' => $hoverSelector,
            'Current' => $currentSelector,
            'Pressed' => $pressedSelector,
            'Disabled' => $disabledSelector,
        ];
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
            $settingKey = $this->effectSettingKey($data['device'] ?? '');

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
     */
    private function typographyEffectsStyle(array $settings): bool
    {
        if (!$settings['useTypography'] || empty($settings['typographyEffects'])) {
            return true;
        }

        $typographyEffectsData = $this->typographyEffectsData($settings);

        if (empty($typographyEffectsData)) {
            return true;
        }

        foreach ($typographyEffectsData as $target => $data) {
            $settingKey = $this->effectSettingKey($data['device'] ?? '');


            isset($data['fontWeight']) and $this->inlineCssGenerator->withProperty(
                $settingKey,
                $data['selector'],
                'font-weight',
                $data['fontWeight']
            );

            isset($data['textTransform']) and $this->inlineCssGenerator->withProperty(
                $settingKey,
                $data['selector'],
                'text-transform',
                $data['textTransform']
            );

            isset($data['letterSpacing']) and $this->inlineCssGenerator->withProperty(
                $settingKey,
                $data['selector'],
                'letter-spacing',
                $data['letterSpacing']
            );
        }

        return true;
    }

    /**
     * @param array $settings
     * @return array
     */
    private function typographyEffectsData(array $settings): array
    {
        $effectsData = [];

        foreach ($settings['typographyEffects'] as $key => $value) {
            $effectSelector = $this->inlineCssGenerator->effectSelector(
                $settings['typographyEffects'],
                $settings,
                $this->blockSelector($settings),
                $key
            );
            $element = $effectSelector['element'];
            $effectSelector = $effectSelector['selector'];

            $effectsData[$element]['selector'] = $effectSelector;
            $effectsData[$element]['state'] = !empty($value['state']) ? $value['state'] : 'normal';
            $effectsData[$element]['device'] = !empty($value['device']) ? $value['device'] : 'all';


            if (!empty($value['fontWeight'])) {
                $effectsData[$element]['fontWeight'] = $value['fontWeight'];
            }
            if (!empty($value['textTransform'])) {
                $effectsData[$element]['textTransform'] = $value['textTransform'];
            }
            if (isset($value['letterSpacing']) && $value['letterSpacing'] !== '') {
                $effectsData[$element]['letterSpacing'] = $value['letterSpacing'];
            }
        }

        return $effectsData;
    }

    /**
     * @param string $device
     * @return string
     */
    private function effectSettingKey(string $device): string
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

    // @phpcs:enable
}
