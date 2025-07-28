import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { ToggleControl } from '@wordpress/components';

const applyWithSelect = withSelect( ( select ) => {
    const editor = select( 'core/editor' );
    const meta = editor.getEditedPostAttribute( 'meta' );
    return {
        excludeFromSearch: meta ? meta[ 'mah-blocks__exclude-from-search' ] : '',
        type: select( 'core/editor' ).getEditedPostAttribute( 'type' ),
    };
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
    const editor = dispatch( 'core/editor' );
    return {
        onUpdateValue: ( value ) => {
            editor.editPost( {
                meta: {
                    'mah-blocks__exclude-from-search': value,
                },
            } );
        },
    };
} );

let ExcludeFromSearchMeta = ( props ) => {
    if ( props.type !== 'page' && props.type !== 'post' ) {
        return null;
    }

    return (
        <PluginDocumentSettingPanel name="enokh-blocks-exclude-from-search-setting" title="Search Settings">
            <ToggleControl
                label="Exclude this from WP search results"
                checked={ !! props.excludeFromSearch }
                onChange={ props.onUpdateValue }
            />
        </PluginDocumentSettingPanel>
    );
};

// @ts-ignore
ExcludeFromSearchMeta = compose( applyWithSelect, applyWithDispatch )( ExcludeFromSearchMeta );

registerPlugin( 'enokh-blocks-exclude-from-search-setting', {
    render: () => <ExcludeFromSearchMeta />,
    icon: undefined,
} );
