import defaultContext from './default';
import { defaultsDeep } from 'lodash';
import { __ } from '@wordpress/i18n';

const textContext = defaultsDeep(
    {
        id: 'text',
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
                overflow: false,
                themeWidth: false,
            },
            typography: {
                enabled: true,
                alignment: true,
                fontWeight: true,
                textTransform: true,
                fontSize: true,
                lineHeight: true,
                letterSpacing: true,
                fontFamily: true,
                lineClamp: true,
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
                        ],
                    },
                ],
            },
            icon: {
                enabled: true,
                location: [
                    { label: __( 'Before', 'enokh-blocks' ), value: 'before' },
                    { label: __( 'After', 'enokh-blocks' ), value: 'after' },
                ],
                iconSize: true,
            },
        },
    },
    defaultContext
);

export default textContext;
