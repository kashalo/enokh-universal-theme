import { __, sprintf } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import { getContent } from '../utils';
import usePostRecord from './usePostRecord';
import { useTaxonomyRecords } from '@enokh-blocks/stores/index';

function getExtraLoad( contentType, attributes ) {
    const load = [];
    let loadOptions = {};

    if ( contentType.startsWith( 'author-' ) ) {
        load.push( 'author' );
    }

    if ( contentType === 'terms' ) {
        load.push( 'terms' );
        loadOptions = Object.assign( {}, loadOptions, { taxonomy: attributes.termTaxonomy } );
    }

    if ( contentType === 'primary-term' ) {
        load.push( 'terms' );
        loadOptions = Object.assign( {}, loadOptions, { taxonomy: 'category' } );
    }

    if ( contentType === 'species-term' ) {
        load.push( 'terms' );
        loadOptions = Object.assign( {}, loadOptions, { taxonomy: 'species' } );
    }

    if ( contentType === 'comments-number' ) {
        load.push( 'comments' );
    }

    if ( contentType === 'icon-meta' ) {
        load.push( 'terms' );
        loadOptions = Object.assign( {}, loadOptions, { taxonomy: attributes.termTaxonomy } );
    }

    return { load, loadOptions };
}

export default ( attributes, name ) => {
    const { postId, postType, dynamicSource, termTaxonomy, termId, taxonomyType } = attributes;
    const isCurrentPostSelected = dynamicSource === 'current-post';
    const isTaxonomySelected = dynamicSource === 'taxonomy';
    const isCurrentTermSelected = dynamicSource === 'current-term';

    if ( isCurrentPostSelected && ! postType ) {
        return __( 'Post type not selected.', 'enokh-blocks' );
    }

    if ( isCurrentPostSelected && postType && ! postId ) {
        return __( 'Post source not selected.', 'enokh-blocks' );
    }

    if ( isTaxonomySelected && ! termTaxonomy ) {
        return __( 'Taxonomy not selected.', 'enokh-blocks' );
    }

    if ( isTaxonomySelected && termTaxonomy && ! termId ) {
        return __( 'Term not selected.', 'enokh-blocks' );
    }

    if ( isCurrentTermSelected && ! taxonomyType ) {
        return __( 'Taxonomy not selected.', 'enokh-blocks' );
    }

    if ( isCurrentTermSelected && taxonomyType && ! termId ) {
        return __( 'Term not selected.', 'enokh-blocks' );
    }

    const [ siteFormat ] = useEntityProp( 'root', 'site', 'date_format' );
    const { load, loadOptions } = getExtraLoad( attributes.dynamicContentType, attributes );
    let record = null;
    let isLoading = false;

    if ( isCurrentPostSelected ) {
        const postRecord = usePostRecord( postType, postId, load, loadOptions );
        record = postRecord.record;
        isLoading = postRecord.isLoading;
    }

    if ( isTaxonomySelected ) {
        const taxRecords = useTaxonomyRecords( termTaxonomy );
        isLoading = taxRecords.isResolving;
        record = taxRecords.records.find( ( tx ) => tx.id === termId );
    }

    if ( isCurrentTermSelected ) {
        const taxRecords = useTaxonomyRecords( taxonomyType );
        isLoading = taxRecords.isResolving;
        record = taxRecords.records.find( ( tx ) => tx.id === termId );
    }

    if ( isLoading ) {
        return __( 'Loading…', 'enokh-blocks' );
    }

    if ( isCurrentPostSelected && ! record ) {
        return sprintf(
            // translators: %1$s: post ID, %2$s: post type.
            __( 'Post of id #%1$s and post type %2$s was not found.', 'enokh-blocks' ),
            postId,
            postType
        );
    }

    if ( isTaxonomySelected && ! record ) {
        return sprintf(
            // translators: %1$s: post ID, %2$s: post type.
            __( 'Term of id #%1$s and taxonomy %2$s was not found.', 'enokh-blocks' ),
            termId,
            termTaxonomy
        );
    }

    if ( isCurrentTermSelected && ! record ) {
        return sprintf(
            // translators: %1$s: post ID, %2$s: post type.
            __( 'Term of id #%1$s and taxonomy %2$s was not found.', 'enokh-blocks' ),
            termId,
            taxonomyType
        );
    }

    const contentAttributes = Object.assign( {}, attributes, { dateFormat: siteFormat } );
    const forceEmptyMessage = false;
    return getContent( attributes.dynamicContentType, record, contentAttributes, forceEmptyMessage );
};
