import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

import useDeviceAttributes from '@enokh-blocks/stores/useDeviceAttributes';
import DimensionsControl from '@enokh-blocks/components/DimensionsControl';
import { BaseControl, Tooltip, Button } from '@wordpress/components';
import FlexControl from '@enokh-blocks/components/FlexControl';
import UnitControl from '@enokh-blocks/components/UnitControl';
import ColorPickerControl from '@enokh-blocks/components/ColorPickerControl';
import StyleDropdownControl from '@enokh-blocks/components/InspectorControls/BorderControls/components/StyleDropdownControl';
import { link, linkOff } from '@wordpress/icons';
import { isEqual, isEmpty } from 'lodash';
import { isNumeric, getResponsivePlaceholder } from '@enokh-blocks/utils';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { BlockControlsProps } from '../types';

export default function BorderControls( props: BlockControlsProps ) {
    const { attributes, setAttributes } = props;
    const {
        id,
        supports: { borders: bordersPanel },
        deviceType,
    } = useContext( BlockContext );
    const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
    const borderRadiusAttributes = [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius',
    ];
    const borderAreas = [ 'borderTop', 'borderRight', 'borderBottom', 'borderLeft' ];
    const borderDevice = deviceType !== 'Desktop' ? deviceType : '';
    const borderLabels = {
        borderTop: __( 'Top', 'enokh-blocks' ),
        borderRight: __( 'Right', 'enokh-blocks' ),
        borderBottom: __( 'Bottom', 'enokh-blocks' ),
        borderLeft: __( 'Left', 'enokh-blocks' ),
    };
    const [ sync, setSync ] = useState( false );
    const { variant } = attributes;

    useEffect( () => {
        const allValues = borderAreas.map( ( area ) => {
            return Object.entries( deviceAttributes.borders ).reduce( ( newObject, [ key, value ] ) => {
                if ( key.startsWith( area ) && value ) {
                    const newKey = key.replace( area, '' );

                    newObject = {
                        ...newObject,
                        [ newKey ]: value,
                    };
                }

                return newObject;
            }, {} );
        } );

        if (
            4 === allValues.length &&
            allValues.every( ( obj ) => ! isEmpty( obj ) && isEqual( obj, allValues[ 0 ] ) )
        ) {
            setSync( true );
        }
    }, [] );

    function manualSync() {
        const areasWithWidth = borderAreas.filter(
            ( area ) =>
                deviceAttributes.borders[ area + 'Width' ] || isNumeric( deviceAttributes.borders[ area + 'Width' ] )
        );

        if ( ! areasWithWidth.length ) {
            return;
        }

        const firstArea = areasWithWidth[ 0 ];

        const valuesToSync = Object.entries( deviceAttributes.borders ).reduce( ( newObject, [ key, value ] ) => {
            if ( key.startsWith( firstArea ) ) {
                const newKey = key.replace( firstArea, '' );
                newObject[ newKey ] = value;
            }

            return newObject;
        }, {} );

        const newDeviceAttributes = Object.entries( valuesToSync ).reduce( ( newObject, [ key, value ] ) => {
            borderAreas.forEach( ( area ) => {
                newObject[ area + key ] = value;
            } );

            return newObject;
        }, {} );

        setDeviceAttributes( newDeviceAttributes, 'borders' );
    }


    return (
        <CustomPanel
            id={ `${ id }BorderControls` }
            title={ __( 'Borders', 'enokh-blocks' ) }
            initialOpen={ false }
            className="enokh-blocks-panel-label"
        >
            { ( bordersPanel.borderTop ||
                bordersPanel.borderRight ||
                bordersPanel.borderBottom ||
                bordersPanel.borderLeft ) && (
                <BaseControl
                    label={ __( 'Border', 'enokh-blocks' ) }
                    id={ 'enokh-blocks-borderTop-width' }
                    className="enokh-blocks-border-row"
                >
                    <Tooltip text={ !! sync ? __( 'Unlink Sides', 'enokh-blocks' ) : __( 'Link Sides', 'enokh-blocks' ) }>
                        <Button
                            className="enokh-blocks-dimensions-control_sync"
                            aria-label={
                                !! sync ? __( 'Unlink Sides', 'enokh-blocks' ) : __( 'Link Sides', 'enokh-blocks' )
                            }
                            // @ts-ignore
                            variant={ !! sync ? 'primary' : '' }
                            aria-pressed={ !! sync }
                            onClick={ () => {
                                setSync( ! sync );

                                if ( ! sync ) {
                                    manualSync();
                                }
                            } }
                        >
                            { !! sync ? link : linkOff }
                        </Button>
                    </Tooltip>

                    { borderAreas.map( ( borderArea, areaIndex ) => {
                        if ( ! bordersPanel[ borderArea ] ) {
                            return null;
                        }

                        if ( sync && areaIndex > 0 ) {
                            return null;
                        }

                        const iconBorderStyle = !! sync ? 'borderAll' : borderArea;

                        return (
                            <FlexControl key={ borderArea }>
                                <Tooltip
                                    text={ !! sync ? __( 'All sides', 'enokh-blocks' ) : borderLabels[ borderArea ] }
                                >
                                    <div
                                        className={ 'enokh-blocks-border-icon ' + iconBorderStyle }
                                        style={ { borderStyle: attributes.borders[ borderArea + 'Style' ] } }
                                    ></div>
                                </Tooltip>

                                <UnitControl
                                    id={ 'enokh-blocks-' + borderArea + '-width' }
                                    value={ deviceAttributes.borders[ borderArea + 'Width' ] || '' }
                                    placeholder={ getResponsivePlaceholder(
                                        borderArea + 'Width',
                                        attributes.borders,
                                        deviceType
                                    ) }
                                    onChange={ ( value ) => {
                                        const newAttributes = {
                                            [ borderArea + 'Width' ]: value,
                                        };

                                        if ( sync ) {
                                            newAttributes.borderRightWidth = value;
                                            newAttributes.borderBottomWidth = value;
                                            newAttributes.borderLeftWidth = value;
                                        }

                                        if ( ! value ) {
                                            newAttributes[ borderArea + 'Style' ] = '';

                                            if ( sync ) {
                                                newAttributes.borderRightStyle = '';
                                                newAttributes.borderBottomStyle = '';
                                                newAttributes.borderLeftStyle = '';
                                            }
                                        } else if ( ! attributes.borders[ borderArea + 'Style' ] ) {
                                            newAttributes[ borderArea + 'Style' ] = 'solid';

                                            if ( sync ) {
                                                newAttributes.borderRightStyle = 'solid';
                                                newAttributes.borderBottomStyle = 'solid';
                                                newAttributes.borderLeftStyle = 'solid';
                                            }
                                        }

                                        setDeviceAttributes( newAttributes, 'borders' );
                                    } }
                                />

                                <StyleDropdownControl
                                    value={
                                        deviceAttributes.borders[ borderArea + 'Style' ] ||
                                        getResponsivePlaceholder( borderArea + 'Style', attributes.borders, deviceType )
                                    }
                                    onChange={ ( value ) => {
                                        const newAttributes = {
                                            [ borderArea + 'Style' ]: value,
                                        };

                                        if ( sync ) {
                                            newAttributes.borderRightStyle = value;
                                            newAttributes.borderBottomStyle = value;
                                            newAttributes.borderLeftStyle = value;
                                        }

                                        setDeviceAttributes( newAttributes, 'borders' );
                                    } }
                                />

                                { !! bordersPanel.borderColors.length && ! attributes.borderColor && (
                                    <div className="enokh-blocks-border-colors">
                                        { bordersPanel.borderColors.map( ( borderColor, index ) => {
                                            return (
                                                <ColorPickerControl
                                                    key={ 'border' + index }
                                                    tooltip={ borderColor?.tooltip }
                                                    value={
                                                        attributes.borders[
                                                            borderArea + 'Color' + borderColor.state + borderDevice
                                                        ] || ''
                                                    }
                                                    alpha={ borderColor.alpha || false }
                                                    onChange={ ( nextBackgroundColor ) => {
                                                        const newAttributes = {
                                                            [ borderArea + 'Color' + borderColor.state + borderDevice ]:
                                                                nextBackgroundColor,
                                                        };

                                                        if ( sync ) {
                                                            newAttributes[
                                                                'borderRightColor' + borderColor.state + borderDevice
                                                            ] = nextBackgroundColor;
                                                            newAttributes[
                                                                'borderBottomColor' + borderColor.state + borderDevice
                                                            ] = nextBackgroundColor;
                                                            newAttributes[
                                                                'borderLeftColor' + borderColor.state + borderDevice
                                                            ] = nextBackgroundColor;
                                                        }

                                                        setAttributes( {
                                                            borders: {
                                                                ...newAttributes,
                                                            },
                                                        } );
                                                    } }
                                                />
                                            );
                                        } ) }
                                    </div>
                                ) }
                            </FlexControl>
                        );
                    } ) }
                </BaseControl>
            ) }

            { bordersPanel.borderRadius && [ 'fraction', 'element' ].includes( variant ) && (
                <DimensionsControl
                    label={ __( 'Border Radius', 'enokh-blocks' ) }
                    attributeNames={ borderRadiusAttributes }
                    values={ deviceAttributes.borders }
                    placeholders={ borderRadiusAttributes.reduce(
                        ( o, key ) => ( {
                            ...o,
                            [ key ]: getResponsivePlaceholder( key, attributes.borders, deviceType, '' ),
                        } ),
                        {}
                    ) }
                    onChange={ ( values ) => setDeviceAttributes( values, 'borders' ) }
                />
            ) }
        </CustomPanel>
    );
}
