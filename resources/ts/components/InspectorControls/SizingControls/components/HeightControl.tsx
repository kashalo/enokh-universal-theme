import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const HeightControl = ( props: HeightControlProps ): JSX.Element => {
    const { value, onChange, placeholder } = props;
    return (
        <UnitControl
            label={ __( 'Height', 'enokh-blocks' ) }
            id="enokh-blocks-height"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default HeightControl;
