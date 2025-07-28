import { addFilter } from '@wordpress/hooks';
const addPaginationBlockParent = ( settings, name ) => {
    if ( name !== 'core/query-pagination' ) {
        return settings;
    }

    /**
     * On WordPress 6.5 the core/query-pagination "parents" were moved to "ancestors"
     * property and the "parent" property doesn't exist by default in the block settings
     */
    if ( typeof settings.ancestor === 'undefined' ) {
        settings.ancestor = [];
    }

    settings.ancestor.push( 'enokh-blocks/query-loop' );

    return settings;
};

addFilter( 'blocks.registerBlockType', 'enokh-blocks/add-pagination-block-parent', addPaginationBlockParent );
