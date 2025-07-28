<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation\Icon;

abstract class BaseIconSet implements IconSet
{
    protected string $name = '';
    protected string $label = '';
    protected string $directory = '';
    protected array $icons = [];

    public function name(): string
    {
        return $this->name;
    }

    public function label(): string
    {
        return $this->label;
    }

    public function directory(): string
    {
        return $this->directory;
    }

    public function icons(): array
    {
        return $this->icons;
    }

    public function hasIcon(string $icon): bool
    {
        return in_array($icon, $this->icons, true);
    }

    public function withIcons(string ...$icons): self
    {
        $this->icons = $icons;
        return $this;
    }

    public function addIcons(string ...$icons): self
    {
        foreach ($icons as $icon) {
            in_array($icon, $this->icons, true) || $this->icons[] = $icon;
        }
        return $this;
    }

    public function removeIcons(string ...$icons): self
    {
        foreach ($icons as $icon) {
            $index = array_search($icon, $this->icons, true);
            if ($index !== false) {
                unset($this->icons[$index]);
            }
        }
        return $this;
    }

    public function iconPath(string $iconName): ?string
    {
        return $this->hasIcon($iconName)
            ? sprintf('%s/%s', \untrailingslashit($this->directory()), $iconName)
            : null;
    }
}
