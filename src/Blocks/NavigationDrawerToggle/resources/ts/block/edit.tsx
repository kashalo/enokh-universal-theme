// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

// Implementation dependencies
import blockConfiguration from '../../../block.json';
import { BlockEditProps } from './types';
import BlockControls from './block-controls';
import InspectorControls from './inspector-controls';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { layout, ...ssrAttributes } = props.attributes;

    const blockProps = useBlockProps( {
        className: 'blocks-navigation-drawer-toggle',
    } );

    const { children, ...wrapperProps } = useInnerBlocksProps( blockProps );

    return (
        <>
            { props.isSelected && (
                <>
                    <BlockControls attributes={ props.attributes } setAttributes={ props.setAttributes } />
                    <InspectorControls attributes={ props.attributes } setAttributes={ props.setAttributes } />
                </>
            ) }

            <button { ...wrapperProps }>
                <ServerSideRender
                    block={ blockConfiguration.name }
                    attributes={ ssrAttributes }
                    skipBlockSupportAttributes={ true }
                />
            </button>
        </>
    );
};

export default Edit;
