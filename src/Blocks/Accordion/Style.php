<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Accordion;

use Enokh\UniversalTheme\Style\BlockDefaultStylesTrait;
use Enokh\UniversalTheme\Style\BlockStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;

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

    private function mainStyle(array $settings): void
    {
        $panelSelector = $this->panelSelector($settings);
        $activePanelSelector = $this->activePanelSelector($settings);
        $headerItemSelector = $this->headerItemSelector($settings);
        $activeHeaderItemSelector = $this->activeHeaderItemSelector($settings);
        $panelAttributes = $settings['panel'] ?? [];
        $headerItemAttributes = $settings['headerItem'] ?? [];

        $this->spacingStyle($panelSelector, $panelAttributes);
        $this->borderStyle($panelSelector, $panelAttributes);
        $this->bordersHoverStyle($panelSelector, $panelAttributes);
        $this->bordersCurrentStyle($activePanelSelector, $panelAttributes);

        $this->sizingStyle($headerItemSelector, $headerItemAttributes);
        $this->spacingStyle($headerItemSelector, $headerItemAttributes);
        $this->borderStyle($headerItemSelector, $headerItemAttributes);
        $this->bordersHoverStyle($headerItemSelector, $headerItemAttributes);
        $this->bordersCurrentStyle($activeHeaderItemSelector, $headerItemAttributes);
        $this->colorStyle($headerItemSelector, $headerItemAttributes);
        $this->currentColorStyle($activeHeaderItemSelector, $headerItemAttributes);
        $this->typographyStyle($headerItemSelector, $headerItemAttributes);
    }

    private function nonMainStyle(array $settings, string $device = ''): void
    {
        $panelSelector = $this->panelSelector($settings);
        $activePanelSelector = $this->activePanelSelector($settings);
        $headerItemSelector = $this->headerItemSelector($settings);
        $activeHeaderItemSelector = $this->activeHeaderItemSelector($settings);
        $panelAttributes = $settings['panel'] ?? [];
        $headerItemAttributes = $settings['headerItem'] ?? [];

        $this->spacingStyle($panelSelector, $panelAttributes, $device);
        $this->borderStyle($panelSelector, $panelAttributes, $device);
        $this->bordersHoverStyle($panelSelector, $panelAttributes, $device);
        $this->bordersCurrentStyle($activePanelSelector, $panelAttributes, $device);

        $this->sizingStyle($headerItemSelector, $headerItemAttributes, $device);
        $this->spacingStyle($headerItemSelector, $headerItemAttributes, $device);
        $this->borderStyle($headerItemSelector, $headerItemAttributes, $device);
        $this->bordersHoverStyle($headerItemSelector, $headerItemAttributes, $device);
        $this->bordersCurrentStyle($activeHeaderItemSelector, $headerItemAttributes, $device);
        $this->colorStyle($headerItemSelector, $headerItemAttributes, $device);
        $this->currentColorStyle($activeHeaderItemSelector, $headerItemAttributes, $device);
        $this->typographyStyle($headerItemSelector, $headerItemAttributes, $device);
    }

    /**
     * @param array $settings
     * @return string
     */
    private function panelSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-accordion-%s .enokh-blocks-accordion-item',
            $settings['uniqueId']
        );
    }

    private function activePanelSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-accordion-%s .enokh-blocks-accordion-item.active',
            $settings['uniqueId']
        );
    }

    private function headerItemSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-accordion-%1$s .enokh-blocks-accordion-header-%1$s',
            $settings['uniqueId']
        );
    }

    private function activeHeaderItemSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-accordion-item.active .enokh-blocks-accordion-header-%1$s',
            $settings['uniqueId']
        );
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

    private function currentColorStyle(string $blockSelector, array $settings, string $device = ''): bool
    {
        $textColorCurrent = sprintf('textColorCurrent%s', $device);
        $backgroundColorCurrent = sprintf('backgroundColorCurrent%s', $device);
        $defaultOpacity = 1;
        $deviceKey = empty($device) ? InlineCssGenerator::ATTR_MAIN_KEY : $device;

        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            $blockSelector,
            'background-color',
            $this->inlineCssGenerator->hex2rgba(
                $settings[$backgroundColorCurrent] ?? '',
                $defaultOpacity
            )
        );
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            $blockSelector,
            'color',
            $settings[$textColorCurrent] ?? ''
        );

        return true;
    }

    private function colorStyle(string $blockSelector, array $settings, string $device = ''): bool
    {
        $textColor = sprintf('textColor%s', $device);
        $textColorHover = sprintf('textColorHover%s', $device);
        $backgroundColor = sprintf('backgroundColor%s', $device);
        $backgroundColorHover = sprintf('backgroundColorHover%s', $device);
        $defaultOpacity = 1;
        $deviceKey = empty($device) ? InlineCssGenerator::ATTR_MAIN_KEY : $device;

        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            sprintf("%s", $blockSelector),
            'background-color',
            $this->inlineCssGenerator->hex2rgba(
                $settings[$backgroundColor] ?? '',
                $defaultOpacity
            )
        );
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            sprintf("%s", $blockSelector),
            'color',
            $settings[$textColor] ?? ''
        );

        // Hover active focus states
        $statesSelector = sprintf('%1$s:hover, %1$s:active', $blockSelector);
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

        return true;
    }
}
