import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

const FillHorizontalSpace = ( { checked, onChange } ) => (
    <ToggleControl label={ __( 'Fill Horizontal Space', 'enokh-blocks' ) } checked={ checked } onChange={ onChange } />
);
export default FillHorizontalSpace;
