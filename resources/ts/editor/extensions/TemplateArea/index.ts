import { addFilter } from '@wordpress/hooks';

const TEMPLATE_AREA_ATTR = 'templateArea';
const addTemplateAreaAttributes = ( settings, name ) => {
    settings.attributes = Object.assign( settings.attributes, {
        [ TEMPLATE_AREA_ATTR ]: {
            type: 'string',
            default: '',
        },
    } );

    return settings;
};

addFilter( 'blocks.registerBlockType', 'enokh-blocks/add-template-area-attributes', addTemplateAreaAttributes );
