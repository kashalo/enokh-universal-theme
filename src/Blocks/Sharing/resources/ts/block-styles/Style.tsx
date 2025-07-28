import React from 'react';
import { BlockEditProps } from '../block/types';
import { buildCSS, flexChildStyle, layoutStyle, sizingStyle } from '@enokh-blocks/utils';

const MainStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const { uniqueId } = attributes;
    const selector = `.editor-styles-wrapper .enokh-blocks-sharing-buttons-${ uniqueId } > .block-editor-inner-blocks > .block-editor-block-list__layout`;
    const styles = [];

    layoutStyle( styles, selector, attributes );
    flexChildStyle( styles, selector, attributes );
    sizingStyle( styles, selector, attributes );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
