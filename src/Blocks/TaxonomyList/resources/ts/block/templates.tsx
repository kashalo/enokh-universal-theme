import { __ } from '@wordpress/i18n';

const templates = [
    {
        name: 'blank',
        title: __( 'Start blank', 'enokh-blocks' ),
        icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"></svg>,
        innerBlocks: [
            [
                'enokh-blocks/grid',
                {
                    isTermQueryLoop: true,
                    isDynamic: true,
                    lock: {
                        remove: true,
                    },
                },
                [
                    [
                        'enokh-blocks/container',
                        {
                            isTermQueryLoopItem: true,
                            sizing: { width: '100%' },
                            lock: {
                                remove: true,
                                move: true,
                            },
                        },
                    ],
                ],
            ],
        ],
    },
    {
        name: 'title-only',
        title: __( 'Title Only', 'enokh-blocks' ),
        icon: (
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M14 30h171v11H14zM14 48h79v5H14zM14 88h171v11H14zM14 106h79v5H14zM14 146h171v11H14zM14 164h79v5H14z" />
            </svg>
        ),
        innerBlocks: [
            [
                'enokh-blocks/grid',
                {
                    isTermQueryLoop: true,
                    isDynamic: true,
                    verticalGap: '20px',
                    horizontalGap: '20px',
                    lock: {
                        remove: true,
                    },
                },
                [
                    [
                        'enokh-blocks/container',
                        {
                            isTermQueryLoopItem: true,
                            sizing: { width: '100%' },
                            spacing: {
                                paddingTop: '20px',
                                paddingRight: '20px',
                                paddingBottom: '20px',
                                paddingLeft: '20px',
                            },
                            lock: {
                                remove: true,
                                move: true,
                            },
                        },
                        [
                            [
                                'enokh-blocks/text',
                                {
                                    element: 'p',
                                    spacing: {
                                        marginBottom: '12px',
                                    },
                                    typography: {
                                        fontWeight: '500',
                                    },
                                    useDynamicData: true,
                                    dynamicContentType: 'term-title',
                                    dynamicSource: 'current-term',
                                },
                            ],
                        ],
                    ],
                ],
            ],
        ],
    },

    {
        name: 'title-description',
        title: __( 'Title & Description', 'enokh-blocks' ),
        icon: (
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M14 30h171v11H14zM14 48h79v5H14zM14 88h171v11H14zM14 106h79v5H14zM14 146h171v11H14zM14 164h79v5H14z" />
            </svg>
        ),
        innerBlocks: [
            [
                'enokh-blocks/grid',
                {
                    isTermQueryLoop: true,
                    isDynamic: true,
                    verticalGap: '20px',
                    horizontalGap: '20px',
                    lock: {
                        remove: true,
                    },
                },
                [
                    [
                        'enokh-blocks/container',
                        {
                            isTermQueryLoopItem: true,
                            sizing: { width: '100%' },
                            spacing: {
                                paddingTop: '20',
                                paddingRight: '20',
                                paddingBottom: '20',
                                paddingLeft: '20',
                            },
                            lock: {
                                remove: true,
                                move: true,
                            },
                        },
                        [
                            [
                                'enokh-blocks/text',
                                {
                                    element: 'h6',
                                    spacing: {
                                        marginBottom: '12px',
                                    },
                                    typography: {
                                        fontWeight: '500',
                                    },
                                    useDynamicData: true,
                                    dynamicContentType: 'term-title',
                                    dynamicSource: 'current-term',
                                },
                            ],
                            [
                                'enokh-blocks/text',
                                {
                                    element: 'p',
                                    spacing: {
                                        marginBottom: '24px',
                                    },
                                    useDynamicData: true,
                                    dynamicContentType: 'term-description',
                                    dynamicSource: 'current-term',
                                },
                            ],
                        ],
                    ],
                ],
            ],
        ],
    },

    {
        name: 'two-columns',
        title: __( 'Two columns', 'enokh-blocks' ),
        icon: (
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M14 28h78v11H14zM14 46h36.035v5H14zM14 66h78v5H14zM14 77h78v5H14zM108 28h78v11h-78zM108 46h36.035v5H108zM108 66h78v5h-78zM108 77h78v5h-78zM14 118h78v11H14zM14 136h36.035v5H14zM14 156h78v5H14zM14 167h78v5H14zM108 118h78v11h-78zM108 136h36.035v5H108zM108 156h78v5h-78zM108 167h78v5h-78z" />
            </svg>
        ),
        innerBlocks: [
            [
                'enokh-blocks/grid',
                {
                    isTermQueryLoop: true,
                    isDynamic: true,
                    verticalGap: '20px',
                    horizontalGap: '20px',
                    lock: {
                        remove: true,
                    },
                },
                [
                    [
                        'enokh-blocks/container',
                        {
                            isTermQueryLoopItem: true,
                            sizing: { width: '50%', widthMobile: '100%' },
                            spacing: {
                                paddingTop: '20px',
                                paddingRight: '20px',
                                paddingBottom: '20px',
                                paddingLeft: '20px',
                            },
                            lock: {
                                remove: true,
                                move: true,
                            },
                        },
                        [
                            [
                                'enokh-blocks/text',
                                {
                                    element: 'h6',
                                    spacing: {
                                        marginBottom: '12px',
                                    },
                                    typography: {
                                        fontWeight: '500',
                                    },
                                    useDynamicData: true,
                                    dynamicContentType: 'term-title',
                                    dynamicSource: 'current-term',
                                },
                            ],
                            [
                                'enokh-blocks/text',
                                {
                                    element: 'p',
                                    spacing: {
                                        marginBottom: '24px',
                                    },
                                    useDynamicData: true,
                                    dynamicContentType: 'term-description',
                                    dynamicSource: 'current-term',
                                },
                            ],
                        ],
                    ],
                ],
            ],
        ],
    },
];

export default templates;
