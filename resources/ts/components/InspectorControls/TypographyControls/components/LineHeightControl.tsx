import { __ } from '@wordpress/i18n';
import UnitControl from '../../../UnitControl';

const LineHeightControl = ( props: LineHeightControlProps ): JSX.Element => {
    const { value, placeholder, onChange, defaultUnit } = props;
    return (
        <UnitControl
            label={ __( 'Line Height', 'enokh-blocks' ) }
            id="enokh-blocks-line-height"
            defaultUnit={ defaultUnit }
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
};
export default LineHeightControl;
