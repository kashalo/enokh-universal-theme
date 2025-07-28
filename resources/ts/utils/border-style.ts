import { addToCSS } from '../utils';

const borderStyle = ( css, selector, attributes, device = '' ) => {
    const { borders } = attributes;
    const styles = {
        'border-top-width': borders[ 'borderTopWidth' + device ],
        'border-right-width': borders[ 'borderRightWidth' + device ],
        'border-bottom-width': borders[ 'borderBottomWidth' + device ],
        'border-left-width': borders[ 'borderLeftWidth' + device ],
        'border-top-style': borders[ 'borderTopStyle' + device ],
        'border-right-style': borders[ 'borderRightStyle' + device ],
        'border-bottom-style': borders[ 'borderBottomStyle' + device ],
        'border-left-style': borders[ 'borderLeftStyle' + device ],
        'border-top-color': borders[ 'borderTopColor' + device ],
        'border-right-color': borders[ 'borderRightColor' + device ],
        'border-bottom-color': borders[ 'borderBottomColor' + device ],
        'border-left-color': borders[ 'borderLeftColor' + device ],
        'border-top-left-radius': borders[ 'borderTopLeftRadius' + device ],
        'border-top-right-radius': borders[ 'borderTopRightRadius' + device ],
        'border-bottom-right-radius': borders[ 'borderBottomRightRadius' + device ],
        'border-bottom-left-radius': borders[ 'borderBottomLeftRadius' + device ],
    };

    return addToCSS( css, selector, styles );
};
export default borderStyle;

export const borderStyleColor = ( css, selector, attributes, state = '', device = '' ) => {
    const { borders } = attributes;

    const styles = {
        'border-top-color': borders[ 'borderTopColor' + state + device ],
        'border-right-color': borders[ 'borderRightColor' + state + device ],
        'border-bottom-color': borders[ 'borderBottomColor' + state + device ],
        'border-left-color': borders[ 'borderLeftColor' + state + device ],
    };

    return addToCSS( css, selector, styles );
};
