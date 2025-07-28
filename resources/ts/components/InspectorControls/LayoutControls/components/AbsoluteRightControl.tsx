import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const AbsoluteRightControl = ( props: AbsolutePositionControlProps ): JSX.Element => {
    const { value, placeholder, onChange } = props;

    return (
        <UnitControl
            label={ __( 'Right', 'enokh-blocks' ) }
            id="enokh-blocks-absolute-right-position"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default AbsoluteRightControl;
