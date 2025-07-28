import { __ } from '@wordpress/i18n';

const variantOptions = [
    {
        label: __( 'Shape', 'enokh-blocks' ),
        value: 'shape',
    },
    {
        label: __( 'Fraction', 'enokh-blocks' ),
        value: 'fraction',
    },
    {
        label: __( 'Element', 'enokh-blocks' ),
        value: 'element',
    },
];

const orientationOptions = [
    {
        label: __( 'Horizontal', 'enokh-blocks' ),
        value: 'horizontal',
    },
    {
        label: __( 'Vertical', 'enokh-blocks' ),
        value: 'vertical',
    },
];

const alignItemsOptions = [
    {
        value: 'start',
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
        value: 'end',
        icon: (
            <svg aria-hidden="true" viewBox="0 0 16 16">
                <path fill="currentColor" d="M0 15h16v1H0z" />
                <path fill="currentColor" stroke="currentColor" d="M3.5 6.5h3v7h-3zm5 2h3v5h-3z" />
            </svg>
        ),
    },
];

const justifyContentOptions = [
    {
        value: 'start',
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
        value: 'end',
        icon: (
            <svg aria-hidden="true" viewBox="0 0 16 16">
                <path fill="currentColor" d="M15 0h1v16h-1z" />
                <path fill="currentColor" stroke="currentColor" d="M5.5 4.5h3v7h-3zm5 0h3v7h-3z" />
            </svg>
        ),
    },
];

export { variantOptions, alignItemsOptions, justifyContentOptions, orientationOptions };
