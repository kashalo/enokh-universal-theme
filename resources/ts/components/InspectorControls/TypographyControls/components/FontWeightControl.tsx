import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import options from '../options';

const FontWeightControl = ( props: FontWeightControlProps ): JSX.Element => {
    const { value, onChange } = props;
    return (
        <SelectControl
            labelPosition={ 'top' }
            label={ __( 'Font weight', 'enokh-blocks' ) }
            value={ value }
            options={ options.fontWeight }
            onChange={ onChange }
        />
    );
};
export default FontWeightControl;
