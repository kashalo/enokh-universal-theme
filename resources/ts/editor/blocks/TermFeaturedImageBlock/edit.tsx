import {
    InspectorControls,
    BlockControls,
    MediaPlaceholder,
    MediaReplaceFlow,
    useBlockProps,
    store as blockEditorStore,
    __experimentalUseBorderProps as useBorderProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import DimensionControls from './dimension-controls';

const TermFeaturedImageBlockEdit = ( props: TermFeaturedImageBlockProps ) => {
    const { attributes, clientId, setAttributes } = props;
    const { aspectRatio, height, width, scale, sizeSlug, rel } = attributes;
    const mediaUrl = EnokhBlocksEditor.Config.placeholderImageURL;
    const blockProps = useBlockProps( {
        style: { width, height, aspectRatio },
    } );
    const borderProps = useBorderProps( attributes );
    const imageStyles = {
        ...borderProps.style,
        height: aspectRatio ? '100%' : height,
        width: !! aspectRatio && '100%',
        objectFit: !! ( height || aspectRatio ) && scale,
    };
    return (
        <>
            <DimensionControls clientId={ clientId } attributes={ attributes } setAttributes={ setAttributes } />
            <figure { ...blockProps }>
                <img
                    className={ borderProps.className }
                    src={ mediaUrl }
                    alt={ __( 'Featured image' ) }
                    style={ imageStyles }
                />
            </figure>
        </>
    );
};

export default TermFeaturedImageBlockEdit;
