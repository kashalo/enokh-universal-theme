<?php

declare(strict_types=1);

namespace  Enokh\UniversalTheme\Blocks\NavigationDrawerTheme\Elements;

use Inpsyde\PresentationElements;
use Enokh\UniversalTheme\Asset;
use Enokh\UniversalTheme\Config;

use function Inpsyde\PresentationElements\block;
use function Inpsyde\PresentationElements\renderValue;

class NavigationDrawerBlock extends PresentationElements\Block\BaseBlock implements Asset\WithAssetLocalization
{
    public const BLOCK_TYPE = 'enokh-universal-theme/navigation-drawer-theme';
    public const CLASS_WRAPPER = 'enokh-universal-theme-navigation-drawer';

    public static function name(): string
    {
        return 'blocks/' . self::BLOCK_TYPE;
    }

    public function __construct()
    {
        $this->withBlocks($this->defaultInnerBlocks());
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
            'NavigationDrawer',
            [
                'wrapperClass' => self::CLASS_WRAPPER,
            ]
        );
    }

    // phpcs:disable Inpsyde.CodeQuality.FunctionLength.TooLong
    private function defaultInnerBlocks(): array
    {
        return [
            block(
                'enokh-universal-theme/navigation-drawer',
                [
                    "style" => [
                        'color' => [
                            'background' => 'var(--mds--color--secondary-two)',
                        ],
                        'spacing' => [
                            'blockGap' => '0',
                        ],
                    ],
                ],
                [
                    block(
                        'core/group',
                        [
                            "style" => [
                                'color' => [
                                    'background' => 'var(--mds--color--primary-one-1)',
                                ],
                                "spacing" => [
                                    "blockGap" => "var:preset|spacing|30",
                                    "margin" => [
                                        "top" => '0',
                                        "bottom" => '0',
                                        "left" => '0',
                                        "right" => '0',
                                    ],
                                    "padding" => [
                                        "top" => 'var:preset|spacing|40',
                                        "bottom" => 'var:preset|spacing|40',
                                        "left" => 'var:preset|spacing|40',
                                        "right" => 'var:preset|spacing|40',
                                    ],
                                ],
                            ],
                        ],
                        block('enokh-universal-theme/search', [
                            "style" => [
                                'border' => [
                                    'color' => 'var(--enokh--color--white)',
                                ],
                            ],
                        ])
                    ),
                    block('enokh-universal-theme/navigation', [
                        'fontSize' => 'large',
                        "menuLocation" => Config\Module::NAVIGATION_MENU_MAIN,
                        "layout" => [
                            'type' => 'flex',
                            'orientation' => 'vertical',
                            'justifyContent' => 'left',
                            'verticalAlignment' => 'center',
                        ],
                        "style" => [
                            'color' => [
                                'background' => 'var(--enokh--color--white)',
                            ],
                            "spacing" => [
                                "blockGap" => "var:preset|spacing|30",
                                "margin" => [
                                    "top" => '0',
                                    "bottom" => '0',
                                    "left" => '0',
                                    "right" => '0',
                                ],
                                "padding" => [
                                    "top" => 'var:preset|spacing|40',
                                    "bottom" => 'var:preset|spacing|40',
                                    "left" => 'var:preset|spacing|40',
                                    "right" => 'var:preset|spacing|40',
                                ],
                            ],
                        ],
                    ]),
                    block('enokh-universal-theme/navigation', [
                        "menuLocation" => Config\Module::NAVIGATION_MENU_UTILITY,
                        "layout" => [
                            'type' => 'flex',
                            'orientation' => 'vertical',
                            'justifyContent' => 'left',
                            'verticalAlignment' => 'center',
                        ],
                        "style" => [
                            'color' => [
                                'background' => 'var(--enokh--color--white)',
                            ],
                            "spacing" => [
                                "blockGap" => "var:preset|spacing|30",
                                "margin" => [
                                    "top" => '0',
                                    "bottom" => '0',
                                    "left" => '0',
                                    "right" => '0',
                                ],
                                "padding" => [
                                    "top" => 'var:preset|spacing|40',
                                    "bottom" => 'var:preset|spacing|40',
                                    "left" => 'var:preset|spacing|40',
                                    "right" => 'var:preset|spacing|40',
                                ],
                            ],
                        ],
                    ]),
                ]
            ),
        ];
    }
    // phpcs:enable Inpsyde.CodeQuality.FunctionLength.TooLong
}
