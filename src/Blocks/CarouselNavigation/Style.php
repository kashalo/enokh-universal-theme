<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselNavigation;

use Enokh\UniversalTheme\Style\BlockDefaultStylesTrait;
use Enokh\UniversalTheme\Style\BlockStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;

/**
 * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Files.LineLength.TooLong
 */
class Style implements BlockStyle
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

    public function withSettings(array $settings): BlockStyle
    {
        $this->settings = $settings;

        return $this;
    }

    public function generate(): BlockStyle
    {
        $this->mainStyle($this->settings);
        $this->nonMainStyle($this->settings, 'Tablet');
        $this->nonMainStyle($this->settings, 'Mobile');

        return $this;
    }

    public function output(): string
    {
        return $this->inlineCssGenerator->output();
    }

    /**
     * @param array $settings
     * @return string
     */
    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-carousel-navigation-%s',
            $settings['uniqueId']
        );
    }

    private function wrapperSelector(array $settings): string
    {
        $selector = $this->blockSelector($settings);
        return $selector . ' > .enokh-blocks-carousel-navigation__items-wrapper';
    }

    /**
     * @param array $settings
     * @return void
     */
    private function mainStyle(array $settings): void
    {
        $selector = $this->blockSelector($settings);
        $wrapperSelector = $this->wrapperSelector($settings);
        $alignItems = $settings['alignItems'] ?? '';
        $justifyContent = $settings['justifyContent'] ?? '';
        $orientation = $settings['orientation'] ?? '';
        $variant = $settings['variant'] ?? '';
        $gap = $settings['gap'] ?? '';
        $enableAdvancedPosition = $settings['enableAdvancedPosition'] ?? false;
        $advancedPosition = $settings['advancedPosition'] ?? [];

        $computedAlignItems = $alignItems === 'center' ? $alignItems : "flex-{$alignItems}";
        $computedJustifyContent = in_array($justifyContent, ['start', 'end'], true)
            ? "flex-{$justifyContent}"
            : $justifyContent;
        $computedOrientation = $orientation === 'horizontal' || $orientation === ''
            ? 'row'
            : 'column';
        $innerAlignItems = $settings['innerAlignItems'] ?? '';

        $this->inlineCssGenerator
            ->withMainProperty(
                $selector,
                'align-items',
                $orientation === 'horizontal' ? $computedAlignItems : $computedJustifyContent
            )
            ->withMainProperty(
                $selector,
                'justify-content',
                $orientation === 'horizontal' ? $computedJustifyContent : $computedAlignItems
            )
            ->withMainProperty(
                $selector,
                'top',
                $enableAdvancedPosition ? $advancedPosition['absoluteTop'] ?? '' : 0
            )
            ->withMainProperty(
                $selector,
                'bottom',
                $enableAdvancedPosition ? $advancedPosition['absoluteBottom'] ?? '' : 0
            )
            ->withMainProperty(
                $selector,
                'left',
                $enableAdvancedPosition ? $advancedPosition['absoluteLeft'] ?? '' : 0
            )
            ->withMainProperty(
                $selector,
                'right',
                $enableAdvancedPosition ? $advancedPosition['absoluteRight'] ?? '' : 0
            )
            ->withMainProperty(
                $selector,
                'height',
                $enableAdvancedPosition ? 'auto !important' : ''
            );

        // SVG
        $this->inlineCssGenerator
            ->withMainProperty($selector . ' svg', 'width', $settings['shape']['width'] ?? '')
            ->withMainProperty($selector . ' svg', 'height', $settings['shape']['height'] ?? '');

        $this->inlineCssGenerator
            ->withMainProperty(
                $selector . ' .active svg',
                'width',
                $settings['shape']['widthCurrent'] ?? ''
            )
            ->withMainProperty(
                $selector . ' .active svg',
                'height',
                $settings['shape']['heightCurrent'] ?? ''
            );

        // Wrapper
        $this->inlineCssGenerator
            ->withMainProperty($wrapperSelector, 'flex-direction', $computedOrientation)
            ->withMainProperty($wrapperSelector, 'row-gap', $gap)
            ->withMainProperty($wrapperSelector, 'column-gap', $gap);

        if ($variant === 'shape' || $variant === 'element') {
            $this->inlineCssGenerator
                ->withMainProperty($wrapperSelector, 'align-items', $innerAlignItems);
        }

        // Inner items
        $this->shapeStyle($settings);
        $this->fractionStyle($settings);
        $this->elementStyle($settings);
    }

    private function nonMainStyle(array $settings, string $device): void
    {
        $selector = $this->blockSelector($settings);
        $wrapperSelector = $this->wrapperSelector($settings);
        $alignItems = $settings["alignItems{$device}"] ?? '';
        $justifyContent = $settings["justifyContent{$device}"] ?? '';
        $orientation = $settings['orientation'] ?? '';
        $gap = $settings["gap{$device}"] ?? '';
        $enableAdvancedPosition = $settings['enableAdvancedPosition'] ?? false;
        $advancedPosition = $settings['advancedPosition'] ?? [];
        $variant = $settings['variant'] ?? '';

        $computedAlignItems = $alignItems === 'center' ? $alignItems : "flex-{$alignItems}";
        $computedJustifyContent = in_array($justifyContent, ['start', 'end'], true)
            ? "flex-{$justifyContent}"
            : $justifyContent;
        $computedOrientation = $orientation === 'horizontal' || $orientation === ''
            ? 'row'
            : 'column';
        $innerAlignItems = $settings["innerAlignItems{$device}"] ?? '';

        $this->inlineCssGenerator
            ->withProperty(
                $device,
                $selector,
                'align-items',
                $orientation === 'horizontal' ? $computedAlignItems : $computedJustifyContent
            )
            ->withProperty(
                $device,
                $selector,
                'justify-content',
                $orientation === 'horizontal' ? $computedJustifyContent : $computedAlignItems
            )
            ->withProperty(
                $device,
                $selector,
                'top',
                $enableAdvancedPosition ? $advancedPosition["absoluteTop{$device}"] ?? '' : 0
            )
            ->withProperty(
                $device,
                $selector,
                'bottom',
                $enableAdvancedPosition ? $advancedPosition["absoluteBottom{$device}"] ?? '' : 0
            )
            ->withProperty(
                $device,
                $selector,
                'left',
                $enableAdvancedPosition ? $advancedPosition["absoluteLeft{$device}"] ?? '' : 0
            )
            ->withProperty(
                $device,
                $selector,
                'right',
                $enableAdvancedPosition ? $advancedPosition["absoluteRight{$device}"] ?? '' : 0
            )
            ->withProperty(
                $device,
                $selector,
                'height',
                $enableAdvancedPosition ? 'auto !important' : ''
            );

        // SVG
        $this->inlineCssGenerator
            ->withProperty($device, $selector . ' svg', 'width', $settings['shape']["width{$device}"] ?? '')
            ->withProperty($device, $selector . ' svg', 'height', $settings['shape']["height{$device}"] ?? '');
        $this->inlineCssGenerator
            ->withProperty($device, $selector . ' .active svg', 'width', $settings['shape']["widthCurrent{$device}"] ?? '')
            ->withProperty($device, $selector . ' .active svg', 'height', $settings['shape']["heightCurrent{$device}"] ?? '');

        // Wrapper
        $this->inlineCssGenerator
            ->withProperty($device, $wrapperSelector, 'flex-direction', $computedOrientation)
            ->withProperty($device, $wrapperSelector, 'row-gap', $gap)
            ->withProperty($device, $wrapperSelector, 'column-gap', $gap);
        if ($variant === 'shape' || $variant === 'element') {
            $this->inlineCssGenerator
                ->withProperty($device, $wrapperSelector, 'align-items', $innerAlignItems);
        }

        // Inner items
        $this->shapeStyle($settings, $device);
        $this->fractionStyle($settings, $device);
        $this->elementStyle($settings, $device);
    }

    private function deviceKey(string $device = ''): string
    {
        return !empty($device) ? $device : InlineCssGenerator::ATTR_MAIN_KEY;
    }

    private function shapeStyle(array $settings, string $device = ''): void
    {
        $variant = $settings['variant'] ?? '';
        $shape = $settings['shape'] ?? [];
        $deviceKey = $this->deviceKey($device);

        if ($variant !== 'shape') {
            return;
        }

        $selector = $this->blockSelector($settings);
        $itemSelector = $selector . ' .enokh-blocks-carousel-navigation__item';

        $this->inlineCssGenerator
            ->withProperty($deviceKey, $itemSelector, 'color', $shape["background{$device}"] ?? '')
            ->withProperty($deviceKey, $itemSelector . '.active', 'color', $shape["backgroundCurrent{$device}"] ?? '')
            ->withProperty($deviceKey, $itemSelector . ':hover', 'color', $shape["backgroundHover{$device}"] ?? '');
    }

    private function fractionStyle(array $settings, string $device = ''): void
    {
        $variant = $settings['variant'] ?? '';

        if ($variant !== 'fraction') {
            return;
        }

        $selector = $this->blockSelector($settings);
        $wrapperSelector = $selector . ' > .enokh-blocks-carousel-navigation__items-wrapper';

        $this->colorStyle($wrapperSelector, $settings, $device);
        $this->typographyStyle($wrapperSelector, $settings, $device);
        $this->spacingStyle($wrapperSelector, $settings, $device);
        $this->borderStyle($wrapperSelector, $settings, $device);
        $this->bordersHoverStyle($wrapperSelector, $settings, $device);
    }

    private function elementStyle(array $settings, string $device = ''): void
    {
        $variant = $settings['variant'] ?? '';

        if ($variant !== 'element') {
            return;
        }

        $element = $settings['element'] ?? [];
        $deviceKey = $this->deviceKey($device);
        $selector = $this->blockSelector($settings);
        $itemSelector = $selector . ' .enokh-blocks-carousel-navigation__item';

        $this->inlineCssGenerator
            ->withProperty($deviceKey, $itemSelector, 'width', $element["width{$device}"] ?? '')
            ->withProperty($deviceKey, $itemSelector, 'height', $element["height{$device}"] ?? '');
        $this->inlineCssGenerator
            ->withProperty(
                $deviceKey,
                $itemSelector . '.active',
                'width',
                $element["widthCurrent{$device}"] ?? ''
            )
            ->withProperty(
                $deviceKey,
                $itemSelector . '.active',
                'height',
                $element["heightCurrent{$device}"] ?? ''
            );

        $this->inlineCssGenerator
            ->withProperty(
                $deviceKey,
                $itemSelector,
                'background-color',
                $element["background{$device}"] ?? ''
            )
            ->withProperty(
                $deviceKey,
                $itemSelector . '.active',
                'background-color',
                $element["backgroundCurrent{$device}"] ?? ''
            )
            ->withProperty(
                $deviceKey,
                $itemSelector . ':hover',
                'background-color',
                $element["backgroundHover{$device}"] ?? ''
            );

        $this->spacingStyle($itemSelector, $settings, $device);
        $this->borderStyle($itemSelector, $settings, $device);
        $this->bordersHoverStyle($itemSelector, $settings, $device);
        $this->bordersCurrentStyle($itemSelector . '.active', $settings, $device);
    }

    /**
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function bordersCurrentStyle(string $blockSelector, array $settings, string $device = ''): bool
    {

        $borderColours = $this->inlineCssGenerator->borderColourCss($settings, 'Current', $device);

        if (empty($borderColours)) {
            return true;
        }

        $propertyDevice = !empty($device) ? $device : InlineCssGenerator::ATTR_MAIN_KEY;
        foreach ($borderColours as $property => $value) {
            $this->inlineCssGenerator->withProperty($propertyDevice, $blockSelector, $property, $value);
        }

        return true;
    }
}

// phpcs:enable Syde.Functions.FunctionLength.TooLong
