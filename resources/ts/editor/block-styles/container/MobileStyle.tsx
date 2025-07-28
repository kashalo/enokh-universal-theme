import {
    borderStyle,
    buildCSS,
    flexChildStyle,
    layoutStyle,
    sizingStyle,
    spacingStyle,
    typographyStyle,
    sizingValue,
    coloursStyle,
    borderStyleColor,
    lineClampStyle,
    dividerStyle,
} from '../../../utils';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';

const ContainerMobileStyle = ( props: ContainerBlockProps ): JSX.Element => {
    const { attributes } = props;
    const {
        uniqueId,
        removeVerticalGapMobile,
        bgImage,
        bgOptions,
        borders,
        gridId,
        isGrid,
        sizing,
        flexGrowMobile,
        flexShrinkMobile,
        flexBasisMobile,
        orderMobile,
        shapeDividers,
    } = attributes;
    const selector = `.editor-styles-wrapper .enokh-blocks-container-${ uniqueId }`;
    const selectorHoverState = `${ selector }:hover`;
    const styles = [];
    const { deviceType } = useContext( BlockContext );
    const {
        borderTopLeftRadiusMobile,
        borderTopRightRadiusMobile,
        borderBottomRightRadiusMobile,
        borderBottomLeftRadiusMobile,
    } = borders;

    typographyStyle( styles, selector, attributes, deviceType );
    sizingStyle( styles, selector, attributes, deviceType );
    borderStyle( styles, selector, attributes, deviceType );
    spacingStyle( styles, selector, attributes, deviceType );
    layoutStyle( styles, selector, attributes, deviceType );
    flexChildStyle( styles, selector, attributes, deviceType );

    //Background
    if ( bgImage && 'pseudo-element' === bgOptions.selector ) {
        styles[ '.enokh-blocks-container-' + uniqueId + ':before' ] = [
            {
                'border-top-left-radius': borderTopLeftRadiusMobile,
                'border-top-right-radius': borderTopRightRadiusMobile,
                'border-bottom-right-radius': borderBottomRightRadiusMobile,
                'border-bottom-left-radius': borderBottomLeftRadiusMobile,
            },
        ];
    }
    if ( bgImage && 'fixed' === bgOptions.attachment ) {
        if ( 'element' === bgOptions.selector ) {
            styles[ '.editor-styles-wrapper .enokh-blocks-container-' + uniqueId ].push( {
                'background-attachment': 'initial',
            } );
        }

        if ( 'pseudo-element' === bgOptions.selector ) {
            styles[ '.enokh-blocks-container-' + uniqueId + ':before' ] = [
                {
                    'background-attachment': 'initial',
                },
            ];
        }
    }
    // Nested Grid
    if ( isGrid ) {
        const gridColumnSelectors = [
            '.enokh-blocks-post-template-' + gridId + ' > .enokh-blocks-post-template-wrapper > .block-editor-inner-blocks',
            '.enokh-blocks-term-template-' + gridId + ' > .enokh-blocks-term-template-wrapper > .block-editor-inner-blocks',
            '.enokh-blocks-grid-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout > .enokh-blocks-grid-column-' +
                uniqueId,
        ];

        styles[ gridColumnSelectors.join( ',' ) ] = [
            {
                width: sizingValue( 'widthMobile', sizing ),
                'flex-grow': flexGrowMobile,
                'flex-shrink': flexShrinkMobile,
                'flex-basis': flexBasisMobile,
                order: orderMobile,
            },
        ];
    }

    // Border hover
    borderStyleColor( styles, selectorHoverState, attributes, 'Hover', deviceType );

    if ( removeVerticalGapMobile ) {
        styles[ `.enokh-blocks-grid-column-${ attributes.uniqueId }` ] = [
            {
                'margin-bottom': '0px !important',
            },
        ];
    }

    // Shapes
    if ( shapeDividers.length ) {
        shapeDividers.forEach( ( location, index ) => {
            const shapeNumber = index + 1;
            let shapeWidth = ( shapeDividers[ index ].widthMobile ?? 0 ) + '%';

            if ( shapeDividers[ index ].widthMobile === 100 ) {
                shapeWidth = 'calc(' + shapeWidth + ' + 1.3px)';
            }

            const svgSelector =
                '.enokh-blocks-container-' + uniqueId + ' > .enokh-blocks-shapes .enokh-blocks-shape-' + shapeNumber + ' svg';
            styles[ svgSelector ] = [
                {
                    height: `${ shapeDividers[ index ].heightMobile }px`,
                    width: shapeWidth,
                },
            ];

            if ( shapeDividers[ index ].widthMobile !== 100 ) {
                styles[ svgSelector ].push( {
                    left: '0%',
                    transform: 'translateX(0%)',
                    'min-width': 'unset',
                } );
            }
        } );
    }

    lineClampStyle( styles, selector, attributes, deviceType );

    const dividerSelector = `${ selector }.enokh-blocks-has-divider > .enokh-blocks-container::before`;
    dividerStyle( styles, dividerSelector, attributes, deviceType, true, 'enokh-blocks/container' );

    return <style>{ buildCSS( styles ) }</style>;
};
export default ContainerMobileStyle;
