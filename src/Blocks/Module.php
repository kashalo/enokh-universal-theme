<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

use Inpsyde\Modularity;
use Psr\Container\ContainerInterface;

/**
 * @codeCoverageIgnore
 * phpcs:disable Inpsyde.CodeQuality.FunctionLength.TooLong
 */
class Module implements Modularity\Module\ExecutableModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function run(ContainerInterface $container): bool
    {
        $this->fixSymlinksForDevelopment();
        $this->extendPostFeaturedImageBlock();
        $this->registerBlockStyles();

        return true;
    }

    /**
     * WP Core previously assumed all custom blocks using block.json would be
     * developed in plugins, so assets paths were always pointing to the plugins base URL.
     *
     * They later changed it so that themes can also do it, but forgot to
     * call realpath() when building the paths for comparison
     *
     * @link https://core.trac.wordpress.org/ticket/56859
     * @return void
     */
    private function fixSymlinksForDevelopment(): void
    {
        // Parent theme
        add_filter(
            'template_directory',
            fn(string $dir): string => is_link($dir) ? realpath($dir) : $dir
        );

        // Child themes
        add_filter(
            'stylesheet_directory',
            fn(string $dir): string => is_link($dir) ? realpath($dir) : $dir
        );
    }

    private function registerBlockStyles(): void
    {
        register_block_style('core/list', [
            'name' => 'checkmarks',
            'label' => _x('Checkmarks', 'Block editor list style', 'enokh-universal-theme'),
        ]);
    }

    /**
     * Ensure images on the core/post-featured-image block are not blurred by default.
     * On smaller screens the srcset attribute should allow smaller images to be loaded.
     *
     * @return void
     */
    private function extendPostFeaturedImageBlock(): void
    {
        add_filter(
            'register_block_type_args',
            static function (array $args, string $blockType): array {

                if ($blockType !== 'core/post-featured-image') {
                    return $args;
                }

                if (isset($args['attributes']['sizeSlug'])) {
                    $args['attributes']['sizeSlug']['default'] = 'full';
                }

                return $args;
            },
            10,
            2
        );
    }
}
