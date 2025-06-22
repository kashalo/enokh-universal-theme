<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\RelatedPosts;

use Inpsyde\Modularity;
use Psr\Container\ContainerInterface;

class Module implements Modularity\Module\ExecutableModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function run(ContainerInterface $container): bool
    {
        return add_action(
            'init',
            static fn () => register_block_type_from_metadata(
                get_template_directory() . '/assets/Blocks/RelatedPosts'
            ),
            0 // need to register before _register_theme_block_patterns() runs on 'init'
        );
    }
}
