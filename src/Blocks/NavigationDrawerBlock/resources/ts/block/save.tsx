// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { InnerBlocks } from '@wordpress/block-editor';

// Implementation dependencies
import { BlockSaveProps } from './types';

const Save: React.FunctionComponent< BlockSaveProps > = () => {
    return <InnerBlocks.Content />;
};

export default Save;
