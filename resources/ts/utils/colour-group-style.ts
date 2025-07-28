import { addToCSS, getAttribute, hexToRGBA } from '../utils';

const colourGroupStyle = (
    style: { [ propName: string ]: any },
    selector: string,
    property: string,
    group: string,
    attributes: any,
    state: string = '',
    device: string = ''
) => {
    const styles = {
        [ property ]: getAttribute( `${ group }${ state }`, { attributes, deviceType: device } ),
    };

    // Add style to given object
    return addToCSS( style, selector, styles );
};
export default colourGroupStyle;
