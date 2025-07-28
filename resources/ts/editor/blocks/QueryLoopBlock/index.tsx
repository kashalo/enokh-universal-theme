import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import QueryLoopBlockEdit from './edit';
import blockAttributes from './attributes';

const attributes = Object.assign( {}, blockAttributes );
const config = EnokhBlocksEditor.Blocks.QueryLoopBlock;

registerBlockType( config.name, {
    apiVersion: 2,
    title: config.title,
    icon: config.icon,
    category: config.category,
    attributes,
    edit: QueryLoopBlockEdit,
    save: () => {
        return <InnerBlocks.Content />;
    },
    supports: {
        className: false,
        html: false,
    },
    providesContext: {
        query: 'query',
        'enokh-blocks/query': 'query',
        'enokh-blocks/queryId': 'uniqueId',
        queryId: 'uniqueId',
        'enokh-blocks/inheritQuery': 'inheritQuery',
    },
} );
