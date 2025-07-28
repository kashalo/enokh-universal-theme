import _pick from 'lodash/pick';

const defaultInheritAttrs: string[] = [ 'content', 'uniqueId' ];

/**
 * Build a merged block tuple for a given templateArea.
 *
 * @param templateArea    The key in `parts` and in child.attributes.templateArea
 * @param parts           Record<string, CanvasPartItem> from your variant definition
 * @param flattenedBlocks Array of live child blocks from useSelect(getBlocks)
 * @param inheritAttrs    List of attribute keys to inherit from the saved block
 * @param partKey         The key of the part object that will look for
 * @return A [ blockName, attrs, innerBlocks ] tuple, or undefined
 */
export const buildVariantBlock = (
    templateArea: string,
    parts: Record< string, CanvasPartItem > = {},
    flattenedBlocks: Array< { attributes: Record< string, any > } > = [],
    inheritAttrs: string[] = defaultInheritAttrs,
    partKey?: string
): CanvasPartItem | undefined => {
    const defaultTpl = parts[ templateArea ] || parts[ partKey ?? '' ];

    if ( ! defaultTpl ) {
        return;
    }

    const [ blockName, defaultAttrs, defaultInner ] = defaultTpl;

    // Find a matching saved block by templateArea
    const saved = flattenedBlocks.find( ( bl ) => bl.attributes.templateArea === templateArea );

    // Merge only the whitelisted attrs
    const attrs = {
        ...defaultAttrs,
        ...( !! saved && { ..._pick( saved.attributes, inheritAttrs ) } ),
        templateArea,
    };

    return [ blockName, attrs, defaultInner ];
};

/**
 * Recursively flattens a tree of blocks (including nested innerBlocks)
 * into a single array.
 *
 * @param blocks - Array of blocks, each may have an innerBlocks array.
 * @return A flat array of all blocks.
 */
export const flattenBlocks = < T extends { innerBlocks?: T[] } >( blocks: T[] ): T[] =>
    blocks.reduce< T[] >( ( acc, block ) => {
        acc.push( block );
        if ( block.innerBlocks && block.innerBlocks.length ) {
            acc.push( ...flattenBlocks( block.innerBlocks ) );
        }
        return acc;
    }, [] );
