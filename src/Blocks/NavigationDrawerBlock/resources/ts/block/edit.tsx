// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

// Implementation dependencies
import { BlockEditProps } from './types';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const blockProps = useInnerBlocksProps(
        useBlockProps( {
            className: 'blocks-navigation-drawer',
        } ),
        {
            templateLock: props.attributes.templateLock,
        }
    );

    return <div { ...blockProps } />;
};

export default Edit;
