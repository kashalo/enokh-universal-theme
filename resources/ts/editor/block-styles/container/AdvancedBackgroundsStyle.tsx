import { buildCSS, hexToRGBA, shorthandCSS, hasNumericValue, getEffectSelector } from '../../../utils';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';

const ContainerAdvancedBackgroundsStyle = ( props: ContainerBlockProps ): JSX.Element => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId, borders, useAdvancedBackgrounds, advancedBackgrounds, innerZindex } = attributes;

    const selector = `.editor-styles-wrapper .enokh-blocks-container-${ uniqueId }`;
    const styles = [];
    styles[ selector ] = [];
    // Advanced Backgrounds
    const backgroundData = {};
    let hasBeforePseudo = false;
    let hasAfterPseudo = false;
    let innerZIndexValue = innerZindex;

    if ( useAdvancedBackgrounds && advancedBackgrounds.length > 0 ) {
        Object.keys( advancedBackgrounds ).forEach( function ( key ) {
            const selectorData: any = getEffectSelector( advancedBackgrounds, attributes, selector, parseInt( key ) );

            if ( 'gradient' === advancedBackgrounds[ key ].type ) {
                let gradientColorStopOneValue = '',
                    gradientColorStopTwoValue = '';

                const gradientColorOne = hexToRGBA(
                    advancedBackgrounds[ key ].colorOne,
                    advancedBackgrounds[ key ].colorOneOpacity
                );
                const gradientColorTwo = hexToRGBA(
                    advancedBackgrounds[ key ].colorTwo,
                    advancedBackgrounds[ key ].colorTwoOpacity
                );

                if ( gradientColorOne && hasNumericValue( advancedBackgrounds[ key ].stopOne ) ) {
                    gradientColorStopOneValue = ' ' + advancedBackgrounds[ key ].stopOne + '%';
                }

                if ( gradientColorTwo && hasNumericValue( advancedBackgrounds[ key ].stopTwo ) ) {
                    gradientColorStopTwoValue = ' ' + advancedBackgrounds[ key ].stopTwo + '%';
                }

                const gradientValue =
                    'linear-gradient(' +
                    advancedBackgrounds[ key ].direction +
                    'deg, ' +
                    gradientColorOne +
                    gradientColorStopOneValue +
                    ', ' +
                    gradientColorTwo +
                    gradientColorStopTwoValue +
                    ')';

                if ( 'undefined' === typeof backgroundData[ selectorData.element ] ) {
                    backgroundData[ selectorData.element ] = {
                        selector: selectorData.effectSelector,
                        gradient: gradientValue,
                        state: advancedBackgrounds[ key ].state,
                        device: advancedBackgrounds[ key ].device,
                        target: advancedBackgrounds[ key ].target,
                        type: advancedBackgrounds[ key ].type,
                    };
                }
            }

            if ( 'image' === advancedBackgrounds[ key ].type ) {
                if ( 'undefined' === typeof backgroundData[ selectorData.element ] ) {
                    backgroundData[ selectorData.element ] = {
                        selector: selectorData.effectSelector,
                        state: advancedBackgrounds[ key ].state,
                        device: advancedBackgrounds[ key ].device,
                        target: advancedBackgrounds[ key ].target,
                        url: advancedBackgrounds[ key ].url,
                        size: advancedBackgrounds[ key ].size,
                        position: advancedBackgrounds[ key ].position,
                        repeat: advancedBackgrounds[ key ].repeat,
                        attachment: advancedBackgrounds[ key ].attachment,
                        type: advancedBackgrounds[ key ].type,
                    };
                }
            }

            Object.keys( backgroundData ).forEach( function ( target ) {
                const data = backgroundData[ target ];

                if ( 'undefined' === typeof data.device ) {
                    return;
                }

                if ( data.device !== 'all' ) {
                    if ( data.device === 'desktop' && deviceType !== 'Desktop' ) {
                        return;
                    }
                    if ( data.device === 'tablet-only' && deviceType !== 'Tablet' ) {
                        return;
                    }
                    if ( data.device === 'tablet' && deviceType !== 'Tablet' && deviceType !== 'Mobile' ) {
                        return;
                    }

                    if ( data.device === 'mobile' && deviceType !== 'Mobile' ) {
                        return;
                    }
                }
                styles[ data.selector ] = [];
                styles[ '.enokh-blocks-container-' + uniqueId ] = [];

                if ( 'gradient' === data.type ) {
                    if ( 'pseudo-element' === data.target && ! hasAfterPseudo ) {
                        styles[ data.selector ].push( {
                            content: '""',
                            'z-index': '0',
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            bottom: '0',
                            left: '0',
                        } );

                        styles[ '.enokh-blocks-container-' + uniqueId ].push( {
                            position: 'relative',
                            overflow: 'hidden',
                        } );

                        hasAfterPseudo = true;
                    }

                    styles[ data.selector ].push( {
                        'background-image': data.gradient,
                    } );
                }

                if ( 'image' === data.type ) {
                    const imageURL = data.url;

                    if ( 'pseudo-element' === data.target ) {
                        if ( ! hasBeforePseudo ) {
                            styles[ data.selector ].push( {
                                content: '""',
                                'z-index': '0',
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                bottom: '0',
                                left: '0',
                            } );

                            if ( 'undefined' === typeof data.device || 'desktop' === data.device ) {
                                styles[ data.selector ].push( {
                                    'border-radius': shorthandCSS(
                                        borders.borderRadiusTopLeft,
                                        borders.borderRadiusTopRight,
                                        borders.borderRadiusBottomRight,
                                        borders.borderRadiusBottomLeft,
                                        borders.borderRadiusUnit
                                    ),
                                } );
                            } else if ( 'tablet' === data.device ) {
                                styles[ data.selector ].push( {
                                    'border-top-left-radius': `${ borders.borderRadiusTopLeftTablet }${ borders.borderRadiusUnit }`,
                                    'border-top-right-radius': `${ borders.borderRadiusTopRightTablet }${ borders.borderRadiusUnit }`,
                                    'border-bottom-right-radius': `${ borders.borderRadiusBottomRightTablet }${ borders.borderRadiusUnit }`,
                                    'border-bottom-left-radius': `${ borders.borderRadiusBottomLeftTablet }${ borders.borderRadiusUnit }`,
                                } );
                            } else if ( 'mobile' === data.device ) {
                                styles[ data.selector ].push( {
                                    'border-top-left-radius': `${ borders.borderRadiusTopLeftMobile }${ borders.borderRadiusUnit }`,
                                    'border-top-right-radius': `${ borders.borderRadiusTopRightMobile }${ borders.borderRadiusUnit }`,
                                    'border-bottom-right-radius': `${ borders.borderRadiusBottomRightMobile }${ borders.borderRadiusUnit }`,
                                    'border-bottom-left-radius': `${ borders.borderRadiusBottomLeftMobile }${ borders.borderRadiusUnit }`,
                                } );
                            }

                            hasBeforePseudo = true;

                            if ( 'undefined' === typeof attributes.blockVersion ) {
                                if ( ! innerZIndexValue ) {
                                    innerZIndexValue = 1;
                                }
                            }
                        }

                        styles[ '.enokh-blocks-container-' + uniqueId ].push( {
                            position: 'relative',
                            overflow: 'hidden',
                        } );
                    }

                    styles[ data.selector ].push( {
                        'background-image': !! imageURL ? 'url(' + imageURL + ')' : null,
                        'background-size': data.size,
                        'background-position': data.position,
                        'background-repeat': data.repeat,
                        'background-attachment': data.attachment,
                    } );
                }
            } );
        } );

        if ( innerZIndexValue || 0 === innerZIndexValue ) {
            styles[ '.enokh-blocks-container-' + uniqueId + ' > .enokh-blocks-inside-container' ] = [
                {
                    'z-index': innerZIndexValue,
                    position: 'relative',
                },
            ];
        }
    }

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};

export default ContainerAdvancedBackgroundsStyle;
