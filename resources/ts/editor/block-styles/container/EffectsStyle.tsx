import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { sprintf } from '@wordpress/i18n';
import { getEffectSelector, addToCSS, hexToRGBA, buildCSS, getTransformData, hasNumericValue } from '../../../utils';

const addUnit = ( value: any, unit: string ) => {
    if ( ! value && value !== 0 ) {
        return false;
    }

    return value + unit;
};

const shouldApplyDeviceStyle = ( dataDevice: string, currentDevice: string ): boolean => {
    if ( ! dataDevice || dataDevice === 'all' ) {
        return true;
    }
    if ( dataDevice === 'desktop' ) {
        return currentDevice === 'Desktop';
    }
    if ( dataDevice === 'tablet-only' ) {
        return currentDevice === 'Tablet';
    }
    if ( dataDevice === 'tablet' ) {
        return currentDevice === 'Tablet' || currentDevice === 'Mobile';
    }
    if ( dataDevice === 'mobile' ) {
        return currentDevice === 'Mobile';
    }
    return false;
};

const ContainerEffectsStyle = ( props: ContainerBlockProps ): JSX.Element => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const {
        uniqueId,
        useTextShadow,
        useBoxShadow,
        textShadows,
        boxShadows,
        useTransform,
        transformDisableInEditor,
        useOpacity,
        opacities,
        opacityDisableInEditor,
        useTransition,
        transitions,
    } = attributes;

    const selector = `.editor-styles-wrapper .enokh-blocks-container-${ uniqueId }`;
    const containerSelector = `.enokh-blocks-container-${ uniqueId }`;
    const styles = [];
    styles[ selector ] = [];
    styles[ containerSelector ] = [];

    if ( useBoxShadow ) {
        const boxShadowData = {};

        if ( boxShadows ) {
            Object.keys( boxShadows ).forEach( function ( key ) {
                const selectorData: any = getEffectSelector( boxShadows, attributes, selector, parseInt( key ) );

                const boxShadowValue = sprintf(
                    '%1$s %2$s %3$s %4$s %5$s %6$s',
                    boxShadows[ key ].inset ? 'inset' : '',
                    boxShadows[ key ].xOffset ? boxShadows[ key ].xOffset + 'px' : 0,
                    boxShadows[ key ].yOffset ? boxShadows[ key ].yOffset + 'px' : 0,
                    boxShadows[ key ].blur ? boxShadows[ key ].blur + 'px' : 0,
                    boxShadows[ key ].spread ? boxShadows[ key ].spread + 'px' : 0,
                    hexToRGBA( boxShadows[ key ].color, boxShadows[ key ].colorOpacity )
                );

                if ( typeof boxShadowData[ selectorData.element ] === 'undefined' ) {
                    boxShadowData[ selectorData.element ] = {
                        selector: selectorData.effectSelector,
                        boxShadow: boxShadowValue,
                        state: boxShadows[ key ].state,
                        device: boxShadows[ key ].device,
                    };
                }

                Object.keys( boxShadowData ).forEach( function ( target ) {
                    const data = boxShadowData[ target ];

                    if ( ! shouldApplyDeviceStyle( data.device, deviceType ) ) {
                        return;
                    }

                    if ( typeof data.boxShadow !== 'undefined' ) {
                        addToCSS( styles, data.selector, {
                            'box-shadow': data.boxShadow,
                        } );
                    }
                } );
            } );
        }
    }

    if ( useTextShadow ) {
        const textShadowData = {};

        if ( textShadows ) {
            Object.keys( textShadows ).forEach( function ( key ) {
                const selectorData: any = getEffectSelector( textShadows, attributes, selector, parseInt( key ) );

                const textShadowValue = sprintf(
                    '%1$s %2$s %3$s %4$s',
                    hexToRGBA( textShadows[ key ].color, textShadows[ key ].colorOpacity ),
                    textShadows[ key ].xOffset ? textShadows[ key ].xOffset + 'px' : 0,
                    textShadows[ key ].yOffset ? textShadows[ key ].yOffset + 'px' : 0,
                    textShadows[ key ].blur ? textShadows[ key ].blur + 'px' : 0
                );

                if ( typeof textShadowData[ selectorData.element ] === 'undefined' ) {
                    textShadowData[ selectorData.element ] = {
                        selector: selectorData.effectSelector,
                        textShadow: textShadowValue,
                        state: textShadows[ key ].state,
                        device: textShadows[ key ].device,
                    };
                }

                Object.keys( textShadowData ).forEach( function ( target ) {
                    const data = textShadowData[ target ];

                    if ( ! shouldApplyDeviceStyle( data.device, deviceType ) ) {
                        return;
                    }

                    if ( typeof data.textShadow !== 'undefined' ) {
                        addToCSS( styles, data.selector, {
                            'text-shadow': data.textShadow,
                        } );
                    }
                } );
            } );
        }
    }

    if ( useTransform ) {
        const transformData = getTransformData( attributes, selector );

        Object.keys( transformData ).forEach( function ( target ) {
            const data = transformData[ target ];

            if ( ! shouldApplyDeviceStyle( data.device, deviceType ) ) {
                return;
            }

            let transformSelector = data.selector;
            let transformNotSelected = '.wp-block:not(.is-selected):not(.has-child-selected)';

            /**
             * If the current block disable style in editor
             */
            if ( ! transformDisableInEditor ) {
                transformNotSelected = '';
            }

            transformSelector = transformNotSelected + transformSelector;

            if ( typeof data.transforms !== 'undefined' ) {
                addToCSS( styles, transformSelector, {
                    transform: data.transforms.join( ' ' ),
                } );
            }
        } );
    }

    if ( useOpacity && opacities && opacities.length > 0 ) {
        const opacityData = {};

        Object.keys( opacities ).forEach( function ( key ) {
            const selectorData: any = getEffectSelector( opacities, attributes, selector, parseInt( key ) );

            if ( typeof opacityData[ selectorData.element ] === 'undefined' ) {
                opacityData[ selectorData.element ] = {
                    selector: selectorData.effectSelector,
                    opacity: opacities[ key ].opacity,
                    mixBlendMode: opacities[ key ].mixBlendMode,
                    state: opacities[ key ].state,
                    device: opacities[ key ].device,
                };
            }

            Object.keys( opacityData ).forEach( function ( target ) {
                const data = opacityData[ target ];

                if ( ! shouldApplyDeviceStyle( data.device, deviceType ) ) {
                    return;
                }

                let opacitySelector = data.selector;

                let blockNotSelected = '.wp-block:not(.is-selected):not(.has-child-selected)';

                if ( ! opacityDisableInEditor ) {
                    blockNotSelected = '';
                }

                opacitySelector = blockNotSelected + opacitySelector;

                if ( typeof data.opacity !== 'undefined' ) {
                    addToCSS( styles, opacitySelector, {
                        opacity: hasNumericValue( data.opacity ) ? data.opacity : 1,
                    } );
                }
            } );
        } );
    }

    if ( useTransition && transitions && transitions.length > 0 ) {
        const transitionData = {};

        Object.keys( transitions ).forEach( function ( key ) {
            const selectorData: any = getEffectSelector( transitions, attributes, selector, parseInt( key ) );

            if ( typeof transitionData[ selectorData.element ] === 'undefined' ) {
                transitionData[ selectorData.element ] = {
                    selector: selectorData.effectSelector,
                    transitions: [],
                    state: transitions[ key ].state,
                    device: transitions[ key ].device,
                };
            }

            const transitionDelay = hasNumericValue( transitions[ key ].delay ) ? transitions[ key ].delay + 's' : '';
            const transition = `${ transitions[ key ].property } ${ addUnit( transitions[ key ].duration, 's' ) } ${
                transitions[ key ].timingFunction
            } ${ transitionDelay }`;

            transitionData[ selectorData.element ].transitions.push( transition );

            Object.keys( transitionData ).forEach( function ( target ) {
                const data = transitionData[ target ];

                if ( ! shouldApplyDeviceStyle( data.device, deviceType ) ) {
                    return;
                }

                if ( typeof data.transitions !== 'undefined' ) {
                    addToCSS( styles, data.selector, {
                        transition: data.transitions.join( ' ' ),
                    } );
                }
            } );
        } );
    }

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};

export default ContainerEffectsStyle;
