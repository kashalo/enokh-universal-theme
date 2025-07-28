import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import ContainerBlockEdit from './edit';
import containerDefaultValues from './defaults';
import { blockDefaultValues, getIcon } from '../../../utils';
import { getBlockAttributes } from '../../../block-context';
import blockAttributes from './attributes';
import containerContext from '../../../block-context/container';
import getDynamicContentAttributes from '../../../components/InspectorControls/DynamicContentControls/attributes';
import getDisplayAttributes from '../../../components/InspectorControls/DisplayControls/attributes';
import { __ } from '@wordpress/i18n';

const containerBlockAttributeValues = Object.assign( {}, containerDefaultValues, blockDefaultValues );
const attributes = Object.assign(
    {},
    getBlockAttributes( blockAttributes, containerContext, containerBlockAttributeValues ),
    getDynamicContentAttributes(),
    getDisplayAttributes()
);
const config = EnokhBlocksEditor.Blocks.ContainerBlock;

registerBlockType( config.name, {
    apiVersion: 2,
    title: config.title,
    icon: getIcon( 'container' ),
    category: config.category,
    attributes,
    edit: ContainerBlockEdit,
    save: () => {
        return <InnerBlocks.Content />;
    },
    supports: {
        align: [ 'wide', 'full' ],
        className: false,
        html: false,
    },
    usesContext: [
        'postId',
        'postType',
        'enokh-blocks/minHeight',
        'enokh-blocks/minHeightTablet',
        'enokh-blocks/minHeightMobile',
        'enokh-blocks/height',
        'enokh-blocks/heightTablet',
        'enokh-blocks/heightMobile',
        'enokh-blocks/carouselItemPerSlide',
        'enokh-blocks/carouselSpaceBetween',
        'enokh-blocks/carouselItemPerSlideMobile',
        'enokh-blocks/carouselSpaceBetweenMobile',
        'enokh-blocks/carouselItemPerSlideTablet',
        'enokh-blocks/carouselSpaceBetweenTablet',
        'enokh-blocks/carouselId',
        'enokh-blocks/carouselVariant',
        'enokh-blocks/query',
        'enokh-blocks/queryId',
        'enokh-blocks/tabPanelId',
        'enokh-blocks/accordionId',
    ],
    __experimentalLabel: ( attrs, { context } ) => {
        const customName = attrs?.metadata?.name;

        if ( context === 'list-view' && customName ) {
            return customName;
        }

        if ( attrs.isQueryLoopItem ) {
            return __( 'Post Template', 'enokh-blocks' );
        }

        if ( attrs.isCarouselItem ) {
            return __( 'Carousel Item', 'enokh-blocks' );
        }

        if ( attrs.isTermQueryLoopItem ) {
            return __( 'Term Template', 'enokh-blocks' );
        }

        if ( attrs.isTabHeader ) {
            return __( 'Tab Item Header', 'enokh-blocks' );
        }

        if ( attrs.isAccordionItemHeader ) {
            return __( 'Accordion Item Header', 'enokh-blocks' );
        }

        if ( attrs.isAccordionItemHeaderInner ) {
            return __( 'Accordion Item Header Inner', 'enokh-blocks' );
        }

        if ( attrs.isAccordionItemContent ) {
            return __( 'Accordion Item Content', 'enokh-blocks' );
        }

        return __( 'Container', 'enokh-blocks' );
    },
} );
