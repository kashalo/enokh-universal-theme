<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Config;

class ThemeJson implements \JsonSerializable
{
    public const SCHEMA = '$schema';
    public const VERSION = 'version';
    public const TITLE = 'title';
    public const DESCRIPTION = 'description';
    public const SETTINGS = 'settings';
    public const STYLES = 'styles';
    public const CUSTOM_TEMPLATES = 'customTemplates';
    public const TEMPLATE_PARTS = 'templateParts';
    public const PATTERNS = 'patterns';

    private const CONFIG_FILE = 'theme.json';
    private const CONFIG_DIR = 'theme-json';

    private array $data = [
        self::SCHEMA => 'https://schemas.wp.org/trunk/theme.json',
        self::VERSION => 2,
        self::TITLE => '',
        self::DESCRIPTION => '',
        self::SETTINGS => [],
        self::STYLES => [],
        self::CUSTOM_TEMPLATES => [],
        self::TEMPLATE_PARTS => [],
        self::PATTERNS => [],
    ];

    /**
     * @var non-empty-string
     */
    private string $delimiter = '.';

    public static function fromTheme(\WP_Theme $theme): self
    {
        return (new self())->mergeWithTheme($theme);
    }

    public function __construct(array $data = [])
    {
        $this->data = wp_parse_args($this->data, $data);
    }

    public function has(string $key): bool
    {
        $data = $this->data;

        foreach (explode($this->delimiter, $key) as $segment) {
            if (!is_array($data) || !array_key_exists($segment, $data)) {
                return false;
            }
            $data = $data[$segment];
        }

        return true;
    }

    // phpcs:disable Inpsyde.CodeQuality.ReturnTypeDeclaration.IncorrectVoidReturn
    public function get(string $key): null|bool|int|float|string|array
    {
        $data = $this->data;

        foreach (explode($this->delimiter, $key) as $segment) {
            if (!is_array($data) || !array_key_exists($segment, $data)) {
                return null;
            }
            $data = $data[$segment];
        }

        return $data;
    }

    // phpcs:enable Inpsyde.CodeQuality.ReturnTypeDeclaration.IncorrectVoidReturn

    public function set(string $key, null|bool|int|float|string|array $value): self
    {
        if (is_string($value) && is_file($value)) {
            $value = wp_json_file_decode($value, ['associative' => true]);

            if (is_null($value)) {
                return $this;
            }
        }

        /** @psalm-suppress UnsupportedPropertyReferenceUsage */
        $data = &$this->data;

        foreach (explode($this->delimiter, $key) as $segment) {
            if ($data && !is_array($data)) {
                return $this;
            }

            if (!array_key_exists($segment, $data)) {
                $data[$segment] = [];
            }

            $data = &$data[$segment];
        }

        $data = $value;

        return $this;
    }

    public function merge(string|array|\WP_Theme $data): self
    {
        // Theme merging
        if ($data instanceof \WP_Theme) {
            return $this->mergeWithTheme($data);
        }

        // Directory merging
        if (is_string($data)) {
            if (!is_dir($data) || !is_readable($data)) {
                return $this;
            }

            foreach (glob($data . '/*.json') as $jsonConfigFile) {
                $this->set(basename($jsonConfigFile, ".json"), $jsonConfigFile);
            }

            return $this;
        }

        // Array merging
        foreach ($data as $key => $value) {
            if (!is_string($key)) {
                continue;
            }
            $this->set($key, $value);
        }

        return $this;
    }

    public function toArray(): array
    {
        return $this->data;
    }

    public function jsonSerialize(): string
    {
        return (string) \wp_json_encode($this->data);
    }

    private function mergeWithTheme(\WP_Theme $theme): self
    {
        $basePath = $theme->get_stylesheet_directory();
        $jsonFile = $basePath . '/' . self::CONFIG_FILE;

        $themeJson = wp_json_file_decode($jsonFile, ['associative' => true]) ?: [];
        $themeJson && $this->merge($themeJson);

        foreach (glob($basePath . '/' . self::CONFIG_DIR . '/*.json') as $jsonConfigFile) {
            $this->set(basename($jsonConfigFile, ".json"), $jsonConfigFile);
        }

        return $this;
    }
}
