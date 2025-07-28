<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

use Enokh\UniversalTheme\Config\BlockShapes;
use Enokh\UniversalTheme\Style\ButtonStyle;
use Enokh\UniversalTheme\Style\ContainerStyle;
use Enokh\UniversalTheme\Style\GridStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;
use Enokh\UniversalTheme\Style\TextStyle;
use Enokh\UniversalTheme\Utility\BlockUtility;
use Enokh\UniversalTheme\Utility\DynamicContentUtility;
use Inpsyde\Modularity;
use Inpsyde\Modularity\Module\ServiceModule;
use Psr\Container\ContainerInterface;

/**
 * @codeCoverageIgnore
 * phpcs:disable Inpsyde.CodeQuality.FunctionLength.TooLong
 */
class Module implements Modularity\Module\ExecutableModule, ServiceModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function run(ContainerInterface $container): bool
    {
        $this->fixSymlinksForDevelopment();
        $this->extendPostFeaturedImageBlock();
        $this->registerBlockStyles();

        return $this->registerBlocks($container);
    }

    private function registerBlocks(ContainerInterface $container): bool
    {
        if (!function_exists('register_block_type')) {
            return false;
        }

        $blocks = [
            ButtonBlock::class,
            ContainerBlock::class,
            GridBlock::class,
            QueryLoop::class,
            TableOfContentBlock::class,
            TermFeaturedImageBlock::class,
            TextBlock::class,
        ];
        $registered = [];
        foreach ($blocks as $block) {
            $block = $container->get($block);
            $registrar = \WP_Block_Type_Registry::get_instance();

            if ($registrar->is_registered($block->name())) {
                continue;
            }

            $registered[] = register_block_type($block->name(), $block->args());
        }

        return !in_array(false, $registered, true);
    }

    public function services(): array
    {
        return [
            InlineCssGenerator::class => static function (): InlineCssGenerator {
                return new InlineCssGenerator();
            },
            ContainerStyle::class => static function (ContainerInterface $container): ContainerStyle {
                return new ContainerStyle(
                    $container->get(InlineCssGenerator::class),
                    $container->get(BlockUtility::class)
                );
            },
            ContainerBlock::class => static function (ContainerInterface $container): ContainerBlock {
                return new ContainerBlock(
                    $container->get(BlockUtility::class),
                    $container->get(ContainerStyle::class),
                    BlockShapes::get(),
                    $container->get(InlineCssGenerator::class),
                    $container->get(DynamicContentUtility::class)
                );
            },
            GridStyle::class => static function (ContainerInterface $container): GridStyle {
                return new GridStyle(
                    $container->get(InlineCssGenerator::class),
                    $container->get(BlockUtility::class)
                );
            },
            GridBlock::class => static function (ContainerInterface $container): GridBlock {
                return new GridBlock(
                    $container->get(BlockUtility::class),
                    $container->get(GridStyle::class),
                    $container->get(DynamicContentUtility::class)
                );
            },
            QueryLoop::class => static function (ContainerInterface $container): QueryLoop {
                return QueryLoop::new(
                    $container->get(GridBlock::class),
                    $container->get(DynamicContentUtility::class)
                );
            },
            TextStyle::class => static function (ContainerInterface $container): TextStyle {
                return new TextStyle(
                    $container->get(InlineCssGenerator::class)
                );
            },
            TextBlock::class => static function (ContainerInterface $container): TextBlock {
                return new TextBlock(
                    $container->get(BlockUtility::class),
                    $container->get(TextStyle::class),
                    $container->get(DynamicContentUtility::class)
                );
            },
            TermFeaturedImageBlock::class => static function (ContainerInterface $container): TermFeaturedImageBlock {
                return new TermFeaturedImageBlock();
            },
            TableOfContentBlock::class => static function (): TableOfContentBlock {
                return new TableOfContentBlock();
            },
            ButtonStyle::class => static function (ContainerInterface $container): ButtonStyle {
                return new ButtonStyle(
                    $container->get(InlineCssGenerator::class)
                );
            },
            ButtonBlock::class => static function (ContainerInterface $container): ButtonBlock {
                return new ButtonBlock(
                    $container->get(BlockUtility::class),
                    $container->get(ButtonStyle::class),
                    $container->get(DynamicContentUtility::class)
                );
            },
            Icon\Style::class => static function (ContainerInterface $container): Icon\Style {
                return new Icon\Style(
                    $container->get(InlineCssGenerator::class)
                );
            },
        ];
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
            static fn (string $dir): string => is_link($dir) ? realpath($dir) : $dir
        );

        // Child themes
        add_filter(
            'stylesheet_directory',
            static fn (string $dir): string => is_link($dir) ? realpath($dir) : $dir
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
