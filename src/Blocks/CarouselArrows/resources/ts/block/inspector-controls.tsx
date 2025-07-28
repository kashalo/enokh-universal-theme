import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { BlockInspectorControlProps } from './types';
import LayoutControls from './components/LayoutControls';

const BlockInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                <LayoutControls { ...props } />
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
