import { addToCSS, getAttribute, hexToRGBA } from '../utils';

const coloursStyle = ( style, selector, attributes, state = '', device = '' ) => {
    const styles = {
        'background-color': hexToRGBA(
            getAttribute( `backgroundColor${ state }`, { attributes, deviceType: device } ),
            getAttribute( `backgroundColorOpacity${ state }`, { attributes, deviceType: device } )
        ),
        color: getAttribute( `textColor${ state }`, { attributes, deviceType: device } ),
    };

    // Add style to given object
    return addToCSS( style, selector, styles );
};
export default coloursStyle;
