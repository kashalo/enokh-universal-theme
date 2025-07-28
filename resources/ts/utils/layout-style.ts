import { addToCSS } from '../utils';

const layoutStyle = ( css, selector, attributes, device = '', displayAttrPrefix = 'display' ) => {
    const styles: { [ key: string ]: any } = {
        'z-index': attributes[ 'zindex' + device ],
    };

    if ( ! attributes.useInnerContainer ) {
        //@ts-ignore
        styles.display = attributes[ displayAttrPrefix + device ];
        styles[ 'flex-direction' ] = attributes[ 'flexDirection' + device ];
        styles[ 'flex-wrap' ] = attributes[ 'flexWrap' + device ];
        styles[ 'align-items' ] = attributes[ 'alignItems' + device ];
        styles[ 'justify-content' ] = attributes[ 'justifyContent' + device ];
        styles[ 'column-gap' ] = attributes[ 'columnGap' + device ];
        styles[ 'row-gap' ] = attributes[ 'rowGap' + device ];
        styles.order = attributes[ 'order' + device ];
        styles.position = attributes[ 'position' + device ];
        styles[ 'overflow-x' ] = attributes[ 'overflowX' + device ];
        styles[ 'overflow-y' ] = attributes[ 'overflowY' + device ];

        if ( styles.position === 'absolute' || styles.position === 'fixed' ) {
            styles.top = attributes[ 'absoluteTop' + device ];
            styles.bottom = attributes[ 'absoluteBottom' + device ];
            styles.left = attributes[ 'absoluteLeft' + device ];
            styles.right = attributes[ 'absoluteRight' + device ];
        }

        if ( styles.position === 'sticky' ) {
            styles.top = attributes[ 'stickyTop' + device ];
            styles.bottom = attributes[ 'stickyBottom' + device ];
        }
    }

    return addToCSS( css, selector, styles );
};
export default layoutStyle;
