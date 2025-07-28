import { SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import withDeviceType from '../../../hoc/withDeviceType';
import { getAttribute, isFlexItem, getResponsivePlaceholder } from '../../../utils';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { displayOptions, overflowOptions, positionOptions, stickyOnScrollOptions } from './options';
import FlexDirectionControls from './components/FlexDirectionControls';
import LayoutControl from './components/LayoutControl';
import FlexControl from '../../FlexControl';
import UnitControl from '../../UnitControl';
import ZIndexControl from './components/ZIndexControl';
import FlexChildControls from '../FlexChildControls';
import AbsoluteTopControl from './components/AbsoluteTopControl';
import AbsoluteBottomControl from './components/AbsoluteBottomControl';
import AbsoluteLeftControl from './components/AbsoluteLeftControl';
import AbsoluteRightControl from './components/AbsoluteRightControl';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import {FunctionComponent, JSX} from "react";

const LayoutControls = ( props: LayoutControlsProps ): JSX.Element => {
    const { attributes, setAttributes } = props;
    const {
        id,
        deviceType,
        supports: { layout, flexChildPanel },
    } = useContext( BlockContext );
    const displayAttrName = props.displayAttrPrefix ?? 'display';
    const displayTabletAttrName = `${ displayAttrName }Tablet`;
    const displayMobileAttrName = `${ displayAttrName }Mobile`;

    const { zindex, includeAdminBar } = attributes;
    const useInnerContainer = 'useInnerContainer' in attributes ? attributes.useInnerContainer : false;
    const isGrid = 'isGrid' in attributes ? attributes.isGrid : false;
    const innerZindex = 'innerZindex' in attributes ? attributes.innerZindex : 1;
    const align = 'align' in attributes ? attributes.align : '';
    const directionValue =
        getAttribute( 'flexDirection', props ) ||
        getResponsivePlaceholder( 'flexDirection', attributes, deviceType, 'row' );


    return (
        <CustomPanel id={ `${ id }LayoutControls` } title={ __( 'Layout', 'enokh-blocks' ) } initialOpen={ false }>
            { layout.display && ! useInnerContainer && (
                <SelectControl
                    label={ __( 'Display', 'enokh-blocks' ) }
                    value={ getAttribute( displayAttrName, props ) }
                    options={ displayOptions }
                    onChange={ ( value: string ) =>
                        setAttributes( {
                            [ getAttribute( displayAttrName, props, true ) ]: value,
                        } )
                    }
                />
            ) }

            { isFlexItem( {
                deviceType,
                display: getAttribute( displayAttrName, props ) ?? '',
                displayTablet: getAttribute( displayTabletAttrName, props ) ?? '',
                displayMobile: getAttribute( displayMobileAttrName, props ) ?? '',
            } ) &&
                ! useInnerContainer && (
                    <>
                        { layout.flexDirection && (
                            <FlexDirectionControls
                                value={ getAttribute( 'flexDirection', props ) }
                                onChange={ ( value ) => {
                                    const currentDirection = getAttribute( 'flexDirection', props );
                                    value = currentDirection.includes( 'reverse' ) ? value + '-reverse' : value;

                                    setAttributes( {
                                        [ getAttribute( 'flexDirection', props, true ) ]:
                                            value !== getAttribute( 'flexDirection', props ) ? value : '',
                                    } );
                                } }
                                onReverse={ ( value ) => {
                                    if ( '' === value ) {
                                        value = 'row';
                                    }

                                    value = value.includes( 'reverse' )
                                        ? value.replace( '-reverse', '' )
                                        : value + '-reverse';

                                    setAttributes( {
                                        [ getAttribute( 'flexDirection', props, true ) ]: value,
                                    } );
                                } }
                                label={ __( 'Direction', 'enokh-blocks' ) }
                                directionValue={ directionValue }
                                fallback={ getResponsivePlaceholder( 'flexDirection', attributes, deviceType, 'row' ) }
                            />
                        ) }

                        { layout.alignItems && (
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
                            />
                        ) }

                        { layout.justifyContent && (
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
                            />
                        ) }

                        { layout.flexWrap && (
                            <LayoutControl
                                value={ getAttribute( 'flexWrap', props ) }
                                onChange={ ( value ) =>
                                    setAttributes( {
                                        [ getAttribute( 'flexWrap', props, true ) ]:
                                            value !== getAttribute( 'flexWrap', props ) ? value : '',
                                    } )
                                }
                                label={ __( 'Wrap', 'enokh-blocks' ) }
                                attributeName="flexWrap"
                                directionValue={ directionValue }
                                fallback={ getResponsivePlaceholder( 'flexWrap', attributes, deviceType, '' ) }
                            />
                        ) }

                        { ( layout.columnGap || layout.rowGap ) && (
                            <FlexControl>
                                { layout.columnGap && (
                                    <UnitControl
                                        label={ __( 'Column Gap', 'enokh-blocks' ) }
                                        id="enokh-blocks-column-gap"
                                        value={ getAttribute( 'columnGap', props ) }
                                        placeholder={ getResponsivePlaceholder( 'columnGap', attributes, deviceType ) }
                                        onChange={ ( value ) =>
                                            setAttributes( {
                                                [ getAttribute( 'columnGap', props, true ) ]: value,
                                            } )
                                        }
                                    />
                                ) }

                                { layout.rowGap && (
                                    <UnitControl
                                        label={ __( 'Row Gap', 'enokh-blocks' ) }
                                        id="enokh-blocks-row-gap"
                                        value={ getAttribute( 'rowGap', props ) }
                                        placeholder={ getResponsivePlaceholder( 'rowGap', attributes, deviceType ) }
                                        onChange={ ( value ) =>
                                            setAttributes( {
                                                [ getAttribute( 'rowGap', props, true ) ]: value,
                                            } )
                                        }
                                    />
                                ) }
                            </FlexControl>
                        ) }
                    </>
                ) }

            { ! useInnerContainer && (
                <>
                    { layout.position && (
                        <>
                            <SelectControl
                                label={ __( 'Position', 'enokh-blocks' ) }
                                value={ getAttribute( 'position', props ) }
                                // @ts-ignore
                                options={ positionOptions }
                                onChange={ ( value ) =>
                                    setAttributes( {
                                        [ getAttribute( 'position', props, true ) ]: value,
                                    } )
                                }
                            />
                            { [ 'absolute', 'fixed' ].includes( getAttribute( 'position', props ) ) && (
                                <div className="enokh-blocks-sizing-fields">
                                    <AbsoluteTopControl
                                        value={ getAttribute( 'absoluteTop', props ) }
                                        placeholder={ getResponsivePlaceholder(
                                            'absoluteTop',
                                            attributes,
                                            deviceType
                                        ) }
                                        onChange={ ( value ) =>
                                            setAttributes( {
                                                [ getAttribute( 'absoluteTop', props, true ) ]: value,
                                            } )
                                        }
                                    />

                                    <AbsoluteBottomControl
                                        value={ getAttribute( 'absoluteBottom', props ) }
                                        placeholder={ getResponsivePlaceholder(
                                            'absoluteBottom',
                                            attributes,
                                            deviceType
                                        ) }
                                        onChange={ ( value ) =>
                                            setAttributes( {
                                                [ getAttribute( 'absoluteBottom', props, true ) ]: value,
                                            } )
                                        }
                                    />

                                    <AbsoluteLeftControl
                                        value={ getAttribute( 'absoluteLeft', props ) }
                                        placeholder={ getResponsivePlaceholder(
                                            'absoluteLeft',
                                            attributes,
                                            deviceType
                                        ) }
                                        onChange={ ( value ) =>
                                            setAttributes( {
                                                [ getAttribute( 'absoluteLeft', props, true ) ]: value,
                                            } )
                                        }
                                    />

                                    <AbsoluteRightControl
                                        value={ getAttribute( 'absoluteRight', props ) }
                                        placeholder={ getResponsivePlaceholder(
                                            'absoluteRight',
                                            attributes,
                                            deviceType
                                        ) }
                                        onChange={ ( value ) =>
                                            setAttributes( {
                                                [ getAttribute( 'absoluteRight', props, true ) ]: value,
                                            } )
                                        }
                                    />
                                </div>
                            ) }

                            { getAttribute( 'position', props ) === 'sticky' && (
                                <>
                                    { deviceType === 'Desktop' && (
                                        <ToggleControl
                                            label={ __( 'Include Admin bar', 'enokh-blocks' ) }
                                            help={ __( 'Include Admin bar height to sticky top value', 'enokh-blocks' ) }
                                            checked={ includeAdminBar }
                                            onChange={ ( value ) => {
                                                setAttributes( {
                                                    includeAdminBar: ! includeAdminBar,
                                                } );
                                            } }
                                        />
                                    ) }

                                    <SelectControl
                                        label={ __( 'Sticky on scroll', 'enokh-blocks' ) }
                                        help={ __(
                                            'Which scrolling actions should trigger the stickiness',
                                            'enokh-blocks'
                                        ) }
                                        options={ stickyOnScrollOptions }
                                        value={ getAttribute( 'stickyOnScroll', props ) }
                                        onChange={ ( value ) => {
                                            setAttributes( {
                                                [ getAttribute( 'stickyOnScroll', props, true ) ]: value,
                                            } );
                                        } }
                                    />

                                    <div className="enokh-blocks-sizing-fields">
                                        <AbsoluteTopControl
                                            value={ getAttribute( 'stickyTop', props ) }
                                            placeholder={ getResponsivePlaceholder(
                                                'stickyTop',
                                                attributes,
                                                deviceType
                                            ) }
                                            onChange={ ( value ) =>
                                                setAttributes( {
                                                    [ getAttribute( 'stickyTop', props, true ) ]: value,
                                                } )
                                            }
                                        />

                                        <AbsoluteBottomControl
                                            value={ getAttribute( 'stickyBottom', props ) }
                                            placeholder={ getResponsivePlaceholder(
                                                'stickyBottom',
                                                attributes,
                                                deviceType
                                            ) }
                                            onChange={ ( value ) =>
                                                setAttributes( {
                                                    [ getAttribute( 'stickyBottom', props, true ) ]: value,
                                                } )
                                            }
                                        />
                                    </div>
                                </>
                            ) }
                        </>
                    ) }

                    { layout.overflow && (
                        <FlexControl>
                            <SelectControl
                                label={ __( 'Overflow-x', 'enokh-blocks' ) }
                                value={ getAttribute( 'overflowX', props ) }
                                options={ overflowOptions }
                                onChange={ ( value ) =>
                                    setAttributes( {
                                        [ getAttribute( 'overflowX', props, true ) ]: value,
                                    } )
                                }
                            />

                            <SelectControl
                                label={ __( 'Overflow-y', 'enokh-blocks' ) }
                                value={ getAttribute( 'overflowY', props ) }
                                options={ overflowOptions }
                                onChange={ ( value ) =>
                                    setAttributes( {
                                        [ getAttribute( 'overflowY', props, true ) ]: value,
                                    } )
                                }
                            />
                        </FlexControl>
                    ) }
                </>
            ) }

            { layout.zIndex && (
                <>
                    { !! useInnerContainer && 'Desktop' === deviceType && (
                        <>
                            <ZIndexControl
                                label={ __( 'Outer z-index', 'enokh-blocks' ) }
                                value={ zindex }
                                onChange={ ( value ) => setAttributes( { zindex: value } ) }
                            />

                            <ZIndexControl
                                label={ __( 'Inner z-index', 'enokh-blocks' ) }
                                value={ innerZindex }
                                onChange={ ( value ) => setAttributes( { innerZindex: value } ) }
                            />
                        </>
                    ) }

                    { ! useInnerContainer && (
                        <ZIndexControl
                            label={ __( 'z-index', 'enokh-blocks' ) }
                            value={ getAttribute( 'zindex', props ) }
                            placeholder={ getResponsivePlaceholder( 'zindex', attributes, deviceType ) }
                            onChange={ ( value ) =>
                                setAttributes( {
                                    [ getAttribute( 'zindex', props, true ) ]: value,
                                    [ getAttribute( 'position', props, true ) ]: ! getAttribute( 'position', props )
                                        ? 'relative'
                                        : getAttribute( 'position', props ),
                                } )
                            }
                        />
                    ) }
                </>
            ) }

            { flexChildPanel.enabled && (
                <FlexChildControls attributes={ attributes } setAttributes={ setAttributes } />
            ) }
        </CustomPanel>
    );
};

export default compose( withDeviceType )( LayoutControls ) as React.ComponentType<any>;
