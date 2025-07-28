import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import UnitControl from '@enokh-blocks/components/UnitControl';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';

const PanelSettingsControls: React.FunctionComponent< TabPanelProps > = ( props ) => {
    const {
        attributes: { templateLock, panel },
        setAttributes,
    } = props;
    const { deviceType } = useContext( BlockContext );

    const onSetAttribute = ( object: any ): any => {
        setAttributes( {
            panel: object,
        } );
    };

    const {
        verticalAlignment,
        horizontalAlignment,
        verticalAlignmentTablet,
        horizontalAlignmentTablet,
        verticalAlignmentMobile,
        horizontalAlignmentMobile,
    } = panel;

    return (
        <>
            <PanelBody title={ __( 'Settings', 'enokh-blocks' ) }>
                <UnitControl
                    label={ __( 'Space Between', 'enokh-blocks' ) }
                    id="enokh-blocks-tab-panel-space-between"
                    value={ getAttribute( 'spacingBetween', props ) }
                    placeholder={ getResponsivePlaceholder( 'spacingBetween', panel, deviceType ) }
                    onChange={ ( value ) =>
                        onSetAttribute( {
                            [ getAttribute( 'spacingBetween', props, true ) ]: value,
                        } )
                    }
                />

                { deviceType === 'Desktop' && (
                    <>
                        <SelectControl
                            label={ __( 'Vertical Alignment', 'enokh-blocks' ) }
                            value={ verticalAlignment }
                            options={ [
                                { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                { label: __( 'Top', 'enokh-blocks' ), value: 'flex-start' },
                                { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                { label: __( 'Bottom', 'enokh-blocks' ), value: 'flex-end' },
                            ] }
                            onChange={ ( value ) => {
                                onSetAttribute( {
                                    verticalAlignment: value,
                                } );
                            } }
                        />

                        <SelectControl
                            label={ __( 'Horizontal Alignment', 'enokh-blocks' ) }
                            value={ horizontalAlignment }
                            options={ [
                                { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                { label: __( 'Left', 'enokh-blocks' ), value: 'flex-start' },
                                { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                { label: __( 'Right', 'enokh-blocks' ), value: 'flex-end' },
                            ] }
                            onChange={ ( value ) => {
                                onSetAttribute( {
                                    horizontalAlignment: value,
                                } );
                            } }
                        />
                    </>
                ) }

                { deviceType === 'Tablet' && (
                    <>
                        <SelectControl
                            label={ __( 'Vertical Alignment', 'enokh-blocks' ) }
                            value={ verticalAlignmentTablet }
                            options={ [
                                { label: __( 'Inherit', 'enokh-blocks' ), value: 'inherit' },
                                { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                { label: __( 'Top', 'enokh-blocks' ), value: 'flex-start' },
                                { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                { label: __( 'Bottom', 'enokh-blocks' ), value: 'flex-end' },
                            ] }
                            onChange={ ( value ) => {
                                onSetAttribute( {
                                    verticalAlignmentTablet: value,
                                } );
                            } }
                        />

                        <SelectControl
                            label={ __( 'Horizontal Alignment', 'enokh-blocks' ) }
                            value={ horizontalAlignmentTablet }
                            options={ [
                                { label: __( 'Inherit', 'enokh-blocks' ), value: 'inherit' },
                                { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                { label: __( 'Left', 'enokh-blocks' ), value: 'flex-start' },
                                { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                { label: __( 'Right', 'enokh-blocks' ), value: 'flex-end' },
                            ] }
                            onChange={ ( value ) => {
                                onSetAttribute( {
                                    horizontalAlignmentTablet: value,
                                } );
                            } }
                        />
                    </>
                ) }

                { deviceType === 'Mobile' && (
                    <>
                        <SelectControl
                            label={ __( 'Vertical Alignment', 'enokh-blocks' ) }
                            value={ verticalAlignmentMobile }
                            options={ [
                                { label: __( 'Inherit', 'enokh-blocks' ), value: 'inherit' },
                                { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                { label: __( 'Top', 'enokh-blocks' ), value: 'flex-start' },
                                { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                { label: __( 'Bottom', 'enokh-blocks' ), value: 'flex-end' },
                            ] }
                            onChange={ ( value ) => {
                                onSetAttribute( {
                                    verticalAlignmentMobile: value,
                                } );
                            } }
                        />

                        <SelectControl
                            label={ __( 'Horizontal Alignment', 'enokh-blocks' ) }
                            value={ horizontalAlignmentMobile }
                            options={ [
                                { label: __( 'Inherit', 'enokh-blocks' ), value: 'inherit' },
                                { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                { label: __( 'Left', 'enokh-blocks' ), value: 'flex-start' },
                                { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                { label: __( 'Right', 'enokh-blocks' ), value: 'flex-end' },
                            ] }
                            onChange={ ( value ) => {
                                onSetAttribute( {
                                    horizontalAlignmentMobile: value,
                                } );
                            } }
                        />
                    </>
                ) }
            </PanelBody>
            <BorderControls attributes={ panel as ContainerBlockAttributes } setAttributes={ onSetAttribute } />
        </>
    );
};

export default PanelSettingsControls;
