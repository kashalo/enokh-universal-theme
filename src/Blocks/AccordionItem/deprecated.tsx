import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
    {
        attributes: {
            uniqueId: {
                type: 'string',
                default: '',
            },
            heading: {
                type: 'string',
                default: '',
            },
            title: {
                type: 'string',
                default: '',
            },
            isOpen: {
                type: 'boolean',
                default: false,
            },
        },

        isEligible: ( attributes ) => {
            return !! attributes.heading;
        },

        migrate( attributes, innerBlocks ) {
            const { heading, title, ...restAttributes } = attributes;
            console.log( 'migrate', { restAttributes } );

            const headingBlock = createBlock( 'enokh-blocks/text', {
                content: attributes.heading,
                element: 'h2',
            } );
            const newInnerTitle = createBlock( 'enokh-blocks/text', {
                content: attributes.title,
                element: 'h3',
            } );
            const accordionItemHeaderInner = createBlock(
                'enokh-blocks/container',
                {
                    isAccordionItemHeaderInner: true,
                    lock: {
                        move: true,
                    },
                },
                [ headingBlock ]
            );
            const collapseIconBlock = createBlock( 'enokh-blocks/icon', {
                icon: 'plus',
                iconGroup: 'font-awesome-solid',
                height: '1em',
                width: '1em',
                isAccordionCollapse: true,
                lock: {
                    remove: true,
                    move: true,
                },
            } );
            const expandIconBlock = createBlock( 'enokh-blocks/icon', {
                icon: 'minus',
                iconGroup: 'font-awesome-solid',
                height: '1em',
                width: '1em',
                isAccordionExpand: true,
                lock: {
                    remove: true,
                    move: true,
                },
            } );
            const accordionToggle = createBlock(
                'enokh-blocks/button',
                {
                    hasIcon: true,
                    removeText: true,
                    alignItems: 'center',
                    justifyContent: 'center',
                    isAccordionToggle: true,
                    lock: {
                        remove: true,
                        insert: true,
                    },
                },
                [ collapseIconBlock, expandIconBlock ]
            );

            if ( !! attributes.innerTitle ) {
                innerBlocks.unshift( newInnerTitle );
            }

            return [
                restAttributes,
                [
                    createBlock(
                        'enokh-blocks/container',
                        {
                            isAccordionItemHeader: true,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            lock: {
                                remove: true,
                                move: true,
                                insert: true,
                            },
                        },
                        [ accordionItemHeaderInner, accordionToggle ]
                    ),
                    createBlock(
                        'enokh-blocks/container',
                        {
                            isAccordionItemContent: true,
                            display: '',
                            lock: {
                                remove: true,
                                move: true,
                            },
                        },
                        [ ...innerBlocks ]
                    ),
                ],
            ];
        },

        save: () => {
            return <InnerBlocks.Content />;
        },
    },
];

export default deprecated;
