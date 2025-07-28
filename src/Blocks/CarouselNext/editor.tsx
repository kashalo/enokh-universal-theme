import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

// Implementation dependencies
import blockConfiguration from './block.json';
import Edit from './resources/ts/block/edit';
import { getIcon } from '@enokh-blocks/utils';
import deprecated from '../CarouselPrevious/deprecated';

registerBlockType( blockConfiguration.name, {
    title: blockConfiguration.title,
    icon: getIcon( 'carousel-next' ),
    edit: Edit,
    save: () => {
        return <InnerBlocks.Content />;
    },
    deprecated,
} );
