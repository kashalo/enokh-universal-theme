import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const LetterSpacingControl = ( props: LetterSpacingControlProps ): JSX.Element => {
    const { value, placeholder, onChange, defaultUnit } = props;
    return (
        <UnitControl
            label={ __( 'Letter Spacing', 'enokh-blocks' ) }
            id="enokh-blocks-letter-spacing"
            defaultUnit={ defaultUnit }
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default LetterSpacingControl;
