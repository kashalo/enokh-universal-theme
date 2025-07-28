<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Icon;

//phpcs:disable Syde.Files.LineLength.TooLong
use Enokh\UniversalTheme\Style\BlockStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;

class Style implements BlockStyle
{
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
     * @inheritDoc
     */
    public function withSettings(array $settings): BlockStyle
    {
        $this->settings = $settings;

        return $this;
    }

    /**
     * @param array $settings
     * @return string
     */
    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-icon-%s',
            $settings['uniqueId']
        );
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
     * @inheritDoc
     */
    public function output(): string
    {
        return $this->inlineCssGenerator->output();
    }

    private function mainStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);

        $this->inlineCssGenerator
            ->withMainProperty($blockSelector . " svg", 'width', $settings['width'])
            ->withMainProperty($blockSelector . " svg", 'height', $settings['height'])
            ->withMainProperty($blockSelector, 'color', $settings['textColor'] ?? '')
            ->withMainProperty($blockSelector . ":hover", 'color', $settings['textColorHover'] ?? '')
            ->withMainProperty(
                $blockSelector,
                'background-color',
                $this->inlineCssGenerator->hex2rgba(
                    $this->settings['backgroundColor'],
                    $this->settings['backgroundColorOpacity']
                )
            );

        $this->layoutStyle($this->settings) &&
        $this->spacingStyle($this->settings) &&
        $this->borderStyle($this->settings) &&
        $this->bordersHoverStyle($this->settings);
    }

    private function tabletStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);
        $device = 'Tablet';

        $this->inlineCssGenerator
            ->withProperty($device, $blockSelector . " svg", 'width', $settings['width' . $device] ?? '')
            ->withProperty($device, $blockSelector . " svg", 'height', $settings['width' . $device] ?? '');

        $this->layoutStyle($this->settings, $device) &&
        $this->spacingStyle($this->settings, $device) &&
        $this->borderStyle($this->settings, $device);
    }

    private function mobileStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);
        $device = 'Mobile';

        $this->inlineCssGenerator
            ->withProperty($device, $blockSelector . " svg", 'width', $settings['width' . $device] ?? '')
            ->withProperty($device, $blockSelector . " svg", 'height', $settings['width' . $device] ?? '');

        $this->layoutStyle($this->settings, $device) &&
        $this->spacingStyle($this->settings, $device) &&
        $this->borderStyle($this->settings, $device);
    }

    private function layoutStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $options = [
            'display' => 'display',
        ];

        foreach ($options as $property => $option) {
            $value = $settings[$option . $device] ?? '';

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
     */
    private function bordersHoverStyle(array $settings): bool
    {
        $blockSelector = $this->blockSelector($settings);
        $selector = sprintf("%s:hover", $blockSelector);

        $borderColours = $this->inlineCssGenerator->borderColourCss($settings, 'Hover');

        if (empty($borderColours)) {
            return true;
        }

        foreach ($borderColours as $property => $value) {
            $this->inlineCssGenerator->withMainProperty($selector, $property, $value);
        }

        return true;
    }
}

//phpcs:enable
