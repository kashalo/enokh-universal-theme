import React from 'react';
import { PanelBody, Placeholder, SelectControl, ToggleControl } from '@wordpress/components';
import { BlockIcon, InspectorControls, RichText } from '@wordpress/block-editor';
import icon from './icon';
import { __ } from '@wordpress/i18n';
import ListStyles from './components/ListStyles';
import HeadingStyles from './components/HeadingStyles';

const TableOfContentEdit = ( props ) => {
    const { setAttributes } = props;
    const { headingFontSizeClass, headingEnabled } = props.attributes;
    return (
        <>
            { headingEnabled && (
                <RichText
                    tagName={ `h${ props.attributes.headingLevel }` }
                    value={ props.attributes.heading }
                    onChange={ ( value ) => {
                        setAttributes( { heading: value } );
                    } }
                    className={ headingFontSizeClass }
                    placeholder={ __( 'Table Of Content Heading' ) }
                />
            ) }
            <Placeholder
                icon={ <BlockIcon icon={ icon } /> }
                label={ __( 'Table of Contents' ) }
                instructions={ __( 'Start adding text block and mark the block as heading to be rendered here.' ) }
            />
            <InspectorControls>
                <PanelBody title={ 'Block Heading' }>
                    <ToggleControl
                        label={ 'Enable Block Heading' }
                        checked={ headingEnabled }
                        onChange={ ( value ) => {
                            setAttributes( { headingEnabled: value } );
                        } }
                    />
                    { headingEnabled && (
                        <SelectControl
                            label={ __( 'Heading Level' ) }
                            value={ props.attributes.headingLevel }
                            options={ [
                                { label: 'H1', value: 1 },
                                { label: 'H2', value: 2 },
                                { label: 'H3', value: 3 },
                                { label: 'H4', value: 4 },
                                { label: 'H5', value: 5 },
                                { label: 'H6', value: 6 },
                            ] }
                            onChange={ ( value ) => {
                                setAttributes( { headingLevel: value } );
                            } }
                        />
                    ) }
                </PanelBody>
            </InspectorControls>
            <InspectorControls group={ 'styles' }>
                <ListStyles { ...props } />
                { headingEnabled && <HeadingStyles { ...props } /> }
            </InspectorControls>
        </>
    );
};

export default TableOfContentEdit;
