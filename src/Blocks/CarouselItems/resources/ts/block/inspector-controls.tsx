import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { BlockInspectorControlProps } from './types';

const BlockInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
