import { __ } from '@wordpress/i18n';
import CustomSelectControl from '../../../CustomSelectControl';

const getOptions = ( dynamicSource, name, isCaption, isSharing ) => {
    let defaultOptions = [
        {
            options: [ { value: '', label: __( 'Select…', 'enokh-blocks' ) } ],
        },
        {
            label: __( 'Post', 'enokh-blocks' ),
            options: [
                { value: 'post-title', label: __( 'Title', 'enokh-blocks' ) },
                { value: 'post-excerpt', label: __( 'Excerpt', 'enokh-blocks' ) },
                { value: 'post-date', label: __( 'Post date', 'enokh-blocks' ) },
                { value: 'primary-term', label: __( 'Primary Category', 'enokh-blocks' ) },
                { value: 'species-term', label: __( 'Species Term', 'enokh-blocks' ) },
                { value: 'estimated-reading-time', label: __( 'Estimated Reading Time', 'enokh-blocks' ) },
            ],
        },
    ];

    if ( EnokhBlocksEditor.Blocks.ContainerBlock.name === name ) {
        defaultOptions = [
            {
                options: [ { value: '', label: __( 'Select…', 'enokh-blocks' ) } ],
            },
            {
                label: __( 'Post', 'enokh-blocks' ),
                options: [
                    { value: 'featured-image', label: __( 'Featured Image', 'enokh-blocks' ) },
                    { value: 'species-term', label: __( 'Species Term Color', 'enokh-blocks' ) },
                ],
            },
        ];
    }

    if ( isCaption ) {
        defaultOptions = [
            {
                options: [ { value: '', label: __( 'Select…', 'enokh-blocks' ) } ],
            },
            {
                label: __( 'Image', 'enokh-blocks' ),
                options: [
                    { value: 'caption', label: __( 'Caption', 'enokh-blocks' ) },
                    { value: 'post-title', label: __( 'Title', 'enokh-blocks' ) },
                    { value: 'alt-text', label: __( 'Alt text', 'enokh-blocks' ) },
                    { value: 'image-description', label: __( 'Description', 'enokh-blocks' ) },
                ],
            },
        ];
    }

    if ( !! isSharing ) {
        defaultOptions = [
            {
                options: [ { value: '', label: __( 'Select…', 'enokh-blocks' ) } ],
            },
        ];
    }

    if ( name === 'enokh-blocks/icon' ) {
        defaultOptions = [
            {
                label: __( 'Term', 'enokh-blocks' ),
                options: [ { value: 'icon-meta', label: __( 'Icon Meta', 'enokh-blocks' ) } ],
            },
        ];
    }

    if ( dynamicSource === 'current-term' ) {
        defaultOptions = [
            {
                label: __( 'Term', 'enokh-blocks' ),
                options: [
                    { value: 'term-title', label: __( 'Title', 'enokh-blocks' ) },
                    { value: 'term-description', label: __( 'Description', 'enokh-blocks' ) },
                ],
            },
        ];
    }

    return defaultOptions;
};

const ContentTypeControl = ( props: ContentTypeControlProps ): JSX.Element => {
    const { dynamicContentType, setAttributes, name, isCaption, isSharing, dynamicSource } = props;
    const options: any = getOptions( dynamicSource, name, isCaption, isSharing );
    const value = options
        .reduce( ( result, group ) => result.concat( group.options ), [] )
        .filter( ( option ) => option.value === dynamicContentType );

    let label = __( 'Content source', 'enokh-blocks' );

    if ( EnokhBlocksEditor.Blocks.ContainerBlock.name === name ) {
        label = __( 'Background image/color source', 'enokh-blocks' );
    }

    return (
        <CustomSelectControl
            id={ 'enokh-blocks-select-content-type-control' }
            label={ label }
            placeholder={ label }
            options={ options }
            value={ value }
            onChange={ ( option ) => {
                setAttributes( {
                    dynamicContentType: option.value,
                    metaFieldName: '',
                } );

                if ( 'comments-number' === option.value ) {
                    setAttributes( {
                        noCommentsText: __( 'No comments', 'enokh-blocks' ),
                        singleCommentText: __( '1 comment', 'enokh-blocks' ),
                        // translators: Number of comments.
                        multipleCommentsText: __( '% comments', 'enokh-blocks' ),
                    } );
                } else {
                    setAttributes( {
                        noCommentsText: '',
                        singleCommentText: '',
                        multipleCommentsText: '',
                    } );
                }

                if ( 'author-avatar' === option.value ) {
                    setAttributes( {
                        width: '50px',
                        height: '50px',
                    } );
                } else {
                    setAttributes( {
                        width: '',
                        height: '',
                    } );
                }
            } }
        />
    );
};
export default ContentTypeControl;
