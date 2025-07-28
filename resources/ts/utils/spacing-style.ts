import { addToCSS } from '../utils';

const spacingStyle = ( style, selector, attributes, device = '' ) => {
    const { spacing } = attributes;
    const fallback = '' === device ? '0' : '';

    const styles = {
        'margin-top': spacing[ 'marginTop' + device ],
        'margin-right': spacing[ 'marginRight' + device ] || fallback,
        'margin-bottom': spacing[ 'marginBottom' + device ],
        'margin-left': spacing[ 'marginLeft' + device ] || fallback,
        'padding-top': spacing[ 'paddingTop' + device ],
        'padding-right': spacing[ 'paddingRight' + device ],
        'padding-bottom': spacing[ 'paddingBottom' + device ],
        'padding-left': spacing[ 'paddingLeft' + device ],
    };

    return addToCSS( style, selector, styles );
};

export default spacingStyle;
