import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

addFilter(
    'enokh-blocks.editor.blockContext',
    'enokh-blocks/container-context/remove-sizing-controls',
    ( context, props ) => {
        const { name } = props;

        if ( 'enokh-blocks/container' !== name ) {
            return context;
        }

        const { isCarouselItem } = props.attributes;

        // Disable sizing panel for carousel item
        context.supports.sizingPanel.enabled = ! isCarouselItem;

        return context;
    }
);
