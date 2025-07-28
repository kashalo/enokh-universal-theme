<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme;

use Enokh\UniversalTheme\Module\EditorModule;
use Enokh\UniversalTheme\Module\MetaBoxModule;
use Enokh\UniversalTheme\Module\TemplateModule;
use Enokh\UniversalTheme\Module\UtilityModule;
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

    if (!$package) {
        $package = Modularity\Package::new(
            Modularity\Properties\ThemeProperties::new(basename(dirname(__DIR__, 1)))
        );

        // Register theme modules
        array_map(
            [$package, 'addModule'],
            [
                new Presentation\Module(),

                new Asset\Module(),
                new Blocks\Accordion\Module(),
                new Blocks\AccordionItem\Module(),
                new Blocks\Carousel\Module(),
                new Blocks\CarouselArrows\Module(),
                new Blocks\CarouselItems\Module(),
                new Blocks\CarouselNavigation\Module(),
                new Blocks\CarouselNext\Module(),
                new Blocks\CarouselPlayPause\Module(),
                new Blocks\CarouselPrevious\Module(),
                new Blocks\CarouselScrollbar\Module(),
                new Blocks\CarouselScrollbar\Module(),
                new Blocks\Footer\Module(),
                new Blocks\Header\Module(),
                new Blocks\Icon\Module(),
                new Blocks\List\Module(),
                new Blocks\ListItem\Module(),
                new Blocks\Navigation\Module(),
                new Blocks\NavigationDrawer\Module(),
                new Blocks\NavigationDrawerTheme\Module(),
                new Blocks\NavigationDrawerToggle\Module(),
                new Blocks\RelatedPosts\Module(),
                new Blocks\Search\Module(),
                new Blocks\Sharing\Module(),
                new Blocks\Tab\Module(),
                new Blocks\TabPanel\Module(),
                new Blocks\TaxonomyList\Module(),
                new Blocks\Module(),

                new Config\Module(),
                new Customizer\Module(),
                new I18n\Module(),
                new Logger\Module(),
                new Model\Module(),

                new EditorModule(),
                new MetaBoxModule(),
                new TemplateModule(),
                new UtilityModule(),
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
