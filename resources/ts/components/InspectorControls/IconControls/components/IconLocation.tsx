import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export default function IconLocation( { value, onChange, options } ) {
    return (
        <SelectControl
            label={ __( 'Icon Location', 'enokh-blocks' ) }
            value={ value }
            options={ options }
            onChange={ onChange }
        />
    );
}
