import { BlockEditProps } from '../block/types';
import {
    borderStyle,
    borderStyleColor,
    buildCSS,
    coloursStyle,
    flexChildStyle,
    layoutStyle,
    sizingStyle,
    spacingStyle,
} from '@enokh-blocks/utils';

const TabletStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const {
        uniqueId,
        iconDisplay: { sizeTablet },
    } = attributes;
    const selector = `.editor-styles-wrapper .enokh-blocks-carousel-previous-${ uniqueId }`;
    const selectorHoverState = `${ selector }:hover`;
    const styles = [];
    const deviceType = 'Tablet';

    styles[ selector ] = [
        {
            'line-height': 1,
        },
    ];
    styles[ selector + ' svg' ] = [
        {
            width: sizeTablet,
            height: sizeTablet,
        },
    ];

    layoutStyle( styles, selector, attributes, deviceType, 'wrapperDisplay' );
    flexChildStyle( styles, selector, attributes, deviceType );
    sizingStyle( styles, selector, attributes, deviceType );
    coloursStyle( styles, selector, attributes, '', deviceType );
    spacingStyle( styles, selector, attributes, deviceType );
    borderStyle( styles, selector, attributes, deviceType );

    // Border hover
    borderStyleColor( styles, selectorHoverState, attributes, 'Hover', deviceType );
    coloursStyle( styles, selectorHoverState, attributes, 'Hover', deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default TabletStyle;
