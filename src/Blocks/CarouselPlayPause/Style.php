<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselPlayPause;

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
        $this->generateCss($this->settings);
        $this->generateCss($this->settings, 'Tablet');
        $this->generateCss($this->settings, 'Mobile');

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
            '.enokh-blocks-carousel-play-pause-%s',
            $settings['uniqueId']
        );
    }

    private function playButtonSelector(array $settings): string
    {
        return sprintf("%s .play-button", $this->blockSelector($settings));
    }

    private function pauseButtonSelector(array $settings): string
    {
        return sprintf("%s .pause-button", $this->blockSelector($settings));
    }

    private function generateCss(array $settings, string $device = ''): void
    {
        $propertyDevice = $device === '' ? InlineCssGenerator::ATTR_MAIN_KEY : $device;
        $display = $settings['display'] ?? [];
        $playBtn = $this->playButtonSelector($settings);
        $pauseBtn = $this->pauseButtonSelector($settings);

        $playSize = $display['playSize' . $device] ?? '';
        $pauseSize = $display['pauseSize' . $device] ?? '';
        $playSettings = $this->transformColorSettings($settings, 'play');
        $pauseSettings = $this->transformColorSettings($settings, 'pause');
        /**
         * Play Button
         */
        $this->inlineCssGenerator
            ->withProperty($propertyDevice, $playBtn . ' svg', 'width', $playSize)
            ->withProperty($propertyDevice, $playBtn . ' svg', 'height', $playSize);
        $this->colorStyle($playBtn, $playSettings);
        $this->spacingStyle($playBtn, $playSettings);
        $this->borderStyle($playBtn, $playSettings);
        $this->bordersHoverStyle($playBtn, $playSettings);

        /**
         * Pause Button
         */
        $this->inlineCssGenerator
            ->withProperty($propertyDevice, $pauseBtn . ' svg', 'width', $pauseSize)
            ->withProperty($propertyDevice, $pauseBtn . ' svg', 'height', $pauseSize);
        $this->colorStyle($pauseBtn, $pauseSettings);
        $this->spacingStyle($pauseBtn, $pauseSettings);
        $this->borderStyle($pauseBtn, $pauseSettings);
        $this->bordersHoverStyle($pauseBtn, $pauseSettings);
    }

    private function transformColorSettings(array $settings, string $type): array
    {
        $finds = ["{$type}Text", "{$type}Background"];
        $replaces = ['text', 'background'];
        $keys = array_keys($settings);
        $keys = array_map(static function (string $key) use ($replaces, $finds): string {
            return str_replace(
                $finds,
                $replaces,
                $key
            );
        }, $keys);

        /**
         * @psalm-suppress InvalidArgument
         */
        return array_combine($keys, $settings);
    }
}
