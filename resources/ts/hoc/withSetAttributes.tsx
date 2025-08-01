import { useDispatch, useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { isPlainObject } from 'lodash';

/**
 * Deep merge attributes.
 *
 * @param {Object} current The current attributes.
 * @param {Object} attrs   The new attributes.
 * @return {Object} The merged attributes.
 */
export function deepMergeAttributes( current, attrs ) {
    const result = {};

    for ( const [ key, value ] of Object.entries( attrs ) ) {
        if ( isPlainObject( value ) && isPlainObject( current[ key ] ) ) {
            result[ key ] = {
                ...current[ key ],
                ...deepMergeAttributes( current[ key ], value ),
            };
        } else {
            result[ key ] = value;
        }
    }

    return result;
}

export default ( WrappedComponent: Function ): Function =>
    ( props ) => {
        const multiSelectedBlocks = useSelect( ( select ) => {
            const blockEditor: any = select( 'core/block-editor' );
            return blockEditor ? blockEditor.getMultiSelectedBlocks() : [];
        }, [] );

        const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

        const setAttributes = useMemo( () => {
            if ( multiSelectedBlocks.length === 0 ) {
                return function setDeepAttributes( attrs ) {
                    props.setAttributes( deepMergeAttributes( props.attributes, attrs ) );
                };
            }

            return function setDeepMultiAttributes( attrs ) {
                const blocks = multiSelectedBlocks.reduce(
                    ( result, block ) => {
                        result.clientIds.push( block.clientId );

                        result.blockAttrs[ block.clientId ] = deepMergeAttributes( block.attributes, attrs );

                        return result;
                    },
                    { clientIds: [], blockAttrs: {} }
                );

                updateBlockAttributes( blocks.clientIds, blocks.blockAttrs, true );
            };
        }, [ multiSelectedBlocks.length, JSON.stringify( props.attributes ) ] );

        // @ts-ignore
        return <WrappedComponent { ...props } setAttributes={ setAttributes } />;
    };
