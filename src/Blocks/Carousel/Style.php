<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Carousel;

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
            '.enokh-blocks-carousel-%s',
            $settings['uniqueId']
        );
    }

    private function mainStyle(array $settings): void
    {
        $blockSelector = $this->blockSelector($settings);

        $height = $settings['height'] ?? '';
        $minHeight = $settings['minHeight'] ?? '';

        $this->inlineCssGenerator
            ->withMainProperty($blockSelector, 'height', $height === 'fixed' ? $minHeight : 'auto');

        $this->spacingStyle($this->settings);
    }

    private function nonMainStyle(array $settings, string $device = ''): void
    {
        $blockSelector = $this->blockSelector($settings);

        $height = $settings["height{$device}"] ?? '';
        $minHeight = $settings["minHeight{$device}"] ?? '';

        $this->inlineCssGenerator->withProperty(
            $device,
            $blockSelector,
            'height',
            $height === 'fixed' ? $minHeight : 'auto'
        );

        $this->spacingStyle($this->settings, $device);
    }

    /**
     * @param array $settings
     * @param string $device
     * @return void
     */
    private function spacingStyle(array $settings, string $device = ''): void
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
    }
}
