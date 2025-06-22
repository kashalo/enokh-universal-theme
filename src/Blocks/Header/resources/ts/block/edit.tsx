// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { BlockEditProps } from '../types';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
	const innerBlockProps = useInnerBlocksProps( useBlockProps(), {
		templateLock: props.attributes.templateLock,
	} );

	return <div { ...innerBlockProps } />;
};

export default Edit;
