<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Footer;

use Inpsyde\Modularity;
use Inpsyde\PresentationElements;
use Psr\Container\ContainerInterface;

class Module implements
    Modularity\Module\FactoryModule,
    Modularity\Module\ExecutableModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function factories(): array
    {
        return [
            Elements\FooterBlock::class => static fn () => new Elements\FooterBlock(),
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        $this->registerBlocksElements($container);
        $this->registerBlock($container);

        return true;
    }

    private function registerBlocksElements(ContainerInterface $container): void
    {
        PresentationElements\registerBlock(
            Elements\FooterBlock::BLOCK_TYPE,
            static fn () => $container->has(Elements\FooterBlock::class)
                ? $container->get(Elements\FooterBlock::class)
                : new PresentationElements\Block\NullBlock()
        );
    }

    private function registerBlock(ContainerInterface $container): void
    {
        /** @var Modularity\Properties\Properties $properties */
        $properties = $container->get(Modularity\Package::PROPERTIES);
        add_action(
            'init',
            static fn () => register_block_type_from_metadata(
                $properties->basePath() . '/assets/Blocks/Footer'
            ),
            0 // need to register before _register_theme_block_patterns() runs on 'init'
        );
    }
}
