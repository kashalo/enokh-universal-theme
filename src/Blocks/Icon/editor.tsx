// Stylesheets
import './editor.scss';

// WordPress dependencies
import { Icon, info } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

// Implementation dependencies
import blockJson from './block.json';
import Edit from './resources/ts/block/edit';
import { __ } from '@wordpress/i18n';

/**
 * Not reading block.json as it will increase build size
 */
registerBlockType( blockJson.name, {
    icon: <Icon icon={ info } />,
    edit: Edit,
    save: () => null,
    __experimentalLabel: ( attrs, { context } ) => {
        const customName = attrs?.metadata?.name;

        if ( context === 'list-view' && customName ) {
            return customName;
        }

        if ( attrs.isAccordionExpand ) {
            return __( 'Expand Icon', 'enokh-blocks' );
        }

        if ( attrs.isAccordionCollapse ) {
            return __( 'Collapse Icon', 'enokh-blocks' );
        }

        return __( 'Icon', 'enokh-blocks' );
    },
} );
