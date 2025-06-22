<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\I18n;

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
        /** @var Modularity\Properties\Properties $properties */
        $properties = $container->get(Modularity\Package::PROPERTIES);

        $success = load_theme_textdomain(
            $properties->baseName(),
            $properties->domainPath(),
        );

        /**
         * Set translations here.
         *
         * Example:
         * 'key' => _x('Original Text', 'context', 'enokh-universal-theme'),
         */
        L10n::setMany('core', [

        ]);

        return $success;
    }
}
