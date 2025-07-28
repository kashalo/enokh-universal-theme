import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

const StackVertically = ( { checked, onChange } ) => (
    <ToggleControl label={ __( 'Stack Vertically', 'enokh-blocks' ) } checked={ checked } onChange={ onChange } />
);
export default StackVertically;
