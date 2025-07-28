<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Module;

use Enokh\UniversalTheme\Template\Renderer;
use Inpsyde\Modularity\Module\ModuleClassNameIdTrait;
use Inpsyde\Modularity\Module\ServiceModule;
use Inpsyde\Modularity\Package;
use Inpsyde\Modularity\Properties\PluginProperties;
use Psr\Container\ContainerInterface;

class TemplateModule implements ServiceModule
{
    use ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
            Renderer::class => static function (ContainerInterface $container): Renderer {
                /** @var PluginProperties $properties */
                $properties = $container->get(Package::PROPERTIES);
                return new Renderer($properties->basePath() . 'resources/');
            },
        ];
    }
}
