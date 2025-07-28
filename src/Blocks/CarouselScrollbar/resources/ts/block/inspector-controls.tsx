import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { BlockAttributes, BlockInspectorControlProps } from './types';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';
import { SizingControls } from './components/SIzingControls';
import { DisplayControls } from './components/DisplayControls';

const BlockInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes, clientId } = props;
    const { colors: colorAttrs, display: displayAttrs } = attributes;

    const setColoursAttribute = ( newColours: BlockAttributes[ 'colors' ] ): any => {
        setAttributes( {
            colors: newColours,
        } );
    };

    const setDisplayAttribute = ( newDisplay: BlockAttributes[ 'display' ] ): any => {
        setAttributes( {
            display: newDisplay,
        } );
    };

    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                <DisplayControls
                    attributes={ displayAttrs }
                    setAttributes={ setDisplayAttribute }
                    clientId={ clientId }
                />
                <SizingControls { ...props } />
                <BorderControls attributes={ attributes } setAttributes={ setAttributes } />
                <ColorControls
                    attributes={ colorAttrs as ContainerBlockAttributes }
                    setAttributes={ setColoursAttribute }
                />
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
