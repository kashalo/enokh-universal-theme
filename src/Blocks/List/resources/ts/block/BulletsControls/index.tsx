import React from 'react';
import { BlockInspectorControlProps } from '../types';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { compose } from '@wordpress/compose';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import UnitControl from '@enokh-blocks/components/UnitControl';
import IconSelectControl from '@enokh-blocks/components/IconSelectControl';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import { alignItemsOptions } from '../../../../../CarouselArrows/resources/ts/block/config';
import LayoutControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/LayoutControl';

const BulletsControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes, clientId } = props;
    const { id, deviceType } = useContext( BlockContext );
    const { marker } = attributes;
    const displayDevice = deviceType === 'Desktop' ? '' : deviceType;

    const onSetAttribute = ( object: any ): any => {
        setAttributes( {
            marker: object,
        } );
    };

    const computedStyles = {
        deviceType,
        attributes: marker as ContainerBlockAttributes,
        setAttributes: onSetAttribute,
        clientId,
    };

    const directionValue = 'row';

    return (
        <CustomPanel id={ `${ id }BulletsControls` } title={ __( 'Bullets', 'enokh-blocks' ) } initialOpen={ false }>
            { deviceType === 'Desktop' && (
                <IconSelectControl
                    attributes={ marker as unknown as IconSelectControlAttributes }
                    onclick={ ( icon, iconGroup ) => {
                        setAttributes( {
                            marker: {
                                ...marker,
                                icon,
                                iconGroup,
                                ...( ! marker.size && { size: '1em' } ),
                            },
                        } );
                    } }
                    onReset={ () => {
                        setAttributes( {
                            marker: {
                                ...marker,
                                icon: '',
                                iconGroup: '',
                            },
                        } );
                    } }
                />
            ) }

            <UnitControl
                label={ __( 'Size', 'enokh-blocks' ) }
                id="enokh-blocks-carousel-nav-shape-size"
                value={ marker[ `size${ displayDevice }` ] || '' }
                placeholder={ getResponsivePlaceholder( 'size', marker, deviceType ) }
                onChange={ ( value ) =>
                    setAttributes( {
                        marker: {
                            ...marker,
                            [ `size${ displayDevice }` ]: value,
                        },
                    } )
                }
            />

            <SpacingControls
                attributes={ marker as ContainerBlockAttributes }
                setAttributes={ onSetAttribute }
                computedStyles={ computedStyles }
            />

            <LayoutControl
                value={ getAttribute( 'alignItems', { attributes: marker, deviceType } ) }
                onChange={ ( value ) =>
                    setAttributes( {
                        marker: {
                            ...marker,
                            [ getAttribute( 'alignItems', { attributes: marker, deviceType }, true ) ]:
                                value !== getAttribute( 'alignItems', { attributes: marker, deviceType } ) ? value : '',
                        },
                    } )
                }
                label={ __( 'Align Items', 'enokh-blocks' ) }
                attributeName="alignItems"
                directionValue={ directionValue }
                fallback={ getResponsivePlaceholder( 'alignItems', marker, deviceType, '' ) }
                options={ alignItemsOptions }
            />
        </CustomPanel>
    );
};

export default compose( withDeviceType )( BulletsControls ) as React.FunctionComponent<any>;
