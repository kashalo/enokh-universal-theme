import UnitControl from '../../../../components/UnitControl';
import { __ } from '@wordpress/i18n';

interface HorizontalGapControlProps {
    value: string;
    onChange( string );
    placeholder: string;
}

const HorizontalGapControl = ( props: HorizontalGapControlProps ): JSX.Element => {
    const { value, onChange, placeholder } = props;

    return (
        <UnitControl
            label={ __( 'Horizontal Gap', 'enokh-blocks' ) }
            id="enokh-blocks-horizonral-gap"
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
            unitCount={ 1 }
        />
    );
};
export default HorizontalGapControl;
