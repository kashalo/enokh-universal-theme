import containerDefaultValues from '@enokh-blocks/editor/blocks/ContainerBlock/defaults';

export default {
    uniqueId: {
        type: 'string',
        default: '',
    },
    anchor: {
        type: 'string',
        default: '',
    },
    content: {
        type: 'string',
        source: 'html',
        selector: '.enokh-blocks-text-text',
        __experimentalRole: 'content',
    },
    element: {
        type: 'string',
        default: 'h2',
    },
    ariaLabel: {
        type: 'string',
        default: '',
    },
    blockVersion: {
        type: 'number',
    },
    estimatedReadingTime: {
        type: 'object',
        default: {
            descriptiveText: 'Estimated reading time: ',
            postFix: 'minutes',
            wordsPerMin: 300,
        },
    },
    textColor: {
        type: 'string',
        default: '',
    },
    textColorTablet: {
        type: 'string',
        default: '',
    },
    textColorMobile: {
        type: 'string',
        default: '',
    },
    textColorHover: {
        type: 'string',
        default: '',
    },
    textColorHoverTablet: {
        type: 'string',
        default: '',
    },
    textColorHoverMobile: {
        type: 'string',
        default: '',
    },
    hasIcon: {
        type: 'boolean',
        default: false,
    },
    iconLocation: {
        type: 'string',
        default: 'before',
    },
    column: {
        type: 'number',
        default: null,
    },
    columnTablet: {
        type: 'number',
        default: null,
    },
    columnMobile: {
        type: 'number',
        default: null,
    },
};
