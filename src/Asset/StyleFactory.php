<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Inpsyde\Assets\Style;

interface StyleFactory
{
    public function createStyle(): Style;
}
