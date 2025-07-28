import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { FC } from 'react';
import { BlockEditProps } from '../block/types';
import { borderStyle, buildCSS, layoutStyle, sizingStyle, spacingStyle } from '@enokh-blocks/utils';

const IconMobileStyle: FC< BlockEditProps > = ( props ) => {
    const { attributes, clientId } = props;
    const { uniqueId, widthMobile, heightMobile } = attributes;
    const { deviceType } = useContext( BlockContext );
    let selector = `.enokh-blocks-icon-${ uniqueId }`;
    selector = '.editor-styles-wrapper ' + selector;
    const styles = [];

    styles[ selector + ' svg' ] = [
        {
            width: widthMobile,
            height: heightMobile,
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
export default IconMobileStyle;
