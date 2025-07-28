<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\TabPanel;

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

    /**
     * @param array $settings
     * @return string
     */
    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-tab-item-header-%s',
            $settings['uniqueId']
        );
    }

    private function tabListSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-tabs-%s [role="tablist"]',
            $settings['uniqueId']
        );
    }

    private function mainStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);
        $tabListSelector = $this->tabListSelector($settings);

        $attributes = $settings['navigation'] ?? [];
        $panelAttributes = $settings['panel'] ?? [];

        $this->layoutStyle($blockSelector, $attributes);
        $this->sizingStyle($blockSelector, $attributes);
        $this->spacingStyle($blockSelector, $attributes);
        $this->borderStyle($blockSelector, $attributes);
        $this->borderStyle($tabListSelector, $panelAttributes);
        $this->colorStyle($blockSelector, $attributes);

        $this->bordersHoverStyle($blockSelector, $attributes);
        $this->bordersCurrentStyle('[aria-selected="true"] > ' . $blockSelector, $attributes);

        // Panel
        $this->inlineCssGenerator
            ->withMainProperty(
                $tabListSelector,
                'column-gap',
                $panelAttributes['spacingBetween'] ?? ''
            )
            ->withMainProperty(
                $tabListSelector,
                'align-items',
                $panelAttributes['verticalAlignment'] ?? ''
            )
            ->withMainProperty(
                $tabListSelector,
                'justify-content',
                $panelAttributes['horizontalAlignment'] ?? ''
            );
    }

    private function nonMainStyle(array $settings, string $device = ''): void
    {
        $blockSelector = $this->blockSelector($settings);
        $tabListSelector = $this->tabListSelector($settings);

        $attributes = $settings['navigation'] ?? [];
        $panelAttributes = $settings['panel'] ?? [];

        $this->layoutStyle($blockSelector, $attributes, $device);
        $this->sizingStyle($blockSelector, $attributes, $device);
        $this->spacingStyle($blockSelector, $attributes, $device);
        $this->borderStyle($blockSelector, $attributes, $device);
        $this->borderStyle($tabListSelector, $panelAttributes, $device);
        $this->colorStyle($blockSelector, $attributes, $device);

        $this->bordersHoverStyle($blockSelector, $attributes, $device);
        $this->bordersCurrentStyle(
            '[aria-selected="true"] > ' . $blockSelector,
            $attributes,
            $device
        );

        !empty($panelAttributes['verticalAlignment' . $device]) and
        $panelAttributes['verticalAlignment' . $device] !== 'inherit' and
        $this->inlineCssGenerator
            ->withProperty(
                $device,
                $tabListSelector,
                'align-items',
                $panelAttributes['verticalAlignment' . $device]
            );
        !empty($panelAttributes['horizontalAlignment' . $device]) and
        $panelAttributes['horizontalAlignment' . $device] !== 'inherit' and
        $this->inlineCssGenerator
            ->withProperty(
                $device,
                $tabListSelector,
                'justify-content',
                $panelAttributes['horizontalAlignment' . $device]
            );

        !empty($panelAttributes['spacingBetween' . $device]) and
        $panelAttributes['spacingBetween' . $device] !== 'inherit' and
        $this->inlineCssGenerator
            ->withProperty(
                $device,
                $blockSelector,
                'column-gap',
                $panelAttributes['spacingBetween' . $device]
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
}
