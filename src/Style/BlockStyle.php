<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Style;

interface BlockStyle
{
    /**
     * @param array $settings
     * @return $this
     */
    public function withSettings(array $settings): self;

    /**
     * @return $this
     */
    public function generate(): self;

    /**
     * @return string
     */
    public function output(): string;
}
