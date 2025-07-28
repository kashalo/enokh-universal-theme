import { __ } from '@wordpress/i18n';
import { useContext, useState, useEffect } from '@wordpress/element';
import BlockContext from '../../../block-context';
import useDeviceAttributes from '../../../stores/useDeviceAttributes';
import DimensionsControl from '../../DimensionsControl';
import { BaseControl, Tooltip, Button, TabPanel, Dropdown } from '@wordpress/components';
import FlexControl from '../../FlexControl';
import UnitControl from '../../UnitControl';
import StyleDropdownControl from './components/StyleDropdownControl';
import { link, linkOff } from '@wordpress/icons';
import { isEqual, isEmpty } from 'lodash';
import { isNumeric, getResponsivePlaceholder, hexToRGBA } from '../../../utils';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import ColourTabPanel from '@enokh-blocks/components/ColourTabPanel';

export default function BorderControls( props: BorderControlsProps ) {
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
    const [ currentTabName, setCurrentTabName ] = useState( '' );

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
                                            const currentValue =
                                                attributes.borders[
                                                    borderArea + 'Color' + borderColor.state + borderDevice
                                                ] || '';
                                            return (
                                                <>
                                                    <div className="enokh-blocks-color-component squeeze">
                                                        <Dropdown
                                                            className="enokh-blocks-color-component__toggle"
                                                            contentClassName="enokh-blocks-color-component-content wider"
                                                            popoverProps={ { placement: 'top-start' } }
                                                            renderToggle={ ( { isOpen, onToggle } ) => {
                                                                const button = (
                                                                    <Button
                                                                        className="enokh-blocks-color-component__toggle-button"
                                                                        onClick={ () => {
                                                                            setCurrentTabName( borderColor.state );
                                                                            onToggle();
                                                                        } }
                                                                        aria-expanded={ isOpen }
                                                                    >
                                                                        <span
                                                                            className="enokh-blocks-color-component__toggle-indicator"
                                                                            style={ {
                                                                                background: currentValue
                                                                                    ? hexToRGBA( currentValue, 1 )
                                                                                    : null,
                                                                            } }
                                                                        />
                                                                    </Button>
                                                                );

                                                                return (
                                                                    <>
                                                                        { !! borderColor?.tooltip ? (
                                                                            <Tooltip text={ borderColor?.tooltip }>
                                                                                { button }
                                                                            </Tooltip>
                                                                        ) : (
                                                                            button
                                                                        ) }
                                                                    </>
                                                                );
                                                            } }
                                                            renderContent={ () => (
                                                                <>
                                                                    <ColourTabPanel
                                                                        name={ borderArea }
                                                                        colors={ bordersPanel.borderColors }
                                                                        attributes={ attributes }
                                                                        deviceType={ deviceType }
                                                                        setAttributes={ setAttributes }
                                                                        sync={ sync }
                                                                        currentTabName={ currentTabName }
                                                                    />
                                                                </>
                                                            ) }
                                                        />
                                                    </div>
                                                </>
                                            );
                                        } ) }
                                    </div>
                                ) }
                            </FlexControl>
                        );
                    } ) }
                </BaseControl>
            ) }

            { bordersPanel.borderRadius && (
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
