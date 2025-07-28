import React from 'react';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorAdvancedControls } from '@wordpress/block-editor';

const ContainerBlockAdvancedInspectorControls: React.FunctionComponent< ContainerBlockInspectorControlsProps > = (
    props
) => {
    const { attributes, setAttributes, clientId } = props;
    const { tagName, removeIfEmpty, useDynamicData, dynamicLinkType, linkType } = attributes;
    const { deviceType } = useContext( BlockContext );
    const disableTagSelector = !! useDynamicData && dynamicLinkType !== '' && linkType === 'wrapper';

    const tagNames = [
        { label: 'div', value: 'div' },
        { label: 'article', value: 'article' },
        { label: 'section', value: 'section' },
        { label: 'header', value: 'header' },
        { label: 'footer', value: 'footer' },
        { label: 'aside', value: 'aside' },
    ];

    return (
        <InspectorAdvancedControls>
            { deviceType === 'Desktop' && (
                <>
                    { ! disableTagSelector && (
                        <SelectControl
                            label={ __( 'Tag Name', 'enokh-blocks' ) }
                            value={ tagName }
                            options={ tagNames }
                            onChange={ ( value ) => setAttributes( { tagName: value } ) }
                        />
                    ) }
                    <ToggleControl
                        label={ __( 'Remove block if child is empty', 'enokh-blocks' ) }
                        checked={ !! removeIfEmpty }
                        onChange={ ( value ) => setAttributes( { removeIfEmpty: value } ) }
                    />
                </>
            ) }
        </InspectorAdvancedControls>
    );
};

export default ContainerBlockAdvancedInspectorControls;
