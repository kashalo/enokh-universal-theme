<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Enokh\UniversalTheme\Blocks\ButtonBlock;
use Enokh\UniversalTheme\Blocks\ContainerBlock;
use Enokh\UniversalTheme\Blocks\GridBlock;
use Enokh\UniversalTheme\Blocks\Icon\Config\IconConfig;
use Enokh\UniversalTheme\Blocks\QueryLoop;
use Enokh\UniversalTheme\Blocks\TableOfContentBlock;
use Enokh\UniversalTheme\Blocks\TermFeaturedImageBlock;
use Enokh\UniversalTheme\Blocks\TextBlock;
use Enokh\UniversalTheme\Config\BlockShapes;
use Inpsyde\Assets\Asset;
use Inpsyde\Assets\Script;
use Inpsyde\Modularity\Package;
use Inpsyde\Modularity\Properties\PluginProperties;
use Inpsyde\Modularity\Properties\Properties;
use Psr\Container\ContainerInterface;

class BlockEditorScript implements ScriptFactory
{
    public const HANDLE = 'enokh-universal-theme-block-editor-script';
    public const CONTAINER_BLOCK_WIDTH_FILTER = 'enokh-blocks.container-block-width';
    public const CONTAINER_BLOCK_WIDTH_UNIT_FILTER = 'enokh-blocks.container-block-width-unit';

    private ?Script $script = null;

    public function __construct(private readonly Properties $properties)
    {
    }

    public function createScript(ContainerInterface $container): Script
    {
        if (!$this->script) {
            $fileName = 'enokh-universal-theme-editor.js';
            $assetDir = $this->properties->basePath() . 'assets/';
            $assetUri = $this->properties->baseUrl() . 'assets/';

            $this->script = new Script(
                self::HANDLE,
                $assetUri . $fileName,
                Asset::BLOCK_ASSETS
            );
            /** @var IconConfig $iconConfig */
            $iconConfig = $container->get(IconConfig::class);
            /** @var PluginProperties $properties */
            $properties = $container->get(Package::PROPERTIES);
            $this->script->withLocalize('EnokhBlocksEditor', [
                'Blocks' => [
                    ContainerBlock::LOCALIZE_VAR => $container->get(ContainerBlock::class)->config(),
                    GridBlock::LOCALIZE_VAR => $container->get(GridBlock::class)->config(),
                    QueryLoop::LOCALIZE_VAR => $container->get(QueryLoop::class)->config(),
                    TextBlock::LOCALIZE_VAR => $container->get(TextBlock::class)->config(),
                    TermFeaturedImageBlock::LOCALIZE_VAR => $container->get(TermFeaturedImageBlock::class)->config(),
                    TableOfContentBlock::LOCALIZE_VAR => $container->get(TableOfContentBlock::class)->config(),
                    ButtonBlock::LOCALIZE_VAR => $container->get(ButtonBlock::class)->config(),
                ],
                'Config' => [
                    'containerWidth' => sprintf(
                        "%s%s",
                        apply_filters(self::CONTAINER_BLOCK_WIDTH_FILTER, 1200),
                        apply_filters(self::CONTAINER_BLOCK_WIDTH_UNIT_FILTER, 'px')
                    ),
                    'blockShapes' => BlockShapes::get(),
                    'icons' => $iconConfig->config(),
                    'imageSizes' => $this->imageSizes(),
                    'placeholderImageURL' =>
                        $properties->baseUrl() . 'resources/images/logo-featured-image-thumb.jpg',
                ],
                'CanvasBlockVariants' =>
                    apply_filters('enokh-blocks_canvas_localize_variants', []),
            ]);
            $this->script->withFilePath($assetDir . $fileName);
        }

        return $this->script;
    }

    private function imageSizes(): array
    {
        $sizes = get_intermediate_image_sizes();
        $sizes[] = 'full';
        return $sizes;
    }
}
