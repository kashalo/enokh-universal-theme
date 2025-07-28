import { createContext } from '@wordpress/element';
import { addFilter, applyFilters } from '@wordpress/hooks';
import defaultContext from './default';
import containerContext from './container';
import gridContext from './grid';
import textContext from './text';
import buttonContext from './button';
import iconContext from '../../../src/Blocks/Icon/resources/ts/block/block-context';
import getLayoutAttributes from '../components/InspectorControls/LayoutControls/attributes';
import getFlexChildAttributes from '../components/InspectorControls/FlexChildControls/attributes';
import getSpacingAttributes from '../components/InspectorControls/SpacingControls/attributes';
import getSizingAttributes from '../components/InspectorControls/SizingControls/attributes';
import getTypographyAttributes from '../components/InspectorControls/TypographyControls/attributes';
import getBorderAttributes from '../components/InspectorControls/BorderControls/attributes';
import getBackgroundGradientAttributes from '../components/InspectorControls/BackgroundControls/attributes';
import getIconAttributes from '@enokh-blocks/components/InspectorControls/IconControls/attributes';
import carouselNavigationContext from '../../../src/Blocks/CarouselNavigation/resources/ts/block/block-context';
import carouselContext from '../../../src//Blocks/Carousel/resources/ts/block/block-context';
import carouselArrowsContext from '../../../src/Blocks/CarouselArrows/resources/ts/block/block-context';
import carouselNextContext from '../../../src/Blocks/CarouselNext/resources/ts/block/block-context';
import carouselPreviousContext from '../../../src/Blocks/CarouselPrevious/resources/ts/block/block-context';
import carouselPlayPauseContext from '../../../src/Blocks/CarouselPlayPause/resources/ts/block/block-context';
import sharingContext from '../../../src/Blocks/Sharing/resources/ts/block/block-context';
import carouselScrollbarContext from '../../../src/Blocks/CarouselScrollbar/resources/ts/block/block-context';
import tabPanelContext from '../../../src/Blocks/TabPanel/resources/ts/block/block-context';
import { accordionContext } from '../../../src/Blocks/Accordion/resources/ts/block/block-context';
import accordionItemContext from '../../../src/Blocks/AccordionItem/resources/ts/block/block-context';
import getDividerAttributes from '@enokh-blocks/components/InspectorControls/DividerControls/attributes';
import listContext from '../../../src//Blocks/List/resources/ts/block/block-context';
import listItemContext from '../../../src/Blocks/ListItem/resources/ts/block/block-context';

const BlockContext = createContext< DefaultBlockContextConfig >( defaultContext );

function defaultBlockContextRules( blockContext: object, props: any ): object {
    const isInQueryLoop = 'undefined' !== typeof props.context[ 'enokh-blocks/queryId' ];
    const blockName = props.name;
    const clientId = props.clientId;
    const deviceType = props.deviceType;

    return Object.assign( {}, blockContext, {
        isInQueryLoop,
        blockName,
        clientId,
        deviceType,
    } );
}

export function getBlockContext( blockName: string ) {
    return {
        'enokh-blocks/container': containerContext,
        'enokh-blocks/grid': gridContext,
        'enokh-blocks/text': textContext,
        'enokh-blocks/button': buttonContext,
        'enokh-blocks/icon': iconContext,
        'enokh-blocks/carousel-navigation': carouselNavigationContext,
        'enokh-blocks/carousel': carouselContext,
        'enokh-blocks/carousel-arrows': carouselArrowsContext,
        'enokh-blocks/carousel-next': carouselNextContext,
        'enokh-blocks/carousel-previous': carouselPreviousContext,
        'enokh-blocks/carousel-play-pause': carouselPlayPauseContext,
        'enokh-blocks/carousel-scrollbar': carouselScrollbarContext,
        'enokh-blocks/sharing': sharingContext,
        'enokh-blocks/tab-panel': tabPanelContext,
        'enokh-blocks/accordion': accordionContext,
        'enokh-blocks/accordion-item': accordionItemContext,
        'enokh-blocks/list': listContext,
        'enokh-blocks/list-item': listItemContext,
    }[ blockName ];
}

export const withBlockContext = ( WrappedComponent ) => ( props ) => {
    const blockContext: any = applyFilters( 'enokh-blocks.editor.blockContext', getBlockContext( props.name ), props );

    return (
        <BlockContext.Provider value={ blockContext }>
            <WrappedComponent { ...props } />
        </BlockContext.Provider>
    );
};

addFilter( 'enokh-blocks.editor.blockContext', 'enokh-blocks/editor/blockContext/default', defaultBlockContextRules );

export function getBlockAttributes( blockAttributes, context, defaults ) {
    let attributes = Object.assign( {}, blockAttributes );

    if ( context.supports.layout.enabled ) {
        attributes = Object.assign( {}, attributes, getLayoutAttributes( defaults ) );
    }

    if ( context.supports.flexChildPanel.enabled ) {
        attributes = Object.assign( {}, attributes, getFlexChildAttributes( defaults ) );
    }

    if ( context.supports.spacing.enabled ) {
        attributes = Object.assign( {}, attributes, getSpacingAttributes( defaults ) );
    }

    if ( context.supports.sizingPanel.enabled ) {
        attributes = Object.assign( {}, attributes, getSizingAttributes( defaults ) );
    }
    if ( context.supports.typography.enabled ) {
        attributes = Object.assign( {}, attributes, getTypographyAttributes( defaults ) );
    }
    if ( context.supports.borders.enabled ) {
        attributes = Object.assign( {}, attributes, getBorderAttributes() );
    }
    if ( context.supports.backgroundPanel.enabled ) {
        attributes = Object.assign( {}, attributes, getBackgroundGradientAttributes( defaults ) );
    }
    if ( context.supports.icon.enabled ) {
        attributes = Object.assign( {}, attributes, getIconAttributes() );
    }
    if ( context.supports.dividerPanel.enabled ) {
        attributes = Object.assign( {}, attributes, getDividerAttributes() );
    }

    return attributes;
}

export default BlockContext;
