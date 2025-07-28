import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';
import { __ } from '@wordpress/i18n';

const iconContext = defaultsDeep(
    {
        id: 'text',
        supports: {
            responsiveTabs: true,
            layout: {
                enabled: true,
                display: true,
                flexDirection: false,
                flexWrap: false,
                alignItems: false,
                justifyContent: false,
                columnGap: false,
                rowGap: false,
                zIndex: false,
                position: false,
                overflow: false,
                themeWidth: false,
            },
            typography: {
                enabled: false,
                alignment: false,
                fontWeight: false,
                textTransform: false,
                fontSize: false,
                lineHeight: false,
                letterSpacing: false,
                fontFamily: false,
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
                        ],
                    },
                ],
            },
            icon: {
                enabled: true,
                location: [
                    { label: __( 'Left', 'enokh-blocks' ), value: 'left' },
                    { label: __( 'Right', 'enokh-blocks' ), value: 'right' },
                ],
                iconSize: true,
            },
        },
    },
    defaultContext
);

export default iconContext;
