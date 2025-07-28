import { BlockEditProps } from '../block/types';
import { borderStyle, borderStyleColor, buildCSS, getAttribute, hexToRGBA, spacingStyle } from '@enokh-blocks/utils';
import BlockContext from '@enokh-blocks/block-context';
import { useContext } from '@wordpress/element';

const TabletStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const {
        uniqueId,
        display: { playSize },
    } = attributes;
    // const { deviceType } = useContext( BlockContext );
    const deviceType = 'Tablet';
    const playSelector = `.editor-styles-wrapper .enokh-blocks-carousel-play-pause-${ uniqueId } .play-button`;
    const playSelectorHoverState = `${ playSelector }:hover`;
    const pauseSelector = `.editor-styles-wrapper .enokh-blocks-carousel-play-pause-${ uniqueId } .pause-button`;
    const pauseSelectorHoverState = `${ pauseSelector }:hover`;
    const styles = [];

    styles[ playSelector ] = [
        {
            'line-height': 1,
        },
        {
            'background-color': hexToRGBA( getAttribute( `playBackgroundColor`, { attributes, deviceType } ), 1 ),
            color: getAttribute( `playTextColor`, { attributes, deviceType } ),
        },
    ];
    styles[ playSelector + ' svg' ] = [
        {
            width: getAttribute( 'playSize', { attributes, deviceType } ),
            height: getAttribute( 'playSize', { attributes, deviceType } ),
        },
    ];
    styles[ playSelectorHoverState ] = [
        {
            'background-color': hexToRGBA( getAttribute( `playBackgroundColorHover`, { attributes, deviceType } ), 1 ),
            color: getAttribute( `playTextColorHover`, { attributes, deviceType } ),
        },
    ];

    spacingStyle( styles, playSelector, attributes, deviceType );
    borderStyle( styles, playSelector, attributes, deviceType );

    // Hover
    borderStyleColor( styles, playSelectorHoverState, attributes, 'Hover', deviceType );

    /**
     * PAUSE_BUTTON
     */
    styles[ pauseSelector ] = [
        {
            'line-height': 1,
        },
        {
            'background-color': hexToRGBA( getAttribute( `pauseBackgroundColor`, { attributes, deviceType } ), 1 ),
            color: getAttribute( `pauseTextColor`, { attributes, deviceType } ),
        },
    ];
    styles[ pauseSelector + ' svg' ] = [
        {
            width: getAttribute( 'pauseSize', { attributes, deviceType } ),
            height: getAttribute( 'pauseSize', { attributes, deviceType } ),
        },
    ];
    styles[ pauseSelectorHoverState ] = [
        {
            'background-color': hexToRGBA( getAttribute( `pauseBackgroundColorHover`, { attributes, deviceType } ), 1 ),
            color: getAttribute( `pauseTextColorHover`, { attributes, deviceType } ),
        },
    ];

    spacingStyle( styles, pauseSelector, attributes, deviceType );
    borderStyle( styles, pauseSelector, attributes, deviceType );

    // Hover
    borderStyleColor( styles, pauseSelectorHoverState, attributes, 'Hover', deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default TabletStyle;
