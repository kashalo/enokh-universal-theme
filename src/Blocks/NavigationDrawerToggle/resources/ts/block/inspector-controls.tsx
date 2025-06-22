// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { __, _x } from '@wordpress/i18n';
import { Panel, PanelBody, TextControl, ToggleControl, SelectControl } from '@wordpress/components';
import { InspectorControls, useBlockEditingMode } from '@wordpress/block-editor';

// Implementation dependencies
import { BlockInspectorControlProps } from './types';

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
                    <PanelBody title={ _x( 'Label', 'Navigation Drawer Toggle block', 'mah-blocks' ) }>
                        <ToggleControl
                            label={ _x( 'Enabled', 'Navigation Drawer Toggle block', 'mah-blocks' ) }
                            checked={ props.attributes.labelEnabled }
                            onChange={ ( labelEnabled ) => props.setAttributes( { labelEnabled } ) }
                        />
                        { props.attributes.labelEnabled && (
                            <>
                                <TextControl
                                    label={ _x( 'Text', 'Navigation Drawer Toggle block', 'mah-blocks' ) }
                                    value={ props.attributes.labelText }
                                    onChange={ ( labelText ) => props.setAttributes( { labelText } ) }
                                />
                                <SelectControl
                                    label={ _x( 'Position', 'Navigation Drawer Toggle block', 'mah-blocks' ) }
                                    options={ [
                                        {
                                            value: 'before',
                                            label: _x( 'Before', 'Navigation Drawer Toggle block', 'mah-blocks' ),
                                        },
                                        {
                                            value: 'after',
                                            label: _x( 'After', 'Navigation Drawer Toggle block', 'mah-blocks' ),
                                        },
                                    ] }
                                    value={ props.attributes.labelPosition }
                                    onChange={ ( labelPosition ) => props.setAttributes( { labelPosition } ) }
                                />
                            </>
                        ) }
                    </PanelBody>
                </Panel>
            </InspectorControls>
        </>
    );
};

export default NavigationInspectorControls;
