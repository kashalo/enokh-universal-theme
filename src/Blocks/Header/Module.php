<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Header;

use Inpsyde\Modularity;
use Inpsyde\PresentationElements;
use Enokh\UniversalTheme\Blocks\Header\Elements;
use Psr\Container\ContainerInterface;

class Module implements
    Modularity\Module\FactoryModule,
    Modularity\Module\ExecutableModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function factories(): array
    {
        return [
            Elements\HeaderBlock::class => fn () => new Elements\HeaderBlock(),
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
            Elements\HeaderBlock::BLOCK_TYPE,
            fn () => $container->has(Elements\HeaderBlock::class)
                ? $container->get(Elements\HeaderBlock::class)
                : new PresentationElements\Block\NullBlock()
        );
    }

    private function registerBlock(): void
    {
        add_action(
            'init',
            static fn () => register_block_type_from_metadata(
                get_template_directory() . '/assets/Blocks/Header'
            ),
            0 // need to register before _register_theme_block_patterns() runs on 'init'
        );
    }
}
