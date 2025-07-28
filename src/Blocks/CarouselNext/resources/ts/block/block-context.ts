import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';
import { __ } from '@wordpress/i18n';

const carouselNextContext = defaultsDeep(
    {
        id: 'carouselNext',
        supports: {
            responsiveTabs: true,
            layout: {
                enabled: true,
                display: true,
                flexDirection: true,
                flexWrap: true,
                alignItems: true,
                justifyContent: true,
                columnGap: true,
                rowGap: true,
                zIndex: true,
                position: true,
            },
            flexChildPanel: {
                enabled: true,
                flex: true,
                order: true,
            },
            sizingPanel: {
                enabled: true,
                width: true,
                height: true,
                minWidth: true,
                minHeight: true,
                maxWidth: true,
                maxHeight: true,
            },
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
                    {
                        state: 'Disabled',
                        tooltip: __( 'Border Disabled', 'enokh-blocks' ),
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
                        group: 'background',
                        label: __( 'Background', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'backgroundColor',
                                alpha: true,
                            },
                            {
                                tooltip: __( 'Hover', 'enokh-blocks' ),
                                attribute: 'backgroundColorHover',
                                alpha: true,
                            },
                            {
                                tooltip: __( 'Disabled', 'enokh-blocks' ),
                                attribute: 'backgroundColorDisabled',
                                alpha: true,
                            },
                        ],
                    },
                    {
                        group: 'text',
                        label: __( 'Text', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'textColor',
                            },
                            {
                                tooltip: __( 'Hover', 'enokh-blocks' ),
                                attribute: 'textColorHover',
                            },
                            {
                                tooltip: __( 'Disabled', 'enokh-blocks' ),
                                attribute: 'textColorDisabled',
                            },
                        ],
                    },
                ],
            },
        },
    },
    defaultContext
);

export default carouselNextContext;
