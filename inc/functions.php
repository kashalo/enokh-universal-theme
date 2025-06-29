<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme;

use Enokh\UniversalTheme\Presentation\Elements\Icon;
use Inpsyde\Modularity;

use function Inpsyde\PresentationElements\element;

/**
 * @return Modularity\Package
 */
function package(): Modularity\Package
{
    /** @var null|Modularity\Package $package */
    static $package;

    if (! $package) {
        $package = Modularity\Package::new(
            Modularity\Properties\ThemeProperties::new(basename(dirname(__FILE__, 2)))
        );

        // Register theme modules
        array_map(
            [$package, 'addModule'],
            [
                new Asset\Module(),
                new Blocks\Footer\Module(),
                new Blocks\Header\Module(),
                new Blocks\NavigationDrawer\Module(),
                new Blocks\NavigationDrawerBlock\Module(),
                new Blocks\Navigation\Module(),
                new Blocks\NavigationDrawerToggle\Module(),
                new Blocks\Search\Module(),
                new Blocks\RelatedPosts\Module(),
                new Blocks\Module(),
                new Config\Module(),
                new Customizer\Module(),
                new I18n\Module(),
                new Logger\Module(),
                new Model\Module(),
                new Presentation\Module(),
            ]
        );

        $package->connect(\Inpsyde\PresentationElements\package());
    }

    return $package;
}


/**
 * Builds an Icon presentation element for a registered icon
 *
 * @param string $set
 * @param string $name
 * @param array<string, mixed> $attributes
 * @return Icon
 */
function icon(string $set, string $name, array $attributes = []): Icon
{
    /** @var Icon $icon */
    $icon = element(Icon::class);
    $icon->withIcon($set, $name)->withAttributes($attributes);

    return $icon;
}
