<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\I18n;

/**
 * phpcs:disable Inpsyde.CodeQuality.NoAccessors.NoSetter
 */
class L10n
{
    /**
     * @var array<array<string, string>>
     */
    private array $data = [];
    private static ?self $instance = null;

    public static function set(string $group, string $key, string $translation): void
    {
        if (! isset(self::instance()->data[$group])) {
            self::instance()->data[$group] = [];
        }

        self::instance()->data[$group][$key] = $translation;
    }

    /**
     * @param string $group
     * @param array<string, string> $translations
     * @return void
     */
    public static function setMany(string $group, array $translations): void
    {
        foreach ($translations as $key => $translation) {
            self::set($group, $key, $translation);
        }
    }

    public static function get(string $group, string $key): string
    {
        return self::instance()->data[$group][$key] ?? '';
    }

    private function __construct()
    {
    }

    private static function instance(): self
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}
