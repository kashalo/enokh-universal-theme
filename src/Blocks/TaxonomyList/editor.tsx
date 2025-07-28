// Stylesheets
import './editor.scss';

import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { category as icon } from '@wordpress/icons';

// Implementation dependencies
import blockConfiguration from './block.json';
import Edit from './resources/ts/block/edit';

registerBlockType( blockConfiguration.name, {
    title: blockConfiguration.title,
    icon,
    edit: Edit,
    save: () => {
        return <InnerBlocks.Content />;
    },
} );
