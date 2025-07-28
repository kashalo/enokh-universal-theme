import { BlockEditProps } from '../block/types';
import { borderStyle, buildCSS, getAttribute, hexToRGBA } from '@enokh-blocks/utils';

const TabletStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const deviceType = 'Tablet';
    const { uniqueId, display, colors, sizing } = attributes;
    const selector = '.enokh-blocks-carousel-scrollbar-' + uniqueId;
    const dragSelector = `${ selector } .enokh-blocks-carousel-scrollbar__drag`;
    const styles = [];

    let dragSize = getAttribute( 'drag', { attributes: sizing, deviceType } ) ?? '';
    dragSize = dragSize === 'auto' ? '100px' : dragSize;

    styles[ selector ] = [
        {
            top: getAttribute( 'absoluteTop', { attributes: display, deviceType } ),
            bottom: getAttribute( 'absoluteBottom', { attributes: display, deviceType } ),
            left: getAttribute( 'absoluteLeft', { attributes: display, deviceType } ),
            height: getAttribute( 'height', { attributes: sizing, deviceType } ),
            width: getAttribute( 'width', { attributes: sizing, deviceType } ),
            'background-color': hexToRGBA(
                getAttribute( `scrollbarBackground`, { attributes: colors, deviceType } ),
                getAttribute( `scrollbarBackgroundOpacity`, { attributes: colors, deviceType } )
            ),
        },
    ];

    styles[ dragSelector ] = [
        {
            'background-color': hexToRGBA(
                getAttribute( `scrollbarDrag`, { attributes: colors, deviceType } ),
                getAttribute( `scrollbarDragOpacity`, { attributes: colors, deviceType } )
            ),
            height: getAttribute( 'height', { attributes: sizing, deviceType } ),
            width: dragSize,
        },
    ];

    borderStyle( styles, selector, attributes, deviceType );
    borderStyle( styles, dragSelector, attributes, deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default TabletStyle;
