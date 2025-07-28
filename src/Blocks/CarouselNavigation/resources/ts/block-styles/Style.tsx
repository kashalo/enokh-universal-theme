import { BlockEditProps } from '../block/types';
import {
    borderStyle,
    borderStyleColor,
    buildCSS,
    coloursStyle,
    getAttribute,
    spacingStyle,
    typographyStyle,
} from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const MainStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    // const { deviceType } = useContext( BlockContext );
    const deviceType = 'Desktop';
    const { attributes } = props;
    const {
        uniqueId,
        alignItems,
        justifyContent,
        orientation,
        gap,
        shape,
        variant,
        enableAdvancedPosition,
        advancedPosition,
        element,
    } = attributes;
    const selector = '.editor-styles-wrapper .enokh-blocks-carousel-navigation-' + uniqueId;
    const wrapperSelector = selector + ' > .enokh-blocks-carousel-navigation__items-wrapper';
    const itemSelector = selector + ' .enokh-blocks-carousel-navigation__item';
    const styles = [];

    const computedAlignItems = alignItems === 'center' ? alignItems : `flex-${ alignItems }`;
    const computedJustifyContent = [ 'start', 'end' ].includes( justifyContent )
        ? `flex-${ justifyContent }`
        : justifyContent;
    const computedOrientation = orientation === 'horizontal' || orientation === '' ? 'row' : 'column';

    styles[ selector ] = [
        {
            'align-items': orientation === 'horizontal' ? computedAlignItems : computedJustifyContent,
            'justify-content': orientation === 'horizontal' ? computedJustifyContent : computedAlignItems,
        },
    ];

    if ( !! enableAdvancedPosition ) {
        styles[ selector ].push( {
            height: 'auto',
            top: advancedPosition.absoluteTop,
            bottom: advancedPosition.absoluteBottom,
            left: advancedPosition.absoluteLeft,
            right: advancedPosition.absoluteRight,
        } );
    } else {
        styles[ selector ].push( {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        } );
    }

    styles[ selector + ' svg' ] = [
        {
            width: shape.width,
            height: shape.height,
        },
    ];
    styles[ wrapperSelector ] = [
        {
            'flex-direction': computedOrientation,
            'row-gap': gap,
            'column-gap': gap,
        },
    ];

    if ( variant === 'shape' ) {
        const { background, backgroundHover, backgroundCurrent } = shape;
        styles[ itemSelector ] = [
            {
                color: background,
            },
        ];

        styles[ itemSelector + '.active' ] = [
            {
                color: backgroundCurrent,
            },
        ];

        styles[ itemSelector + '.active svg' ] = [
            {
                width: getAttribute( 'widthCurrent', { attributes: shape, deviceType } ),
                height: getAttribute( 'heightCurrent', { attributes: shape, deviceType } ),
            },
        ];

        styles[ itemSelector + ':hover' ] = [
            {
                color: backgroundHover,
            },
        ];

        styles[ wrapperSelector ].push( {
            'align-items': getAttribute( 'innerAlignItems', { attributes, deviceType } ),
        } );

        spacingStyle( styles, selector, attributes );
    }

    if ( variant === 'fraction' ) {
        const selectorHoverState = `${ wrapperSelector }:hover`;

        typographyStyle( styles, wrapperSelector, attributes );
        coloursStyle( styles, wrapperSelector, attributes );
        spacingStyle( styles, wrapperSelector, attributes );
        borderStyle( styles, wrapperSelector, attributes );
        // Hover
        borderStyleColor( styles, selectorHoverState, attributes, 'Hover' );
        coloursStyle( styles, selectorHoverState, attributes, 'Hover' );
    }

    if ( variant === 'element' ) {
        const elementItemSelector = selector + ' .enokh-blocks-carousel-navigation__element-item';
        const selectorHoverState = `${ elementItemSelector }:hover`;

        styles[ elementItemSelector ] = [
            {
                width: getAttribute( 'width', { attributes: element, deviceType } ),
                height: getAttribute( 'height', { attributes: element, deviceType } ),
                'background-color': getAttribute( 'background', { attributes: element, deviceType } ),
            },
        ];
        styles[ selectorHoverState ] = [
            {
                'background-color': getAttribute( 'backgroundHover', { attributes: element, deviceType } ),
            },
        ];
        styles[ elementItemSelector + '.active' ] = [
            {
                'background-color': getAttribute( 'backgroundCurrent', { attributes: element, deviceType } ),
                width: getAttribute( 'widthCurrent', { attributes: element, deviceType } ),
                height: getAttribute( 'heightCurrent', { attributes: element, deviceType } ),
            },
        ];
        styles[ wrapperSelector ].push( {
            'align-items': getAttribute( 'innerAlignItems', { attributes, deviceType } ),
        } );

        spacingStyle( styles, elementItemSelector, attributes );
        borderStyle( styles, elementItemSelector, attributes );
        // Hover
        borderStyleColor( styles, selectorHoverState, attributes, 'Hover' );
        borderStyleColor( styles, elementItemSelector + '.active', attributes, 'Current' );
    }

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
