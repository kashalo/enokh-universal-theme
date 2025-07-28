import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';
import { __ } from '@wordpress/i18n';

const accordionContext = defaultsDeep(
    {
        id: 'accordion',
        supports: {
            responsiveTabs: true,
        },
    },
    defaultContext
);

const panelSettingsContext = defaultsDeep(
    {
        id: 'accordion',
        supports: {
            responsiveTabs: true,
            spacing: {
                enabled: true,
                padding: true,
                margin: true,
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
        },
    },
    defaultContext
);

const headerItemSettingsContext = defaultsDeep(
    {
        id: 'accordion',
        supports: {
            responsiveTabs: true,
            sizingPanel: {
                enabled: true,
                width: false,
                height: true,
                minWidth: false,
                minHeight: true,
                maxWidth: false,
                maxHeight: true,
                useGlobalMaxWidth: false,
            },
            spacing: {
                enabled: true,
                padding: true,
                margin: true,
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
            typography: {
                enabled: true,
                alignment: true,
                fontWeight: true,
                textTransform: true,
                fontSize: true,
                letterSpacing: true,
                fontFamily: true,
            },
        },
    },
    defaultContext
);

export { accordionContext, panelSettingsContext, headerItemSettingsContext };
