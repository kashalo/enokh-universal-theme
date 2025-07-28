import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import blockAttributes from './attributes';
import TextBlockEdit from './edit';
import getDynamicContentAttributes from '../../../components/InspectorControls/DynamicContentControls/attributes';
import { getBlockAttributes } from '../../../block-context';
import textContext from '../../../block-context/text';
import { blockDefaultValues } from '../../../utils';
import TextBlockSave from './save';

const attributes = Object.assign(
    {},
    getBlockAttributes( blockAttributes, textContext, blockDefaultValues ),
    getDynamicContentAttributes()
);
const config = EnokhBlocksEditor.Blocks.TextBlock;

registerBlockType( config.name, {
    apiVersion: 2,
    title: config.title,
    icon: config.icon,
    category: config.category,
    attributes,
    edit: TextBlockEdit,
    save: TextBlockSave,
    supports: {
        mah: {
            contentOnlyEditing: true,
        },
        className: false,
        html: false,
        anchor: true,
    },
    usesContext: [ 'postId', 'postType', 'termId', 'taxonomyType', 'termShowPostCounts' ],
    __experimentalLabel: ( attrs, { context } ) => {
        return attrs.content;
    },
} );
