import { __ } from '@wordpress/i18n';
import CustomSelectControl from '../../../CustomSelectControl';
import { ToggleControl } from '@wordpress/components';

const getOptions = ( dynamicContentType, dynamicSource, isPagination = false, name, isSharing = false ) => {
    let defaultOptions = [
        {
            options: [ { value: '', label: __( 'Select…', 'enokh-blocks' ) } ],
        },
        {
            label: __( 'Post', 'enokh-blocks' ),
            options: [ { value: 'single-post', label: __( 'Single post', 'enokh-blocks' ) } ],
        },
    ];

    if ( 'terms' === dynamicContentType ) {
        defaultOptions = [
            {
                options: [ { value: '', label: __( 'Select…', 'enokh-blocks' ) } ],
            },
            {
                label: __( 'Term', 'enokh-blocks' ),
                options: [ { value: 'term-archive', label: __( 'Term archive', 'enokh-blocks' ) } ],
            },
        ];
    }

    if ( isPagination ) {
        defaultOptions = [
            {
                options: [ { value: '', label: __( 'Select…', 'enokh-blocks' ) } ],
            },
            {
                label: __( 'Pagination', 'enokh-blocks' ),
                options: [
                    { value: 'pagination-prev', label: __( 'Previous page', 'enokh-blocks' ) },
                    { value: 'pagination-next', label: __( 'Next page', 'enokh-blocks' ) },
                ],
            },
        ];

        if ( 'pagination-numbers' === dynamicContentType ) {
            defaultOptions = [];
        }
    }

    if ( isSharing ) {
        defaultOptions = [
            {
                options: [ { value: '', label: __( 'Select…', 'enokh-blocks' ) } ],
            },
            {
                label: __( 'Sharing', 'enokh-blocks' ),
                options: [
                    { value: 'facebook', label: __( 'Facebook', 'enokh-blocks' ) },
                    { value: 'x', label: __( 'X', 'enokh-blocks' ) },
                    { value: 'pinterest', label: __( 'Pinterest', 'enokh-blocks' ) },
                    { value: 'linkedIn', label: __( 'LinkedIn', 'enokh-blocks' ) },
                    { value: 'reddit', label: __( 'Reddit', 'enokh-blocks' ) },
                    { value: 'whatsapp', label: __( 'Whatsapp', 'enokh-blocks' ) },
                    { value: 'line', label: __( 'LINE', 'enokh-blocks' ) },
                    { value: 'send-email', label: __( 'Email', 'enokh-blocks' ) },
                    { value: 'copy-link', label: __( 'Copy Link', 'enokh-blocks' ) },
                    { value: 'print', label: __( 'Print', 'enokh-blocks' ) },
                ],
            },
        ];

        if ( 'pagination-numbers' === dynamicContentType ) {
            defaultOptions = [];
        }
    }

    if ( 'enokh-blocks/image' === name ) {
        defaultOptions.splice( 1, 0, {
            label: __( 'Image', 'enokh-blocks' ),
            options: [ { value: 'single-image', label: __( 'Single image', 'enokh-blocks' ) } ],
        } );
    }

    if ( 'current-term' === dynamicSource ) {
        defaultOptions = [
            {
                options: [ { value: '', label: __( 'Select…', 'enokh-blocks' ) } ],
            },
            {
                label: __( 'Term', 'enokh-blocks' ),
                options: [ { value: 'term-archive', label: __( 'Term archive', 'enokh-blocks' ) } ],
            },
        ];
    }

    return defaultOptions;
};

export default ( {
    linkType,
    dynamicContentType,
    setAttributes,
    isPagination,
    name,
    dynamicLinkRemoveIfEmpty,
    isSharing,
    dynamicSource,
} ) => {
    const options = getOptions( dynamicContentType, dynamicSource, isPagination, name, isSharing ) as [];

    if ( options.length === 0 ) {
        return null;
    }

    const value = options
        .reduce( ( result, group: any ) => result.concat( group.options ), [] )
        .filter( ( option ) => option.value === linkType );

    return (
        <>
            <CustomSelectControl
                id={ 'enokh-blocks-select-link-type-control' }
                label={ __( 'Link source', 'enokh-blocks' ) }
                placeholder={ __( 'Link source', 'enokh-blocks' ) }
                options={ options }
                value={ value }
                onChange={ ( option ) => setAttributes( { dynamicLinkType: option.value } ) }
            />

            { !! linkType && (
                <ToggleControl
                    label={ __( 'Remove block if link is empty', 'enokh-blocks' ) }
                    checked={ !! dynamicLinkRemoveIfEmpty }
                    onChange={ ( newValue ) => setAttributes( { dynamicLinkRemoveIfEmpty: newValue } ) }
                />
            ) }
        </>
    );
};
