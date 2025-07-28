import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';
import { __ } from '@wordpress/i18n';

const listItemContext = defaultsDeep(
    {
        id: 'list',
        supports: {
            responsiveTabs: true,
            typography: {
                enabled: true,
                fontWeight: true,
                textTransform: true,
                fontSize: true,
                lineHeight: true,
                letterSpacing: true,
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
                        tooltip: __( 'Default', 'enokh-blocks' ),
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
                        ],
                    },
                    {
                        group: 'text',
                        label: __( 'Text', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'textColor',
                            },
                        ],
                    },
                    {
                        group: 'link',
                        label: __( 'Link', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'linkColor',
                            },
                            {
                                tooltip: __( 'Hover', 'enokh-blocks' ),
                                attribute: 'linkColorHover',
                            },
                        ],
                    },
                    {
                        group: 'marker',
                        label: __( 'Marker', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'markerColor',
                            },
                        ],
                    },
                ],
            },
        },
    },
    defaultContext
);

export default listItemContext;
