import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const AbsoluteTopControl = ( props: AbsolutePositionControlProps ): JSX.Element => {
    const { value, placeholder, onChange } = props;

    return (
        <UnitControl
            label={ __( 'Top', 'enokh-blocks' ) }
            id="enokh-blocks-absolute-top-position"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default AbsoluteTopControl;
