import React from 'react';
import { BlockControlsProps } from '../types';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { __ } from '@wordpress/i18n';
import WidthControl from '@enokh-blocks/components/InspectorControls/SizingControls/components/WidthControl';
import { getResponsivePlaceholder } from '@enokh-blocks/utils';
import HeightControl from '@enokh-blocks/components/InspectorControls/SizingControls/components/HeightControl';
import ColorPickerControl from '@enokh-blocks/components/ColorPickerControl';
import UnitControl from '@enokh-blocks/components/UnitControl';

const ElementControls: React.FunctionComponent< BlockControlsProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { id, deviceType } = useContext( BlockContext );
    const { element } = attributes;
    const deviceKey = deviceType === 'Desktop' ? '' : deviceType;

    const colorItems = [
        {
            state: '',
            tooltip: __( 'Background', 'enokh-blocks' ),
            alpha: true,
        },
        {
            state: 'Hover',
            tooltip: __( 'Background Hover', 'enokh-blocks' ),
            alpha: true,
        },
        {
            state: 'Current',
            tooltip: __( 'Background Current', 'enokh-blocks' ),
            alpha: true,
        },
    ];

    return (
        <CustomPanel id={ `${ id }ElementControls` } title={ __( 'Element', 'enokh-blocks' ) } initialOpen={ false }>
            <div className="enokh-blocks-sizing-fields">
                <WidthControl
                    value={ element[ `width${ deviceKey }` ] || '' }
                    placeholder={ getResponsivePlaceholder( 'width', element, deviceType ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            element: {
                                [ `width${ deviceKey }` ]: value,
                            },
                        } );
                    } }
                />

                <HeightControl
                    value={ element[ `height${ deviceKey }` ] || '' }
                    placeholder={ getResponsivePlaceholder( 'height', element, deviceType ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            element: {
                                [ `height${ deviceKey }` ]: value,
                            },
                        } );
                    } }
                />

                <UnitControl
                    label={ __( 'Current Width', 'enokh-blocks' ) }
                    id="enokh-blocks-carousel-nav-current-width"
                    value={ element[ `widthCurrent${ deviceKey }` ] || '' }
                    placeholder={ getResponsivePlaceholder( 'widthCurrent', element, deviceType ) }
                    onChange={ ( value ) =>
                        setAttributes( {
                            element: {
                                [ `widthCurrent${ deviceKey }` ]: value,
                            },
                        } )
                    }
                />

                <UnitControl
                    label={ __( 'Current Height', 'enokh-blocks' ) }
                    id="enokh-blocks-carousel-nav-current-height"
                    value={ element[ `heightCurrent${ deviceKey }` ] || '' }
                    placeholder={ getResponsivePlaceholder( 'heightCurrent', element, deviceType ) }
                    onChange={ ( value ) =>
                        setAttributes( {
                            element: {
                                [ `heightCurrent${ deviceKey }` ]: value,
                            },
                        } )
                    }
                />
            </div>

            <div className="enokh-blocks-color-group">
                <div className="enokh-blocks-color-group__row">
                    <span className="enokh-blocks-color-group__row-label">
                        { __( 'Background Color', 'enokh-blocks' ) }
                    </span>
                    { colorItems.map( ( color, colorIndex ) => {
                        const attrName = `background${ color.state }${ deviceKey }`;
                        return (
                            <ColorPickerControl
                                key={ colorIndex }
                                tooltip={ color?.tooltip }
                                value={ element[ attrName ] || '' }
                                alpha={ color.alpha || false }
                                valueOpacity={ element[ attrName + 'Opacity' ] || '' }
                                onChange={ ( nextBackgroundColor ) =>
                                    setAttributes( {
                                        element: {
                                            [ attrName ]: nextBackgroundColor,
                                        },
                                    } )
                                }
                                onOpacityChange={ ( value ) =>
                                    setAttributes( {
                                        element: {
                                            [ attrName + 'Opacity' ]: value,
                                        },
                                    } )
                                }
                            />
                        );
                    } ) }
                </div>
            </div>
        </CustomPanel>
    );
};

export default ElementControls;
