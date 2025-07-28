import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

const ZIndexControl = ( props: ZIndexControlProps ): JSX.Element => {
    const { value, onChange, label, placeholder } = props;
    return (
        <TextControl
            label={ label || __( 'z-index', 'enokh-blocks' ) }
            type={ 'number' }
            value={ value || 0 === value ? value : '' }
            placeholder={ placeholder }
            onChange={ onChange }
            onBlur={ () => {
                if ( value || 0 === value ) {
                    onChange( parseFloat( value.toString() ) );
                }
            } }
            onClick={ ( e ) => {
                // @ts-ignore
                e.currentTarget.focus();
            } }
        />
    );
};

export default ZIndexControl;
