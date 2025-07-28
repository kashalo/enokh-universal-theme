import React from 'react';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockInspectorControlProps } from '../../types';
import CustomPanel from '@enokh-blocks/components/CustomPanel';

const AccessibilityControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes, clientId } = props;
    const { altText, altDescription } = attributes;
    const { deviceType } = useContext( BlockContext );

    return (
        <CustomPanel
            id="EnokhIconAccessibilityControls"
            title={ __( 'Accessibility', 'enokh-blocks' ) }
            initialOpen={ false }
        >
            { deviceType === 'Desktop' && (
                <>
                    <TextControl
                        label={ __( 'Title', 'enokh-blocks' ) }
                        value={ altText }
                        onChange={ ( value ) => setAttributes( { altText: value } ) }
                    />
                    <TextControl
                        label={ __( 'Description', 'enokh-blocks' ) }
                        value={ altDescription }
                        onChange={ ( value ) => setAttributes( { altDescription: value } ) }
                    />
                </>
            ) }
        </CustomPanel>
    );
};

export default AccessibilityControls;
