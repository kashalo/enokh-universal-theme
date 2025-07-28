import React from 'react';
import { variantOptions, heightOptions } from '../config';
import { useContext, useEffect } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { __ } from '@wordpress/i18n';
import { SelectControl, ToggleControl } from '@wordpress/components';
import { BlockInspectorControlProps } from '../types';
import { getAttribute, getResponsivePlaceholder, hasNumericValue } from '@enokh-blocks/utils';
import { compose } from '@wordpress/compose';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import MinHeightControl from '@enokh-blocks/components/InspectorControls/SizingControls/components/MinHeightControl';
import { carouselOption, heightOption } from '../enum';
import CustomRangeControl from '@enokh-blocks/components/CustomRangeControl';

const DisplayControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { id, deviceType } = useContext( BlockContext );
    const { variant, speed, loop, autoplay, autoPlayDelay, autoItemsPerSlide } = attributes;
    const computedHeight = getAttribute( 'height', { attributes, deviceType } );
    const steps = variant === carouselOption.Coverflow ? 2 : 1;

    useEffect( () => {
        if ( variant !== carouselOption.Coverflow ) {
            return;
        }

        // Reset default per view for coverflow
        setAttributes( {
            itemPerSlide: 3,
            itemPerSlideTablet: 3,
            itemPerSlideMobile: 3,
        } );
    }, [ variant ] );

    return (
        <CustomPanel id={ `${ id }DisplayControls` } title={ __( 'Display', 'enokh-blocks' ) } initialOpen={ false }>
            <SelectControl
                label={ __( 'Display', 'enokh-blocks' ) }
                // @ts-ignore
                value={ variant }
                options={ variantOptions }
                onChange={ ( value: string ) =>
                    setAttributes( {
                        variant: value,
                    } )
                }
            />
            <SelectControl
                label={ __( 'Height', 'enokh-blocks' ) }
                value={ computedHeight }
                options={ heightOptions }
                onChange={ ( value: string ) =>
                    setAttributes( {
                        [ getAttribute( 'height', { attributes, deviceType }, true ) ]: value,
                    } )
                }
            />

            { computedHeight === heightOption.Fixed && (
                <MinHeightControl
                    value={ getAttribute( 'minHeight', { attributes, deviceType } ) }
                    placeholder={ getResponsivePlaceholder( 'minHeight', attributes, deviceType ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            [ getAttribute( 'minHeight', { attributes, deviceType }, true ) ]: value,
                        } );
                    } }
                />
            ) }

            { deviceType === 'Desktop' && (
                <CustomRangeControl
                    label={ __( 'Speed (ms)', 'enokh-blocks' ) }
                    value={ hasNumericValue( speed ) ? speed : '' }
                    onChange={ ( value ) => {
                        setAttributes( {
                            speed: value,
                        } );
                    } }
                    rangeMin={ 100 }
                    rangeMax={ 1000 }
                    step={ 100 }
                />
            ) }

            { deviceType === 'Desktop' && (
                <>
                    <ToggleControl
                        label={ __( 'Loop', 'enokh-blocks' ) }
                        checked={ !! loop }
                        onChange={ ( value ) => {
                            setAttributes( {
                                loop: value,
                            } );
                        } }
                    />

                    <ToggleControl
                        label={ __( 'Autoplay', 'enokh-blocks' ) }
                        checked={ !! autoplay }
                        onChange={ ( value ) => {
                            setAttributes( {
                                autoplay: value,
                            } );
                        } }
                    />

                    { !! autoplay && (
                        <>
                            <CustomRangeControl
                                label={ __( 'Delay (ms)', 'enokh-blocks' ) }
                                value={ hasNumericValue( autoPlayDelay ) ? autoPlayDelay : '' }
                                onChange={ ( value ) => {
                                    setAttributes( {
                                        autoPlayDelay: value,
                                    } );
                                } }
                                rangeMin={ 500 }
                                rangeMax={ 10000 }
                                step={ 500 }
                            />
                        </>
                    ) }
                </>
            ) }

            { deviceType === 'Desktop' && (
                <ToggleControl
                    label={ __( 'Auto Slides per View', 'enokh-blocks' ) }
                    checked={ !! autoItemsPerSlide }
                    onChange={ ( value ) => {
                        setAttributes( {
                            autoItemsPerSlide: value,
                        } );
                    } }
                    help={ __( 'Toggle this when you have a fixed width carousel item.', 'enokh-blocks' ) }
                />
            ) }

            { ! autoItemsPerSlide && (
                <>
                    <CustomRangeControl
                        label={ __( 'Item per slide', 'enokh-blocks' ) }
                        value={
                            hasNumericValue( getAttribute( 'itemPerSlide', { attributes, deviceType } ) )
                                ? getAttribute( 'itemPerSlide', { attributes, deviceType } )
                                : ''
                        }
                        onChange={ ( value ) => {
                            setAttributes( {
                                [ getAttribute( 'itemPerSlide', { attributes, deviceType }, true ) ]: value,
                            } );
                        } }
                        rangeMin={ 1 }
                        rangeMax={ 10 }
                        step={ steps }
                    />

                    <CustomRangeControl
                        label={ __( 'Slides Per Group', 'enokh-blocks' ) }
                        help={ __(
                            'Set numbers of slides to define and enable group sliding. Useful to use with slidesPerView > 1',
                            'enokh-blocks'
                        ) }
                        value={
                            hasNumericValue( getAttribute( 'slidesPerGroup', { attributes, deviceType } ) )
                                ? getAttribute( 'slidesPerGroup', { attributes, deviceType } )
                                : ''
                        }
                        onChange={ ( value ) => {
                            setAttributes( {
                                [ getAttribute( 'slidesPerGroup', { attributes, deviceType }, true ) ]: value,
                            } );
                        } }
                        rangeMin={ 1 }
                        rangeMax={ 10 }
                        step={ steps }
                    />
                </>
            ) }

            <CustomRangeControl
                label={ __( 'Space Between', 'enokh-blocks' ) }
                value={
                    hasNumericValue( getAttribute( 'spaceBetween', { attributes, deviceType } ) )
                        ? getAttribute( 'spaceBetween', { attributes, deviceType } )
                        : ''
                }
                onChange={ ( value ) => {
                    setAttributes( {
                        [ getAttribute( 'spaceBetween', { attributes, deviceType }, true ) ]: value,
                    } );
                } }
                rangeMin={ 0 }
                rangeMax={ 150 }
                step={ 10 }
            />
        </CustomPanel>
    );
};

export default compose( withDeviceType )( DisplayControls ) as React.FunctionComponent<any>;
