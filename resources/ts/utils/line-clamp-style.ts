import { addToCSS } from '../utils';

const lineClampStyle = ( style, selector, attributes, device = '' ) => {
    const { typography } = attributes;
    const lineClamp = typography[ 'lineClamp' + device ];
    const hasLineClamp = lineClamp && lineClamp !== '' && lineClamp !== 0;

    if ( ! hasLineClamp ) {
        return;
    }

    const styles = {
        'line-clamp': lineClamp,
        '-webkit-line-clamp': lineClamp,
        display: '-webkit-box',
        'overflow-x': 'hidden',
        'overflow-y': 'hidden',
        '-webkit-box-orient': 'vertical',
        'box-orient': 'vertical',
        'text-overflow': 'ellipsis',
    };

    // Add style to given object
    return addToCSS( style, selector, styles );
};
export default lineClampStyle;
