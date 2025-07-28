import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const MinWidthControl = ( props: MinWidthControlProps ): JSX.Element => {
    const { value, onChange, disabled, placeholder } = props;
    return (
        <UnitControl
            label={ __( 'Min Width', 'enokh-blocks' ) }
            id="enokh-blocks-min-width"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
            disabled={ disabled }
        />
    );
};
export default MinWidthControl;
