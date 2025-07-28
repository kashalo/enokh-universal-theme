import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { BlockInspectorControlProps } from './types';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';
import DisplayControls from './components/DisplayControls';
import LayoutControls from '@enokh-blocks/components/InspectorControls/LayoutControls';
import SizingControls from '@enokh-blocks/components/InspectorControls/SizingControls';

const BlockInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes, clientId } = props;
    const { deviceType } = useContext( BlockContext );
    const computedStyles = {
        deviceType,
        attributes,
        setAttributes,
        clientId,
    };

    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                <LayoutControls
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    displayAttrPrefix="wrapperDisplay"
                />
                <DisplayControls { ...props } />
                <SizingControls attributes={ attributes } setAttributes={ setAttributes } />
                <SpacingControls
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    computedStyles={ computedStyles }
                />
                <BorderControls attributes={ attributes } setAttributes={ setAttributes } />
                <ColorControls attributes={ attributes } setAttributes={ setAttributes } />
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
