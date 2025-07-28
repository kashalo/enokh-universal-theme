import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { cloneBlock, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

// Implementation dependencies
import InspectorControls from './inpector-controls';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import { withBlockContext } from '@enokh-blocks/block-context';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';

const Edit = ( props: AccordionItemBlockProps ): JSX.Element => {
    // Destructure properties and attributes from props
    const {
        attributes: { heading, title, uniqueId },
        setAttributes,
        className,
        clientId,
    } = props;

    // Reference to track first update (if needed later)
    const firstUpdate = useRef( true );

    /* --------------------------------------------------------------------------
       Define Block Templates for Inner Blocks
    ---------------------------------------------------------------------------- */
    const headingBlock = [ 'enokh-blocks/text', { element: 'h2' } ];

    const accordionItemHeaderInner = [
        'enokh-blocks/container',
        {
            isAccordionItemHeaderInner: true,
            lock: { move: true },
        },
        [ headingBlock ],
    ];

    const collapseIconBlock = [
        'enokh-blocks/icon',
        {
            icon: 'plus',
            iconGroup: 'font-awesome-solid',
            height: '1em',
            width: '1em',
            isAccordionCollapse: true,
            lock: { remove: true, move: true },
        },
    ];

    const expandIconBlock = [
        'enokh-blocks/icon',
        {
            icon: 'minus',
            iconGroup: 'font-awesome-solid',
            height: '1em',
            width: '1em',
            isAccordionExpand: true,
            lock: { remove: true, move: true },
        },
    ];

    const accordionToggle = [
        'enokh-blocks/button',
        {
            hasIcon: true,
            removeText: true,
            alignItems: 'center',
            justifyContent: 'center',
            isAccordionToggle: true,
            lock: { remove: true, insert: true },
        },
        [ collapseIconBlock, expandIconBlock ],
    ];

    const newItemTemplate = [
        [
            'enokh-blocks/container',
            {
                isAccordionItemHeader: true,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                lock: { remove: true, move: true, insert: true },
            },
            [ accordionItemHeaderInner, accordionToggle ],
        ],
        [
            'enokh-blocks/container',
            {
                isAccordionItemContent: true,
                display: '',
                lock: { remove: true, move: true },
            },
            [ [ 'enokh-blocks/text', { element: 'p' } ] ],
        ],
    ];

    /* --------------------------------------------------------------------------
       Set up Block Props and Class Names
    ---------------------------------------------------------------------------- */
    const combinedClassNames = classnames( 'enokh-blocks-accordion-item', className );
    const { children, ...blockProps } = useInnerBlocksProps( useBlockProps( { className: combinedClassNames } ), {
        template: newItemTemplate,
    } );

    /* --------------------------------------------------------------------------
       Retrieve Block Editor Functions
    ---------------------------------------------------------------------------- */
    const { getBlockParentsByBlockName, getBlock } = useSelect(
        ( select ) => select( 'core/block-editor' ) as any,
        []
    );
    const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

    /* --------------------------------------------------------------------------
       Clone and Modify Accordion Item on First Insertion
    ---------------------------------------------------------------------------- */
    useEffect( () => {
        // Exit if the block has already been initialized with a uniqueId
        if ( uniqueId !== '' ) {
            return;
        }

        // Retrieve the parent accordion block's ID and block object
        const parentAccordionIds = getBlockParentsByBlockName( clientId, 'enokh-blocks/accordion', true );
        const accordionId = parentAccordionIds[ 0 ];
        const accordionBlock = getBlock( accordionId );
        const childBlocks = accordionBlock.innerBlocks;

        // Determine the block to clone (selecting the second-to-last block)
        const keys = Object.keys( childBlocks );
        const lastKeyIndex = keys.length - 2;
        const blockToIDCopy = childBlocks[ lastKeyIndex ] ? childBlocks[ lastKeyIndex ].clientId : '';
        const blockToCopy = getBlock( blockToIDCopy );

        if ( ! blockToCopy ) {
            return;
        }

        // Clone the block while resetting the uniqueId
        const clonedBlock = cloneBlock( blockToCopy, { uniqueId: '' } );

        // Modify the cloned block's inner blocks:
        // 1. Clear content for header inner blocks.
        // 2. Remove inner blocks from content blocks.
        clonedBlock.innerBlocks.forEach( ( item ) => {
            if ( item?.attributes?.isAccordionItemHeader ) {
                item.innerBlocks.forEach( ( accordionHeaderItem ) => {
                    if ( accordionHeaderItem?.attributes?.isAccordionItemHeaderInner ) {
                        // Clear the content attribute of the header text block
                        accordionHeaderItem.innerBlocks[ 0 ].attributes.content = '';
                    }
                } );
            }

            if ( item?.attributes?.isAccordionItemContent ) {
                // Remove any inner blocks for content
                item.innerBlocks = [];
            }
        } );

        // Replace the current inner blocks with the newly cloned template
        replaceInnerBlocks( clientId, createBlocksFromInnerBlocksTemplate( clonedBlock.innerBlocks ) );
    }, [] );

    /* --------------------------------------------------------------------------
       Render the Edit Component
    ---------------------------------------------------------------------------- */
    return (
        <>
            { props.isSelected && <InspectorControls { ...props } /> }
            <div { ...blockProps }>{ children }</div>
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withBlockContext, withUniqueId )( Edit );
