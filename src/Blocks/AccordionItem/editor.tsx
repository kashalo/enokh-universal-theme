import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

// Implementation dependencies
import blockConfiguration from './block.json';
import Edit from './resources/ts/block/edit';
import deprecated from './deprecated';

registerBlockType( blockConfiguration.name, {
    title: blockConfiguration.title,
    edit: Edit,
    save: () => {
        return <InnerBlocks.Content />;
    },
    deprecated,
} );
