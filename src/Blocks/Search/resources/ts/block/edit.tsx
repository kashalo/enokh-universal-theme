// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

// Implementation dependencies
import blockConfiguration from './../../../block.json';
import { BlockEditProps } from './types';

import SearchBlockControls from './block-controls';
import SearchInspectorControls from './inspector-controls';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const blockProps = useBlockProps( {
        className: 'blocks-search',
    } );

    return (
        <div { ...blockProps }>
            <SearchBlockControls attributes={ props.attributes } setAttributes={ props.setAttributes } />
            <SearchInspectorControls attributes={ props.attributes } setAttributes={ props.setAttributes } />
            <ServerSideRender block={ blockConfiguration.name } attributes={ props.attributes } />
        </div>
    );
};

export default Edit;
