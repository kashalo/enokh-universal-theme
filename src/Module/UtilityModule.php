<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Module;

use Enokh\UniversalTheme\Utility\BlockUtility;
use Enokh\UniversalTheme\Utility\DynamicContentUtility;
use Inpsyde\Modularity\Module\ExecutableModule;
use Inpsyde\Modularity\Module\ModuleClassNameIdTrait;
use Inpsyde\Modularity\Module\ServiceModule;
use Psr\Container\ContainerInterface;

class UtilityModule implements ServiceModule, ExecutableModule
{
    use ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
            BlockUtility::class => static function (): BlockUtility {
                return new BlockUtility();
            },
            DynamicContentUtility::class => static function (): DynamicContentUtility {
                return new DynamicContentUtility();
            },
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        /** @var DynamicContentUtility $dynamicContentUtility */
        $dynamicContentUtility = $container->get(DynamicContentUtility::class);
        add_filter('render_block', [$dynamicContentUtility, 'filterRenderedBlocks'], 10, 3);

        return true;
    }
}
