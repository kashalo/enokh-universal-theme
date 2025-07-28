<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Template;

class Renderer
{
    private string $resourcesDir;

    /**
     * @param string $resourcesDir
     */
    public function __construct(string $resourcesDir)
    {

        $this->resourcesDir = trailingslashit($resourcesDir);
    }

    /**
     * @param string $template
     * @param array  $data
     */
    public function render(string $template, array $data = []): void
    {
        /** @var \Closure $renderer */
        $renderer = \Closure::bind(
        /** @bound */
            function (string $template, callable $render): void {
                include $template;
            },
            (object) $data
        );

        $renderer($this->resourcesDir . "/templates/{$template}.php", [$this, 'render']);
    }

    /**
     * @param string $icon
     * @param bool $echo
     * @return string|bool
     * phpcs:disable
     */
    public function svgLoader(string $icon, bool $echo = false): string|bool
    {
        $file_path = sprintf("%s/svg/%s.svg", $this->resourcesDir, $icon);

        if (! file_exists($file_path)) {
            return false;
        }

        $svgIcon = file_get_contents($file_path);

        if ($echo) {
            echo wp_kses(
                $svgIcon,
                [
                    'svg' => [
                        'version' => true,
                        'class' => true,
                        'fill' => true,
                        'height' => true,
                        'xml:space' => true,
                        'xmlns' => true,
                        'xmlns:xlink' => true,
                        'viewbox' => true,
                        'enable-background' => true,
                        'width' => true,
                        'x' => true,
                        'y' => true,
                    ],
                    'path' => [
                        'clip-rule' => true,
                        'd' => true,
                        'fill' => true,
                        'fill-rule' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                        'stroke-linejoin' => true,
                        'stroke-linecap' => true,
                    ],
                    'g' => [
                        'clip-rule' => true,
                        'd' => true,
                        'transform' => true,
                        'fill' => true,
                        'fill-rule' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                    ],
                    'rect' => [
                        'x' => true,
                        'y' => true,
                        'width' => true,
                        'height' => true,
                        'rx' => true,
                        'ry' => true,
                    ],
                    'line' => [
                        'x1' => true,
                        'x2' => true,
                        'y1' => true,
                        'y2' => true,
                    ],
                    'polygon' => [
                        'clip-rule' => true,
                        'd' => true,
                        'fill' => true,
                        'fill-rule' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                        'points' => true,
                    ],
                    'circle' => [
                        'clip-rule' => true,
                        'd' => true,
                        'fill' => true,
                        'fill-rule' => true,
                        'stroke' => true,
                        'stroke-width' => true,
                        'cx' => true,
                        'cy' => true,
                        'r' => true,
                    ],
                    'lineargradient' => [
                        'id' => true,
                        'gradientunits' => true,
                        'x' => true,
                        'y' => true,
                        'x2' => true,
                        'y2' => true,
                        'gradienttransform' => true,
                    ],
                    'stop' => [
                        'offset' => true,
                        'style' => true,
                    ],
                ]
            );
            return true;
        }

        return $svgIcon;
    }
    // @phpcs:enable
}
