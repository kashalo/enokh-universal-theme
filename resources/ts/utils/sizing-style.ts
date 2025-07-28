import { addToCSS, sizingValue } from '../utils';

const sizingStyle = ( css, selector, attributes, device = '' ) => {
    const { sizing } = attributes;

    const styles = {
        width: sizingValue( 'width' + device, sizing ),
        height: sizingValue( 'height' + device, sizing ),
        'min-width': sizingValue( 'minWidth' + device, sizing ),
        'min-height': sizingValue( 'minHeight' + device, sizing ),
        'max-width': sizingValue( 'maxWidth' + device, sizing ),
        'max-height': sizingValue( 'maxHeight' + device, sizing ),
        'aspect-ratio': sizingValue( 'aspectRatio' + device, sizing ),
    };

    if ( attributes.useInnerContainer ) {
        delete styles[ 'max-width' ];
    } else if ( attributes.useGlobalMaxWidth && ! device ) {
        styles[ 'max-width' ] = EnokhBlocksEditor.Config.containerWidth;
    }

    if ( attributes.isGrid ) {
        delete styles.width;
        delete styles[ 'min-width' ];
        delete styles[ 'max-width' ];
    }

    if ( ! styles[ 'max-width' ] ) {
        styles[ 'max-width' ] = 'unset';
    }

    return addToCSS( css, selector, styles );
};
export default sizingStyle;
