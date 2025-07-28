import './editor.scss';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

// Implementation dependencies
import blockConfiguration from './block.json';
import Edit from './resources/ts/block/edit';
import { getIcon } from '@enokh-blocks/utils';

registerBlockType( blockConfiguration.name, {
    title: blockConfiguration.title,
    icon: getIcon( 'carousel-scrollbar' ),
    edit: Edit,
    save: () => {
        return <InnerBlocks.Content />;
    },
} );
