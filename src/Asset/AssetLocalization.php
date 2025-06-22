<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

class AssetLocalization
{
    /**
     * @param string $key
     * @param array<string, mixed>|\Closure():array<string, mixed> $data
     */
    public function __construct(private string $key, private array|\Closure $data)
    {
    }

    public function key(): string
    {
        return $this->key;
    }

    public function data(): array|callable
    {
        return $this->data;
    }
}
