import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { BaseControl, RangeControl, SelectControl } from '@wordpress/components';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { BlockInspectorControlProps } from './types';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import TypographyControls from '@enokh-blocks/components/InspectorControls/TypographyControls';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { __ } from '@wordpress/i18n';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import BulletsControls from './BulletsControls';
import NumericalControls from './NumericalControls';
import { listPositionOptions, listTypeOptions } from './config';
import UnitControl from '@enokh-blocks/components/UnitControl';
import DimensionsControl from '@enokh-blocks/components/DimensionsControl';
import { useDeviceAttributes } from '@enokh-blocks/stores';

const BlockInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes, clientId } = props;
    const { listType, marker, listSpacing } = attributes;
    const { deviceType, id } = useContext( BlockContext );

    const isOrderedList = listType === 'ol';
    const isUnorderedList = listType === 'ul';

    const computedStyles = {
        deviceType,
        attributes: attributes as unknown as ContainerBlockAttributes,
        setAttributes,
        clientId,
    };
    const attrColumn = getAttribute( 'column', { attributes, deviceType }, true );
    const paddingAttributes = [ 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom' ];
    const marginAttributes = [ 'marginTop', 'marginLeft', 'marginRight', 'marginBottom' ];
    const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                <CustomPanel title={ __( 'List Settings' ) } initialOpen={ false } id={ `${ id }ListTypeControls` }>
                    <SelectControl
                        label={ __( 'List Type', 'enokh-blocks' ) }
                        value={ listType }
                        options={ listTypeOptions }
                        onChange={ ( value: string ) =>
                            setAttributes( {
                                listType: value,
                                marker: {
                                    ...marker,
                                    icon: '',
                                    iconGroup: '',
                                },
                            } )
                        }
                    />

                    <SelectControl
                        label={ __( 'List Position', 'enokh-blocks' ) }
                        value={ getAttribute( 'listPosition', { attributes, deviceType } ) }
                        help={ __( 'See https://www.w3schools.com/cssref/pr_list-style-position.php', 'enokh-blocks' ) }
                        options={ listPositionOptions }
                        onChange={ ( value: string ) =>
                            setAttributes( {
                                [ getAttribute( 'listPosition', { attributes, deviceType }, true ) ]: value,
                            } )
                        }
                    />

                    <DimensionsControl
                        label={ __( 'List Item Padding', 'enokh-blocks' ) }
                        attributeNames={ paddingAttributes }
                        values={ deviceAttributes.listSpacing }
                        placeholders={ paddingAttributes.reduce(
                            ( o, key ) => ( {
                                ...o,
                                [ key ]: getResponsivePlaceholder( key, attributes.listSpacing, deviceType, '' ),
                            } ),
                            {}
                        ) }
                        onChange={ ( values ) => setDeviceAttributes( values, 'listSpacing' ) }
                    />

                    <DimensionsControl
                        label={ __( 'List Margin', 'enokh-blocks' ) }
                        attributeNames={ marginAttributes }
                        values={ deviceAttributes.listSpacing }
                        placeholders={ marginAttributes.reduce(
                            ( o, key ) => ( {
                                ...o,
                                [ key ]: getResponsivePlaceholder(
                                    key,
                                    attributes.listSpacing,
                                    deviceType,
                                    computedStyles[ key ]
                                ),
                            } ),
                            {}
                        ) }
                        onChange={ ( values ) => setDeviceAttributes( values, 'listSpacing' ) }
                    />
                </CustomPanel>
                <SpacingControls
                    attributes={ attributes as unknown as ContainerBlockAttributes }
                    setAttributes={ setAttributes }
                    computedStyles={ computedStyles }
                />
                <TypographyControls
                    attributes={ attributes as unknown as ContainerBlockAttributes }
                    setAttributes={ setAttributes }
                    computedStyles={ computedStyles }
                />
                <BorderControls
                    attributes={ attributes as unknown as ContainerBlockAttributes }
                    setAttributes={ setAttributes }
                />
                <ColorControls
                    attributes={ attributes.colors as unknown as ContainerBlockAttributes }
                    setAttributes={ ( value ): any => {
                        setAttributes( {
                            colors: value,
                        } );
                    } }
                />
                { isUnorderedList && <BulletsControls { ...props } /> }
                { isOrderedList && <NumericalControls { ...props } /> }
                <CustomPanel
                    title={ __( 'Columns', 'enokh-blocks' ) }
                    initialOpen={ false }
                    id={ `${ id }ColumnsControls` }
                >
                    <BaseControl>
                        <span className="components-base-control__label">{ __( 'Columns', 'enokh-blocks' ) }</span>
                        <RangeControl
                            value={ attributes[ attrColumn ] ? attributes[ attrColumn ] : null }
                            onChange={ ( value ) => {
                                setAttributes( {
                                    [ attrColumn ]: value,
                                } );
                            } }
                            min={ 0 }
                            max={ 12 }
                            step={ 1 }
                            initialPosition={ 0 }
                        />
                    </BaseControl>

                    <UnitControl
                        label={ __( 'Gap', 'enokh-blocks' ) }
                        id="enokh-blocks-list-column-gap"
                        value={ getAttribute( 'columnGap', { attributes, deviceType } ) }
                        placeholder={ getResponsivePlaceholder( 'columnGap', attributes, deviceType ) }
                        onChange={ ( value ) =>
                            setAttributes( {
                                [ getAttribute( 'columnGap', { attributes, deviceType }, true ) ]: value,
                            } )
                        }
                        units={ [ 'rem' ] }
                        overrideUnits={ true }
                    />
                </CustomPanel>
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
