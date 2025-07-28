import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
const displayOptions = [
    {
        label: __( 'Default', 'enokh-blocks' ),
        value: '',
    },
    { label: 'Block', value: 'block' },
    { label: 'Inline Block', value: 'inline-block' },
    { label: 'Flex', value: 'flex' },
    { label: 'Inline Flex', value: 'inline-flex' },
    { label: 'Inline', value: 'inline' },
];

const flexOptions = {
    flexDirection: [
        {
            label: __( 'Row', 'enokh-blocks' ),
            value: 'row',
        },
        {
            label: __( 'Column', 'enokh-blocks' ),
            value: 'column',
        },
    ],
    flexWrap: [
        {
            label: __( 'No Wrap', 'enokh-blocks' ),
            value: 'nowrap',
        },
        {
            label: __( 'Wrap', 'enokh-blocks' ),
            value: 'wrap',
        },
        {
            label: __( 'Reverse Wrap', 'enokh-blocks' ),
            value: 'wrap-reverse',
        },
    ],
    alignItems: [
        {
            value: 'flex-start',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M0 0h16v1H0z" />
                    <path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v7h-3zm5 0h3v5h-3z" />
                </svg>
            ),
        },
        {
            value: 'center',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" stroke="currentColor" d="M3.5 3.5h3v8h-3zm5 1h3v6h-3z" />
                    <path fill="currentColor" d="M0 7h16v1H0z" />
                </svg>
            ),
        },
        {
            value: 'flex-end',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M0 15h16v1H0z" />
                    <path fill="currentColor" stroke="currentColor" d="M3.5 6.5h3v7h-3zm5 2h3v5h-3z" />
                </svg>
            ),
        },
        {
            value: 'stretch',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M0 0h16v1H0zm0 15h16v1H0z" />
                    <path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v11h-3zm5 0h3v11h-3z" />
                </svg>
            ),
        },
        {
            value: 'baseline',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M0 7h16v1H0z" />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 3H8v7h4V3zm-1 1H9v3h2V4zM7 3H3v9h4V3zM6 4H4v3h2V4z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
    ],
    justifyContent: [
        {
            value: 'flex-start',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" stroke="currentColor" d="M2.5 4.5h3v7h-3zm5 0h3v7h-3z" />
                    <path fill="currentColor" d="M0 0h1v16H0z" />
                </svg>
            ),
        },
        {
            value: 'center',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" stroke="currentColor" d="M2.5 4.5h3v7h-3zm7 0h3v7h-3z" />
                    <path fill="currentColor" d="M7 0h1v16H7z" />
                </svg>
            ),
        },
        {
            value: 'flex-end',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M15 0h1v16h-1z" />
                    <path fill="currentColor" stroke="currentColor" d="M5.5 4.5h3v7h-3zm5 0h3v7h-3z" />
                </svg>
            ),
        },
        {
            value: 'space-between',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M15 0h1v16h-1zM0 0h1v16H0z" />
                    <path fill="currentColor" stroke="currentColor" d="M10.5 4.5h3v7h-3zm-8 0h3v7h-3z" />
                </svg>
            ),
        },
        {
            value: 'space-around',
            icon: (
                <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M15 0h1v16h-1zM0 0h1v16H0z" />
                    <path fill="currentColor" stroke="currentColor" d="M9.5 4.5h3v7h-3zm-6 0h3v7h-3z" />
                </svg>
            ),
        },
    ],
};

const positionOptions = applyFilters( 'enokh-universal-theme.editor.layoutPositionOptions', [
    {
        label: __( 'Default', 'enokh-blocks' ),
        value: '',
    },
    {
        label: __( 'Relative', 'enokh-blocks' ),
        value: 'relative',
    },
    {
        label: __( 'Absolute', 'enokh-blocks' ),
        value: 'absolute',
    },
    {
        label: __( 'Sticky', 'enokh-blocks' ),
        value: 'sticky',
    },
    {
        label: __( 'Static', 'enokh-blocks' ),
        value: 'static',
    },
    {
        label: __( 'Fixed', 'enokh-blocks' ),
        value: 'fixed',
    },
] );

const overflowOptions = [
    {
        label: __( 'Default', 'enokh-blocks' ),
        value: '',
    },
    {
        label: __( 'Visible', 'enokh-blocks' ),
        value: 'visible',
    },
    {
        label: __( 'Hidden', 'enokh-blocks' ),
        value: 'hidden',
    },
    {
        label: __( 'Scroll', 'enokh-blocks' ),
        value: 'scroll',
    },
    {
        label: __( 'Auto', 'enokh-blocks' ),
        value: 'auto',
    },
];

const stickyOnScrollOptions = [
    {
        label: __( 'Scroll up & down', 'enokh-blocks' ),
        value: '',
    },
    {
        label: __( 'Scroll down', 'enokh-blocks' ),
        value: 'down',
    },
    {
        label: __( 'Scroll up', 'enokh-blocks' ),
        value: 'up',
    },
];

export { flexOptions, positionOptions, overflowOptions, displayOptions, stickyOnScrollOptions };
