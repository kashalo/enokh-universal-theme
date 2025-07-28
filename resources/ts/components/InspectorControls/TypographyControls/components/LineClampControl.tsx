import { __ } from '@wordpress/i18n';
import { FC } from 'react';
import CustomRangeControl from '@enokh-blocks/components/CustomRangeControl';

const LineClampControl: FC< LineClampControlProps > = ( props ) => {
    const { value, onChange, placeholder } = props;

    return (
        <CustomRangeControl
            label={ __( 'Line Clamp', 'enokh-blocks' ) }
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
            rangeMin={ 1 }
            rangeMax={ 10 }
            step={ 1 }
        />
    );
};
export default LineClampControl;
