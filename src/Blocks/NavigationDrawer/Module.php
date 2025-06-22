<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\NavigationDrawer;

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
            Elements\NavigationDrawerBlock::class => static fn() => new Elements\NavigationDrawerBlock(),
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        $this->registerBlocksElements($container);
        $this->registerBlock();

        return true;
    }

    private function registerBlocksElements(ContainerInterface $container): void
    {
        PresentationElements\registerBlock(
            Elements\NavigationDrawerBlock::BLOCK_TYPE,
            fn () => $container->has(Elements\NavigationDrawerBlock::class)
                ? $container->get(Elements\NavigationDrawerBlock::class)
                : new PresentationElements\Block\NullBlock()
        );
    }

    private function registerBlock(): void
    {
        add_action(
            'init',
            static fn () => register_block_type_from_metadata(
                get_stylesheet_directory() . '/assets/Blocks/NavigationDrawer'
            ),
            0 // need to register before _register_theme_block_patterns() runs on 'init'
        );
    }
}
