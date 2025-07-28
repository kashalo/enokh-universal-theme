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
    getAttribute,
    borderStyleColor,
    lineClampStyle,
    dividerStyle,
} from '../../../utils';

const ContainerTabletStyle = ( props: ContainerBlockProps ): JSX.Element => {
    const { attributes } = props;
    const {
        removeVerticalGapTablet,
        bgImage,
        bgOptions,
        uniqueId,
        borders,
        isGrid,
        gridId,
        sizing,
        flexGrowTablet,
        flexShrinkTablet,
        flexBasisTablet,
        orderTablet,
        shapeDividers,
    } = attributes;
    const selector = `.editor-styles-wrapper .enokh-blocks-container-${ attributes.uniqueId }`;
    const selectorHoverState = `${ selector }:hover`;
    const styles = [];
    const deviceType = 'Tablet';

    const {
        borderTopLeftRadiusTablet,
        borderTopRightRadiusTablet,
        borderBottomRightRadiusTablet,
        borderBottomLeftRadiusTablet,
    } = borders;

    coloursStyle( styles, selector, attributes, '', deviceType );
    typographyStyle( styles, selector, attributes, deviceType );
    sizingStyle( styles, selector, attributes, deviceType );
    borderStyle( styles, selector, attributes, deviceType );
    spacingStyle( styles, selector, attributes, deviceType );
    layoutStyle( styles, selector, attributes, deviceType );
    flexChildStyle( styles, selector, attributes, deviceType );

    if ( bgImage && 'pseudo-element' === bgOptions.selector ) {
        styles[ '.enokh-blocks-container-' + uniqueId + ':before' ] = [
            {
                'border-top-left-radius': borderTopLeftRadiusTablet,
                'border-top-right-radius': borderTopRightRadiusTablet,
                'border-bottom-right-radius': borderBottomRightRadiusTablet,
                'border-bottom-left-radius': borderBottomLeftRadiusTablet,
            },
        ];
    }

    if ( isGrid ) {
        const gridColumnSelectors = [
            '.enokh-blocks-post-template-' + gridId + ' > .enokh-blocks-post-template-wrapper > .block-editor-inner-blocks',
            '.enokh-blocks-term-template-' + gridId + ' > .enokh-blocks-term-template-wrapper > .block-editor-inner-blocks',
            '.enokh-blocks-grid-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout > .enokh-blocks-grid-column-' +
                uniqueId,
        ];

        styles[ gridColumnSelectors.join( ',' ) ] = [
            {
                width: sizingValue( 'widthTablet', sizing ),
                'flex-grow': flexGrowTablet,
                'flex-shrink': flexShrinkTablet,
                'flex-basis': flexBasisTablet,
                order: orderTablet,
            },
        ];
    }

    // Border hover
    borderStyleColor( styles, selectorHoverState, attributes, 'Hover', deviceType );

    // Only for tablet
    if ( deviceType === 'Tablet' && removeVerticalGapTablet ) {
        styles[ `.enokh-blocks-grid-column-${ attributes.uniqueId }` ] = [
            {
                'margin-bottom': '0px !important',
            },
        ];
    }

    // Anchor
    styles[ `${ selector } a, ${ selector } a:visited` ] = [
        { color: getAttribute( 'linkColor', { attributes, deviceType } ) },
    ];
    styles[ `${ selector } a:hover` ] = [ { color: getAttribute( 'linkColorHover', { attributes, deviceType } ) } ];

    // Shapes
    if ( shapeDividers.length ) {
        shapeDividers.forEach( ( location, index ) => {
            const shapeNumber = index + 1;
            let shapeWidth = ( shapeDividers[ index ].widthTablet ?? 0 ) + '%';

            if ( shapeDividers[ index ].widthTablet === 100 ) {
                shapeWidth = 'calc(' + shapeWidth + ' + 1.3px)';
            }

            const svgSelector =
                '.enokh-blocks-container-' + uniqueId + ' > .enokh-blocks-shapes .enokh-blocks-shape-' + shapeNumber + ' svg';

            styles[ svgSelector ] = [
                {
                    height: `${ shapeDividers[ index ].heightTablet }px`,
                    width: shapeWidth,
                },
            ];

            if ( shapeDividers[ index ].widthTablet !== 100 ) {
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

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};

export default ContainerTabletStyle;
