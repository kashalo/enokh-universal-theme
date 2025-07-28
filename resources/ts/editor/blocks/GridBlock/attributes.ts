export default {
    uniqueId: {
        type: 'string',
        default: '',
    },
    templateLock: {
        type: [ 'string', 'boolean' ],
        enum: [ 'all', 'insert', 'contentOnly', false ],
    },
    anchor: {
        type: 'string',
        default: '',
    },
    columns: {
        type: 'number',
        default: '',
    },
    horizontalGap: {
        type: 'string',
        default: '',
    },
    verticalGap: {
        type: 'string',
        default: '',
    },
    verticalAlignment: {
        type: 'string',
        default: '',
    },
    horizontalGapTablet: {
        type: 'string',
        default: '',
    },
    verticalGapTablet: {
        type: 'string',
        default: '',
    },
    verticalAlignmentTablet: {
        type: 'string',
        default: 'inherit',
    },
    horizontalGapMobile: {
        type: 'string',
        default: '',
    },
    verticalGapMobile: {
        type: 'string',
        default: '',
    },
    verticalAlignmentMobile: {
        type: 'string',
        default: 'inherit',
    },
    horizontalAlignment: {
        type: 'string',
        default: '',
    },
    horizontalAlignmentTablet: {
        type: 'string',
        default: '',
    },
    horizontalAlignmentMobile: {
        type: 'string',
        default: '',
    },
    isDynamic: {
        type: 'boolean',
    },
    isQueryLoop: {
        type: 'boolean',
        default: false,
    },
    isTermQueryLoop: {
        type: 'boolean',
        default: false,
    },
    display: {
        type: 'string',
        default: '',
    },
    displayTablet: {
        type: 'string',
        default: '',
    },
    displayMobile: {
        type: 'string',
        default: '',
    },
};
