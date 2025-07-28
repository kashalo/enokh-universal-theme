import { BlockEditProps } from '../block/types';
import { borderStyle, buildCSS, getAttribute, hexToRGBA } from '@enokh-blocks/utils';

/**
 * MainStyle Component
 *
 * Generates dynamic inline styles for the carousel scrollbar based on block attributes.
 * It computes styles for both the scrollbar container and its draggable element,
 * taking into account responsive attributes and design system color utilities.
 *
 * This component is rendered inside the block's edit view to apply real-time styling.
 * @param props
 */
const MainStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const deviceType = '';
    const { uniqueId, display, colors, sizing } = attributes;
    const selector = '.enokh-blocks-carousel-scrollbar-' + uniqueId;
    const dragSelector = `${ selector } .enokh-blocks-carousel-scrollbar__drag`;
    const styles = [];

    let dragSize = getAttribute( 'drag', { attributes: sizing, deviceType } ) ?? '';
    dragSize = dragSize === 'auto' ? '100px' : dragSize;

    // Fallback logic for drag size
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

    // Style for the scrollbar track
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

    // Apply border styles
    borderStyle( styles, selector, attributes );
    borderStyle( styles, dragSelector, attributes );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
