import { __ } from '@wordpress/i18n';

export default [
    {
        id: 'terms_number',
        type: 'number',
        default: undefined,
        label: __( 'Number of terms', 'enokh-blocks' ),
        description: __( 'Maximum number of terms to return.', 'enokh-blocks' ),
        group: __( 'Pagination', 'enokh-blocks' ),
        isSticky: true,
    },
    {
        id: 'offset',
        type: 'number',
        default: undefined,
        label: __( 'Offset', 'enokh-blocks' ),
        description: __( 'The number by which to offset the terms query.', 'enokh-blocks' ),
        group: __( 'Pagination', 'enokh-blocks' ),
    },
    {
        id: 'order',
        type: 'select',
        default: 'desc',
        selectOptions: [
            { value: 'desc', label: 'DESC' },
            { value: 'asc', label: 'ASC' },
        ],
        label: __( 'Order', 'enokh-blocks' ),
        description: __( 'Designates the ascending or descending order of the ‘orderby‘ parameter.', 'enokh-blocks' ),
        group: __( 'Order & Order by', 'enokh-blocks' ),
    },
    {
        id: 'orderby',
        type: 'select',
        default: 'id',
        selectOptions: [
            { value: 'id', label: 'Id' },
            { value: 'name', label: 'Name' },
            { value: 'slug', label: 'Slug' },
            { value: 'count', label: 'Count' },
        ],
        label: __( 'Order by', 'enokh-blocks' ),
        description: __( 'Sort retrieved terms by parameter.', 'enokh-blocks' ),
        group: __( 'Order & Order by', 'enokh-blocks' ),
    },
    {
        id: 'parent',
        type: 'termsSelect',
        default: undefined,
        label: __( 'Parent', 'enokh-blocks' ),
        placeholder: __( 'Select parent term', 'enokh-blocks' ),
        description: __( 'Show terms from a parent. Search by name or ID.', 'enokh-blocks' ),
        group: __( 'Term', 'enokh-blocks' ),
        dependencies: {
            taxonomy: 'taxonomyType',
        },
    },
    {
        id: 'isFeaturedTerm',
        type: 'select',
        default: '',
        selectOptions: [
            { value: 'exclude', label: 'Exclude' },
            { value: 'only', label: 'Only' },
        ],
        label: __( 'Featured Terms', 'enokh-blocks' ),
        description: __( 'Configure how featured terms should show in the query.', 'enokh-blocks' ),
        group: __( 'Term', 'enokh-blocks' ),
    },
];
