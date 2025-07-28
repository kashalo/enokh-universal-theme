<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

interface BlockRenderer
{
    public function render(array $attributes, string $content): string;
}
