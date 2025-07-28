// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { Panel, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls, useBlockEditingMode } from '@wordpress/block-editor';

const AccordionItemInspectorControls: React.FunctionComponent< AccordionItemBlockProps > = ( props ) => {
    /**
     * Do not display controls if the block itself enabled contentOnly editing
     */
    if ( useBlockEditingMode() === 'contentOnly' ) {
        return null;
    }

    return (
        <InspectorControls>
            <Panel>
                <PanelBody title={ _x( 'Display options', 'Accordion Item block', 'enokh-blocks' ) }>
                    <ToggleControl
                        label={ _x( 'Start open', 'Accordion Item block', 'enokh-blocks' ) }
                        help={ _x(
                            'If checked, this item will default to an open state.',
                            'Accordion Item block',
                            'enokh-blocks'
                        ) }
                        checked={ props.attributes.isOpen }
                        onChange={ ( checked ) => props.setAttributes( { isOpen: checked } ) }
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>
    );
};

export default AccordionItemInspectorControls;
