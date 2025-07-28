<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselArrows;

use Enokh\UniversalTheme\Style\BlockStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;

/**
 * @phpcs:disable Syde.Files.LineLength.TooLong
 */
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

    private function blockSelector(array $settings): string
    {
        return sprintf(
            '.enokh-blocks-carousel-arrows-%s',
            $settings['uniqueId']
        );
    }

    private function mainStyle(array $settings): void
    {
        $selector = $this->blockSelector($settings);
        $alignItems = $settings['alignItems'] ?? '';
        $justifyContent = $settings['justifyContent'] ?? '';
        $computedAlignItems =
            $alignItems === 'center' ? $alignItems : sprintf("flex-%s", $alignItems === 'top' ? 'start' : 'end');
        $computedJustifyContent = in_array($justifyContent, ['start', 'end'], true)
            ? "flex-{$justifyContent}"
            : $justifyContent;

        $this->inlineCssGenerator
            ->withMainProperty($selector, 'align-items', $computedAlignItems)
            ->withMainProperty($selector, 'justify-content', $computedJustifyContent);
    }

    private function nonMainStyle(array $settings, string $device = ''): void
    {
        $selector = $this->blockSelector($settings);
        $alignItems = $settings["alignItems{$device}"] ?? '';
        $justifyContent = $settings["justifyContent{$device}"] ?? '';
        $computedAlignItems =
            $alignItems === 'center' ? $alignItems : sprintf("flex-%s", $alignItems === 'top' ? 'start' : 'end');
        $computedJustifyContent = in_array($justifyContent, ['start', 'end'], true)
            ? "flex-{$justifyContent}"
            : $justifyContent;

        $this->inlineCssGenerator
            ->withProperty($device, $selector, 'align-items', $computedAlignItems)
            ->withProperty($device, $selector, 'justify-content', $computedJustifyContent);
    }
}
