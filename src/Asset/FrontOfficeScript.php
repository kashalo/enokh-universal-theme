<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Inpsyde\Assets\Asset;
use Inpsyde\Assets\Script;
use Inpsyde\Modularity\Properties\Properties;
use Enokh\UniversalTheme\Blocks;

use function Inpsyde\PresentationElements\block;

class FrontOfficeScript implements ScriptFactory
{
    public const HANDLE = 'enokh-universal-theme-front-office-script';

    private ?Script $script = null;

    public function __construct(private readonly Properties $properties)
    {
    }

    public function createScript(): Script
    {
        if (! $this->script) {
            $fileName = 'enokh-universal-theme.js';
            $assetDir = $this->properties->basePath() . 'assets/';
            $assetUri = $this->properties->baseUrl() . 'assets/';

            $this->script = new Script(
                self::HANDLE,
                $assetUri . $fileName,
                Asset::FRONTEND
            );
            $this->script->withFilePath($assetDir . $fileName);
            $this->script->withLocalize(
                'MahUniversalTheme',
                fn () => $this->localizationData(),
            );
        }

        return $this->script;
    }

    private function localizationData(): array
    {
        return [
            'Config' => [
                'Blocks' => $this->localizedBlocks(),
            ],
        ];
    }

    private function localizedBlocks(): array
    {
        $blocks = [
            block(Blocks\Header\Elements\HeaderBlock::BLOCK_TYPE),
            block(Blocks\Footer\Elements\FooterBlock::BLOCK_TYPE),
            block(Blocks\NavigationDrawer\Elements\NavigationDrawerBlock::BLOCK_TYPE),
        ];

        $data = [];

        foreach ($blocks as $block) {
            if (! $block instanceof WithAssetLocalization) {
                continue;
            }
            $localization = $block->assetLocalization();
            $data[$localization->key()] = $localization->data();
        }

        return $data;
    }
}
