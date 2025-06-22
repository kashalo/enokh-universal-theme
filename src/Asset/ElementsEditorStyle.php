<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Inpsyde\Assets\Asset;
use Inpsyde\Assets\Style;
use Inpsyde\Modularity\Properties\Properties;

class ElementsEditorStyle implements StyleFactory
{
    public const HANDLE = 'enokh-design-system-elements-editor-style';

    private ?Style $style = null;

    public function __construct(private Properties $properties)
    {
    }

    public function createStyle(): Style
    {
        if (! $this->style) {
            $fileName = 'enokh-design-system-elements-editor.css';
            $assetDir = $this->properties->basePath() . 'assets/';
            $assetUri = $this->properties->baseUrl() . 'assets/';

            $this->style = new Style(
                self::HANDLE,
                $assetUri . $fileName,
                Asset::BLOCK_ASSETS
            );
            $this->style->withFilePath($assetDir . $fileName);
        }

        return $this->style;
    }
}
