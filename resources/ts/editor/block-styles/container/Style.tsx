import {
    buildCSS,
    sizingStyle,
    typographyStyle,
    borderStyle,
    spacingStyle,
    layoutStyle,
    flexChildStyle,
    borderStyleColor,
    isFlexItem,
    hexToRGBA,
    getBackgroundImage,
    shorthandCSS,
    sizingValue,
    coloursStyle,
    hasUrl,
    lineClampStyle,
} from '../../../utils';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { dividerStyle } from '@enokh-blocks/utils';

const ContainerStyle = ( props: ContainerBlockProps ): JSX.Element => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const {
        textColor,
        linkColor,
        linkColorHover,
        display,
        displayTablet,
        displayMobile,
        shapeDividers,
        uniqueId,
        containerWidth,
        bgImage,
        useDynamicData,
        dynamicContentType,
        bgOptions,
        bgImageInline,
        gradient,
        gradientSelector,
        borders,
        isGrid,
        gridId,
        sizing,
        flexGrow,
        flexShrink,
        flexBasis,
        order,
        minHeight,
        linkType,
        dynamicBackgroundColor,
    } = attributes;
    const { borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius } = borders;
    const hasBgImage = !! bgImage || ( useDynamicData && 'featured-image' === dynamicContentType );
    const hasDynamicBgColour = !! dynamicBackgroundColor && useDynamicData && 'species-term' === dynamicContentType;
    const backgroundImageValue = getBackgroundImage( 'image', props );
    const gradientValue = getBackgroundImage( 'gradient', props );
    const selector = `.editor-styles-wrapper .enokh-blocks-container-${ uniqueId }`;
    const selectorHoverState = `${ selector }:hover`;
    const styles = [];

    coloursStyle( styles, selector, attributes );
    typographyStyle( styles, selector, attributes );
    sizingStyle( styles, selector, attributes );
    borderStyle( styles, selector, attributes );
    spacingStyle( styles, selector, attributes );
    layoutStyle( styles, selector, attributes );
    flexChildStyle( styles, selector, attributes );

    // Background
    if ( hasBgImage && 'element' === bgOptions.selector && backgroundImageValue ) {
        styles[ selector ].push( {
            'background-image': ! bgImageInline ? backgroundImageValue : null,
            'background-size': bgOptions.size,
            'background-position': bgOptions.position,
            'background-repeat': bgOptions.repeat,
            'background-attachment': bgOptions.attachment,
        } );
    } else if ( gradient && 'element' === gradientSelector ) {
        styles[ selector ].push( {
            'background-image': gradientValue,
        } );
    }
    if (
        ( hasBgImage && 'pseudo-element' === bgOptions.selector ) ||
        ( gradient && 'pseudo-element' === gradientSelector )
    ) {
        styles[ '.enokh-blocks-container-' + uniqueId + ' .block-list-appender' ] = [
            {
                'z-index': 10,
            },
        ];
    }

    if ( hasDynamicBgColour ) {
        styles[ selector ].push( {
            'background-color': dynamicBackgroundColor,
        } );
    }
    styles[
        `.editor-styles-wrapper .enokh-blocks-container-` +
            uniqueId +
            ` h1,
		.editor-styles-wrapper .enokh-blocks-container-` +
            uniqueId +
            ` h2,
		.editor-styles-wrapper .enokh-blocks-container-` +
            uniqueId +
            ` h3,
		.editor-styles-wrapper .enokh-blocks-container-` +
            uniqueId +
            ` h4,
		.editor-styles-wrapper .enokh-blocks-container-` +
            uniqueId +
            ` h5,
		.editor-styles-wrapper .enokh-blocks-container-` +
            uniqueId +
            ` h6`
    ] = [
        {
            color: textColor,
        },
    ];

    if ( hasBgImage && 'pseudo-element' === bgOptions.selector ) {
        styles[ '.enokh-blocks-container-' + uniqueId + ':before' ] = [
            {
                content: '""',
                'background-image': backgroundImageValue,
                'background-repeat': bgOptions.repeat,
                'background-position': bgOptions.position,
                'background-size': bgOptions.size,
                'background-attachment': bgOptions.attachment,
                'z-index': '0',
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                'border-radius': shorthandCSS(
                    borderTopLeftRadius,
                    borderTopRightRadius,
                    borderBottomRightRadius,
                    borderBottomLeftRadius
                ),
                'pointer-events': 'none',
            },
        ];

        if ( typeof bgOptions.opacity !== 'undefined' && 1 !== bgOptions.opacity ) {
            styles[ '.enokh-blocks-container-' + uniqueId + ':before' ].push( {
                opacity: bgOptions.opacity,
            } );
        }
    }

    if ( gradient && 'pseudo-element' === gradientSelector ) {
        styles[ '.enokh-blocks-container-' + uniqueId + ':after' ] = [
            {
                content: '""',
                'background-image': gradientValue,
                'z-index': '0 !important',
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                'pointer-events': 'none',
            },
        ];
    }

    // Border hover
    borderStyleColor( styles, selectorHoverState, attributes, 'Hover' );

    // Headings
    styles[
        `${ selector } h1,
		${ selector } h2,
		${ selector } h3,
		${ selector } h4,
		${ selector } h5,
		${ selector } h6`
    ] = [ { color: textColor } ];

    // Anchor
    styles[ `${ selector } a, ${ selector } a:visited` ] = [ { color: linkColor } ];
    styles[ `${ selector } a:hover` ] = [ { color: linkColorHover } ];

    // Nested in Grid
    if ( isGrid ) {
        const gridColumnSelectors = [
            '.enokh-blocks-post-template-' + gridId + ' > .enokh-blocks-post-template-wrapper > .block-editor-inner-blocks',
            '.enokh-blocks-term-template-' + gridId + ' > .enokh-blocks-term-template-wrapper > .block-editor-inner-blocks',
            '.enokh-blocks-grid-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout > .enokh-blocks-grid-column-' +
                uniqueId,
        ];
        styles[ gridColumnSelectors.join( ',' ) ] = [
            {
                width: sizingValue( 'width', sizing ),
                'flex-grow': flexGrow,
                'flex-shrink': flexShrink,
                'flex-basis': flexBasis,
                order,
            },
        ];
    }

    // Flex item
    if ( isFlexItem( { deviceType, display, displayTablet, displayMobile } ) ) {
        styles[ `${ selector }  .block-editor-block-list__block > .block-list-appender` ] = [
            {
                'margin-top': 0,
            },
        ];
    }

    // Shapes
    if ( shapeDividers.length ) {
        styles[ '.enokh-blocks-container-' + uniqueId + ' .block-list-appender' ] = [
            {
                position: 'relative',
                'z-index': 100,
            },
        ];

        shapeDividers.forEach( ( location, index ) => {
            const shapeTransforms = [];
            const shapeNumber = index + 1;

            if ( 'top' === shapeDividers[ index ].location ) {
                shapeTransforms.push( 'scaleY(-1)' );
            }

            if ( shapeDividers[ index ].flipHorizontally ) {
                shapeTransforms.push( 'scaleX(-1)' );

                styles[
                    '.enokh-blocks-shape-container > .enokh-blocks-shape-toggle-preview-' +
                        shapeNumber +
                        ' .enokh-blocks-shape-divider-preview'
                ] = [
                    {
                        transform: 'scaleX(-1)',
                    },
                ];
            }

            styles[ '.enokh-blocks-container-' + uniqueId + ' > .enokh-blocks-shapes .enokh-blocks-shape-' + shapeNumber ] = [
                {
                    color: hexToRGBA( shapeDividers[ index ].color, shapeDividers[ index ].colorOpacity ),
                    'z-index': shapeDividers[ index ].zindex,
                },
            ];

            if ( 'top' === shapeDividers[ index ].location || 'bottom' === shapeDividers[ index ].location ) {
                styles[
                    '.enokh-blocks-container-' + uniqueId + ' > .enokh-blocks-shapes .enokh-blocks-shape-' + shapeNumber
                ].push( {
                    left: '0',
                    right: '0',
                } );
            }

            if ( 'bottom' === shapeDividers[ index ].location ) {
                styles[
                    '.enokh-blocks-container-' + uniqueId + ' > .enokh-blocks-shapes .enokh-blocks-shape-' + shapeNumber
                ].push( {
                    bottom: '-1px',
                } );
            }

            if ( 'top' === shapeDividers[ index ].location ) {
                styles[
                    '.enokh-blocks-container-' + uniqueId + ' > .enokh-blocks-shapes .enokh-blocks-shape-' + shapeNumber
                ].push( {
                    top: '-1px',
                } );
            }

            if ( shapeTransforms.length ) {
                styles[
                    '.enokh-blocks-container-' + uniqueId + ' > .enokh-blocks-shapes .enokh-blocks-shape-' + shapeNumber
                ].push( {
                    transform: shapeTransforms.join( ' ' ),
                } );
            }

            let shapeWidth = shapeDividers[ index ].width + '%';

            if ( 100 === shapeDividers[ index ].width ) {
                shapeWidth = 'calc(' + shapeWidth + ' + 1.3px)';
            }

            styles[
                '.enokh-blocks-container-' + uniqueId + ' > .enokh-blocks-shapes .enokh-blocks-shape-' + shapeNumber + ' svg'
            ] = [
                {
                    height: `${ shapeDividers[ index ].height }px`,
                    width: shapeWidth,
                },
            ];

            if ( 'top' === shapeDividers[ index ].location || 'bottom' === shapeDividers[ index ].location ) {
                styles[
                    '.enokh-blocks-container-' +
                        uniqueId +
                        ' > .enokh-blocks-shapes .enokh-blocks-shape-' +
                        shapeNumber +
                        ' svg'
                ].push( {
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    'min-width': '100%',
                } );
            }
        } );
    }

    if ( hasUrl( attributes ) && linkType === 'wrapper' ) {
        styles[
            '.block-editor-block-list__block a.enokh-blocks-container-' +
                uniqueId +
                ', .block-editor-block-list__block a.enokh-blocks-container-' +
                uniqueId +
                ':visited'
        ] = [
            {
                color: textColor,
            },
        ];
    }

    lineClampStyle( styles, selector, attributes );

    const dividerSelectors = [
        `${ selector }.enokh-blocks-has-divider > .enokh-blocks-container::before`,
        `${ selector }.enokh-blocks-has-divider > .wp-block::before`,
    ];

    dividerStyle( styles, dividerSelectors.join( ', ' ), attributes, '', true, 'enokh-blocks/container' );

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};

export default ContainerStyle;
