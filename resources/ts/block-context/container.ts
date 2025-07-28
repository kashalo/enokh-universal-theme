import defaultContext from './default';
import { __ } from '@wordpress/i18n';
import { defaultsDeep } from 'lodash';

const containerContext = defaultsDeep(
    {
        id: 'container',
        supports: {
            responsiveTabs: true,
            settingsPanel: {
                enabled: true,
                icon: 'container-settings',
            },
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
                aspectRatio: true,
            },
            typography: {
                enabled: true,
                alignment: true,
                fontWeight: true,
                textTransform: true,
                fontSize: true,
                lineClamp: true,
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
                        tooltip: __( 'Border','enokh-blocks'  ),
                        alpha: true,
                    },
                    {
                        state: 'Hover',
                        tooltip: __( 'Border Hover','enokh-blocks'  ),
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
                        label: __( 'Background','enokh-blocks'  ),
                        items: [
                            {
                                attribute: 'backgroundColor',
                                alpha: true,
                            },
                        ],
                    },
                    {
                        group: 'text',
                        label: __( 'Text','enokh-blocks'  ),
                        items: [
                            {
                                attribute: 'textColor',
                            },
                        ],
                    },
                    {
                        group: 'link',
                        label: __( 'Link','enokh-blocks'  ),
                        items: [
                            {
                                attribute: 'linkColor',
                            },
                            {
                                tooltip: __( 'Hover','enokh-blocks'  ),
                                attribute: 'linkColorHover',
                            },
                        ],
                    },
                ],
            },
            backgroundPanel: {
                enabled: true,
                backgroundImage: true,
                backgroundGradient: true,
            },
            shapesPanel: {
                enabled: true,
            },
            effectsPanel: {
                enabled: true,
                boxShadows: true,
                textShadows: true,
                transforms: true,
                opacity: true,
                transitions: true,
                typography: false,
            },
            displayPanel: {
                enabled: true,
            },
            dividerPanel: {
                enabled: true,
            },
            a11yPanel: {
                enabled: true,
                altText: true,
                role: true,
            },
        },
    },
    defaultContext
);

export default containerContext;
