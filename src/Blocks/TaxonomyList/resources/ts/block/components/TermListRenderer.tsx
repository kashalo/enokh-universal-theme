import React from 'react';
import { useMemo } from '@wordpress/element';
import { useTaxonomyRecords } from '@enokh-blocks/stores';
import LoopRenderer from './LoopRenderer';
import _slice from 'lodash/slice';
import _isNil from 'lodash/isNil';

const removeEmpty = ( obj: object ) => {
    return Object.fromEntries(
        Object.entries( obj ).filter( ( [ idx, value ] ) => {
            return Array.isArray( value ) ? !! value.length : ! _isNil( value );
        } )
    );
};

function normalizeArgs( query ) {
    const defaultNumber = !! query.terms_number ? query.terms_number : 10;
    const number = '-1' === query.terms_number || parseInt( query.terms_number ) > 50 ? 50 : defaultNumber;

    /**
     * Override parent
     */
    if ( !! query.showOnlyTopLevel || !! query.showHierarchy ) {
        query.parent = 0;
    }

    return Object.assign( {}, query, { number } );
}

const TermListRenderer: React.FunctionComponent< any > = ( props ) => {
    const { clientId, context } = props;
    const query = context[ 'enokh-blocks/termQuery' ] || {};
    const normalizedQuery = useMemo( () => {
        return normalizeArgs( removeEmpty( query ) );
    }, [ JSON.stringify( query ) ] );
    const taxonomy = context[ 'enokh-blocks/taxonomyType' ] || {};
    const termShowPostCounts = context[ 'enokh-blocks/termShowPostCounts' ] || false;
    const { records, isResolving } = useTaxonomyRecords( taxonomy, normalizedQuery );
    const offsetNumber = !! query.offset ? Number( query.offset ) : 0;
    const defaultNumber = !! query.terms_number ? Number( query.terms_number ) : 0;
    const limitNumber = offsetNumber + defaultNumber;
    const terms = !! query.terms_number ? _slice( records, offsetNumber, limitNumber ) : records;
    const contextCallback = ( termItem ) => {
        return {
            termId: termItem.id,
            taxonomyType: termItem.taxonomy,
            termShowPostCounts,
        };
    };

    return (
        <div className="enokh-blocks-term-template-wrapper">
            <LoopRenderer
                data={ terms }
                hasData={ !! terms.length }
                isResolvingData={ isResolving }
                hasResolvedData={ !! terms }
                templateLock={ true }
                clientId={ clientId }
                contextCallback={ contextCallback }
            >
                Test children
            </LoopRenderer>
        </div>
    );
};

export default TermListRenderer;
