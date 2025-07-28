import { __ } from '@wordpress/i18n';
import { getIcon } from '@enokh-blocks/utils';

const templates = [
    {
        name: 'query-loop',
        title: __( 'Query Loop', 'enokh-blocks' ),
        icon: getIcon( 'query-loop' ),
        innerBlocks: [
            [
                'enokh-blocks/query-loop',
                {
                    query: {
                        post_type: 'post',
                        per_page: 10,
                    },
                },
                [
                    [
                        'enokh-blocks/grid',
                        {
                            isQueryLoop: true,
                            isDynamic: true,
                            verticalGap: '40px',
                            lock: {
                                remove: true,
                            },
                        },
                        [
                            [
                                'enokh-blocks/container',
                                {
                                    isQueryLoopItem: true,
                                    isCarouselItem: true,
                                    sizing: { width: '100%' },
                                    lock: {
                                        remove: true,
                                        move: true,
                                    },
                                },
                                [
                                    [
                                        'enokh-blocks/text',
                                        {
                                            useDynamicData: true,
                                            dynamicContentType: 'post-title',
                                            dynamicLinkType: 'single-post',
                                            marginBottom: '5',
                                        },
                                    ],
                                    [
                                        'enokh-blocks/text',
                                        {
                                            useDynamicData: true,
                                            element: 'p',
                                            dynamicContentType: 'post-date',
                                        },
                                    ],
                                    [
                                        'enokh-blocks/text',
                                        {
                                            useDynamicData: true,
                                            element: 'div',
                                            dynamicContentType: 'post-excerpt',
                                        },
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    },
    {
        name: 'blank',
        title: __( 'Start blank', 'enokh-blocks' ),
        icon: getIcon( 'container' ),
        innerBlocks: [
            [
                'enokh-blocks/carousel-items',
                {},
                [
                    [
                        'enokh-blocks/container',
                        {
                            sizing: { width: '100%' },
                            isCarouselItem: true,
                        },
                    ],
                ],
            ],
        ],
    },
    {
        name: 'coverflow',
        title: __( 'Coverflow', 'enokh-blocks' ),
        icon: getIcon( 'carousel' ),
        innerBlocks: [
            [
                'enokh-blocks/carousel-items',
                {},
                [
                    [
                        'enokh-blocks/container',
                        {
                            sizing: { width: '100%' },
                            isCarouselItem: true,
                        },
                    ],
                    [
                        'enokh-blocks/container',
                        {
                            sizing: { width: '100%' },
                            isCarouselItem: true,
                        },
                    ],
                    [
                        'enokh-blocks/container',
                        {
                            sizing: { width: '100%' },
                            isCarouselItem: true,
                        },
                    ],
                    [
                        'enokh-blocks/container',
                        {
                            sizing: { width: '100%' },
                            isCarouselItem: true,
                        },
                    ],
                ],
            ],
        ],
    },
];

export default templates;
