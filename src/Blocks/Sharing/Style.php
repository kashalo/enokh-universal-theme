<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Sharing;

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
            '.enokh-blocks-sharing-buttons-%s',
            $settings['uniqueId']
        );
    }

    private function mainStyle(array $settings): void
    {
        $selector = $this->blockSelector($settings);

        $this->layoutStyle($selector, $settings);
        $this->flexChildStyle($selector, $settings);
        $this->spacingStyle($selector, $settings);
    }

    private function nonMainStyle(array $settings, string $device = ''): void
    {
        $selector = $this->blockSelector($settings);

        $this->layoutStyle($selector, $settings, $device);
        $this->flexChildStyle($selector, $settings, $device);
        $this->spacingStyle($selector, $settings, $device);
    }
}
