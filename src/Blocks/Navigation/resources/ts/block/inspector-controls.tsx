// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { Panel, PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls, useBlockEditingMode } from '@wordpress/block-editor';

// Implementation dependencies
import { BlockInspectorControlProps } from './types';
import MenuLocationSelector from './components/MenuLocationSelector';

const NavigationInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    /**
     * Do not display controls if the block itself enabled contentOnly editing
     */
    if ( useBlockEditingMode() === 'contentOnly' ) {
        return null;
    }

    return (
        <>
            <InspectorControls>

                <Panel>
                    <PanelBody title={ _x( 'Menu', 'Navigation block', 'enokh-blocks' ) }>
                        <MenuLocationSelector
                            location={ props.attributes.menuLocation }
                            setLocation={ ( menuLocation ) => props.setAttributes( { menuLocation } ) }
                        />
                    </PanelBody>
                </Panel>
                <Panel>
                    <PanelBody title={ _x( 'Accessibility', 'Navigation block', 'enokh-blocks' ) }>
                        <TextControl
                            label={ _x( 'Menu name', 'Navigation block', 'enokh-blocks' ) }
                            value={ props.attributes.ariaLabel }
                            onChange={ ( value ) => props.setAttributes( { ariaLabel: value } ) }
                        />
                    </PanelBody>
                </Panel>
            </InspectorControls>
        </>
    );
};

export default NavigationInspectorControls;
