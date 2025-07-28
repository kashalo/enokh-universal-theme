import blockConfiguration from './block.json';

const deprecated = [
    {
        attributes: blockConfiguration.attributes,
        supports: {},
        isEligible: ( attributes ) => attributes.shape && attributes.shape.size,
        save: () => null,
        migrate: ( attributes ) => {
            // @ts-ignore
            const { has: _has } = window._;
            const { size, sizeMobile, sizeTablet } = attributes.shape;
            const newAttributes = { ...attributes };
            console.log( 'migrate', { size } );

            delete newAttributes.shape.size;
            if ( _has( newAttributes.shape, 'sizeTablet' ) ) {
                delete newAttributes.shape.sizeTablet;
            }
            if ( _has( newAttributes.shape, 'sizeMobile' ) ) {
                delete newAttributes.shape.sizeMobile;
            }

            return {
                ...newAttributes,
                shape: {
                    ...newAttributes.shape,
                    width: size,
                    height: size,
                    widthTablet: sizeTablet ?? '',
                    heightTablet: sizeTablet ?? '',
                    widthMobile: sizeMobile ?? '',
                    heightMobile: sizeMobile ?? '',
                },
            };
        },
    },
];

export default deprecated;
