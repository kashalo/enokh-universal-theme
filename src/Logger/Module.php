<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Logger;

use Inpsyde\Modularity;
use Psr\Log\LoggerInterface;

/**
 * @codeCoverageIgnore
 * phpcs:disable Inpsyde.CodeQuality.FunctionLength.TooLong
 */
class Module implements Modularity\Module\ServiceModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
            Logger::class => static function (): LoggerInterface {
                return new Logger();
            },
        ];
    }
}
