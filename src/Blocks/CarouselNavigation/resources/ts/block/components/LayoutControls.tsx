import React from 'react';
import { BlockControlsProps } from '../types';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { __ } from '@wordpress/i18n';
import { alignItemsOptions, justifyContentOptions, orientationOptions } from '../config';
import LayoutControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/LayoutControl';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import { SelectControl, ToggleControl } from '@wordpress/components';
import UnitControl from '@enokh-blocks/components/UnitControl';
import { compose } from '@wordpress/compose';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import AbsoluteTopControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/AbsoluteTopControl';
import AbsoluteBottomControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/AbsoluteBottomControl';
import AbsoluteLeftControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/AbsoluteLeftControl';
import AbsoluteRightControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/AbsoluteRightControl';

const LayoutControls: React.FunctionComponent< BlockControlsProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { id, deviceType } = useContext( BlockContext );
    const { orientation, advancedPosition, enableAdvancedPosition, variant } = attributes;
    let directionValue =
        getAttribute( 'orientation', props ) ||
        getResponsivePlaceholder( 'orientation', attributes, deviceType, 'horizontal' );
    directionValue = directionValue === 'horizontal' ? 'row' : 'column';

    return (
        <CustomPanel id={ `${ id }LayoutControls` } title={ __( 'Layout', 'enokh-blocks' ) } initialOpen={ false }>
            <SelectControl
                label={ __( 'orientation', 'enokh-blocks' ) }
                value={ orientation }
                options={ orientationOptions }
                onChange={ ( value: string ) =>
                    setAttributes( {
                        orientation: value,
                    } )
                }
            />
            <ToggleControl
                label={ __( 'Advanced Position', 'enokh-blocks' ) }
                checked={ !! enableAdvancedPosition }
                onChange={ ( value ) => {
                    setAttributes( {
                        enableAdvancedPosition: value,
                    } );
                } }
            />

            { !! enableAdvancedPosition && (
                <div className="enokh-blocks-sizing-fields">
                    <AbsoluteTopControl
                        value={ getAttribute( 'absoluteTop', { attributes: advancedPosition, deviceType } ) || '' }
                        placeholder={ getResponsivePlaceholder( 'absoluteTop', advancedPosition, deviceType ) }
                        onChange={ ( value ) =>
                            setAttributes( {
                                advancedPosition: {
                                    [ getAttribute(
                                        'absoluteTop',
                                        { attributes: advancedPosition, deviceType },
                                        true
                                    ) ]: value,
                                },
                            } )
                        }
                    />

                    <AbsoluteBottomControl
                        value={ getAttribute( 'absoluteBottom', { attributes: advancedPosition, deviceType } ) || '' }
                        placeholder={ getResponsivePlaceholder( 'absoluteBottom', advancedPosition, deviceType ) }
                        onChange={ ( value ) =>
                            setAttributes( {
                                advancedPosition: {
                                    [ getAttribute(
                                        'absoluteBottom',
                                        {
                                            attributes: advancedPosition,
                                            deviceType,
                                        },
                                        true
                                    ) ]: value,
                                },
                            } )
                        }
                    />

                    <AbsoluteLeftControl
                        value={ getAttribute( 'absoluteLeft', { attributes: advancedPosition, deviceType } ) || '' }
                        placeholder={ getResponsivePlaceholder( 'absoluteLeft', advancedPosition, deviceType ) }
                        onChange={ ( value ) =>
                            setAttributes( {
                                advancedPosition: {
                                    [ getAttribute(
                                        'absoluteLeft',
                                        {
                                            attributes: advancedPosition,
                                            deviceType,
                                        },
                                        true
                                    ) ]: value,
                                },
                            } )
                        }
                    />

                    <AbsoluteRightControl
                        value={ getAttribute( 'absoluteRight', { attributes: advancedPosition, deviceType } ) || '' }
                        placeholder={ getResponsivePlaceholder( 'absoluteRight', advancedPosition, deviceType ) }
                        onChange={ ( value ) =>
                            setAttributes( {
                                advancedPosition: {
                                    [ getAttribute(
                                        'absoluteRight',
                                        {
                                            attributes: advancedPosition,
                                            deviceType,
                                        },
                                        true
                                    ) ]: value,
                                },
                            } )
                        }
                    />
                </div>
            ) }

            { ! enableAdvancedPosition && (
                <>
                    <LayoutControl
                        value={ getAttribute( 'alignItems', props ) }
                        onChange={ ( value ) =>
                            setAttributes( {
                                [ getAttribute( 'alignItems', props, true ) ]:
                                    value !== getAttribute( 'alignItems', props ) ? value : '',
                            } )
                        }
                        label={ __( 'Align Items', 'enokh-blocks' ) }
                        attributeName="alignItems"
                        directionValue={ directionValue }
                        fallback={ getResponsivePlaceholder( 'alignItems', attributes, deviceType, '' ) }
                        options={ alignItemsOptions }
                    />

                    <LayoutControl
                        value={ getAttribute( 'justifyContent', props ) }
                        onChange={ ( value ) =>
                            setAttributes( {
                                [ getAttribute( 'justifyContent', props, true ) ]:
                                    value !== getAttribute( 'justifyContent', props ) ? value : '',
                            } )
                        }
                        label={ __( 'Justify Content', 'enokh-blocks' ) }
                        attributeName="justifyContent"
                        directionValue={ directionValue }
                        fallback={ getResponsivePlaceholder( 'justifyContent', attributes, deviceType, '' ) }
                        options={ justifyContentOptions }
                    />
                </>
            ) }

            { [ 'shape', 'element' ].includes( variant ) && (
                <LayoutControl
                    value={ getAttribute( 'innerAlignItems', props ) }
                    onChange={ ( value ) =>
                        setAttributes( {
                            [ getAttribute( 'innerAlignItems', props, true ) ]:
                                value !== getAttribute( 'innerAlignItems', props ) ? value : '',
                        } )
                    }
                    label={ __( 'Inner Align Items', 'enokh-blocks' ) }
                    attributeName="innerAlignItems"
                    directionValue={ directionValue }
                    fallback={ getResponsivePlaceholder( 'innerAlignItems', attributes, deviceType, '' ) }
                    options={ alignItemsOptions }
                />
            ) }

            <UnitControl
                label={ __( 'Gap', 'enokh-blocks' ) }
                id="enokh-blocks-carousel-nav-gap"
                value={ getAttribute( 'gap', props ) }
                placeholder={ getResponsivePlaceholder( 'gap', attributes, deviceType ) }
                onChange={ ( value ) =>
                    setAttributes( {
                        [ getAttribute( 'gap', props, true ) ]: value,
                    } )
                }
            />
        </CustomPanel>
    );
};

export default compose( withDeviceType )( LayoutControls ) as React.FunctionComponent<any> ;
