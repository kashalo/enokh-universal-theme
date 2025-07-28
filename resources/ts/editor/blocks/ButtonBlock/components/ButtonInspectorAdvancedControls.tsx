import { InspectorAdvancedControls, useBlockEditingMode } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import IconLocation from '@enokh-blocks/components/InspectorControls/IconControls/components/IconLocation';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const ButtonInspectorAdvancedControls = ( { buttonType, setAttributes, iconLocation, ariaLabel, removeText } ) => {
    const {
        id,
        supports: { icon: iconSupport },
    } = useContext( BlockContext );

    /**
     * Do not display controls if the block itself enabled contentOnly editing
     */
    if ( useBlockEditingMode() === 'contentOnly' ) {
        return null;
    }

    return (
        <InspectorAdvancedControls>
            <SelectControl
                label={ __( 'Button type', 'enokh-blocks' ) }
                value={ buttonType }
                onChange={ ( value ) => setAttributes( { buttonType: value } ) }
                options={ [
                    { value: 'link', label: __( 'Link', 'enokh-blocks' ) },
                    { value: 'button', label: '<button>' },
                    { value: 'go-to-top', label: __( 'Go to top', 'enokh-blocks' ) },
                ] }
            />

            <IconLocation
                value={ iconLocation }
                onChange={ ( value ) => setAttributes( { iconLocation: value } ) }
                options={ iconSupport.location }
            />

            <TextControl
                label={ __( 'ARIA Label', 'enokh-blocks' ) }
                help={ __( 'Available Placeholders {post_id} and {post_title}', 'enokh-blocks' ) }
                value={ ariaLabel }
                onChange={ ( value ) => {
                    setAttributes( {
                        ariaLabel: value,
                    } );
                } }
            />

            <ToggleControl
                label={ __( 'Remove Text', 'enokh-blocks' ) }
                checked={ !! removeText }
                onChange={ ( value ) => {
                    setAttributes( {
                        removeText: value,
                    } );
                } }
            />
        </InspectorAdvancedControls>
    );
};
export default ButtonInspectorAdvancedControls;
