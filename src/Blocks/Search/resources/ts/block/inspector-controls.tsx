// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { Panel, PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls, useBlockEditingMode } from '@wordpress/block-editor';

// Implementation dependencies
import { BlockInspectorControlProps } from './types';

const SearchInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes } = props;

    /**
     * Do not display controls if the block itself enabled contentOnly editing
     */
    if ( useBlockEditingMode() === 'contentOnly' ) {
        return null;
    }

    return (
        <InspectorControls>
            <Panel>
                <PanelBody title={ _x( 'Configuration', 'Search block', 'enokh-blocks' ) }>
                    <TextControl
                        label={ _x( 'Placeholder', 'Search block', 'enokh-blocks' ) }
                        value={ attributes.placeholderText }
                        onChange={ ( placeholderText ) => setAttributes( { placeholderText } ) }
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>
    );
};

export default SearchInspectorControls;
