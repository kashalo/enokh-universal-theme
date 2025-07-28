import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { BlockInspectorControlProps } from './types';
import DisplayControls from './components/DisplayControls';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

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
                <DisplayControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
                <SpacingControls
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    computedStyles={ computedStyles }
                />
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
