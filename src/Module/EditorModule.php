<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Module;

use Enokh\UniversalTheme\Blocks\ContainerBlock;
use Enokh\UniversalTheme\Supports\MarkerColorSupport;
use Inpsyde\Modularity\Module\ExecutableModule;
use Inpsyde\Modularity\Module\ModuleClassNameIdTrait;
use Inpsyde\Modularity\Module\ServiceModule;
use Psr\Container\ContainerInterface;

class EditorModule implements ServiceModule, ExecutableModule
{
    use ModuleClassNameIdTrait;

    public const BLOCK_CATEGORY = 'enokh-blocks';

    public function services(): array
    {
        return [
            MarkerColorSupport::class => static fn () => new MarkerColorSupport(),
        ];
    }

    /**
     * @param ContainerInterface $container
     * @return bool
     */
    public function run(ContainerInterface $container): bool
    {
        $this->configureBlockEditor();
        $this->registerBlockCategory();
        $this->registerBlockSupports($container);
        $this->modifyAllowedBlockTypes($container);

        return true;
    }

    private function configureBlockEditor(): void
    {
        add_filter(
            'block_editor_settings_all',
            static function ($settings) {
                $settings['canLockBlocks'] = is_super_admin(get_current_user_id());
                return $settings;
            }
        );
    }

    /**
     * @return void
     */
    private function registerBlockCategory(): void
    {
        add_filter(
            'block_categories_all',
            static function (array $categories): array {
                return array_merge(
                    [
                        [
                            'slug' => self::BLOCK_CATEGORY,
                            'title' => __('MAH Universal Theme 2.0', 'enokh-blocks'),
                            'icon' => null,
                        ],
                    ],
                    $categories
                );
            }
        );
    }

    private function registerBlockSupports(ContainerInterface $container): void
    {
        $markerColorSupport = $container->get(MarkerColorSupport::class);
        $markerColorSupport->boostrap();
    }

    private function modifyAllowedBlockTypes(ContainerInterface $container): void
    {
        add_filter(
            'allowed_block_types',
            /**
             * Actively add our Block to the allowed list,
             * if a Theme or Plugin restricts the used Blocks.
             */
            static function (array|bool $blockTypes) use ($container) {
                if (!is_array($blockTypes)) {
                    return $blockTypes;
                }

                $block = $container->get(ContainerBlock::class);

                return array_merge([$block->name()], $blockTypes);
            },
            PHP_INT_MAX - 10
        );
    }
}
