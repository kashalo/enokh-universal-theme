import { __, _x } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

const AspectRatioControl = ( props: AspectRatioControlProps ): JSX.Element => {
    const { label, placeholder, value, defaultValue, onChange } = props;

    const options = [
        { value: '', label: _x( 'None', 'Aspect ratio option', 'enokh-blocks' ) },
        { value: 'auto', label: _x( 'Auto', 'Aspect ratio option', 'enokh-blocks' ) },
        { value: '1/1', label: _x( '1:1', 'Aspect ratio option', 'enokh-blocks' ) },
        { value: '2/1', label: _x( '2:1', 'Aspect ratio option', 'enokh-blocks' ) },
        { value: '16/9', label: _x( '16:9', 'Aspect ratio option', 'enokh-blocks' ) },
        { value: '4/3', label: _x( '4:3', 'Aspect ratio option', 'enokh-blocks' ) },
        { value: '3/4', label: _x( '3:4', 'Aspect ratio option', 'enokh-blocks' ) },
    ];

    return (
        <SelectControl
            id={ 'enokh-blocks-select-aspect-ratio-control' }
            label={ label || __( 'Aspect ratio', 'enokh-blocks' ) }
            options={ options }
            value={ value || defaultValue }
            onChange={ onChange }
        />
    );
};
export default AspectRatioControl;
