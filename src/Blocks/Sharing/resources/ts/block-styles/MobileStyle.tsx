import React from 'react';
import { BlockEditProps } from '../block/types';
import { buildCSS, flexChildStyle, layoutStyle, sizingStyle } from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const MobileStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId } = attributes;
    const selector = `.editor-styles-wrapper .enokh-blocks-sharing-buttons-${ uniqueId } > .block-editor-inner-blocks > .block-editor-block-list__layout`;
    const styles = [];

    layoutStyle( styles, selector, attributes, deviceType );
    flexChildStyle( styles, selector, attributes, deviceType );
    sizingStyle( styles, selector, attributes, deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MobileStyle;
