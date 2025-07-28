import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

// Implementation dependencies
import blockConfiguration from './block.json';
import Edit from './resources/ts/block/edit';
import { getIcon } from '@enokh-blocks/utils';

registerBlockType( blockConfiguration.name, {
    title: blockConfiguration.title,
    icon: getIcon( 'tab-panel' ),
    edit: Edit,
    save: () => {
        return <InnerBlocks.Content />;
    },
    deprecated: [
        {
            attributes: {
                uniqueId: {
                    type: 'string',
                    default: '',
                },
                templateLock: {
                    type: [ 'string', 'boolean' ],
                    enum: [ 'all', 'insert', 'contentOnly', false ],
                },
                name: {
                    type: 'string',
                    __experimentalRole: 'content',
                },
                innerTitle: {
                    type: 'string',
                    __experimentalRole: 'content',
                },
            },

            isEligible: ( attributes ) => {
                return !! attributes.name;
            },

            migrate( attributes, innerBlocks ) {
                const { name, innerTitle, ...restAttributes } = attributes;
                console.log( 'migrate', { restAttributes } );

                // const iconBlock = createBlock( 'enokh-blocks/icon', {
                //     icon: '',
                //     iconGroup: '',
                //     height: '1em',
                //     width: '1em',
                // } );
                const title = createBlock( 'enokh-blocks/text', {
                    content: attributes.name,
                    element: 'p',
                } );
                const newInnerTitle = createBlock( 'enokh-blocks/text', {
                    content: attributes.innerTitle,
                    element: 'h3',
                } );

                if ( !! attributes.innerTitle ) {
                    innerBlocks.unshift( newInnerTitle );
                }

                return [
                    restAttributes,
                    [
                        createBlock(
                            'enokh-blocks/container',
                            {
                                isTabHeader: true,
                                lock: {
                                    remove: true,
                                    move: true,
                                },
                            },
                            [ title ]
                        ),
                        ...innerBlocks,
                    ],
                ];
            },

            save: () => {
                return <InnerBlocks.Content />;
            },
        },
    ],
} );
