<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Icon\Config;

use Enokh\UniversalTheme\Presentation\Icon\IconSet;
use Enokh\UniversalTheme\Presentation\Icon\IconSetRegistry;

use function Enokh\UniversalTheme\icon;

class IconConfig
{
    private const CACHE_GROUP = 'enokh-blocks-icons';
    private const CACHE_RENDERED_PREFIX = 'rendered';
    private const CACHE_RENDERED_TTL = 86400; // 24H

    private IconSetRegistry $iconSetRegistry;
    /**
     * @var null|array<string, array{
     *     group: string,
     *     svgs: array<string, array{label: string, icon: string}>
     *  }>
     */
    private ?array $config = null;

    public function __construct(IconSetRegistry $iconSetRegistry)
    {
        $this->iconSetRegistry = $iconSetRegistry;
    }

    public function config(): array
    {
        if (!is_null($this->config)) {
            return $this->config;
        }

        // Register network-wide cache group
        wp_cache_add_global_groups(self::CACHE_GROUP);

        $this->config = [];

        foreach ($this->iconSetRegistry->all() as $iconSet) {
            $this->config[$iconSet->name()] = [
                'group' => $iconSet->label(),
                'svgs' => $this->iconItems($iconSet),
            ];
        }

        return $this->config;
    }

    private function iconItems(IconSet $iconSet): array
    {
        $icons = [];
        foreach ($iconSet->icons() as $iconName) {
            $icons[$iconName] = [
                'label' => $iconName,
                'icon' => self::renderIcon($iconSet->name(), $iconName),
            ];
        }

        return $icons;
    }

    private static function renderIcon(string $iconSet, string $iconName): string
    {
        $iconKey = self::CACHE_RENDERED_PREFIX . '-' . $iconSet . '-' . $iconName;
        $rendered = wp_cache_get($iconKey, self::CACHE_GROUP);

        if ($rendered === false) {
            $rendered = icon($iconSet, $iconName)->render();
            $rendered && wp_cache_set($iconKey, $rendered, self::CACHE_GROUP, self::CACHE_RENDERED_TTL);
        }

        return $rendered;
    }
}
