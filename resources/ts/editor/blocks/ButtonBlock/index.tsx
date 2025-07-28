import { registerBlockType } from '@wordpress/blocks';
import blockAttributes from './attributes';
import ButtonBlockEdit from './edit';
import getDynamicContentAttributes from '../../../components/InspectorControls/DynamicContentControls/attributes';
import { getBlockAttributes } from '../../../block-context';
import buttonContext from '../../../block-context/button';
import { blockDefaultValues } from '../../../utils';
import ButtonBlockSave from './save';
import { __ } from '@wordpress/i18n';

const attributes = Object.assign(
    {},
    getBlockAttributes( blockAttributes, buttonContext, blockDefaultValues ),
    getDynamicContentAttributes()
);
const config = EnokhBlocksEditor.Blocks.ButtonBlock;

registerBlockType( config.name, {
    apiVersion: 2,
    title: config.title,
    icon: config.icon,
    category: config.category,
    attributes,
    edit: ButtonBlockEdit,
    save: ButtonBlockSave,
    supports: {
        className: true,
        html: false,
        anchor: true,
        mah: {
            contentOnlyEditing: true,
        },
    },
    usesContext: [ 'postId', 'postType', 'enokh-blocks/query', 'enokh-blocks/inheritQuery', 'termId', 'taxonomyType' ],
    __experimentalLabel: ( attrs, { context } ) => {
        const customName = attrs?.metadata?.name;

        if ( context === 'list-view' && customName ) {
            return customName;
        }

        if ( attrs.isAccordionToggle ) {
            return __( 'Toggle Button', 'enokh-blocks' );
        }

        if ( attrs.text ) {
            return attrs.text;
        }

        return __( 'MAH Button', 'enokh-blocks' );
    },
} );
