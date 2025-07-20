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
            Elements\Drawer::class => static fn () => new Elements\Drawer(),
            Elements\Backdrop::class => static fn () => new Elements\Backdrop(),
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        $this->registerBlockElements($container);
        $this->registerBlock($container);

        return true;
    }

    private function registerBlockElements(ContainerInterface $container): void
    {
        $elements = [
            Elements\Drawer::class,
            Elements\Backdrop::class,
        ];

        foreach ($elements as $element) {
            PresentationElements\registerElement(
                $element,
                static fn () => $container->has($element)
                    ? $container->get($element)
                    : new PresentationElements\Element\NullElement()
            );
        }
    }

    private function registerBlock(ContainerInterface $container): void
    {
        /** @var Modularity\Properties\Properties $properties */
        $properties = $container->get(Modularity\Package::PROPERTIES);

        add_action(
            'init',
            static fn () => register_block_type_from_metadata(
                $properties->basePath() . 'assets/Blocks/NavigationDrawer'
            ),
            1 // need to register before _register_theme_block_patterns() runs on 'init'
        );
    }
}
