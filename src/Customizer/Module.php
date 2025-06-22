<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Customizer;

use Inpsyde\Modularity\Module\ExecutableModule;
use Inpsyde\Modularity\Module\ModuleClassNameIdTrait;
use Inpsyde\Modularity\Module\ServiceModule;
use Psr\Container\ContainerInterface;

class Module implements ServiceModule, ExecutableModule
{
    use ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
            DefaultFeaturedImageCustomizer::class => static function (ContainerInterface $container): DefaultFeaturedImageCustomizer {
                return new DefaultFeaturedImageCustomizer();
            },
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        $this->defaultFeaturedImageRegister($container);
        $this->defaultFeaturedImageActions($container);

        return true;
    }

    /**
     * Register default featured image customizer setting and control
     *
     * @param ContainerInterface $container
     * @return void
     * @throws \Psr\Container\ContainerExceptionInterface
     * @throws \Psr\Container\NotFoundExceptionInterface
     */
    private function defaultFeaturedImageRegister(ContainerInterface $container): void
    {
        /** @var DefaultFeaturedImageCustomizer $defaultFeaturedImageCustomizer */
        $defaultFeaturedImageCustomizer = $container->get(DefaultFeaturedImageCustomizer::class);

        add_action(
            'customize_register',
            [$defaultFeaturedImageCustomizer, 'customizerSettings']
        );
    }

    /**
     * Default featured image actions and filters register
     *
     * @param ContainerInterface $container
     * @return void
     */
    private function defaultFeaturedImageActions(ContainerInterface $container): void
    {
        /**
         * Hooks into the post thumbnail id, when empty return the default one from the customizer
         */
        add_filter('post_thumbnail_id', static function (int $thumbnailId, \WP_Post $post) {
            $defaultImageId = get_theme_mod(DefaultFeaturedImageCustomizer::ID);
            if (empty($defaultImageId) || !empty($thumbnailId)) {
                return $thumbnailId;
            }

            return $defaultImageId;
        }, 10, 2);
    }
}
