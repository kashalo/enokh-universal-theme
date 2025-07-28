import UnitControl from '../../../../components/UnitControl';
import { __ } from '@wordpress/i18n';

interface VerticalGapControlProps {
    value: string;
    onChange( string );
    placeholder: string;
}

const VerticalGapControl = ( props: VerticalGapControlProps ): JSX.Element => {
    const { value, onChange, placeholder } = props;

    return (
        <UnitControl
            label={ __( 'Vertical Gap', 'enokh-blocks' ) }
            id="enokh-blocks-vertical-gap"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
            unitCount={ 1 }
        />
    );
};
export default VerticalGapControl;
