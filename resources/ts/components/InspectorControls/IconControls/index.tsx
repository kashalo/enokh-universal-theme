import { PanelBody, ToggleControl, Dropdown, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import IconPickerControl from '@enokh-blocks/components/IconPickerControl';
import IconStyles from './components/IconStyles';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import FlexControl from '@enokh-blocks/components/FlexControl';
import UnitControl from '@enokh-blocks/components/UnitControl';
import { getResponsivePlaceholder, getAttribute } from '@enokh-blocks/utils';

interface IconControlsProps {
    attributes: ButtonBlockAttributes;
    setAttributes( object );
}

export default function IconControls( props: IconControlsProps ) {
    const { attributes, setAttributes } = props;
    const {
        id,
        supports: { icon: iconSupport },
    } = useContext( BlockContext );

    const { deviceType } = useContext( BlockContext );
    const { icon, iconLocation, iconLocationTablet, iconLocationMobile, removeText } = attributes;

    return (
        <PanelBody title={ __( 'Icon', 'enokh-blocks' ) } initialOpen={ false }>
            { deviceType === 'Desktop' && (
                <>
                    <IconPickerControl attributes={ attributes } setAttributes={ setAttributes } id={ id } />
                    { icon && ! removeText && (
                        <IconStyles
                            attributes={ attributes }
                            setAttributes={ setAttributes }
                            iconLocation={ iconLocation }
                            locationOptions={ iconSupport.location }
                            onChangeLocation={ ( value ) => {
                                setAttributes( {
                                    iconLocation: value,
                                } );
                            } }
                        />
                    ) }
                </>
            ) }

            { deviceType === 'Tablet' && !! icon && ! removeText && (
                <IconStyles
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    iconLocation={ iconLocationTablet }
                    locationOptions={ iconSupport.location }
                    onChangeLocation={ ( value ) => {
                        setAttributes( {
                            iconLocationTablet: value,
                        } );
                    } }
                />
            ) }

            { deviceType === 'Mobile' && !! icon && ! removeText && (
                <IconStyles
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    iconLocation={ iconLocationMobile }
                    locationOptions={ iconSupport.location }
                    onChangeLocation={ ( value ) => {
                        setAttributes( {
                            iconLocationMobile: value,
                        } );
                    } }
                />
            ) }

            { icon && iconSupport.iconSize && (
                <FlexControl>
                    <UnitControl
                        id="enokh-blocks-icon-width"
                        label={ __( 'Icon Size', 'enokh-blocks' ) }
                        value={ getAttribute( 'width', { attributes: attributes.iconStyles, deviceType } ) }
                        placeholder={ getResponsivePlaceholder( 'width', attributes.iconStyles, deviceType ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                iconStyles: {
                                    [ getAttribute(
                                        'width',
                                        { attributes: attributes.iconStyles, deviceType },
                                        true
                                    ) ]: value,
                                    [ getAttribute(
                                        'height',
                                        { attributes: attributes.iconStyles, deviceType },
                                        true
                                    ) ]: value,
                                },
                            } );
                        } }
                    />
                </FlexControl>
            ) }
        </PanelBody>
    );
}
