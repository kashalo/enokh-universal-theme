import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

const InlineWidth = ( { checked, onChange } ) => (
    <ToggleControl label={ __( 'Inline Width', 'enokh-blocks' ) } checked={ checked } onChange={ onChange } />
);
export default InlineWidth;
