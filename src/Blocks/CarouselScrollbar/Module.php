<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\CarouselScrollbar;

use Enokh\UniversalTheme\Style\InlineCssGenerator;
use Inpsyde\Modularity;
use Psr\Container\ContainerInterface;

class Module implements Modularity\Module\ExecutableModule, Modularity\Module\ServiceModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
            Style::class => static fn (ContainerInterface $container): Style => new Style($container->get(InlineCssGenerator::class)),
            Renderer::class => static fn (ContainerInterface $container): Renderer => new Renderer($container->get(Style::class)),
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        /** @var Modularity\Properties\Properties $properties */
        $properties = $container->get(Modularity\Package::PROPERTIES);

        return add_action(
            'init',
            static function () use ($properties, $container) {
                $renderer = $container->get(Renderer::class);
                register_block_type_from_metadata(
                    $properties->basePath() . 'assets/Editor/Blocks/CarouselScrollbar',
                    [
                        'render_callback' => [$renderer, 'render'],
                    ]
                );
            },
            1
        );
    }
}
