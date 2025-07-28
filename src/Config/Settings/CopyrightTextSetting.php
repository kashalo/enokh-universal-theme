<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Config\Settings;

use Enokh\UniversalTheme\Config\Contracts;

class CopyrightTextSetting implements Contracts\Setting
{
    // phpcs:disable Inpsyde.CodeQuality.LineLength.TooLong
    public const NAME = 'enokkh_site_copyright';
    public const DEFAULT = 'Copyright © 2025 All rights reserved.';

    // phpcs:enable Inpsyde.CodeQuality.LineLength.TooLong

    public function group(): string
    {
        return 'general';
    }

    public function name(): string
    {
        return self::NAME;
    }

    public function arguments(): array
    {
        return [
            'show_in_rest' => [
                'name' => self::NAME,
                'schema' => [
                    'anyOf' => [
                        ['type' => 'string'],
                        ['type' => 'null'],
                    ],
                    'default' => self::DEFAULT,
                ],
            ],
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'description' => __('Site copyright', 'enokh-universal-theme'),
            'default' => self::DEFAULT,
        ];
    }

    public function value(): ?string
    {
        return (string) get_option(self::NAME, self::DEFAULT);
    }

    public function updateValue(string $value): bool
    {
        if ($this->value() === $value) {
            return true;
        }

        return update_option(self::NAME, $value);
    }

    public function deleteValue(): bool
    {
        return !$this->value() || delete_option(self::NAME);
    }
}
