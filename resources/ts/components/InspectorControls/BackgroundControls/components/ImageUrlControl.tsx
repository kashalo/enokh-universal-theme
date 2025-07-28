import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Notice, TextControl, Tooltip } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';

const ImageUrlControl = ( props: ImageUrlControlProps ): JSX.Element => {
    const { bgImage, setAttributes, isUsingFeaturedImage } = props;

    return (
        <>
            <BaseControl id="enokh-blocks-background-image-upload" label={ __( 'Image URL', 'enokh-blocks' ) }>
                <div className="enokh-blocks-bg-image-wrapper">
                    <TextControl
                        type={ 'text' }
                        value={ !! bgImage ? bgImage.image.url : '' }
                        onChange={ ( value ) => {
                            if ( ! value ) {
                                setAttributes( { bgImage: null } );
                            } else {
                                setAttributes( {
                                    bgImage: {
                                        id: '',
                                        image: {
                                            url: value,
                                        },
                                    },
                                } );
                            }
                        } }
                    />

                    <div className="enokh-blocks-background-image-action-buttons">
                        <MediaUpload
                            title={ __( 'Set background image', 'enokh-blocks' ) }
                            onSelect={ ( media ) => {
                                let size = 'full';

                                if ( 'undefined' === typeof media.sizes[ size ] ) {
                                    size = 'full';
                                }

                                setAttributes( {
                                    bgImage: {
                                        id: media.id,
                                        image: media.sizes[ size ],
                                    },
                                } );
                            } }
                            onClose={ () => {
                                // @ts-ignore
                                document.querySelector( '.enokh-blocks-bg-image-wrapper input' ).focus();
                            } }
                            allowedTypes={ [ 'image' ] }
                            value={ !! bgImage ? bgImage.id : '' }
                            modalClass="editor-enokh-blocks-container-background__media-modal"
                            render={ ( { open } ) => (
                                <Tooltip text={ __( 'Open the Media Library', 'enokh-blocks' ) }>
                                    <Button onClick={ open } className="is-secondary is-small">
                                        { __( 'Browse', 'enokh-blocks' ) }
                                    </Button>
                                </Tooltip>
                            ) }
                        />
                    </div>
                </div>
            </BaseControl>

            { isUsingFeaturedImage && (
                <Notice className="enokh-blocks-option-notice" status="info" isDismissible={ false }>
                    { __( 'Using featured image as dynamic background.', 'enokh-blocks' ) }
                </Notice>
            ) }
        </>
    );
};
export default ImageUrlControl;
