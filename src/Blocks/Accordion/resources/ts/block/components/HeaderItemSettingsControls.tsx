import React from 'react';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';
import SizingControls from '@enokh-blocks/components/InspectorControls/SizingControls';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';
import TypographyControls from '@enokh-blocks/components/InspectorControls/TypographyControls';
import { headerItemSettingsContext } from '../block-context';

const HeaderItemSettingsControls: React.FunctionComponent< AccordionBlockProps > = ( props ) => {
    const {
        attributes: { templateLock, headerItem },
        setAttributes,
        clientId,
    } = props;
    const localContext = useContext( BlockContext );
    const { deviceType } = localContext;
    const onSetAttribute = ( object: any ): any => {
        setAttributes( {
            headerItem: object,
        } );
    };

    const blockContext = Object.assign( {}, headerItemSettingsContext, {
        deviceType,
    } );

    const computedStyles = {
        deviceType,
        attributes: headerItem as ContainerBlockAttributes,
        setAttributes: onSetAttribute,
        clientId,
    };

    return (
        <>
            <BlockContext.Provider value={ blockContext }>
                <SizingControls
                    attributes={ headerItem as ContainerBlockAttributes }
                    setAttributes={ onSetAttribute }
                />
                <SpacingControls
                    attributes={ headerItem as ContainerBlockAttributes }
                    setAttributes={ onSetAttribute }
                    computedStyles={ computedStyles }
                />
                <BorderControls
                    attributes={ headerItem as ContainerBlockAttributes }
                    setAttributes={ onSetAttribute }
                />
                <ColorControls attributes={ headerItem as ContainerBlockAttributes } setAttributes={ onSetAttribute } />
                <TypographyControls
                    attributes={ headerItem as ContainerBlockAttributes }
                    setAttributes={ onSetAttribute }
                    computedStyles={ computedStyles }
                />
            </BlockContext.Provider>
        </>
    );
};

export default HeaderItemSettingsControls;
