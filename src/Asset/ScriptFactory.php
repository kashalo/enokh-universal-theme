<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Inpsyde\Assets\Script;

interface ScriptFactory
{
    public function createScript(): Script;
}
