<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Tab;

use Inpsyde\Modularity;
use Inpsyde\Modularity\Module\ExecutableModule;
use Inpsyde\Modularity\Module\ModuleClassNameIdTrait;
use Inpsyde\Modularity\Module\ServiceModule;
use Psr\Container\ContainerInterface;

class Module implements ExecutableModule, ServiceModule
{
    use ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
            Renderer::class => static function (ContainerInterface $container): Renderer {
                return new Renderer();
            },
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
                    $properties->basePath() . 'assets/Blocks/Tab',
                    [
                        'render_callback' => [$renderer, 'render'],
                    ]
                );
            },
            1
        );
    }
}
