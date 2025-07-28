<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation\Icon;

interface IconSet
{
    public function name(): string;

    public function label(): string;

    public function directory(): string;

    /**
     * @return string[]
     */
    public function icons(): array;

    public function hasIcon(string $icon): bool;

    public function withIcons(string ...$icons): self;

    public function addIcons(string ...$icons): self;

    public function removeIcons(string ...$icons): self;

    public function iconPath(string $iconName): ?string;
}
