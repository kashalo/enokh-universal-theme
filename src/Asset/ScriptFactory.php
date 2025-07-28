<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Inpsyde\Assets\Script;
use Psr\Container\ContainerInterface;

interface ScriptFactory
{
    public function createScript(ContainerInterface $container): Script;
}
