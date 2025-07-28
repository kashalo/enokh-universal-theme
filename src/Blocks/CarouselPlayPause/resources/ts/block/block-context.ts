import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';
import { __ } from '@wordpress/i18n';

const carouselPlayPauseContext = defaultsDeep(
    {
        id: 'carouselPrevious',
        supports: {
            responsiveTabs: true,
            borders: {
                enabled: true,
                borderColors: [
                    {
                        state: '',
                        tooltip: __( 'Border', 'enokh-blocks' ),
                        alpha: true,
                    },
                    {
                        state: 'Hover',
                        tooltip: __( 'Border Hover', 'enokh-blocks' ),
                        alpha: true,
                    },
                ],
                borderTop: true,
                borderRight: true,
                borderBottom: true,
                borderLeft: true,
                borderRadius: true,
            },
            spacing: {
                enabled: true,
                padding: true,
                margin: true,
            },
            colors: {
                enabled: true,
                elements: [
                    {
                        group: 'play-background',
                        label: __( 'Play Background', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'playBackgroundColor',
                                alpha: true,
                            },
                            {
                                tooltip: __( 'Hover', 'enokh-blocks' ),
                                attribute: 'playBackgroundColorHover',
                                alpha: true,
                            },
                        ],
                    },
                    {
                        group: 'pause-background',
                        label: __( 'Pause Background', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'pauseBackgroundColor',
                                alpha: true,
                            },
                            {
                                tooltip: __( 'Hover', 'enokh-blocks' ),
                                attribute: 'pauseBackgroundColorHover',
                                alpha: true,
                            },
                        ],
                    },
                    {
                        group: 'play-text',
                        label: __( 'Play Text', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'playTextColor',
                            },
                            {
                                tooltip: __( 'Hover', 'enokh-blocks' ),
                                attribute: 'playTextColorHover',
                            },
                        ],
                    },
                    {
                        group: 'pause-text',
                        label: __( 'Pause Text', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'pauseTextColor',
                            },
                            {
                                tooltip: __( 'Hover', 'enokh-blocks' ),
                                attribute: 'pauseTextColorHover',
                            },
                        ],
                    },
                ],
            },
        },
    },
    defaultContext
);

export default carouselPlayPauseContext;
