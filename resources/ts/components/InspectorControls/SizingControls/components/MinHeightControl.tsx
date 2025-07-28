import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const MinHeightControl = ( props: MinHeightControlProps ): JSX.Element => {
    const { value, onChange, placeholder } = props;
    return (
        <UnitControl
            label={ __( 'Min Height', 'enokh-blocks' ) }
            id="enokh-blocks-min-height"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default MinHeightControl;
