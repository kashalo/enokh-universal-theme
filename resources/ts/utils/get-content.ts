import { __, sprintf } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';
import _ from 'lodash';

const moreExcerpt = ' […]';
const contentTypeSelectors = {
    'post-title': getPostTitle,
    'post-excerpt': getPostExcerpt,
    'post-date': getPostDate,
    'post-meta': getPostMetaValue,
    'pagination-numbers': getPaginationNumbers,
    'featured-image': getPostFeaturedImage,
    terms: getPostTerms,
    'primary-term': getPrimaryTerm,
    'species-term': getSpeciesTerm,
    'estimated-reading-time': getEstimatedReadingTime,
    'icon-meta': getIconMeta,
    'term-title': getTermTitle,
    'term-description': getTermDescription,
};

export default function getContent( dynamicContentType, record, attributes, emptyNotFoundMessage = false ) {
    const contentSelector = contentTypeSelectors[ dynamicContentType ];

    if ( contentSelector && typeof contentSelector === 'function' ) {
        return contentSelector( record, attributes, emptyNotFoundMessage );
    }

    return contentTypeNotSupported( record, attributes, emptyNotFoundMessage );
}

function contentTypeNotSupported( record, attributes, emptyNotFoundMessage ) {
    return ! emptyNotFoundMessage
        ? sprintf(
              // translators: %s: Content type.
              __( 'Content type %s is not supported.', 'enokh-blocks' ),
              attributes.dynamicContentType
          )
        : undefined;
}

function getPostTitle( record ) {
    if ( ! record.title ) {
        return __( 'Post title not supported for this type.', 'enokh-blocks' );
    }

    return record.title.raw || __( 'No post title.', 'enokh-blocks' );
}

function getPostExcerpt( record, attributes ) {
    if ( ! record.excerpt ) {
        return __( 'Post excerpt not supported for this type.', 'enokh-blocks' );
    }

    const { raw: rawExcerpt, rendered: renderedExcerpt, protected: isProtected } = record?.excerpt;

    if ( isProtected || ( ! rawExcerpt && ! renderedExcerpt ) ) {
        return __( 'No post excerpt.', 'enokh-blocks' );
    }

    const renderedText = ( text ) => new window.DOMParser().parseFromString( text, 'text/html' );
    const excerptDocument = renderedText( renderedExcerpt );
    const readMoreDocument = renderedText( moreExcerpt );
    const strippedRenderedExcerpt = excerptDocument.body.textContent || excerptDocument.body.innerText || '';

    let strippedExcerptMore = readMoreDocument.body.textContent || readMoreDocument.body.innerText || '';
    strippedExcerptMore = strippedExcerptMore.replace( '...', '…' );

    let excerpt = rawExcerpt.trim() ? rawExcerpt : strippedRenderedExcerpt;
    const hasReadMore = excerpt.includes( strippedExcerptMore );

    excerpt = hasReadMore ? excerpt.replace( strippedExcerptMore, '' ) : excerpt;
    excerpt = excerpt.split( ' ' ).splice( 0, attributes.excerptLength ).join( ' ' );

    if ( ! attributes.useDefaultMoreLink ) {
        excerpt += ' ... ' + '<a href="#">' + attributes.customMoreLinkText + '</a>';
    } else if ( hasReadMore ) {
        excerpt += moreExcerpt;
    }

    return excerpt;
}

function getPostDate( record, attributes ) {
    let dateType = attributes.dateType;

    if ( dateType === 'published' && attributes.dateReplacePublished ) {
        dateType = 'updated';
    }

    if ( ! record.date ) {
        return __( 'No post date.', 'enokh-blocks' );
    }

    const dateContent = dateType === 'updated' ? record.modified : record.date;

    return dateI18n( attributes.dateFormat || 'F j, Y', dateContent, '' );
}

const getMetaValue = ( metaField, metaValues, emptyNotFoundMessage = false, attributes = {} ) => {
    if ( !! metaValues && !! metaField ) {
        const value = metaValues[ metaField ];

        if ( _.isEmpty( value ) && ! _.isNumber( value ) ) {
            return metaField;
        }

        const notSupportedMessage = ! emptyNotFoundMessage
            ? __( 'Meta field value not supported.', 'enokh-blocks' )
            : undefined;

        return _.isString( value ) || _.isNumber( value ) ? _.toString( value ) : notSupportedMessage;
    }

    return ! emptyNotFoundMessage ? __( 'Meta value', 'enokh-blocks' ) : undefined;
};

function getPostMetaValue( record, attributes, emptyNotFoundMessage = false ) {
    return getMetaValue( attributes.metaFieldName, record.meta, emptyNotFoundMessage, attributes );
}

function getPrimaryTerm( record, attributes, emptyNotFoundMessage = false ) {
    if ( ! record.terms || ! record.primary_category ) {
        return __( 'No primary category', 'enokh-blocks' );
    }

    const term = record.terms.find( ( recTerm ) => {
        return recTerm.id === record.primary_category;
    } );
    return term?.name;
}

function getPostTerms( record, attributes ) {
    if ( Array.isArray( record.terms ) && record.terms.length > 0 ) {
        return record.terms.map( ( term ) => term.name ).join( attributes.termSeparator );
    }

    return 'No terms';
}

function getPaginationNumbers() {
    return __( '1 … 2 3', 'enokh-blocks' );
}

function getPostFeaturedImage( record ) {
    return record?.featured_media;
}

function getSpeciesTerm( record ) {
    if ( Array.isArray( record.terms ) && record.terms.length > 0 ) {
        return record.terms[ 0 ].name;
    }

    return 'No species';
}

function getEstimatedReadingTime( record, attributes ) {
    const { estimatedReadingTime } = attributes;
    const { descriptiveText, postFix } = estimatedReadingTime;

    return `${ descriptiveText } xx ${ postFix }`;
}

function getIconMeta( record ) {
    /* eslint-disable camelcase */
    const { icon, icon_set } = record;
    return { icon, iconSet: icon_set };
}

function getTermTitle( record, attributes ) {
    if ( ! record.name ) {
        return __( 'Term title not supported for this type.', 'enokh-blocks' );
    }

    if ( record.name === '' ) {
        return __( 'No term title.', 'enokh-blocks' );
    }
    let termName = record.name;
    const { termShowPostCounts } = attributes;

    if ( !! termShowPostCounts ) {
        termName += `(${ record.count || 0 })`;
    }
    return termName;
}

function getTermDescription( record ) {
    if ( ! record.description ) {
        return __( 'Term description not supported for this type.', 'enokh-blocks' );
    }

    return record.description || __( 'No term description.', 'enokh-blocks' );
}
