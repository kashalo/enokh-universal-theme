<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Search;

use Inpsyde\Modularity;
use Psr\Container\ContainerInterface;

class Module implements Modularity\Module\ExecutableModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function run(ContainerInterface $container): bool
    {
        /** @var Modularity\Properties\Properties $properties */
        $properties = $container->get(Modularity\Package::PROPERTIES);

        return add_action(
            'init',
            static fn () => register_block_type_from_metadata(
                $properties->basePath() . 'assets/Blocks/Search'
            ),
            1 // need to register before _register_theme_block_patterns() runs on 'init'
        );
    }
}
