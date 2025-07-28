import React from 'react';
import { BlockInspectorControlProps } from '../../types';
import getDynamicContentAttributes from '@enokh-blocks/components/InspectorControls/DynamicContentControls/attributes';
import useDynamicContent from '@enokh-blocks/stores/useDynamicContent';
import { RichText } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import blockConfiguration from '../../../../../block.json';

const filterAttributes = ( attributes, allowedKeys = [] ) =>
    Object.keys( attributes )
        .filter( ( key ) => allowedKeys.includes( key ) )
        .reduce( ( result, key ) => Object.assign( {}, result, { [ key ]: attributes[ key ] } ), {} );

const IconBlockDynamicRenderer: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes } = props;
    const dynamicAttributes = filterAttributes( attributes, Object.keys( getDynamicContentAttributes() ) );
    const rawContent = useDynamicContent( dynamicAttributes, 'enokh-blocks/icon' );
    const content = !! attributes.dynamicContentType ? rawContent.icon : 'No icon';
    const computedAttributes = {
        ...attributes,
        icon: rawContent.icon,
        iconGroup: rawContent.iconSet,
    };

    return (
        <>
            { typeof rawContent === 'string' && (
                <RichText.Content name="enokh-blocks/icon" value={ content } tagName="span" />
            ) }

            { typeof rawContent !== 'string' && (
                <ServerSideRender block={ blockConfiguration.name } attributes={ computedAttributes } />
            ) }
        </>
    );
};

export default IconBlockDynamicRenderer;
