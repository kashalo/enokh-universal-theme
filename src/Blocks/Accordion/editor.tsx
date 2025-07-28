import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

// Implementation dependencies
import blockConfiguration from './block.json';
import Edit from './resources/ts/block/edit';

registerBlockType( blockConfiguration.name, {
    title: blockConfiguration.title,
    edit: Edit,
    save: () => {
        return <InnerBlocks.Content />;
    },
} );
