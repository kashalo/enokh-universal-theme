/**
 *
 * @param name
 * @param attributes
 * @param device
 * @param fallback
 */
const getResponsiveValue = ( name: string, attributes: object, device: string, fallback?: any ): string => {
    const actualName = device === 'Desktop' ? name : `${ name }${ device }`;
    // Return immediately if has value
    if (
        attributes[ actualName ] !== undefined &&
        attributes[ actualName ] !== '' &&
        attributes[ actualName ] !== false
    ) {
        return attributes[ actualName ];
    }

    // Make sure this is the desktop value.
    name = name.replace( 'Tablet', '' ).replace( 'Mobile', '' );

    let responsiveValue = attributes[ name ];

    if ( 'Mobile' === device && ( attributes[ name + 'Tablet' ] || 0 === attributes[ name + 'Tablet' ] ) ) {
        responsiveValue = attributes[ name + 'Tablet' ];
    }

    if ( '' === responsiveValue || false === responsiveValue || undefined === responsiveValue ) {
        responsiveValue = fallback;
    }

    return responsiveValue;
};

export default getResponsiveValue;
