<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Style;

use Enokh\UniversalTheme\Utility\BlockUtility;

class GridStyle implements BlockStyle
{
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
     */
    public function generate(): self
    {
        $this->mainStyle($this->settings);
        $this->tabletStyle($this->settings);
        $this->mobileStyle($this->settings);

        return $this;
    }

    private function mainStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);
        $gapDirection = is_rtl() ? 'right' : 'left';

        $this->layoutStyle($this->settings);
        $this->dividerStyle($this->settings);

        $this->inlineCssGenerator
            ->withMainProperty($blockSelector, 'align-items', $settings['verticalAlignment'])
            ->withMainProperty($blockSelector, 'justify-content', $settings['horizontalAlignment'])
            ->withMainProperty($blockSelector, 'row-gap', $settings['verticalGap']);

        !empty($settings['horizontalGap']) and $this->inlineCssGenerator
            ->withMainProperty(
                $blockSelector,
                'margin-' . $gapDirection,
                '-' . $settings['horizontalGap']
            );

        $this->inlineCssGenerator
            ->withMainProperty(
                $blockSelector . ' > .enokh-blocks-grid-column',
                'padding-' . $gapDirection,
                $settings['horizontalGap']
            );

        $this->inlineCssGenerator
            ->withMainProperty(
                $blockSelector,
                '--enokh-blocks-margin-' . $gapDirection,
                $settings['horizontalGap']
            );

        $this->inlineCssGenerator
            ->withMainProperty(
                $blockSelector,
                '--enokh-blocks-row-gap',
                $settings['verticalGap']
            );
    }

    private function tabletStyle(array $settings): void
    {
        $device = 'Tablet';
        $blockSelector = $this->blockSelector($settings);
        $gapDirection = is_rtl() ? 'right' : 'left';

        $this->layoutStyle($this->settings, $device);
        $this->dividerStyle($this->settings, $device);

        $this->inlineCssGenerator
            ->withProperty($device, $blockSelector, 'row-gap', $settings['verticalGapTablet']);

        $settings['verticalAlignmentTablet'] !== 'inherit' and $this->inlineCssGenerator
            ->withProperty(
                $device,
                $blockSelector,
                'align-items',
                $settings['verticalAlignmentTablet']
            );
        $settings['horizontalAlignmentTablet'] !== 'inherit' and $this->inlineCssGenerator
            ->withProperty(
                $device,
                $blockSelector,
                'justify-content',
                $settings['horizontalAlignmentTablet']
            );
        !empty($settings['horizontalGapTablet']) and $this->inlineCssGenerator
            ->withProperty(
                $device,
                $blockSelector,
                'margin-' . $gapDirection,
                '-' . $settings['horizontalGapTablet']
            );

        $this->inlineCssGenerator
        ->withProperty(
            $device,
            $blockSelector . ' > .enokh-blocks-grid-column',
            'padding-' . $gapDirection,
            $settings['horizontalGapTablet']
        );

        $this->inlineCssGenerator
            ->withProperty(
                $device,
                $blockSelector,
                '--enokh-blocks-margin-' . $gapDirection,
                $settings['horizontalGapTablet']
            );

        $this->inlineCssGenerator
            ->withMainProperty(
                $blockSelector,
                '--enokh-blocks-row-gap',
                $settings['verticalGapTablet']
            );
    }

    private function mobileStyle(array $settings): void
    {
        $device = 'Mobile';
        $blockSelector = $this->blockSelector($settings);
        $gapDirection = is_rtl() ? 'right' : 'left';

        $this->layoutStyle($this->settings, $device);
        $this->dividerStyle($this->settings, $device);

        $this->inlineCssGenerator
            ->withProperty($device, $blockSelector, 'row-gap', $settings['verticalGapMobile']);

        $settings['verticalAlignmentTablet'] !== 'inherit' and $this->inlineCssGenerator
            ->withProperty(
                $device,
                $blockSelector,
                'align-items',
                $settings['verticalAlignmentMobile']
            );
        $settings['horizontalAlignmentTablet'] !== 'inherit' and $this->inlineCssGenerator
            ->withProperty(
                $device,
                $blockSelector,
                'justify-content',
                $settings['horizontalAlignmentMobile']
            );
        !empty($settings['horizontalGapTablet']) and $this->inlineCssGenerator
            ->withProperty(
                $device,
                $blockSelector,
                'margin-' . $gapDirection,
                '-' . $settings['horizontalGapMobile']
            );

        $this->inlineCssGenerator
        ->withProperty(
            $device,
            $blockSelector . ' > .enokh-blocks-grid-column',
            'padding-' . $gapDirection,
            $settings['horizontalGapMobile']
        );

        $this->inlineCssGenerator
            ->withProperty(
                $device,
                $blockSelector,
                '--enokh-blocks-margin-' . $gapDirection,
                $settings['horizontalGapMobile']
            );

        $this->inlineCssGenerator
            ->withMainProperty(
                $blockSelector,
                '--enokh-blocks-row-gap',
                $settings['verticalGapMobile']
            );
    }

    /**
     * @param array $settings
     * @return string
     */
    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-grid-wrapper-%s',
            $this->settings['uniqueId']
        );
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
     * @param string $device
     * @return bool
     */
    private function layoutStyle(array $settings, string $device = ''): bool
    {
        $blockSelector = $this->blockSelector($settings) . ' > .enokh-blocks-grid-column';
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
            "%s > .enokh-blocks-grid-column::before",
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
                    "calc(calc(var(--enokh-blocks-margin-left,0) / 2) - calc(%s / 2))",
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
                    "calc(calc(calc(var(--enokh-blocks-row-gap,0) / 2) - calc(%s / 2)) * -1)",
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
