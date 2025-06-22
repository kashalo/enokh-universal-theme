<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\NavigationDrawerToggle;

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
            Element::class => static fn () => new Element(),
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
        PresentationElements\registerElement(
            Element::class,
            static fn () => $container->has(Element::class)
                ? $container->get(Element::class)
                : new PresentationElements\Element\NullElement()
        );
    }

    private function registerBlock(ContainerInterface $container): void
    {
        /** @var Modularity\Properties\Properties $properties */
        $properties = $container->get(Modularity\Package::PROPERTIES);

        add_action(
            'init',
            static fn () => register_block_type_from_metadata(
                $properties->basePath() . 'assets/Blocks/NavigationDrawerToggle',
                [
                    'attributes' => Element::argumentsSchema()['properties'],
                ]
            ),
            1 // need to register before _register_theme_block_patterns() runs on 'init'
        );
    }
}
