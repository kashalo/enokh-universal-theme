import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import LoopRenderer from './LoopRenderer';
import { store as coreStore } from '@wordpress/core-data';

function getTaxQueryParam( taxQuery, isExclude = false ) {
    const paramKey = isExclude ? `${ taxQuery.rest }_exclude` : taxQuery.rest;
    return {
        [ paramKey ]: {
            terms: taxQuery.terms,
            include_children: taxQuery?.includeChildren,
        },
    };
}

const removeEmpty = ( obj: object ) => {
    return Object.fromEntries(
        Object.entries( obj ).filter( ( [ idx, value ] ) => {
            return Array.isArray( value ) ? !! value.length : !! value;
        } )
    );
};

function normalizeTaxQuery( taxQueryValue, isExclude = false ) {
    return taxQueryValue.reduce( ( normalized, taxQuery ) => {
        return Object.assign( {}, normalized, getTaxQueryParam( taxQuery, isExclude ) );
    }, {} );
}

function normalizeArgs( query ) {
    const defaultPerPage = !! query.per_page ? query.per_page : 10;
    const perPage = '-1' === query.per_page || parseInt( query.per_page ) > 50 ? 50 : defaultPerPage;

    let sticky;

    if ( 'exclude' === query.stickyPosts ) {
        sticky = false;
    } else if ( 'only' === query.stickyPosts ) {
        sticky = true;
    }

    return Object.assign( {}, query, { per_page: perPage, sticky } );
}

function normalizeRepeatableArgs( query ) {
    let normalizedQuery = normalizeArgs( query );

    if ( Array.isArray( normalizedQuery.tax_query ) ) {
        const normalizedTaxQuery = normalizeTaxQuery( normalizedQuery.tax_query );
        normalizedQuery = Object.assign( {}, normalizedQuery, normalizedTaxQuery, { tax_query: undefined } );
    }

    if ( Array.isArray( normalizedQuery.tax_query_exclude ) ) {
        const normalizedTaxQueryExclude = normalizeTaxQuery( normalizedQuery.tax_query_exclude, true );
        normalizedQuery = Object.assign( {}, normalizedQuery, normalizedTaxQueryExclude, {
            tax_query_exclude: undefined,
        } );
    }

    return normalizedQuery;
}

export default function QueryLoopRenderer( props ) {
    const { clientId, context } = props;
    const query = context[ 'enokh-blocks/query' ] || {};
    const normalizedQuery = useMemo( () => {
        return normalizeRepeatableArgs( removeEmpty( query ) );
    }, [ JSON.stringify( query ) ] );
    const { data, isResolvingData, hasResolvedData } = useSelect(
        ( select ) => {
            const { getEntityRecords, isResolving, hasFinishedResolution } = select( coreStore ) as any;
            const queryParams = [ 'postType', query.post_type || 'post', normalizedQuery ];

            return {
                data: getEntityRecords( ...queryParams ),
                isResolvingData: isResolving( 'getEntityRecords', queryParams ),
                hasResolvedData: hasFinishedResolution( 'getEntityRecords', queryParams ),
            };
        },
        [ JSON.stringify( normalizedQuery ) ]
    );

    return (
        <div className="enokh-blocks-post-template-wrapper">
            <LoopRenderer
                data={ data }
                hasData={ !! ( hasResolvedData && data?.length ) }
                isResolvingData={ isResolvingData }
                hasResolvedData={ hasResolvedData }
                templateLock={ true }
                clientId={ clientId }
                contextCallback={ ( post ) => ( {
                    postType: post.type,
                    postId: post.id,
                } ) }
            />
        </div>
    );
}
