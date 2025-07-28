import defaultContext from './default';
import { __ } from '@wordpress/i18n';
import { defaultsDeep } from 'lodash';

const buttonContext = defaultsDeep(
    {
        id: 'button',
        supports: {
            responsiveTabs: true,
            settingsPanel: {
                enabled: true,
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
            typography: {
                enabled: true,
                alignment: true,
                fontWeight: true,
                textTransform: true,
                fontSize: true,
                letterSpacing: true,
                fontFamily: true,
                lineHeight: true,
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
                        tooltip: __( 'Default','enokh-blocks'  ),
                        alpha: true,
                    },
                    {
                        state: 'Hover',
                        tooltip: __( 'Hover','enokh-blocks'  ),
                        alpha: true,
                    },
                    {
                        state: 'Current',
                        tooltip: __( 'Current','enokh-blocks'  ),
                        alpha: true,
                    },
                    {
                        state: 'Pressed',
                        tooltip: __( 'Pressed','enokh-blocks'  ),
                        alpha: true,
                    },
                    {
                        state: 'Disabled',
                        tooltip: __( 'Disabled','enokh-blocks'  ),
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
                            {
                                tooltip: __( 'Hover','enokh-blocks'  ),
                                attribute: 'backgroundColorHover',
                                alpha: true,
                            },
                            {
                                tooltip: __( 'Current','enokh-blocks'  ),
                                attribute: 'backgroundColorCurrent',
                                alpha: true,
                            },
                            {
                                tooltip: __( 'Pressed','enokh-blocks'  ),
                                attribute: 'backgroundColorPressed',
                                alpha: true,
                            },
                            {
                                tooltip: __( 'Disabled','enokh-blocks'  ),
                                attribute: 'backgroundColorDisabled',
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
                            {
                                tooltip: __( 'Hover','enokh-blocks'  ),
                                attribute: 'textColorHover',
                            },
                            {
                                tooltip: __( 'Current','enokh-blocks'  ),
                                attribute: 'textColorCurrent',
                            },
                            {
                                tooltip: __( 'Pressed','enokh-blocks'  ),
                                attribute: 'textColorPressed',
                            },
                            {
                                tooltip: __( 'Disabled','enokh-blocks'  ),
                                attribute: 'textColorDisabled',
                            },
                        ],
                    },
                ],
            },
            backgroundPanel: {
                enabled: true,
                backgroundGradient: true,
            },
            icon: {
                enabled: true,
                location: [
                    { label: __( 'Left','enokh-blocks'  ), value: 'left' },
                    { label: __( 'Right','enokh-blocks'  ), value: 'right' },
                ],
                iconSize: true,
            },
            effectsPanel: {
                enabled: true,
                textShadows: true,
                typography: true,
            },
        },
    },
    defaultContext
);

export default buttonContext;
