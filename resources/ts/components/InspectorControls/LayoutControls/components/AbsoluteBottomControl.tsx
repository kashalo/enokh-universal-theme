import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const AbsoluteBottomControl = ( props: AbsolutePositionControlProps ): JSX.Element => {
    const { value, placeholder, onChange } = props;

    return (
        <UnitControl
            label={ __( 'Bottom', 'enokh-blocks' ) }
            id="enokh-blocks-absolute-bottom-position"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default AbsoluteBottomControl;
