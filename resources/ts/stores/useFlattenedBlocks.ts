import { useSelect } from '@wordpress/data';
import { WPBlock } from '@wordpress/blocks';

/**
 * Recursively flattens a tree of blocks (including nested innerBlocks)
 * @param blocks
 */
export const flattenBlocks = < T extends { innerBlocks?: T[] } = WPBlock >( blocks: T[] ): T[] =>
    blocks.reduce< T[] >( ( acc, block ) => {
        acc.push( block );
        if ( block.innerBlocks?.length ) {
            acc.push( ...flattenBlocks( block.innerBlocks ) );
        }
        return acc;
    }, [] );

/**
 * Hook to get and flatten all inner blocks for the given clientId
 * @param clientId
 */
export const useFlattenedBlocks = ( clientId: string ): WPBlock[] => {
    const blocks = useSelect(
        ( select ) => ( select( 'core/block-editor' ) as any ).getBlocks( clientId ),
        [ clientId ]
    );
    return flattenBlocks( blocks || [] );
};
