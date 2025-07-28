import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';
import { __ } from '@wordpress/i18n';

const tabPanelContext = defaultsDeep(
    {
        id: 'tabPanel',
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
                overflow: true,
                themeWidth: true,
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
                useGlobalMaxWidth: true,
            },
            spacing: {
                enabled: true,
                padding: true,
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
                        state: 'Current',
                        tooltip: __( 'Border Current', 'enokh-blocks' ),
                        alpha: true,
                    },
                ],
                borderTop: true,
                borderRight: true,
                borderBottom: true,
                borderLeft: true,
                borderRadius: true,
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
                                tooltip: __( 'Current', 'enokh-blocks' ),
                                attribute: 'backgroundColorCurrent',
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
                                tooltip: __( 'Current', 'enokh-blocks' ),
                                attribute: 'textColorCurrent',
                            },
                        ],
                    },
                ],
            },
        },
    },
    defaultContext
);

export default tabPanelContext;
