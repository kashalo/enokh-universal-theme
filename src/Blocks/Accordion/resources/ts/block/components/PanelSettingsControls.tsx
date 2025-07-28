import React from 'react';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';
import { panelSettingsContext } from '../block-context';

const PanelSettingsControls: React.FunctionComponent< AccordionBlockProps > = ( props ) => {
    const {
        attributes: { templateLock, panel },
        setAttributes,
        clientId,
    } = props;
    const localContext = useContext( BlockContext );
    const { deviceType } = localContext;

    const onSetAttribute = ( object: any ): any => {
        setAttributes( {
            panel: object,
        } );
    };

    const blockContext = Object.assign( {}, panelSettingsContext, {
        deviceType,
    } );

    const computedStyles = {
        deviceType,
        attributes: panel as ContainerBlockAttributes,
        setAttributes: onSetAttribute,
        clientId,
    };

    return (
        <>
            <BlockContext.Provider value={ blockContext }>
                <SpacingControls
                    attributes={ panel as ContainerBlockAttributes }
                    setAttributes={ onSetAttribute }
                    computedStyles={ computedStyles }
                />
                <BorderControls attributes={ panel as ContainerBlockAttributes } setAttributes={ onSetAttribute } />
            </BlockContext.Provider>
        </>
    );
};

export default PanelSettingsControls;
