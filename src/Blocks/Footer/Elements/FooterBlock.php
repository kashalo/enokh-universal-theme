<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\Footer\Elements;

use Enokh\UniversalTheme\Asset;
use Enokh\UniversalTheme\Config;
use Inpsyde\PresentationElements;

use function Inpsyde\PresentationElements\block;
use function Inpsyde\PresentationElements\renderValue;

class FooterBlock extends PresentationElements\Block\BaseBlock implements Asset\WithAssetLocalization
{
    // Block configuration
    public const BLOCK_TYPE = 'enokh-universal-theme/footer';

    // CSS classes
    public const CLASS_WRAPPER = 'enokh-universal-theme-footer';
    public const CLASS_PRIMARY_CONTAINER = self::CLASS_WRAPPER . '__primary-container';
    public const CLASS_SECONDARY_CONTAINER = self::CLASS_WRAPPER . '__secondary-container';
    public const CLASS_LOGO = self::CLASS_WRAPPER . '__logo';

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
            'Footer',
            [
                'wrapperClass' => self::CLASS_WRAPPER,
            ]
        );
    }

    protected function defaultAttributes(): array
    {
        return [
            "style" => [
                "spacing" => [
                    "blockGap" => "0",
                ],
            ],
        ];
    }

    protected function defaultBlocks(): array
    {
        return [
            self::secondaryContainer(),
            self::primaryContainer(),
        ];
    }

    protected static function primaryContainer(): PresentationElements\Contracts\Block
    {
        return block(
            'core/group',
            [
                "className" => self::CLASS_PRIMARY_CONTAINER,
                "layout" => [
                    "type" => "constrained",
                ],
                "style" => [
                    "spacing" => [
                        "padding" => [
                            "top" => 'var:preset|spacing|50',
                            "bottom" => 'var:preset|spacing|50',
                            "left" => 'var:preset|spacing|50',
                            "right" => 'var:preset|spacing|50',
                        ],
                    ],
                    "border" => [
                        "top" => [
                            'color' => 'var(--enokh--color--neutral-70)',
                            "width" => '1px',
                            "style" => 'solid',
                        ],
                    ],
                ],
            ],
            [
                block(
                    'core/group',
                    [
                        "layout" => [
                            "type" => "flex",
                            "justifyContent" => "space-between",
                        ],
                    ],
                    [
                        self::logo(),
                        // self::copyright(),
                    ]
                ),
            ]
        );
    }

    protected static function secondaryContainer(): PresentationElements\Contracts\Block
    {
        return block(
            'core/group',
            [
                "className" => self::CLASS_SECONDARY_CONTAINER,
                "layout" => [
                    "type" => "constrained",
                ],
                "style" => [
                    "spacing" => [
                        "padding" => [
                            "top" => 'var:preset|spacing|40',
                            "bottom" => 'var:preset|spacing|40',
                            "left" => 'var:preset|spacing|50',
                            "right" => 'var:preset|spacing|50',
                        ],
                    ],
                ],
            ],
            [
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
                        self::navigation(),
                        self::socialLinks(),
                    ]
                ),
            ]
        );
    }

    protected static function logo(): PresentationElements\Contracts\Block
    {
        $logo = get_theme_mod('custom_logo');
        $image = wp_get_attachment_image_src($logo, 'full');

        return block(
            'core/image',
            [
                'className' => self::CLASS_LOGO,
                'src' => is_array($image) ? $image[0] : '',
                'alt' => get_bloginfo('name'),
            ]
        );
    }

    protected static function copyright(): PresentationElements\Contracts\Block
    {
        return block(
            'enokh-universal-theme/copyright',
            [
                "fontSize" => "small",
            ]
        );
    }

    protected static function navigation(): PresentationElements\Contracts\Block
    {
        return block(
            'enokh-universal-theme/navigation',
            [
                "menuLocation" => Config\Module::NAVIGATION_MENU_FOOTER,
                "fontSize" => "small",
                "style" => [
                    "typography" => [
                        "textTransform" => "uppercase",
                    ],
                    "spacing" => [
                        "blockGap" => "var:preset|spacing|30",
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

    protected static function socialLinks(): PresentationElements\Contracts\Block
    {
        return block(
            'core/social-links',
            [
                "layout" => [
                    "type" => "flex",
                    "orientation" => "horizontal",
                    "justifyContent" => "left",
                    "verticalAlignment" => "center",
                    "flexWrap" => "nowrap",
                ],
            ],
            [
                block(
                    'core/social-link',
                    [
                        'service' => 'twitter',
                        'url' => 'https://twitter.com/MerckAH',
                    ]
                ),
                block(
                    'core/social-link',
                    [
                        'service' => 'facebook',
                        'url' => 'https://www.facebook.com/merckanimalhealth',
                    ]
                ),
                block(
                    'core/social-link',
                    [
                        'service' => 'youtube',
                        'url' => 'https://www.youtube.com/user/MerckAnimalHealth',
                    ]
                ),
                block(
                    'core/social-link',
                    [
                        'service' => 'linkedin',
                        'url' => 'https://www.linkedin.com/showcase/merck-animal-health',
                    ]
                ),
                block(
                    'core/social-link',
                    [
                        'service' => 'instagram',
                        'url' => 'https://www.instagram.com/merckanimalhealth/',
                    ]
                ),
            ],
        );
    }
}
