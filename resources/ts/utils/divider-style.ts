import { addToCSS, getResponsiveValue } from '../utils';

const dividerStyle = ( css, selector, attributes, device = '', isNegativePos = false, blockName: string = '' ) => {
    const { divider } = attributes;

    if ( ! divider ) {
        return;
    }

    const styles: { [ key: string ]: any } = {};
    const orientation = getResponsiveValue( 'orientation', divider, device, '' );
    const thickness = getResponsiveValue( 'thickness', divider, device, '' );
    const style = getResponsiveValue( 'style', divider, device, '' );
    const color = getResponsiveValue( 'color', divider, device, '' );
    const multiply = isNegativePos ? -1 : 1;
    const isContainer = 'enokh-blocks/container';

    if ( orientation === 'horizontal' ) {
        let horizontalGap = getResponsiveValue( 'horizontalGap', attributes, device, '0' );
        horizontalGap =
            blockName === isContainer ? getResponsiveValue( 'columnGap', attributes, device, '0' ) : horizontalGap;
        styles.height = '100%';
        styles.width = 'auto';
        styles[ 'border-bottom' ] = 'none';
        styles[ 'border-left' ] = `${ thickness } ${ style } ${ color }`;
        styles.left = isContainer
            ? `calc(calc(calc(${ horizontalGap } / 2) + calc(${ thickness } / 2)) * ${ multiply })`
            : `calc(calc(calc(${ horizontalGap } / 2) - calc(${ thickness } / 2)) * ${ multiply })`;
    }

    if ( orientation === 'vertical' ) {
        let verticalGap = getResponsiveValue( 'verticalGap', attributes, device, '0' );
        verticalGap = blockName === isContainer ? getResponsiveValue( 'rowGap', attributes, device, '0' ) : verticalGap;
        styles.width = '100%';
        styles.height = 'auto';
        styles[ 'border-left' ] = 'none';
        styles[ 'border-bottom' ] = `${ thickness } ${ style } ${ color }`;
        styles.bottom = isContainer
            ? `calc(calc(calc(${ verticalGap } / 2) + calc(${ thickness } / 2)) * ${ multiply })`
            : `calc(calc(calc(${ verticalGap } / 2) - calc(${ thickness } / 2)) * ${ multiply })`;
        styles.left = 'unset';
    }

    return addToCSS( css, selector, styles );
};
export default dividerStyle;
