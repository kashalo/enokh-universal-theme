<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\ListItem;

use Enokh\UniversalTheme\Style\BlockDefaultStylesTrait;
use Enokh\UniversalTheme\Style\BlockStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;

/**
 * @phpcs:disable Syde.Functions.FunctionLength.TooLong
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
        $this->style($this->settings);
        $this->style($this->settings, 'Tablet');
        $this->style($this->settings, 'Mobile');

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
            'li.enokh-blocks-list-item.enokh-blocks-list-item-%s',
            $settings['uniqueId']
        );
    }

    private function style(array $settings, string $device = ''): void
    {
        $selector = $this->blockSelector($this->settings);
        $deviceKey = $this->deviceKey($device);

        $this->typographyStyle(
            $selector,
            $this->settings,
            $device
        );
        $this->spacingStyle(
            $selector,
            $this->settings,
            $device
        );
        $this->borderStyle(
            $selector,
            $this->settings,
            $device
        );
        $this->colorStyle(
            $selector,
            $this->settings['colors'] ?? [],
            $device
        );
        $this->colourGroupStyle(
            sprintf('%s a', $selector),
            $this->settings['colors'] ?? [],
            'linkColor',
            'color',
            '',
            $device
        );
        $this->colourGroupStyle(
            sprintf('%s a:hover', $selector),
            $this->settings['colors'] ?? [],
            'linkColor',
            'color',
            'Hover',
            $device
        );

        if (
            !empty($this->settings['colors']) &&
            !empty($this->settings['colors']['markerColor' . $device])
        ) {
            $this->inlineCssGenerator
                ->withProperty(
                    $deviceKey,
                    $selector,
                    \Enokh\UniversalTheme\Blocks\List\Style::CSS_VAR_MARKER_COLOUR,
                    $this->settings['colors']["markerColor{$device}"] ?? ''
                )->withProperty(
                    $deviceKey,
                    sprintf('%s .enokh-blocks-list-item__has-bullet:before', $selector),
                    'background-color',
                    sprintf("var(%s)", \Enokh\UniversalTheme\Blocks\List\Style::CSS_VAR_MARKER_COLOUR)
                )->withProperty(
                    $deviceKey,
                    sprintf('%s::marker', $selector),
                    'color',
                    sprintf("var(%s)", \Enokh\UniversalTheme\Blocks\List\Style::CSS_VAR_MARKER_COLOUR)
                );
        }
    }

    /**
     * Get the data attribute key for a device context.
     *
     * @param string $device Device suffix (e.g., '', 'Tablet', 'Mobile').
     * @return string Data attribute key.
     */
    private function deviceKey(string $device = ''): string
    {
        return empty($device) ? InlineCssGenerator::ATTR_MAIN_KEY : $device;
    }
}

// @phpcs:enable Syde.Functions.FunctionLength.TooLong
