import { __ } from '@wordpress/i18n';

const listTypeOptions = [
    {
        label: __( 'Unordered', 'enokh-blocks' ),
        value: 'ul',
    },
    {
        label: __( 'Ordered', 'enokh-blocks' ),
        value: 'ol',
    },
];

const listStyleOptions = [
    {
        label: __( 'Numbers' ),
        value: 'decimal',
    },
    {
        label: __( 'Uppercase letters' ),
        value: 'upper-alpha',
    },
    {
        label: __( 'Lowercase letters' ),
        value: 'lower-alpha',
    },
    {
        label: __( 'Uppercase Roman numerals' ),
        value: 'upper-roman',
    },
    {
        label: __( 'Lowercase Roman numerals' ),
        value: 'lower-roman',
    },
];

const listPositionOptions = [
    {
        label: __( 'Default', 'enokh-blocks' ),
        value: '',
    },
    {
        label: __( 'Inside', 'enokh-blocks' ),
        value: 'inside',
    },
    {
        label: __( 'Outside', 'enokh-blocks' ),
        value: 'outside',
    },
];

export { listStyleOptions, listTypeOptions, listPositionOptions };
