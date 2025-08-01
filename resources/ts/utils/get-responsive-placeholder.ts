const getResponsivePlaceholder = ( name: string, attributes: object, device: string, fallback?: string ): string => {
    // Make sure this is the desktop value.
    name = name.replace( 'Tablet', '' ).replace( 'Mobile', '' );

    let responsivePlaceholder = attributes[ name ];

    if ( 'Mobile' === device && ( attributes[ name + 'Tablet' ] || 0 === attributes[ name + 'Tablet' ] ) ) {
        responsivePlaceholder = attributes[ name + 'Tablet' ];
    }

    if ( '' === responsivePlaceholder || false === responsivePlaceholder || undefined === responsivePlaceholder ) {
        responsivePlaceholder = fallback;
    }

    return responsivePlaceholder;
};

export default getResponsivePlaceholder;
