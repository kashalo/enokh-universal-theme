<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Style;

class TextStyle implements BlockStyle
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

    public function generate(): BlockStyle
    {
        $this->mainStyle($this->settings);
        $this->tabletStyle($this->settings);
        $this->mobileStyle($this->settings);

        return $this;
    }

    /**
     * @param array $settings
     * @return string
     */
    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-text-%s',
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

    public function output(): string
    {
        return $this->inlineCssGenerator->output();
    }

    private function mainStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);
        // Hover active focus states
        $statesSelector = sprintf('%1$s:hover, %1$s:active, %1$s:focus', $blockSelector);

        $this->inlineCssGenerator->withMainProperty(
            $blockSelector,
            'color',
            $this->settings['textColor'] ?? ''
        );

        $this->inlineCssGenerator->withMainProperty(
            $statesSelector,
            'color',
            $this->settings['textColorHover'] ?? ''
        );

        $this->layoutStyle($blockSelector, $settings) &&
        $this->typographyStyle($settings) &&
        $this->spacingStyle($settings) &&
        $this->lineClampStyle($blockSelector, $settings);
        $this->columnStyle();
    }

    private function tabletStyle(array $settings): void
    {
        $device = 'Tablet';
        $blockSelector = $this->blockSelector($settings);
        // Hover active focus states
        $statesSelector = sprintf('%1$s:hover, %1$s:active, %1$s:focus', $blockSelector);

        $this->inlineCssGenerator->withProperty(
            $device,
            $blockSelector,
            'color',
            $this->settings["textColor{$device}"] ?? ''
        );

        $this->inlineCssGenerator->withProperty(
            $device,
            $statesSelector,
            'color',
            $this->settings["textColorHover{$device}"] ?? ''
        );

        $this->layoutStyle($blockSelector, $settings, $device) &&
        $this->typographyStyle($settings, $device) &&
        $this->spacingStyle($settings, $device) &&
        $this->lineClampStyle($blockSelector, $settings, $device);
        $this->columnStyle($device);
    }

    private function mobileStyle(array $settings): void
    {
        $device = 'Mobile';
        $blockSelector = $this->blockSelector($settings);
        // Hover active focus states
        $statesSelector = sprintf('%1$s:hover, %1$s:active, %1$s:focus', $blockSelector);

        $this->inlineCssGenerator->withProperty(
            $device,
            $blockSelector,
            'color',
            $this->settings["textColor{$device}"] ?? ''
        );

        $this->inlineCssGenerator->withProperty(
            $device,
            $statesSelector,
            'color',
            $this->settings["textColorHover{$device}"] ?? ''
        );

        $this->layoutStyle($blockSelector, $settings, $device) &&
        $this->typographyStyle($settings, $device) &&
        $this->spacingStyle($settings, $device) &&
        $this->lineClampStyle($blockSelector, $settings, $device);
        $this->columnStyle($device);
    }

    /**
     * Apply CSS for column layout.
     *
     * @param string $device Device suffix.
     */
    private function columnStyle(string $device = ''): void
    {
        $selector = $this->blockSelector($this->settings);
        $deviceKey = $this->deviceKey($device);
        $propertyKey = sprintf('column%s', $device);

        if (empty($this->settings[$propertyKey])) {
            return;
        }

        $property = 'columns';
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            $selector,
            $property,
            $this->settings[$propertyKey]
        );
    }

    /**
     * Get the data attribute key for a device context.
     *
     * @param string $device Device suffix (e.g., '', 'Tablet', 'Mobile').
     * @return string Data attribute key.
     */
    private function deviceKey(string $device = ''): string
    {
        return empty($device) ? InlineCssGenerator::ATTR_MAIN_KEY : $device;
    }
}
