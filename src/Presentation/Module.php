<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation;

use Enokh\UniversalTheme\Logger\Logger;
use Enokh\UniversalTheme\Presentation\Icon\IconSetRegistry;
use Inpsyde\Modularity;
use Inpsyde\PresentationElements;
use Inpsyde\MoreMenuFields;
use function Enokh\UniversalTheme\icon;
use Psr\Container\ContainerInterface;

/**
 * @codeCoverageIgnore
 * phpcs:disable Inpsyde.CodeQuality.FunctionLength.TooLong
 */
class Module implements
    Modularity\Module\FactoryModule,
    Modularity\Module\ServiceModule,
    Modularity\Module\ExecutableModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function run(ContainerInterface $container): bool
    {
        $this->extendBodyClasses($container);
        $this->registerIconSets($container);
        $this->registerElements($container);
        //    $this->extendNavigationMenus($container);


        return true;
    }

    public function factories(): array
    {
        return [
            Elements\Icon::class => static fn(ContainerInterface $container) => new Elements\Icon(
                $container->get(Icon\IconSetRegistry::class)
            ),
        ];
    }

    public function services(): array
    {
        return [
            Icon\AntDesignFilledIconSet::class => static function (ContainerInterface $container): Icon\IconSet {
                return new Icon\AntDesignFilledIconSet(
                    $container->get(Modularity\Package::PROPERTIES)
                );
            },
            Icon\AntDesignOutlinedIconSet::class => static function (ContainerInterface $container): Icon\IconSet {
                return new Icon\AntDesignOutlinedIconSet(
                    $container->get(Modularity\Package::PROPERTIES)
                );
            },
            Icon\AntDesignTwoToneIconSet::class => static function (ContainerInterface $container): Icon\IconSet {
                return new Icon\AntDesignTwoToneIconSet(
                    $container->get(Modularity\Package::PROPERTIES)
                );
            },
            Icon\CorporateIconSet::class => static function (ContainerInterface $container): Icon\IconSet {
                return new Icon\CorporateIconSet(
                    $container->get(Modularity\Package::PROPERTIES)
                );
            },
            Icon\FontAwesomeRegularIconSet::class => static function (ContainerInterface $container): Icon\IconSet {
                return new Icon\FontAwesomeRegularIconSet(
                    $container->get(Modularity\Package::PROPERTIES)
                );
            },
            Icon\FontAwesomeSolidIconSet::class => static function (ContainerInterface $container): Icon\IconSet {
                return new Icon\FontAwesomeSolidIconSet(
                    $container->get(Modularity\Package::PROPERTIES)
                );
            },
            Icon\FontAwesomeBrandsIconSet::class => static function (ContainerInterface $container): Icon\IconSet {
                return new Icon\FontAwesomeBrandsIconSet(
                    $container->get(Modularity\Package::PROPERTIES)
                );
            },
            Icon\IconSetRegistry::class => static function (ContainerInterface $container): Icon\IconSetRegistry {
                return new Icon\IconSetRegistry(
                    $container->get(Logger::class),
                    in_array(\wp_get_environment_type(), ['local', 'development'], true)
                );
            },
        ];
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

    private function registerIconSets(ContainerInterface $container): void
    {
        /** @var Icon\IconSet[] $iconSets */
        $iconSets = [
            $container->get(Icon\AntDesignFilledIconSet::class),
            $container->get(Icon\AntDesignOutlinedIconSet::class),
            $container->get(Icon\AntDesignTwoToneIconSet::class),
            $container->get(Icon\CorporateIconSet::class),
            $container->get(Icon\FontAwesomeRegularIconSet::class),
            $container->get(Icon\FontAwesomeSolidIconSet::class),
            $container->get(Icon\FontAwesomeBrandsIconSet::class),
        ];

        /** @var Icon\IconSetRegistry $registry */
        $registry = $container->get(Icon\IconSetRegistry::class);
        $registry->register(...$iconSets);

        add_action(
            'wp_head',
            fn() => $this->maybePrintIconAuthorsAttribution($container)
        );
    }

    private function maybePrintIconAuthorsAttribution(ContainerInterface $container): void
    {
        $this->maybePrintAntDesignAttribution($container);
        $this->maybePrintFontAwesomeAttribution($container);
    }

    /**
     * We need to give attribution to comply with Ant Design Icons license
     *
     * @lik https://github.com/ant-design/ant-design-icons/blob/master/LICENSE
     */
    private function maybePrintAntDesignAttribution(ContainerInterface $container): void
    {
        $iconSets = [
            $container->get(Icon\AntDesignFilledIconSet::class),
            $container->get(Icon\AntDesignOutlinedIconSet::class),
            $container->get(Icon\AntDesignTwoToneIconSet::class),
        ];

        /** @var Icon\IconSetRegistry $registry */
        $registry = $container->get(Icon\IconSetRegistry::class);

        foreach ($iconSets as $iconSet) {
            if ($registry->has($iconSet->name())) {
                // phpcs:ignore Inpsyde.CodeQuality.LineLength.TooLong
                echo '<!--! Ant Design Icons 5.24.9 by @ant-design - https://ant.design/ License - https://github.com/ant-design/ant-design-icons/blob/master/LICENSE (Icons: MIT License) Copyright (c) 2018-present Ant UED, https://xtech.antfin.com/ -->';
                return;
            }
        }
    }

    /**
     * Since we remove the Font Awesome attribution comments from SVGs,
     * we manually add it back to comply with the license
     *
     * @lik https://github.com/FortAwesome/Font-Awesome#license
     */
    private function maybePrintFontAwesomeAttribution(ContainerInterface $container): void
    {
        $iconSets = [
            $container->get(Icon\FontAwesomeRegularIconSet::class),
            $container->get(Icon\FontAwesomeSolidIconSet::class),
            $container->get(Icon\FontAwesomeBrandsIconSet::class),
        ];

        /** @var Icon\IconSetRegistry $registry */
        $registry = $container->get(Icon\IconSetRegistry::class);

        foreach ($iconSets as $iconSet) {
            if ($registry->has($iconSet->name())) {
                // phpcs:ignore Inpsyde.CodeQuality.LineLength.TooLong
                echo '<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->';
                return;
            }
        }
    }


    private function extendNavigationMenus(ContainerInterface $container): void
    {
        MoreMenuFields\bootstrap();

        // Extend navigation menus
        add_filter(
            MoreMenuFields\FILTER_FIELDS,
            static function (array $fields, MoreMenuFields\EditFieldValueFactory $valueFactory) use ($container) {
                try {
                    $fields[] = new Navigation\MenuIconField(
                        $container->get( IconSetRegistry::class),
                        $valueFactory->create(Navigation\MenuIconField::NAME)
                    );
                } catch (\Exception $e) {
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

                if (!$value || !is_string($value)) {
                    return $args;
                }

                $parts = explode('_', $value);
                $iconSet = $parts[0] ?? null;
                $iconName = $parts[1] ?? null;

                if (!$iconSet || !$iconName) {
                    return $args;
                }

                $newArgs = clone $args;
                $newArgs->link_before = icon($iconSet, $iconName)->render();

                return $newArgs;
            },
            10,
            2,
        );
    }



    private function registerElements(ContainerInterface $container): void
    {
        // Elements to be registered
        $elements = [
            Elements\Icon::class,
        ];

        foreach ($elements as $element) {
            PresentationElements\registerElement(
                $element,
                fn() => $container->has($element)
                    ? $container->get($element)
                    : new PresentationElements\Element\NullElement()
            );
        }
    }
}
