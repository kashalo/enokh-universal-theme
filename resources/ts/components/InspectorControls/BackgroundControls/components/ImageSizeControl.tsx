import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

const ImageSizeControl = ( props: ImageSizeControlProps ) => {
    const { value, onChange } = props;
    const bgImageSizes = [];
    const imageSizesConfig = EnokhBlocksEditor.Config.imageSizes;

    Object.keys( imageSizesConfig ).forEach( ( size ) => {
        bgImageSizes.push( {
            label: imageSizesConfig[ size ],
            value: imageSizesConfig[ size ],
        } );
    } );

    return (
        <SelectControl
            label={ __( 'Image Size', 'enokh-blocks' ) }
            value={ value }
            options={ bgImageSizes }
            onChange={ onChange }
        />
    );
};
export default ImageSizeControl;
