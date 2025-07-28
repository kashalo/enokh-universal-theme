<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Module;

use Enokh\UniversalTheme\Meta\ExcludeFromSearch;
use Enokh\UniversalTheme\Meta\PostCategory;
use Enokh\UniversalTheme\Meta\SpeciesMetas;
use Enokh\UniversalTheme\Meta\TermIcon;
use Inpsyde\Modularity\Module\ExecutableModule;
use Inpsyde\Modularity\Module\ModuleClassNameIdTrait;
use Inpsyde\Modularity\Module\ServiceModule;
use MetaboxOrchestra;
use Psr\Container\ContainerInterface;

class MetaBoxModule implements ServiceModule, ExecutableModule
{
    use ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
            PostCategory\Metabox::class => static function (ContainerInterface $container): PostCategory\Metabox {
                return new PostCategory\Metabox();
            },
            ExcludeFromSearch::class => static function (ContainerInterface $container): ExcludeFromSearch {
                return new ExcludeFromSearch();
            },
            SpeciesMetas\Metabox::class => static function (ContainerInterface $container): SpeciesMetas\Metabox {
                return new SpeciesMetas\Metabox();
            },
            TermIcon\Metabox::class => static function (ContainerInterface $container): TermIcon\Metabox {
                return new TermIcon\Metabox();
            },
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        MetaboxOrchestra\Bootstrap::bootstrap();

        add_action(
            MetaboxOrchestra\Boxes::REGISTER_BOXES,
            static function (MetaboxOrchestra\Boxes $boxes) use ($container) {
                $boxes->add_box($container->get(PostCategory\Metabox::class));
                $boxes->add_box($container->get(SpeciesMetas\Metabox::class));
                $boxes->add_box($container->get(TermIcon\Metabox::class));
            }
        );

        /** @var ExcludeFromSearch $excludeFromSearch */
        $excludeFromSearch = $container->get(ExcludeFromSearch::class);
        register_post_meta(
            'post',
            $excludeFromSearch->name(),
            $excludeFromSearch->args()
        );
        register_post_meta(
            'page',
            $excludeFromSearch->name(),
            $excludeFromSearch->args()
        );

        return true;
    }
}
