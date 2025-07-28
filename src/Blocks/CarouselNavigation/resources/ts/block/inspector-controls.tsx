import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { BlockInspectorControlProps } from './types';
import TypographyControls from '@enokh-blocks/components/InspectorControls/TypographyControls';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import DisplayControls from './components/DisplayControls';
import BorderControls from './components/BorderControls';
import LayoutControls from './components/LayoutControls';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import ShapeControls from './components/ShapeControls';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';
import ElementControls from './components/ElementControls';

const BlockInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes, clientId } = props;
    const { deviceType } = useContext( BlockContext );
    const computedStyles = {
        deviceType,
        attributes,
        setAttributes,
        clientId,
    };
    const { variant } = attributes;

    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                <DisplayControls attributes={ attributes } setAttributes={ setAttributes } />
                <LayoutControls attributes={ attributes } setAttributes={ setAttributes } />
                { variant === 'fraction' && (
                    <>
                        <TypographyControls
                            attributes={ attributes }
                            setAttributes={ setAttributes }
                            computedStyles={ computedStyles }
                        />
                        <ColorControls attributes={ attributes } setAttributes={ setAttributes } />
                        <BorderControls attributes={ attributes } setAttributes={ setAttributes } />
                    </>
                ) }

                { variant === 'shape' && <ShapeControls attributes={ attributes } setAttributes={ setAttributes } /> }

                { variant === 'element' && (
                    <>
                        <ElementControls attributes={ attributes } setAttributes={ setAttributes } />
                        <BorderControls attributes={ attributes } setAttributes={ setAttributes } />
                    </>
                ) }

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
