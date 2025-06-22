<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Config\Contracts;

interface Setting
{
    public function group(): string;

    public function name(): string;

    public function arguments(): array;

    public function value(): ?string;

    public function updateValue(string $value): bool;

    public function deleteValue(): bool;
}
