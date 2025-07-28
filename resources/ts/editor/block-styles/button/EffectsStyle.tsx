import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { sprintf } from '@wordpress/i18n';
import { getEffectSelector, addToCSS, hexToRGBA, buildCSS } from '../../../utils';

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

const ButtonEffectsStyle = ( props: ButtonBlockProps ): JSX.Element => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId, useTextShadow, textShadows, useTypography, typographyEffects } = attributes;

    const selector = `.editor-styles-wrapper .enokh-blocks-button-${ uniqueId }`;
    const containerSelector = `.enokh-blocks-button-${ uniqueId }`;
    const styles = [];
    styles[ selector ] = [];
    styles[ containerSelector ] = [];

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

    if ( useTypography && typographyEffects && typographyEffects.length > 0 ) {
        const typographyData = {};

        Object.keys( typographyEffects ).forEach( function ( key ) {
            const selectorData: any = getEffectSelector( typographyEffects, attributes, selector, parseInt( key ) );

            if ( typeof typographyData[ selectorData.element ] === 'undefined' ) {
                typographyData[ selectorData.element ] = {
                    selector: selectorData.effectSelector,
                    state: typographyEffects[ key ].state,
                    device: typographyEffects[ key ].device,
                    ...( !! typographyEffects[ key ].fontWeight && {
                        fontWeight: typographyEffects[ key ].fontWeight,
                    } ),
                    ...( !! typographyEffects[ key ].textTransform && {
                        textTransform: typographyEffects[ key ].textTransform,
                    } ),
                    ...( !! typographyEffects[ key ].letterSpacing && {
                        letterSpacing: typographyEffects[ key ].letterSpacing,
                    } ),
                };
            }

            Object.keys( typographyData ).forEach( function ( target ) {
                const data = typographyData[ target ];

                if ( ! shouldApplyDeviceStyle( data.device, deviceType ) ) {
                    return;
                }

                if ( typeof data.fontWeight !== 'undefined' ) {
                    addToCSS( styles, data.selector, {
                        'font-weight': data.fontWeight,
                    } );
                }

                if ( typeof data.textTransform !== 'undefined' ) {
                    addToCSS( styles, data.selector, {
                        'text-transform': data.textTransform,
                    } );
                }

                if ( typeof data.letterSpacing !== 'undefined' ) {
                    addToCSS( styles, data.selector, {
                        'letter-spacing': data.letterSpacing,
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

export default ButtonEffectsStyle;
