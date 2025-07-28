<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Asset;

use Inpsyde\Assets\AssetManager;
use Inpsyde\Assets\Script;
use Inpsyde\Assets\Style;
use Inpsyde\Modularity;
use Psr\Container\ContainerInterface;

/**
 * @codeCoverageIgnore
 * phpcs:disable Inpsyde.CodeQuality.FunctionLength.TooLong
 */
class Module implements
    Modularity\Module\ServiceModule,
    Modularity\Module\ExecutableModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
            BlockEditorScript::class => static function (ContainerInterface $container): Script {
                return (new BlockEditorScript(
                    $container->get(Modularity\Package::PROPERTIES)
                ))->createScript($container);
            },
            BlockEditorStyle::class => static function (ContainerInterface $container): Style {
                return (new BlockEditorStyle(
                    $container->get(Modularity\Package::PROPERTIES)
                ))->createStyle();
            },
            FrontOfficeScript::class => static function (ContainerInterface $container): Script {
                return (new FrontOfficeScript(
                    $container->get(Modularity\Package::PROPERTIES)
                ))->createScript($container);
            },
            FrontOfficeStyle::class => static function (ContainerInterface $container): Style {
                return (new FrontOfficeStyle(
                    $container->get(Modularity\Package::PROPERTIES)
                ))->createStyle();
            },
            CoreStyle::class => static function (ContainerInterface $container): Style {
                return (new CoreStyle(
                    $container->get(Modularity\Package::PROPERTIES)
                ))->createStyle();
            },
            CoreEditorStyle::class => static function (ContainerInterface $container): Style {
                return (new CoreEditorStyle(
                    $container->get(Modularity\Package::PROPERTIES)
                ))->createStyle();
            },
            ElementsStyle::class => static function (ContainerInterface $container): Style {
                return (new ElementsStyle(
                    $container->get(Modularity\Package::PROPERTIES)
                ))->createStyle();
            },
            ElementsEditorStyle::class => static function (ContainerInterface $container): Style {
                return (new ElementsEditorStyle(
                    $container->get(Modularity\Package::PROPERTIES)
                ))->createStyle();
            },
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        return add_action(
            AssetManager::ACTION_SETUP,
            static function (AssetManager $assetManager) use ($container): void {
                $assetManager->register(
                    $container->get(BlockEditorScript::class),
                    $container->get(BlockEditorStyle::class),
                    $container->get(FrontOfficeScript::class),
                    $container->get(FrontOfficeStyle::class),
                    $container->get(CoreStyle::class),
                    $container->get(CoreEditorStyle::class),
                    $container->get(ElementsStyle::class),
                    $container->get(ElementsEditorStyle::class),
                );
            }
        );
    }
}
