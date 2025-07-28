import icon from './icon';
import { registerBlockType } from '@wordpress/blocks';
import TableOfContentEdit from './edit';
import './filters';

const config = window.EnokhBlocksEditor.Blocks.TableOfContent;

registerBlockType( config.name, {
    apiVersion: 3,
    title: config.title,
    icon,
    category: config.category,
    attributes: config.attributes,
    edit: TableOfContentEdit,
    save: () => null,
    supports: config.supports,
} );
