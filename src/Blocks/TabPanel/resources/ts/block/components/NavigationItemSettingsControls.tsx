import React from 'react';
import LayoutControls from '@enokh-blocks/components/InspectorControls/LayoutControls';
import SizingControls from '@enokh-blocks/components/InspectorControls/SizingControls';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const NavigationItemSettingsControls: React.FunctionComponent< TabPanelProps > = ( props ) => {
    const {
        attributes: { navigation },
        setAttributes,
        clientId,
    } = props;

    const { deviceType } = useContext( BlockContext );

    const onSetAttribute = ( object: any ): any => {
        setAttributes( {
            navigation: object,
        } );
    };

    const computedStyles = {
        deviceType,
        attributes: navigation as ContainerBlockAttributes,
        setAttributes: onSetAttribute,
        clientId,
    };

    return (
        <>
            <LayoutControls attributes={ navigation as ContainerBlockAttributes } setAttributes={ onSetAttribute } />
            <SpacingControls
                attributes={ navigation as ContainerBlockAttributes }
                setAttributes={ onSetAttribute }
                computedStyles={ computedStyles }
            />
            <SizingControls attributes={ navigation as ContainerBlockAttributes } setAttributes={ onSetAttribute } />
            <BorderControls attributes={ navigation as ContainerBlockAttributes } setAttributes={ onSetAttribute } />
            <ColorControls attributes={ navigation as ContainerBlockAttributes } setAttributes={ onSetAttribute } />
        </>
    );
};

export default NavigationItemSettingsControls;
