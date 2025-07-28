<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselPrevious;

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

    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-carousel-previous-%s',
            $settings['uniqueId']
        );
    }

    private function mainStyle(array $settings): void
    {
        $display = $settings['iconDisplay'] ?? [];
        $iconSize = $display['size'] ?? '';
        $selector = $this->blockSelector($settings);

        $this->inlineCssGenerator
            ->withMainProperty($selector . ' svg', 'width', $iconSize)
            ->withMainProperty($selector . ' svg', 'height', $iconSize);

        $this->sizingStyle($selector, $settings);
        $this->layoutStyle($selector, $settings, '', 'wrapperDisplay');
        $this->flexChildStyle($selector, $settings);
        $this->colorStyle($selector, $settings);
        $this->spacingStyle($selector, $settings);
        $this->borderStyle($selector, $settings);

        // Hover
        $this->borderStyle($selector . ':hover', $settings);
        $this->bordersHoverStyle($selector, $settings);

        // Disabled
        $this->borderStyle($selector . ':disabled', $settings);
        $this->disabledColorStyle($selector, $settings);
        $this->bordersDisabledStyle($selector, $settings);
    }

    private function nonMainStyle(array $settings, string $device = ''): void
    {
        $display = $settings['iconDisplay'] ?? [];
        $iconSize = $display["size{$device}"] ?? '';
        $selector = $this->blockSelector($settings);

        $this->inlineCssGenerator
            ->withProperty($device, $selector . ' svg', 'width', $iconSize)
            ->withProperty($device, $selector . ' svg', 'height', $iconSize);

        $this->sizingStyle($selector, $settings, $device);
        $this->layoutStyle($selector, $settings, $device, 'wrapperDisplay');
        $this->flexChildStyle($selector, $settings, $device);
        $this->colorStyle($selector, $settings, $device);
        $this->spacingStyle($selector, $settings, $device);
        $this->borderStyle($selector, $settings, $device);

        // Hover
        $this->borderStyle($selector . ':hover', $settings, $device);
        $this->bordersHoverStyle($selector, $settings, $device);

        // Disabled
        $this->borderStyle($selector . ':disabled', $settings, $device);
        $this->disabledColorStyle($selector, $settings, $device);
        $this->bordersDisabledStyle($selector, $settings, $device);
    }

    /**
     * @param string $blockSelector
     * @param array $settings
     * @param string $device
     * @return bool
     */
    private function bordersDisabledStyle(string $blockSelector, array $settings, string $device = ''): bool
    {
        $selector = sprintf('%1$s:disabled, %1$s:disabled:hover', $blockSelector);

        $borderColours = $this->inlineCssGenerator->borderColourCss($settings, 'Disabled', $device);

        if (empty($borderColours)) {
            return true;
        }

        $propertyDevice = !empty($device) ? $device : InlineCssGenerator::ATTR_MAIN_KEY;
        foreach ($borderColours as $property => $value) {
            $this->inlineCssGenerator->withProperty($propertyDevice, $selector, $property, $value);
        }

        return true;
    }

    private function disabledColorStyle(string $blockSelector, array $settings, string $device = ''): void
    {

        $selector = sprintf('%1$s:disabled, %1$s:disabled:hover', $blockSelector);
        $textColor = sprintf('textColorDisabled%s', $device);
        $backgroundColor = sprintf('backgroundColorDisabled%s', $device);
        $defaultOpacity = 1;
        $deviceKey = empty($device) ? InlineCssGenerator::ATTR_MAIN_KEY : $device;

        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            $selector,
            'background-color',
            $this->inlineCssGenerator->hex2rgba(
                $settings[$backgroundColor] ?? '',
                $defaultOpacity
            )
        );
        $this->inlineCssGenerator->withProperty(
            $deviceKey,
            $selector,
            'color',
            $settings[$textColor] ?? ''
        );
    }
}
