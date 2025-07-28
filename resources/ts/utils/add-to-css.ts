const addToCSS = ( css, selector, properties ) => {
    if ( typeof css[ selector ] === 'undefined' ) {
        css[ selector ] = [];
    }

    css[ selector ].push( properties );

    return css;
};

export default addToCSS;
