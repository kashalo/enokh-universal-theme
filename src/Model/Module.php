<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Model;

use Inpsyde\App;
use Inpsyde\Modularity;
use Inpsyde\WpContracts;
use Enokh\UniversalTheme\Model\Taxonomy\DisplayGroupTaxonomy;
use Psr\Container\ContainerInterface;

/**
 * @codeCoverageIgnore
 * phpcs:disable Inpsyde.CodeQuality.FunctionLength.TooLong
 */
class Module implements Modularity\Module\ServiceModule, Modularity\Module\ExecutableModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
        ];
    }

    public function run(ContainerInterface $container): bool
    {


        return true;
    }
}
