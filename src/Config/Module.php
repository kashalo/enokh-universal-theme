<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Config;

use Inpsyde\Modularity;
use Enokh\UniversalTheme\Config;
use Enokh\UniversalTheme\Config\Settings;
use Psr\Container\ContainerInterface;

/**
 * @codeCoverageIgnore
 * phpcs:disable Inpsyde.CodeQuality.FunctionLength.TooLong
 * phpcs:disable Inpsyde.CodeQuality.LineLength.TooLong
 */
class Module implements
    Modularity\Module\ServiceModule,
    Modularity\Module\ExecutableModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public const IMAGE_SIZES = 'image-sizes';
    public const NAVIGATION_MENUS = 'navigation-menus';
    public const NAVIGATION_MENU_MAIN = 'main';
    public const NAVIGATION_MENU_UTILITY = 'utility';
    public const NAVIGATION_MENU_FOOTER = 'footer';
    public const NAVIGATION_MENU_LANGUAGE_SWITCHER = 'language-switcher';
    public const SETTINGS = 'settings';
    public const SUPPORTS = 'supports';
    public const TEMPLATE_AREAS = 'template-areas';
    public const THUMBNAIL_SIZE = 'thumbnail-size';

    public function services(): array
    {
        return [
            ThemeJson::class => static function (ContainerInterface $container): ThemeJson {

                /** @var Modularity\Properties\Properties $properties */
                $properties = $container->get(Modularity\Package::PROPERTIES);

                return ThemeJson::fromTheme(wp_get_theme($properties->baseName()));
            },
            self::IMAGE_SIZES => static fn(): array => [],
            self::NAVIGATION_MENUS => static fn(): array => [
                self::NAVIGATION_MENU_MAIN => __('Main Menu', 'enokh-universal-theme'),
                self::NAVIGATION_MENU_UTILITY => __('Utility Menu', 'enokh-universal-theme'),
                self::NAVIGATION_MENU_FOOTER => __('Footer Menu', 'enokh-universal-theme'),
                self::NAVIGATION_MENU_LANGUAGE_SWITCHER => __('Language Switcher', 'enokh-universal-theme'),
            ],
            /**
             * ONLY for supports not handled by theme.json
             * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/
             *
             * @returns array<string, bool|array>
             */
            self::SUPPORTS => static fn(): array => [

                /**
                 * Include default opinionated theme styles
                 * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/theme.scss
                 */
                'wp-block-styles' => true,

                /**
                 * Need to be enabled to use add_editor_style()
                 * @link https://developer.wordpress.org/reference/functions/add_editor_style/
                 */
                'editor-styles' => true,

                /**
                 * Layout
                 */
                'responsive-embeds' => true,

                /**
                 * Features
                 */
                'core-block-patterns' => false,
                'post-thumbnails' => true,
                'menus' => true,
            ],
            self::TEMPLATE_AREAS => static fn(): array => [
                [
                    'area' => 'sidebar',
                    'label' => _x('Sidebar', 'template part area', 'enokh-universal-theme'),
                    'description' => __(
                        'The Sidebar template defines a page area that typically contains associated or secondary content.',
                        'enokh-universal-theme'
                    ),
                    'icon' => 'sidebar',
                    'area_tag' => 'aside',
                ],
                [
                    'area' => 'query',
                    'label' => _x('Query', 'template part area', 'enokh-universal-theme'),
                    'description' => __(
                        'The Query template defines a page area that typically contains results of a query.',
                        'enokh-universal-theme'
                    ),
                    'icon' => 'query',
                    'area_tag' => 'div',
                ],
            ],
            self::THUMBNAIL_SIZE => static fn(): array => [150, 150],
            Settings\CopyrightTextSetting::class => static fn() => new Settings\CopyrightTextSetting(),
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        $this->configureThemeJson($container);
        $this->configureSettings($container);
        $this->configureSupports($container);
        $this->configureNavigationMenus($container);
        $this->configureBlockTemplateAreas($container);
        $this->configureBlockPatterns();
        $this->configureImageSizes($container);
        $this->configureThumbnailSize($container);

        return true;
    }

    private function configureThemeJson(ContainerInterface $container): void
    {
        /** @var ThemeJson $themeJson */
        $themeJson = $container->get(ThemeJson::class);

        add_filter(
            'wp_theme_json_data_theme',
            fn (\WP_Theme_JSON_Data $data) => $data->update_with($themeJson->toArray())
        );
    }

    private function configureSettings(ContainerInterface $container): void
    {
        $registrationCallback = static function () use ($container): void {

            /** @var Config\Contracts\Setting[] $settings */
            $settings = [
                $container->get(Settings\CopyrightTextSetting::class),
            ];

            foreach ($settings as $setting) {
                \register_setting($setting->group(), $setting->name(), $setting->arguments());
            }
        };

        add_action('admin_init', $registrationCallback);
        add_action('rest_api_init', $registrationCallback);
    }

    private function configureSupports(ContainerInterface $container): void
    {
        /** @var array<array-key, bool|array> $supports */
        $supports = $container->get(self::SUPPORTS);

        foreach ($supports as $support => $args) {
            if (!is_string($support)) {
                continue;
            }
            $args === false
                ? remove_theme_support($support)
                : add_theme_support($support, ...is_array($args) ? $args : [true]);
        }
    }

    private function configureNavigationMenus(ContainerInterface $container): void
    {
        \register_nav_menus((array)$container->get(self::NAVIGATION_MENUS));
    }

    private function configureBlockTemplateAreas(ContainerInterface $container): void
    {
        add_filter(
            'default_wp_template_part_areas',
            fn(array $templateAreas): array => array_merge(
                $templateAreas,
                (array)$container->get(self::TEMPLATE_AREAS),
            )
        );
    }

    private function configureBlockPatterns(): void
    {
        add_filter('should_load_remote_block_patterns', '__return_false');
    }

    private function configureImageSizes(ContainerInterface $container): void
    {
        $sizes = $container->get(self::IMAGE_SIZES);

        foreach ($sizes as $name => $args) {
            if (!is_string($name) || !is_array($args) || count($args) < 2) {
                continue;
            }

            [$width, $height, $crop] = $args;

            if (!is_integer($width) || !is_integer($height)) {
                continue;
            }

            add_image_size($name, $width, $height, $crop);
        }
    }

    private function configureThumbnailSize(ContainerInterface $container): void
    {
        $args = $container->get(self::THUMBNAIL_SIZE);

        if (!is_array($args) || count($args) < 2) {
            return;
        }

        [$width, $height] = $args;

        if (!is_integer($width) || !is_integer($height)) {
            return;
        }

        set_post_thumbnail_size($width, $height);
    }
}
