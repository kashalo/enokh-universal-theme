<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Enokh\UniversalTheme\Blocks\Icon\Config\IconConfig;
use Enokh\UniversalTheme\Meta\TermIcon\Metabox;
use Inpsyde\Assets\Asset;
use Inpsyde\Assets\Script;
use Inpsyde\Modularity\Properties\Properties;
use Psr\Container\ContainerInterface;

class TermIconScript
{
    public const TERM_ICON_HANDLE = 'enokh-blocks-term-icon-selector';

    private ?Script $script = null;

    public function __construct(private readonly Properties $properties)
    {
    }

    public function createScript(ContainerInterface $container): Script
    {
        if ($this->script) {
            return $this->script;
        }

        $assetDir = $this->properties->basePath() . 'assets/';
        $assetUri = $this->properties->baseUrl() . 'assets/';

        $termIconScriptFileName = self::TERM_ICON_HANDLE . '.js';
        /** @var IconConfig $iconConfig */
        $iconConfig = $container->get(IconConfig::class);
        $this->script = new Script(
            self::TERM_ICON_HANDLE,
            $assetUri . $termIconScriptFileName,
            Asset::BACKEND
        );

        $this->script
            ->withFilePath($assetDir . $termIconScriptFileName)
            ->withLocalize('EnokhBlocksTermIconConfig', [
                'iconInputName' => Metabox::ICON,
                'iconSetInputName' => Metabox::ICON_SET,
                'icons' => $iconConfig->config(),
            ])
            ->canEnqueue(false);

        return $this->script;
    }
}
