// WordPress dependencies
import { InspectorAdvancedControls, useBlockEditingMode } from '@wordpress/block-editor';

// Implementation dependencies
import { getBlockContext } from '@enokh-blocks/block-context';
import IconLocation from '@enokh-blocks/components/InspectorControls/IconControls/components/IconLocation';

const TextBlockInspectorAdvancedControls = ( props: TextBlockInspectorAdvancedControlsProps ) => {
    /**
     * Do not display controls if the block itself enabled contentOnly editing
     */
    if ( useBlockEditingMode() === 'contentOnly' ) {
        return null;
    }

    const context = getBlockContext( 'enokh-blocks/text' );

    return (
        <InspectorAdvancedControls>
            <IconLocation
                value={ props.attributes.iconLocation }
                onChange={ ( value ) => props.setAttributes( { iconLocation: value } ) }
                options={ context.supports.icon.location }
            />
        </InspectorAdvancedControls>
    );
};
export default TextBlockInspectorAdvancedControls;
