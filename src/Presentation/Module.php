<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation;

use Inpsyde\GutenbergDialogs\Editor\DialogBlock;
use Inpsyde\Modularity;
use Inpsyde\MoreMenuFields;
use Mah\DesignSystem;
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
         $this->extendBodyClasses($container);
     //    $this->extendNavigationMenus($container);


        return true;
    }

    private function extendBodyClasses(ContainerInterface $container): void
    {
        add_filter(
            'body_class',
            static function (array $classes) use ($container): array {

                /** @var Modularity\Properties\Properties $properties */
                $properties = $container->get(Modularity\Package::PROPERTIES);
                $classes[] = $properties->baseName();

                return $classes;
            }
        );
    }

    private function extendNavigationMenus(ContainerInterface $container): void
    {
        MoreMenuFields\bootstrap();

        // Extend navigation menus
        add_filter(
            MoreMenuFields\FILTER_FIELDS,
            static function (array $fields, MoreMenuFields\EditFieldValueFactory $valueFactory) use ($container) {
                try{
                    $fields[] = new Navigation\MenuIconField(
                        $container->get(DesignSystem\Presentation\Icon\IconSetRegistry::class),
                        $valueFactory->create(Navigation\MenuIconField::NAME)
                    );
                }catch(\Exception $e){
                    wp_die($e->getMessage());
                }
                return $fields;
            },
            10,
            2
        );

        // Extend output of navigation menu items
        add_filter(
            'nav_menu_item_args',
            static function (\stdClass $args, \WP_Post $wpPost) use ($container): \stdClass {

                $factory = new MoreMenuFields\EditFieldValueFactory($wpPost->ID);
                $value = $factory->create(Navigation\MenuIconField::NAME)->value();

                if (! $value || ! is_string($value)) {
                    return $args;
                }

                $parts = explode('_', $value);
                $iconSet = $parts[0] ?? null;
                $iconName = $parts[1] ?? null;

                if (! $iconSet || ! $iconName) {
                    return $args;
                }

                $newArgs = clone $args;
                $newArgs->link_before = DesignSystem\icon($iconSet, $iconName)->render();

                return $newArgs;
            },
            10,
            2,
        );
    }


}
