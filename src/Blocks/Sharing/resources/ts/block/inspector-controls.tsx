import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { BlockControlProps } from './types';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import LayoutControls from '@enokh-blocks/components/InspectorControls/LayoutControls';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';

const BlockInspectorControls: React.FunctionComponent< BlockControlProps > = ( props ) => {
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
                <LayoutControls attributes={ attributes } setAttributes={ setAttributes } />
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
