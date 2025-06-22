<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Inpsyde\Assets\Asset;
use Inpsyde\Assets\Script;
use Inpsyde\Modularity\Properties\Properties;

class BlockEditorScript implements ScriptFactory
{
    public const HANDLE = 'enokh-universal-theme-block-editor-script';

    private ?Script $script = null;

    public function __construct(private readonly Properties $properties)
    {
    }

    public function createScript(): Script
    {
        if (! $this->script) {
            $fileName = 'enokh-universal-theme-editor.js';
            $assetDir = $this->properties->basePath() . 'assets/';
            $assetUri = $this->properties->baseUrl() . 'assets/';

            $this->script = new Script(
                self::HANDLE,
                $assetUri . $fileName,
                Asset::BLOCK_ASSETS
            );
            $this->script->withFilePath($assetDir . $fileName);
        }

        return $this->script;
    }
}
