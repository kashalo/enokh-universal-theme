<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Inpsyde\Assets\Asset;
use Inpsyde\Assets\Style;
use Inpsyde\Modularity\Properties\Properties;

class FrontOfficeStyle implements StyleFactory
{
    public const HANDLE = 'enokh-universal-theme-front-office-style';

    private ?Style $style = null;

    public function __construct(private Properties $properties)
    {
    }

    public function createStyle(): Style
    {
        if (! $this->style) {
            $fileName = 'enokh-universal-theme.css';
            $assetDir = $this->properties->basePath() . 'assets/';
            $assetUri = $this->properties->baseUrl() . 'assets/';

            $this->style = new Style(
                self::HANDLE,
                $assetUri . $fileName,
                Asset::FRONTEND
            );
            $this->style->withFilePath($assetDir . $fileName);
        }

        return $this->style;
    }
}
