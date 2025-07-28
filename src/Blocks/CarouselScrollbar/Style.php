<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselScrollbar;

use Enokh\UniversalTheme\Style\BlockDefaultStylesTrait;
use Enokh\UniversalTheme\Style\BlockStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;

/**
 * @phpcs:disable Syde.Files.LineLength.TooLong
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
        $this->applyStyle($this->settings, '', true);
        $this->applyStyle($this->settings, 'Tablet');
        $this->applyStyle($this->settings, 'Mobile');

        return $this;
    }

    public function output(): string
    {
        return $this->inlineCssGenerator->output();
    }

    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-carousel-scrollbar-%s',
            $settings['uniqueId']
        );
    }

    private function dragSelector(array $settings): string
    {
        return sprintf(
            '%s .enokh-blocks-carousel-scrollbar__drag',
            $this->blockSelector($settings)
        );
    }

    /**
     * @param array $settings
     * @param string $device
     * @param bool $isMain
     * @return void
     */
    private function applyStyle(array $settings, string $device = '', bool $isMain = false): void
    {
        $selector = $this->blockSelector($settings);
        $dragSelector = $this->dragSelector($settings);

        $colours = $settings['colors'] ?? [];
        $sizing = $settings['sizing'] ?? [];
        $display = $settings['display'] ?? [];

        $scrollbarBg = $colours["scrollbarBackground{$device}"] ?? '';
        $scrollbarDrag = $colours["scrollbarDrag{$device}"] ?? '';
        $height = $sizing["height{$device}"] ?? '';
        $width = $sizing["width{$device}"] ?? '';
        $absoluteTop = $display["absoluteTop{$device}"] ?? '';
        $absoluteBottom = $display["absoluteBottom{$device}"] ?? '';
        $absoluteLeft = $display["absoluteLeft{$device}"] ?? '';

        $apply = $isMain
            ? fn (string $selector, string $prop, mixed $val) => $this->inlineCssGenerator->withMainProperty($selector, $prop, $val)
            : fn (string $selector, string $prop, mixed $val) => $this->inlineCssGenerator->withProperty($device, $selector, $prop, $val);

        /**
         * The scrollbar
         */
        $apply($selector, '--swiper-scrollbar-bg-color', $scrollbarBg);
        $apply($selector, '--swiper-scrollbar-size', $height);
        $apply($selector, '--swiper-scrollbar-top', $absoluteTop);
        $apply($selector, '--swiper-scrollbar-bottom', $absoluteBottom);
        $apply($selector, '--swiper-scrollbar-sides-offset', $absoluteLeft);
        $apply($selector, 'width', $width);
        $this->borderStyle($selector, $settings);

        /**
         * The drag nested in scrollbar
         */
        $apply($dragSelector, 'height', $height);
        $apply($dragSelector, 'background', $scrollbarDrag);
        $this->borderStyle($dragSelector, $settings);
    }
}
