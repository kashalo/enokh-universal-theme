const getSizingAttributes = ( defaults ) => ( {
    sizing: {
        type: 'object',
        default: {},
    },
    useGlobalMaxWidth: {
        type: 'boolean',
        default: false,
    },
} );
export default getSizingAttributes;
