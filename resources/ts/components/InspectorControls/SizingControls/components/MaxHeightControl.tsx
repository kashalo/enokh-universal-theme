import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const MaxHeightControl = ( props: MaxHeightControlProps ): JSX.Element => {
    const { value, onChange, placeholder } = props;
    return (
        <>
            <UnitControl
                label={ __( 'Max Height', 'enokh-blocks' ) }
                id="enokh-blocks-max-height"
                value={ value }
                placeholder={ placeholder }
                onChange={ onChange }
            />
        </>
    );
};
export default MaxHeightControl;
