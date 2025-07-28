import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useRecordsReducer } from '../stores';
import { useEffect } from '@wordpress/element';
import { isUndefined } from 'lodash';

export const usePersistentPostRecords = (
    postType: string,
    params: object = {}
): { records: any[]; isLoading: boolean } => {
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
    }, [ postType ] );

    useEffect( () => {
        setQuery( params );
    }, [ JSON.stringify( params ) ] );

    const { records: data, isResolving } = usePostTypeRecords( postType, query );

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
};

const usePostTypeRecords = ( postType: string, query: object = {} ): { records: any[]; isResolving: boolean } => {
    return useSelect(
        ( select ) => {
            const useCoreStore: any = select( coreStore );
            const queryParams: any = Object.assign( { per_page: -1 }, query );

            if ( queryParams.hasOwnProperty( 'include' ) && isUndefined( queryParams.include ) ) {
                delete queryParams.include;
            }

            const entityParams = [ 'postType', postType, queryParams ];

            return {
                records: useCoreStore.getEntityRecords( ...entityParams ) || [],
                isResolving: useCoreStore.isResolving( 'getEntityRecords', entityParams ),
            };
        },
        [ postType, JSON.stringify( query ) ]
    );
};

export default usePostTypeRecords;
