import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const WidthControl = ( props: WidthControlProps ): JSX.Element => {
    const { value, placeholder, onChange } = props;

    return (
        <UnitControl
            label={ __( 'Width', 'enokh-blocks' ) }
            id="enokh-blocks-width"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default WidthControl;
