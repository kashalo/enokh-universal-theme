import { useEffect } from '@wordpress/element';
import { getEditorBlocks } from '../utils';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export const getUniqueIdFromBlocks = ( blocks: any[] ): any[] =>
    blocks.reduce(
        ( result, block ) => {
            if ( block.name && block.name.includes( 'enokh-blocks' ) && block.attributes && block.attributes.uniqueId ) {
                result.uniqueIds.push( block.attributes.uniqueId );
                result.clientIds.push( block.clientId );
            }

            if ( block.innerBlocks ) {
                // @ts-ignore
                const { uniqueIds, clientIds } = getUniqueIdFromBlocks( block.innerBlocks );
                result.uniqueIds = result.uniqueIds.concat( uniqueIds );
                result.clientIds = result.clientIds.concat( clientIds );
            }

            return result;
        },
        { uniqueIds: [], clientIds: [] }
    );

export const generateUniqueId = ( clientId: string ): string => clientId.substr( 2, 9 ).replace( '-', '' );

export const hasDuplicates = ( arr: any[], value: any, currentIndex: number ): boolean =>
    arr.filter( ( el ) => el === value ).length > 1 && currentIndex === arr.lastIndexOf( value );

const updateInnerBlocksUniqueId = ( innerBlocks: any[], getBlock: Function, updateBlockAttributes: Function ) => {
    innerBlocks.forEach( ( innerBlock ) => {
        // @ts-ignore
        const block = getBlock( innerBlock.clientId );
        const uniqueId = generateUniqueId( innerBlock.clientId );

        updateBlockAttributes( innerBlock.clientId, { uniqueId } );
        if ( innerBlock.innerBlocks.length > 0 ) {
            updateInnerBlocksUniqueId( innerBlock.innerBlocks, getBlock, updateBlockAttributes );
        }
    } );
};

export default ( WrappedComponent: Function ): Function =>
    ( props ) => {
        const { clientId, attributes } = props;
        const { updateBlockAttributes } = useDispatch( blockEditorStore );

        const wasBlockJustInserted = useSelect(
            ( select ) => ( select( 'core/block-editor' ) as any ).wasBlockJustInserted( props.clientId ),
            []
        );
        const { getBlocksByClientId, getBlock } = useSelect( ( select ) => select( 'core/block-editor' ), [] );

        useEffect( () => {
            if ( ! wasBlockJustInserted || ! attributes.uniqueId ) {
                return;
            }
            // @ts-ignore
            const block = getBlock( clientId );
            const uniqueId = generateUniqueId( clientId );
            updateInnerBlocksUniqueId( block.innerBlocks, getBlock, updateBlockAttributes );
            updateBlockAttributes( clientId, { uniqueId } );
        }, [] );

        useEffect( () => {
            // @ts-ignore
            const { uniqueIds, clientIds } = getUniqueIdFromBlocks( getEditorBlocks() );

            if (
                ! attributes.uniqueId ||
                hasDuplicates( uniqueIds, attributes.uniqueId, clientIds.indexOf( clientId ) )
            ) {
                const uniqueId = generateUniqueId( clientId );

                updateBlockAttributes( clientId, { uniqueId } );
            }
        }, [ clientId ] );

        // @ts-ignore
        return <WrappedComponent { ...props } /> ;
    };
