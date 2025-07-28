import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';
import { __ } from '@wordpress/i18n';

const carouselNavigationContext = defaultsDeep(
    {
        id: 'carouselNavigation',
        supports: {
            responsiveTabs: true,
            typography: {
                enabled: true,
                alignment: false,
                fontWeight: true,
                textTransform: true,
                fontSize: true,
                lineHeight: true,
                letterSpacing: true,
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
        },
    },
    defaultContext
);

export default carouselNavigationContext;
