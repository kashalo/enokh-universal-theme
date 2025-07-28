<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Header\Elements;

use Enokh\UniversalTheme\Asset;
use Enokh\UniversalTheme\Config;
use Inpsyde\PresentationElements;

use function Inpsyde\PresentationElements\block;
use function Inpsyde\PresentationElements\renderValue;

class HeaderBlock extends PresentationElements\Block\BaseBlock implements Asset\WithAssetLocalization
{
    // Block configuration
    public const BLOCK_TYPE = 'enokh-universal-theme/header';

    // CSS classes
    public const CLASS_WRAPPER = 'enokh-universal-theme-header';
    public const CLASS_PRIMARY_CONTAINER = self::CLASS_WRAPPER . '__primary-container';
    public const CLASS_SECONDARY_CONTAINER = self::CLASS_WRAPPER . '__secondary-container';

    public static function name(): string
    {
        return 'blocks/' . self::BLOCK_TYPE;
    }

    public function __construct()
    {
        $this->withAttributes($this->defaultAttributes());
        $this->withBlocks($this->defaultBlocks());
    }

    public function type(): string
    {
        return self::BLOCK_TYPE;
    }

    public function renderWrapper(mixed $content): string
    {
        return renderValue($content);
    }

    public function assetLocalization(): Asset\AssetLocalization
    {
        return new Asset\AssetLocalization(
            'Header',
            [
                'wrapperClass' => self::CLASS_WRAPPER,
            ]
        );
    }

    protected function defaultAttributes(): array
    {
        return [
            "layout" => [
                "type" => "constrained",
            ],
            "style" => [
                "color" => [
                    "background" => 'var(--enokh--color--neutral-100)',
                ],
                "spacing" => [
                    "padding" => [
                        "top" => 'var:preset|spacing|40',
                        "bottom" => 'var:preset|spacing|40',
                        "left" => 'var:preset|spacing|50',
                        "right" => 'var:preset|spacing|50',
                    ],
                ],
                "border" => [
                    "bottom" => [
                        'color' => 'var(--enokh--color--neutral-70)',
                        "width" => '1px',
                    ],
                ],
            ],
        ];
    }

    protected function defaultBlocks(): array
    {
        return [
            block(
                'core/group',
                [
                    "layout" => [
                        "type" => "flex",
                        'orientation' => 'horizontal',
                        "justifyContent" => "space-between",
                    ],
                ],
                [
                    self::logo(),
                    block(
                        'core/group',
                        [
                            "layout" => [
                                "type" => "flex",
                                'orientation' => 'vertical',
                                "justifyContent" => "right",
                                "verticalAlignment" => "space-between",
                            ],
                        ],
                        [
                            self::secondaryContainer(),
                            self::primaryContainer(),
                        ],
                    ),
                ]
            ),
        ];
    }

    protected static function logo(): PresentationElements\Contracts\Block
    {
        return block('core/site-logo');
    }

    protected static function primaryContainer(): PresentationElements\Contracts\Block
    {
        return block(
            'core/group',
            [
                "className" => self::CLASS_PRIMARY_CONTAINER,
                'layout' => [
                    "type" => "flex",
                    "flexWrap" => "nowrap",
                ],
            ],
            [
                self::primaryNavigation(),
                self::navigationDrawerToggle(),
            ]
        );
    }

    protected static function primaryNavigation(): PresentationElements\Contracts\Block
    {
        return block(
            'enokh-universal-theme/navigation',
            [
                "menuLocation" => Config\Module::NAVIGATION_MENU_MAIN,
                "fontSize" => "large",
                "style" => [
                    "typography" => [
                        "textTransform" => "uppercase",
                    ],
                ],
                "layout" => [
                    "type" => "flex",
                    "orientation" => "horizontal",
                    "justifyContent" => "left",
                    "verticalAlignment" => "center",
                    "flexWrap" => "nowrap",
                ],
            ]
        );
    }

    public static function navigationDrawerToggle(): PresentationElements\Contracts\Block
    {
        return block('enokh-universal-theme/navigation-drawer-toggle');
    }

    protected static function secondaryContainer(): PresentationElements\Contracts\Block
    {
        return block(
            'core/group',
            [
                "className" => self::CLASS_SECONDARY_CONTAINER,
                'layout' => [
                    "type" => "flex",
                    "flexWrap" => "nowrap",
                    "verticalAlignment" => "center",
                ],
            ],
            [
                self::secondaryNavigation(),
                self::search(),
            ]
        );
    }

    public static function secondaryNavigation(): PresentationElements\Contracts\Block
    {
        return block(
            'enokh-universal-theme/navigation',
            [
                "menuLocation" => Config\Module::NAVIGATION_MENU_UTILITY,
                "fontSize" => "small",
                "style" => [
                    "typography" => [
                        "textTransform" => "uppercase",
                    ],
                    "spacing" => [
                        "blockGap" => "var:preset|spacing|40",
                    ],
                    "elements" => [
                        "link" => [
                            "color" => [
                                "text" => "var(--enokh--color--neutral-20)",
                            ],
                            ":hover" => [
                                "color" => [
                                    "text" => "var(--enokh--color--brand-primary-60)",
                                ],
                            ],
                        ],
                    ],
                ],
                "layout" => [
                    "type" => "flex",
                    "orientation" => "horizontal",
                    "justifyContent" => "right",
                    "verticalAlignment" => "center",
                    "flexWrap" => "nowrap",
                ],
            ]
        );
    }

    public static function search(): PresentationElements\Contracts\Block
    {
        return block(
            'enokh-universal-theme/search',
            [
                'fontSize' => 'small',
                "style" => [
                    "typography" => [
                        "textTransform" => "uppercase",
                    ],
                    "spacing" => [
                        "padding" => [
                            'top' => '0',
                            'bottom' => '0',
                            'left' => '4px',
                            'right' => '4px',
                        ],
                    ],
                ],
                'buttonOnly' => true,
            ]
        );
    }
}
