import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { FC } from 'react';
import { BlockEditProps } from '../block/types';
import { borderStyle, borderStyleColor, buildCSS, layoutStyle, sizingStyle, spacingStyle } from '@enokh-blocks/utils';

const IconTabletStyle: FC< BlockEditProps > = ( props ) => {
    const { attributes, clientId } = props;
    const { uniqueId, widthTablet, heightTablet } = attributes;
    const { deviceType } = useContext( BlockContext );
    let selector = `.enokh-blocks-icon-${ uniqueId }`;
    selector = '.editor-styles-wrapper ' + selector;
    const styles = [];

    styles[ selector + ' svg' ] = [
        {
            width: widthTablet,
            height: heightTablet,
        },
    ];

    sizingStyle( styles, selector, attributes, deviceType );
    borderStyle( styles, selector, attributes, deviceType );
    spacingStyle( styles, selector, attributes, deviceType );
    layoutStyle( styles, selector, attributes, deviceType );

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};
export default IconTabletStyle;
