<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Icon;

use Enokh\UniversalTheme\Blocks\Icon\Config\IconConfig;
use Enokh\UniversalTheme\Presentation\Icon\IconSetRegistry;
use Inpsyde\Modularity;
use Psr\Container\ContainerInterface;

class Module implements Modularity\Module\ExecutableModule, Modularity\Module\ServiceModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function run(ContainerInterface $container): bool
    {
        /** @var Modularity\Properties\Properties $properties */
        $properties = $container->get(Modularity\Package::PROPERTIES);

        return add_action(
            'init',
            static fn () => register_block_type_from_metadata(
                $properties->basePath() . 'assets/Blocks/Icon'
            ),
            1 // need to register before _register_theme_block_patterns() runs on 'init'
        );
    }

    public function services(): array
    {
        return [
            IconConfig::class => static function (ContainerInterface $container): IconConfig {
                return new IconConfig(
                    $container->get(IconSetRegistry::class)
                );
            },
        ];
    }
}
