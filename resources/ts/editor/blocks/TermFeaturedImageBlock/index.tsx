import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import blockAttributes from './attributes';
import TermFeaturedImageBlockEdit from './edit';

const attributes = Object.assign( {}, blockAttributes );
const config = EnokhBlocksEditor.Blocks.TermFeaturedImageBlock;

registerBlockType( config.name, {
    apiVersion: config.apiVersion,
    title: config.title,
    icon: config.icon,
    category: config.category,
    attributes,
    edit: TermFeaturedImageBlockEdit,
    save: () => {
        return <InnerBlocks.Content />;
    },
    supports: {
        align: [ 'left', 'right', 'center', 'wide', 'full' ],
        __experimentalBorder: {
            color: true,
            radius: true,
            width: true,
            __experimentalSelector: 'img, .block-editor-media-placeholder, .wp-block-post-featured-image__overlay',
            __experimentalSkipSerialization: true,
            __experimentalDefaultControls: {
                color: true,
                radius: true,
                width: true,
            },
        },
        html: false,
        spacing: {
            margin: true,
            padding: true,
        },
    },
} );
