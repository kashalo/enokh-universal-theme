import blockConfiguration from './block.json';

const deprecated = [
    {
        attributes: {
            display: {
                type: 'object',
                default: {},
            },
            ...blockConfiguration.attributes,
        },
        supports: {},
        isEligible: ( attributes ) => attributes.display,
        save: () => null,
        migrate: ( attributes ) => {
            const { display, ...restAttributes } = attributes;
            console.log( 'migrate', { display } );

            return {
                ...restAttributes,
                iconDisplay: { ...display },
            };
        },
    },
];

export default deprecated;
