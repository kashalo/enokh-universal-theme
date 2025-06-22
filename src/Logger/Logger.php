<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Logger;

use Psr\Log\LoggerInterface;
use Psr\Log\LoggerTrait;

class Logger implements LoggerInterface
{
    use LoggerTrait;

    public const ACTION_LOG = 'enokh.universal-theme';

    /**
     * @param mixed $level
     * @param string $message
     * @param array $context
     *
     * phpcs:disable Inpsyde.CodeQuality.ArgumentTypeDeclaration
     * phpcs:disable Inpsyde.CodeQuality.ReturnTypeDeclaration
     *
     * @psalm-suppress MissingReturnType
     * @psalm-suppress MissingParamType
     */
    public function log($level, $message, array $context = [])
    {
        do_action(
            self::ACTION_LOG . '.' . (string) $level,
            [
                'message' => '[Inpsyde Media Discovery] ' . $message,
                'context' => $context,
            ]
        );
    }
}
