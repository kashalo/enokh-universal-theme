// Third-party dependencies
import React, { Fragment } from 'react';

// WordPress dependencies
import { InnerBlocks } from '@wordpress/block-editor';
import { BlockSaveProps } from '../types';

const Save: React.FunctionComponent< BlockSaveProps > = ( props ) => {
	return <InnerBlocks.Content />;
};

export default Save;
