import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Returns true if the current user is allowed to lock/unlock the given block instance.
 * @param clientId
 */
const useCanLockBlockById = ( clientId: string ): boolean => {
    return useSelect(
        ( select ) => {
            const blockEditor = select( blockEditorStore ) as any;
            const block = blockEditor.getBlock( clientId );

            return blockEditor.canLockBlockType( block.name ) as boolean;
        },
        [ clientId ]
    );
};

/**
 * Returns true if the current user is allowed to lock/unlock the given block instance.
 * @param blockName
 */
const useCanLockBlock = ( blockName: string ): boolean => {
    return useSelect(
        ( select ) => {
            if ( ! blockName ) {
                return false;
            }
            return ( select( blockEditorStore ) as any ).canLockBlockType( blockName );
        },
        [ blockName ]
    );
};

export { useCanLockBlock, useCanLockBlockById };
