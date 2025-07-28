import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function usePostRecord(
    postType,
    postId,
    load: string[] = [],
    options: { [ propName: string ]: any } = {}
) {
    return useSelect(
        ( select ) => {
            const { getUser, isResolving, getEntityRecord, getEntityRecords, hasFinishedResolution } = select(
                coreStore
            ) as any;
            const params = [ 'postType', postType, postId ];

            let postRecord = getEntityRecord( ...params );

            const postRecordIsLoading =
                ! hasFinishedResolution( 'getEntityRecord', params ) || isResolving( 'getEntityRecord', params );

            // Terms loading
            let termsIsLoading = false;

            if ( load.includes( 'terms' ) && ! postRecordIsLoading && !! postRecord ) {
                const termParams = [ 'taxonomy', options.taxonomy, { post: postId } ];
                const terms = getEntityRecords( ...termParams );

                termsIsLoading =
                    ! hasFinishedResolution( 'getEntityRecords', termParams ) ||
                    isResolving( 'getEntityRecords', termParams );

                if ( ! termsIsLoading && !! terms ) {
                    postRecord = Object.assign( {}, postRecord, { terms } );
                }
            }

            return {
                record: postRecord,
                isLoading: postRecordIsLoading || termsIsLoading,
            };
        },
        [ postType, postId, load.join(), JSON.stringify( options ) ]
    );
}
