<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Inpsyde\Assets\Asset;
use Inpsyde\Assets\Style;
use Inpsyde\Modularity\Properties\Properties;
use Psr\Container\ContainerInterface;

class TermIconStyle
{
    private ?Style $style = null;

    public function __construct(private readonly Properties $properties)
    {
    }

    public function createScript(ContainerInterface $container): Style
    {
        if ($this->style) {
            return $this->style;
        }

        $termIconStyleFileName = TermIconScript::TERM_ICON_HANDLE . '.js';

        $assetDir = $this->properties->basePath() . 'assets/';
        $assetUri = $this->properties->baseUrl() . 'assets/';

        $this->style = new Style(
            TermIconScript::TERM_ICON_HANDLE,
            $assetUri . $termIconStyleFileName,
            Asset::BACKEND
        );
        $this->style->withFilePath($assetDir . $termIconStyleFileName)
            ->canEnqueue(false);

        return $this->style;
    }
}
