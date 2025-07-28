import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ExcerptControls = ( props: ExcerptControlsProps ): JSX.Element => {
    const { attributes, setAttributes } = props;
    const { excerptLength } = attributes;
    return (
        <>
            <TextControl
                label={ __( 'Excerpt length (words)', 'enokh-blocks' ) }
                type="number"
                value={ excerptLength }
                min={ 0 }
                autoComplete="off"
                onChange={ ( value ) => {
                    setAttributes( {
                        excerptLength: parseInt( value ),
                    } );
                } }
            />
        </>
    );
};
export default ExcerptControls;
