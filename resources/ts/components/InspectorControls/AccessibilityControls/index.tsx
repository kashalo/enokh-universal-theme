import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { BlockProps } from './types';

const AccessibilityControls = < T extends Record< string, any > >( props: BlockProps< T > ): JSX.Element => {
    const { attributes, setAttributes, clientId } = props;
    const { altText, altDescription, role } = attributes;
    const {
        deviceType,
        id,
        supports: { a11yPanel },
    } = useContext( BlockContext );

    return (
        <CustomPanel
            id={ `${ id }AccessibilityControls` }
            title={ __( 'Accessibility', 'enokh-blocks' ) }
            initialOpen={ false }
        >
            { deviceType === 'Desktop' && (
                <>
                    { a11yPanel.altText && (
                        <TextControl
                            label={ __( 'Title', 'enokh-blocks' ) }
                            value={ altText }
                            onChange={ ( value ) => setAttributes( { altText: value } ) }
                        />
                    ) }
                    { a11yPanel.altDescription && (
                        <TextControl
                            label={ __( 'Description', 'enokh-blocks' ) }
                            value={ altDescription }
                            onChange={ ( value ) => setAttributes( { altDescription: value } ) }
                        />
                    ) }
                    { a11yPanel.role && (
                        <TextControl
                            label={ __( 'Role', 'enokh-blocks' ) }
                            value={ role }
                            onChange={ ( value ) => setAttributes( { role: value } ) }
                        />
                    ) }
                </>
            ) }
        </CustomPanel>
    );
};

export default AccessibilityControls;
