// Stylesheets
import './editor.scss';

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

// Implementation dependencies
import blockJson from './block.json';
import Edit from './resources/ts/block/edit';

/**
 * Not reading block.json as it will increase build size
 */
registerBlockType( blockJson.name, {
    icon: blockJson.icon,
    edit: Edit,
    save: () => {
        return <InnerBlocks.Content />;
    },
} );
