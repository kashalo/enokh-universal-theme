import { __ } from '@wordpress/i18n';
import { Notice, RangeControl } from '@wordpress/components';

const ImageOpacityControl = ( props: ImageOpacityControlProps ): JSX.Element => {
    const { value, onChange, isPseudoElement } = props;
    return (
        <>
            <RangeControl
                label={ __( 'Image Opacity', 'enokh-blocks' ) }
                value={ value }
                onChange={ onChange }
                min={ 0 }
                max={ 1 }
                step={ 0.01 }
                initialPosition={ 1 }
            />

            { 1 !== value && ! isPseudoElement && (
                <Notice className="enokh-blocks-option-notice" status="info" isDismissible={ false }>
                    { __( 'Your selector must be set to Pseudo Element to use opacity.', 'enokh-blocks' ) }
                </Notice>
            ) }
        </>
    );
};
export default ImageOpacityControl;
