import { addToCSS } from '../utils';

const typographyStyle = ( style, selector, attributes, device = '' ) => {
    const { typography } = attributes;
    const fontFamilyValues = [ typography.fontFamily, typography.fontFamilyFallback ].filter( ( v ) => v );
    const fontFamily = fontFamilyValues.join( ', ' );

    const styles = {
        'font-family': fontFamily,
        'font-size': typography[ 'fontSize' + device ],
        'line-height': typography[ 'lineHeight' + device ],
        'letter-spacing': typography[ 'letterSpacing' + device ],
        'font-weight': typography[ 'fontWeight' + device ],
        'text-transform': typography[ 'textTransform' + device ],
        'text-align': typography[ 'textAlign' + device ],
        'line-clamp': typography[ 'lineClamp' + device ],
        '-webkit-line-clamp': typography[ 'lineClamp' + device ],
    };

    // Add style to given object
    return addToCSS( style, selector, styles );
};
export default typographyStyle;
