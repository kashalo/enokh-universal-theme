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

const MobileStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId, orientation, shape, variant, enableAdvancedPosition, advancedPosition, element } = attributes;
    const selector = '.editor-styles-wrapper .enokh-blocks-carousel-navigation-' + uniqueId;
    const wrapperSelector = selector + ' > .enokh-blocks-carousel-navigation__items-wrapper';
    const itemSelector = selector + ' .enokh-blocks-carousel-navigation__item';
    const styles = [];

    const alignItems = getAttribute( 'alignItems', { attributes, deviceType } );
    const justifyContent = getAttribute( 'justifyContent', { attributes, deviceType } );
    let computedAlignItems = '';
    let computedJustifyContent = '';
    if ( alignItems ) {
        computedAlignItems = alignItems === 'center' ? alignItems : `flex-${ alignItems }`;
    }

    if ( justifyContent ) {
        computedJustifyContent = [ 'start', 'end' ].includes( justifyContent )
            ? `flex-${ justifyContent }`
            : justifyContent;
    }

    styles[ selector ] = [
        {
            'align-items': orientation === 'horizontal' ? computedAlignItems : computedJustifyContent,
            'justify-content': orientation === 'horizontal' ? computedJustifyContent : computedAlignItems,
        },
    ];

    if ( !! enableAdvancedPosition ) {
        styles[ selector ].push( {
            height: 'auto',
            top: advancedPosition[ 'absoluteTop' + deviceType ],
            bottom: advancedPosition[ 'absoluteBottom' + deviceType ],
            left: advancedPosition[ 'absoluteLeft' + deviceType ],
            right: advancedPosition[ 'absoluteRight' + deviceType ],
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
            width: getAttribute( 'width', { attributes: shape, deviceType } ),
            height: getAttribute( 'height', { attributes: shape, deviceType } ),
        },
    ];
    styles[ wrapperSelector ] = [
        {
            'row-gap': getAttribute( 'gap', { attributes, deviceType } ),
            'column-gap': getAttribute( 'gap', { attributes, deviceType } ),
        },
    ];

    if ( variant === 'shape' ) {
        styles[ itemSelector ] = [
            {
                color: getAttribute( 'background', { attributes: shape, deviceType } ),
            },
        ];

        styles[ itemSelector + '.active' ] = [
            {
                color: getAttribute( 'backgroundCurrent', { attributes: shape, deviceType } ),
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
                color: getAttribute( 'backgroundHover', { attributes: shape, deviceType } ),
            },
        ];

        styles[ wrapperSelector ].push( {
            'align-items': getAttribute( 'innerAlignItems', { attributes, deviceType } ),
        } );

        spacingStyle( styles, selector, attributes, deviceType );
    }

    if ( variant === 'fraction' ) {
        const selectorHoverState = `${ wrapperSelector }:hover`;

        typographyStyle( styles, wrapperSelector, attributes, deviceType );
        coloursStyle( styles, wrapperSelector, attributes, deviceType );
        spacingStyle( styles, wrapperSelector, attributes, deviceType );
        borderStyle( styles, wrapperSelector, attributes, deviceType );
        // Hover
        borderStyleColor( styles, selectorHoverState, attributes, 'Hover', deviceType );
        coloursStyle( styles, selectorHoverState, attributes, 'Hover', deviceType );
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

        spacingStyle( styles, elementItemSelector, attributes, deviceType );
        borderStyle( styles, elementItemSelector, attributes, deviceType );
        // Hover
        borderStyleColor( styles, selectorHoverState, attributes, 'Hover', deviceType );
        borderStyleColor( styles, elementItemSelector + '.active', attributes, 'Current', deviceType );
    }

    return <style>{ buildCSS( styles ) }</style>;
};

export default MobileStyle;
