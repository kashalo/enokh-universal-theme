<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta\TermIcon;

use Enokh\UniversalTheme\Presentation\Icon\IconSetRegistry;

use function Enokh\UniversalTheme\icon;

class IconConfig
{
    private IconSetRegistry $iconSetRegistry;

    public function __construct(IconSetRegistry $iconSetRegistry)
    {
        $this->iconSetRegistry = $iconSetRegistry;
    }

    public function config(): array
    {
        $iconConfigs = [];
        foreach ($this->iconSetRegistry->all() as $iconSet) {
            $iconConfigs[$iconSet->name()] = [
                'group' => $iconSet->label(),
                'svgs' => $this->iconItems($iconSet),
            ];
        }
        return $iconConfigs;
    }

    private function iconItems(DesignSystem\Presentation\Icon\IconSet $iconSet): array
    {
        $icons = [];
        foreach ($iconSet->icons() as $iconName) {
            $icons[$iconName] = [
                'label' => $iconName,
                'icon' => icon($iconSet->name(), $iconName)->render(),
            ];
        }

        return $icons;
    }
}
