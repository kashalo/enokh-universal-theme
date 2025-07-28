import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const MaxWidthControl = ( props: MaxWidthControlProps ): JSX.Element => {
    const { value, onChange, disabled, overrideValue, overrideAction, placeholder } = props;
    return (
        <UnitControl
            label={ __( 'Max Width', 'enokh-blocks' ) }
            id="enokh-blocks-max-width"
            overrideValue={ overrideValue }
            disabled={ disabled }
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
            overrideAction={ overrideAction }
        />
    );
};
export default MaxWidthControl;
