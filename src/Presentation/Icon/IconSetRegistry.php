<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation\Icon;

use Psr\Log\LoggerInterface;

class IconSetRegistry
{
    /**
     * @var IconSet[]
     */
    private array $sets = [];

    public function __construct(
        private LoggerInterface $logger,
        private bool $isDebug
    ) {
    }

    public function register(IconSet ...$sets): self
    {
        foreach ($sets as $set) {
            if (isset($this->sets[$set->name()])) {
                $this->throwExceptionIfDebug(sprintf(
                    'Set %s is already registered',
                    $set->name()
                ));
                return $this;
            }

            if (!is_dir($set->directory())) {
                $this->throwExceptionIfDebug(sprintf(
                    'Path %s is not a directory',
                    $set->directory()
                ));
                return $this;
            }

            $this->sets[$set->name()] = $set;
        }

        return $this;
    }

    public function deregister(IconSet ...$sets): self
    {
        foreach ($sets as $set) {
            if (isset($this->sets[$set->name()])) {
                unset($this->sets[$set->name()]);
            }
        }

        return $this;
    }

    public function has(string $setName): bool
    {
        return isset($this->sets[$setName]);
    }

    public function byName(string $setName): ?IconSet
    {
        return $this->sets[$setName] ?? null;
    }

    public function all(): array
    {
        return array_values($this->sets);
    }

    private function throwExceptionIfDebug(string $message): void
    {
        $message = sprintf('[ICONS] %s', $message);
        $this->logger->error($message);

        if ($this->isDebug) {
            throw new \RuntimeException($message);
        }
    }
}
