import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import GridBlockEdit from './edit';
import blockAttributes from './attributes';
import { getBlockAttributes } from '@enokh-blocks/block-context';
import gridContext from '@enokh-blocks/block-context/grid';

const attributes = Object.assign( {}, getBlockAttributes( blockAttributes, gridContext, {} ) );
const config = EnokhBlocksEditor.Blocks.GridBlock;

registerBlockType( config.name, {
    apiVersion: 2,
    title: config.title,
    icon: config.icon,
    category: config.category,
    attributes,
    edit: GridBlockEdit,
    save: () => {
        return <InnerBlocks.Content />;
    },
    supports: {
        className: false,
        html: false,
    },
    usesContext: [
        'enokh-blocks/query',
        'enokh-blocks/queryId',
        'enokh-blocks/inheritQuery',
        'enokh-blocks/termQuery',
        'enokh-blocks/taxonomyType',
        'enokh-blocks/termQueryId',
        'enokh-blocks/termShowPostCounts',
    ],
} );
