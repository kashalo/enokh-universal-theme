import { addToCSS } from '../utils';

const flexChildStyle = ( css, selector, attributes, device = '' ) => {
    if ( attributes.isGrid ) {
        return;
    }

    const styles = {
        'flex-grow': attributes[ 'flexGrow' + device ],
        'flex-shrink': attributes[ 'flexShrink' + device ],
        'flex-basis': attributes[ 'flexBasis' + device ],
        order: attributes[ 'order' + device ],
    };

    return addToCSS( css, selector, styles );
};
export default flexChildStyle;
