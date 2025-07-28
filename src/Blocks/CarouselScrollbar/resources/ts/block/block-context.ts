import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';
import { __ } from '@wordpress/i18n';

const carouselScrollbarContext = defaultsDeep(
    {
        id: 'carouselScrollbar',
        supports: {
            responsiveTabs: true,
            borders: {
                enabled: true,
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
                        group: 'scrollbarDrag',
                        label: __( 'Scrollbar drag', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'scrollbarDrag',
                                alpha: true,
                            },
                        ],
                    },
                    {
                        group: 'scrollbarBackground',
                        label: __( 'Scrollbar Background', 'enokh-blocks' ),
                        items: [
                            {
                                attribute: 'scrollbarBackground',
                                alpha: true,
                            },
                        ],
                    },
                ],
            },
        },
    },
    defaultContext
);

export default carouselScrollbarContext;
