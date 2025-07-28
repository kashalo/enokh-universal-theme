/**
 * Return the blocks with its inner blocks.
 *
 * @return {Array} The blocks array.
 */
export default (): [] => {
    //@ts-ignore
    const blocks = wp.data.select( 'core/block-editor' ).getBlocks();

    return blocks.map( ( block ) => {
        if ( 'core/widget-area' !== block.name ) {
            return block;
        }

        //@ts-ignore
        const innerBlocks = wp.data.select( 'core/block-editor' ).getBlocks( block.clientId );

        return {
            ...block,
            innerBlocks,
        };
    } );
};
