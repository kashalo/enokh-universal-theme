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

const MainStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const {
        uniqueId,
        iconDisplay: { size },
    } = attributes;
    const selector = `.editor-styles-wrapper .enokh-blocks-carousel-next-${ uniqueId }`;
    const selectorHoverState = `${ selector }:hover`;
    const styles = [];

    styles[ selector ] = [
        {
            'line-height': 1,
        },
    ];
    styles[ selector + ' svg' ] = [
        {
            width: size,
            height: size,
        },
    ];

    layoutStyle( styles, selector, attributes, '', 'wrapperDisplay' );
    flexChildStyle( styles, selector, attributes );
    sizingStyle( styles, selector, attributes );
    coloursStyle( styles, selector, attributes );
    spacingStyle( styles, selector, attributes );
    borderStyle( styles, selector, attributes );

    // Border hover
    borderStyleColor( styles, selectorHoverState, attributes, 'Hover' );
    coloursStyle( styles, selectorHoverState, attributes, 'Hover' );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
