import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import options from '../options';

const TextTransformControl = ( props: TextTransformControlProps ): JSX.Element => {
    const { value, onChange } = props;
    return (
        <SelectControl
            labelPosition={ 'top' }
            label={ __( 'Transform', 'enokh-blocks' ) }
            value={ value }
            options={ options.textTransform }
            onChange={ onChange }
        />
    );
};
export default TextTransformControl;
