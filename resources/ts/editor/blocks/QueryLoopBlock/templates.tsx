import { __ } from '@wordpress/i18n';

const templates = [
    {
        name: 'title-date-excerpt',
        title: __( 'Title, date, & excerpt', 'enokh-blocks' ),
        icon: (
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M15 33h171v11H15zM15 51h79v5H15zM15 71h171v5H15zM15 82h171v5H15zM15 116h171v11H15zM15 134h79v5H15zM15 154h171v5H15zM15 165h171v5H15z" />
            </svg>
        ),
        innerBlocks: [
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
                            sizing: { width: '100%' },
                            lock: {
                                remove: true,
                                move: true,
                            },
                        },
                        [ [ 'core/post-title' ] ],
                    ],
                ],
            ],
        ],
    },
    {
        name: 'title-date',
        title: __( 'Title & date', 'enokh-blocks' ),
        icon: (
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M14 30h171v11H14zM14 48h79v5H14zM14 88h171v11H14zM14 106h79v5H14zM14 146h171v11H14zM14 164h79v5H14z" />
            </svg>
        ),
        innerBlocks: [
            [
                'enokh-blocks/grid',
                {
                    isQueryLoop: true,
                    isDynamic: true,
                    verticalGap: '20px',
                    lock: {
                        remove: true,
                    },
                },
                [
                    [
                        'enokh-blocks/container',
                        {
                            isQueryLoopItem: true,
                            sizing: { width: '100%' },
                            lock: {
                                remove: true,
                                move: true,
                            },
                        },
                        [ [ 'core/post-title' ], [ 'core/post-date' ] ],
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
                    isQueryLoop: true,
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
                            isQueryLoopItem: true,
                            sizing: { width: '50%', widthMobile: '100%' },
                            backgroundColor: '#fafafa',
                            paddingTop: '20',
                            paddingRight: '20',
                            paddingBottom: '20',
                            paddingLeft: '20',
                            lock: {
                                remove: true,
                                move: true,
                            },
                        },
                        [ [ 'core/post-title' ], [ 'core/post-date' ], [ 'core/post-excerpt' ] ],
                    ],
                ],
            ],
        ],
    },
    {
        name: 'two-columns-feature-image',
        title: __( 'Two columns & featured image', 'enokh-blocks' ),
        icon: (
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M110 57h78v11h-78V57ZM110 16h78v35h-78V16ZM110 76h78v5h-78zM110 87h55v5h-55zM110 149h78v11h-78v-11ZM110 108h78v35h-78v-35ZM110 168h78v5h-78zM110 179h55v5h-55zM15 149h78v11H15v-11ZM15 108h78v35H15v-35ZM15 168h78v5H15zM15 179h55v5H15zM15 57h78v11H15V57ZM15 16h78v35H15V16ZM15 76h78v5H15zM15 87h55v5H15z" />
            </svg>
        ),
        innerBlocks: [
            [
                'enokh-blocks/grid',
                {
                    isQueryLoop: true,
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
                            isQueryLoopItem: true,
                            sizing: { width: '50%', widthMobile: '100%' },
                            backgroundColor: '#fafafa',
                            paddingTop: '20',
                            paddingRight: '20',
                            paddingBottom: '20',
                            paddingLeft: '20',
                            lock: {
                                remove: true,
                                move: true,
                            },
                        },
                        [
                            [ 'core/post-featured-image' ],
                            [ 'core/post-title' ],
                            [ 'core/post-date' ],
                            [ 'core/post-excerpt' ],
                        ],
                    ],
                ],
            ],
        ],
    },
    {
        name: 'blank',
        title: __( 'Start blank', 'enokh-blocks' ),
        icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"></svg>,
        innerBlocks: [
            [
                'enokh-blocks/grid',
                {
                    isQueryLoop: true,
                    isDynamic: true,
                    lock: {
                        remove: true,
                    },
                },
                [
                    [
                        'enokh-blocks/container',
                        {
                            isQueryLoopItem: true,
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
];

export default templates;
