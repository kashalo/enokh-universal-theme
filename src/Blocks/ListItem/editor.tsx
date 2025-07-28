// Stylesheets
import './editor.scss';

import { registerBlockType } from '@wordpress/blocks';

// Implementation dependencies
import blockConfiguration from './block.json';
import Edit from './resources/ts/block/edit';
import Save from './resources/ts/block/save';

registerBlockType( blockConfiguration.name, {
    title: blockConfiguration.title,
    icon: blockConfiguration.icon,
    edit: Edit,
    save: Save,
} );
