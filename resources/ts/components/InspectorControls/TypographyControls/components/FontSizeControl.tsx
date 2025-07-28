import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const FontSizeControl = ( props: FontSizeControlProps ): JSX.Element => {
    const { value, placeholder, onChange } = props;
    return (
        <UnitControl
            label={ __( 'Font Size', 'enokh-blocks' ) }
            id="enokh-blocks-font-size"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default FontSizeControl;
