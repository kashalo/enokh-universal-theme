<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme;

use Inpsyde\Modularity;

$autoloader = __DIR__ . '/vendor/autoload.php';

if (is_readable($autoloader) && !function_exists(__NAMESPACE__ . '\package')) {
    include_once $autoloader;
}

unset($autoloader);

add_action(
    'after_setup_theme',
    static function (): void {

        add_action(
            package()->hookName(Modularity\Package::ACTION_FAILED_BOOT),
            /**
             * Display an error message in the WP admin.
             *
             * @param \Throwable $exception
             */
            static function (\Throwable $exception): void {
                $message = sprintf(
                    '<strong>Error:</strong> %s <br><pre>%s</pre>',
                    $exception->getMessage(),
                    $exception->getTraceAsString()
                );

                $noticeCallback = static function () use ($message) {
                    printf(
                        '<div class="notice notice-error"><p>%s</p></div>',
                        wp_kses_post($message)
                    );
                };
                add_action('admin_notices', $noticeCallback);
                add_action('network_admin_notices', $noticeCallback);
                do_action(
                    'Enokh.universal-theme.info',
                    [
                        'message' => '[Enokh Universal Theme 2] Bootstrapping failure',
                        'context' => [
                            'message' => $exception->getMessage(),
                            'trace' => $exception->getTraceAsString(),
                        ],
                    ]
                );
            }
        );

        package()->boot();
    },
    0 // Boot earlier so that child themes can boot on the default priority without issues
);

