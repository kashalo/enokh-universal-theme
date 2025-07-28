import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const AbsoluteLeftControl = ( props: AbsolutePositionControlProps ): JSX.Element => {
    const { value, placeholder, onChange } = props;

    return (
        <UnitControl
            label={ __( 'Left', 'enokh-blocks' ) }
            id="enokh-blocks-absolute-left-position"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default AbsoluteLeftControl;
