import { BlockControlsProps } from '../types';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { compose } from '@wordpress/compose';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import UnitControl from '@enokh-blocks/components/UnitControl';
import ColorPickerControl from '@enokh-blocks/components/ColorPickerControl';
import IconSelectControl from '@enokh-blocks/components/IconSelectControl';
import WidthControl from '@enokh-blocks/components/InspectorControls/SizingControls/components/WidthControl';
import HeightControl from '@enokh-blocks/components/InspectorControls/SizingControls/components/HeightControl';

const ShapeControls: React.FunctionComponent< BlockControlsProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { id, deviceType } = useContext( BlockContext );
    const { shape } = attributes;
    const shapeDevice = deviceType === 'Desktop' ? '' : deviceType;
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
    const computedIcons: IconSelectControlAttributes = {
        icon: getAttribute( 'icon', { attributes: shape, deviceType } ),
        iconGroup: getAttribute( 'iconGroup', { attributes: shape, deviceType } ),
    };

    const handleIconSelect = ( icon, iconGroup ) => {
        setAttributes( {
            shape: {
                ...shape,
                [ getAttribute( 'icon', { attributes: shape, deviceType }, true ) ]: icon,
                [ getAttribute( 'iconGroup', { attributes: shape, deviceType }, true ) ]: iconGroup,
            },
        } );
    };

    const handleIconReset = () => {
        setAttributes( {
            shape: {
                ...shape,
                [ getAttribute( 'icon', { attributes: shape, deviceType }, true ) ]: '',
                [ getAttribute( 'iconGroup', { attributes: shape, deviceType }, true ) ]: '',
            },
        } );
    };

    return (
        <CustomPanel id={ `${ id }ShapeControls` } title={ __( 'Shape', 'enokh-blocks' ) } initialOpen={ false }>
            <IconSelectControl attributes={ computedIcons } onclick={ handleIconSelect } onReset={ handleIconReset } />

            <div className="enokh-blocks-sizing-fields">
                <WidthControl
                    value={ shape[ `width${ shapeDevice }` ] || '' }
                    placeholder={ getResponsivePlaceholder( 'width', shape, deviceType ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            shape: {
                                [ `width${ shapeDevice }` ]: value,
                            },
                        } );
                    } }
                />

                <HeightControl
                    value={ shape[ `height${ shapeDevice }` ] || '' }
                    placeholder={ getResponsivePlaceholder( 'height', shape, deviceType ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            shape: {
                                [ `height${ shapeDevice }` ]: value,
                            },
                        } );
                    } }
                />

                <UnitControl
                    label={ __( 'Current Width', 'enokh-blocks' ) }
                    id="enokh-blocks-carousel-nav-current-width"
                    value={ shape[ `widthCurrent${ shapeDevice }` ] || '' }
                    placeholder={ getResponsivePlaceholder( 'widthCurrent', shape, deviceType ) }
                    onChange={ ( value ) =>
                        setAttributes( {
                            shape: {
                                [ `widthCurrent${ shapeDevice }` ]: value,
                            },
                        } )
                    }
                />

                <UnitControl
                    label={ __( 'Current Height', 'enokh-blocks' ) }
                    id="enokh-blocks-carousel-nav-current-height"
                    value={ shape[ `heightCurrent${ shapeDevice }` ] || '' }
                    placeholder={ getResponsivePlaceholder( 'heightCurrent', shape, deviceType ) }
                    onChange={ ( value ) =>
                        setAttributes( {
                            shape: {
                                [ `heightCurrent${ shapeDevice }` ]: value,
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
                        const attrName = `background${ color.state }${ shapeDevice }`;
                        return (
                            <ColorPickerControl
                                key={ colorIndex }
                                tooltip={ color?.tooltip }
                                value={ shape[ attrName ] || '' }
                                alpha={ color.alpha || false }
                                valueOpacity={ shape[ attrName + 'Opacity' ] || '' }
                                onChange={ ( nextBackgroundColor ) =>
                                    setAttributes( {
                                        shape: {
                                            ...shape,
                                            [ attrName ]: nextBackgroundColor,
                                        },
                                    } )
                                }
                                onOpacityChange={ ( value ) =>
                                    setAttributes( {
                                        shape: {
                                            ...shape,
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

export default compose( withDeviceType )( ShapeControls ) as React.FunctionComponent<any> ;
