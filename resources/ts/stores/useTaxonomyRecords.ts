import { isUndefined } from 'lodash';
import { useSelect } from '@wordpress/data';
import { store } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';
import useRecordsReducer from './useRecordsReducer';

type Keyable = {
    [ key: string ]: any;
};

export default function useTaxonomyRecords(
    taxonomy: string,
    query: Keyable = {}
): { isResolving: boolean; records: any[] } {
    return useSelect(
        ( select ) => {
            const { getEntityRecords, isResolving } = select( store ) as any;

            const queryParams: Keyable = Object.assign( { per_page: -1 }, query );

            if ( queryParams.hasOwnProperty( 'include' ) && isUndefined( queryParams.include ) ) {
                delete queryParams.include;
            }

            const entityParams = [ 'taxonomy', taxonomy, queryParams ];

            return {
                records: getEntityRecords( ...entityParams ) || [],
                isResolving: isResolving( 'getEntityRecords', entityParams ),
            };
        },
        [ taxonomy, JSON.stringify( query ) ]
    );
}

export function usePersistentTaxonomyRecords(
    taxonomy: string,
    params: Keyable = {}
): { records: any[]; isLoading: boolean } {
    const {
        records,
        setRecords,
        query,
        setQuery,
        isLoading,
        setIsLoading,
        reset,
        // @ts-ignore
    } = useRecordsReducer( { query: params } );

    useEffect( () => {
        reset();
    }, [ taxonomy ] );

    useEffect( () => {
        setQuery( params );
    }, [ JSON.stringify( params ) ] );

    const { records: data, isResolving } = useTaxonomyRecords( taxonomy, query );

    useEffect( () => {
        setIsLoading( isResolving );
    }, [ isResolving ] );

    useEffect( () => {
        setRecords( data );
    }, [ JSON.stringify( data ) ] );

    return {
        records,
        isLoading,
    };
}
