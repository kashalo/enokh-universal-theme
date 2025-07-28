import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { FC } from 'react';
import { BlockEditProps } from '../block/types';
import {
    borderStyle,
    borderStyleColor,
    buildCSS,
    hexToRGBA,
    layoutStyle,
    sizingStyle,
    spacingStyle,
} from '@enokh-blocks/utils';

const IconStyle: FC< BlockEditProps > = ( props ) => {
    const { attributes, clientId } = props;
    const { uniqueId, width, height, textColor, textColorHover, backgroundColor, backgroundColorOpacity } = attributes;
    const { deviceType } = useContext( BlockContext );

    let selector = `.enokh-blocks-icon-${ uniqueId }`;
    selector = '.editor-styles-wrapper ' + selector;

    const styles = [];
    styles[ selector ] = [
        {
            color: textColor,
            'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
        },
    ];
    styles[ selector + ':hover' ] = [ { color: textColorHover } ];

    styles[ selector + ' svg' ] = [
        {
            width,
            height,
        },
    ];

    sizingStyle( styles, selector, attributes );
    borderStyle( styles, selector, attributes );
    borderStyleColor(
        styles,
        selector + ':hover, ' + selector + ':focus, ' + selector + ':active',
        attributes,
        'Hover'
    );
    spacingStyle( styles, selector, attributes );
    layoutStyle( styles, selector, attributes );

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};
export default IconStyle;
