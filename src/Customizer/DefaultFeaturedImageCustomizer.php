<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Customizer;

class DefaultFeaturedImageCustomizer
{
    public const ID = 'default_featured_image';

    /**
     * @param \WP_Customize_Manager $customizer
     *
     * @return \WP_Customize_Manager
     */
    public function customizerSettings(\WP_Customize_Manager $customizer): \WP_Customize_Manager
    {
        $customizer->add_setting(self::ID, [
            'default' => '',
            'type' => 'theme_mod',
            'capability' => 'edit_theme_options',
            'transport' => 'refresh',
        ]);

        /**
         * Using WP_Customize_Cropped_Image_Control instead WP_Customize_Image_Control to
         * save the attachment id instead of attachment URL,
         * so that we hook into less filters/actions
         * @psalm-suppress InvalidArgument
         */
        $customizer->add_control(
            new \WP_Customize_Cropped_Image_Control(
                $customizer,
                self::ID,
                [
                    'label' => __('Default Featured Image', 'enokh-universal-theme'),
                    'section' => 'title_tagline',
                    'flex_width' => true,
                    'flex_height' => true,
                    'width' => 800,
                    'height' => 450,
                    'description' => __(
                        'Default featured image displays on archive pages when the post item does not have one.',
                        'enokh-universal-theme'
                    ),
                ]
            )
        );

        return $customizer;
    }
}
