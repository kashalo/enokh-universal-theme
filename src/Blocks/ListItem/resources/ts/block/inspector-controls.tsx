import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { BlockInspectorControlProps } from './types';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import TypographyControls from '@enokh-blocks/components/InspectorControls/TypographyControls';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';

const BlockInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes, clientId } = props;
    const { deviceType } = useContext( BlockContext );

    const computedStyles = {
        deviceType,
        attributes: attributes as unknown as ContainerBlockAttributes,
        setAttributes,
        clientId,
    };

    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                <SpacingControls
                    attributes={ attributes as unknown as ContainerBlockAttributes }
                    setAttributes={ setAttributes }
                    computedStyles={ computedStyles }
                />
                <TypographyControls
                    attributes={ attributes as unknown as ContainerBlockAttributes }
                    setAttributes={ setAttributes }
                    computedStyles={ computedStyles }
                />
                <BorderControls
                    attributes={ attributes as unknown as ContainerBlockAttributes }
                    setAttributes={ setAttributes }
                />
                <ColorControls
                    attributes={ attributes.colors as unknown as ContainerBlockAttributes }
                    setAttributes={ ( value ): any => {
                        setAttributes( {
                            colors: value,
                        } );
                    } }
                />
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
