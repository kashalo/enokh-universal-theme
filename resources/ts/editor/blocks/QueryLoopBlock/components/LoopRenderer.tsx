import {
    BlockContextProvider,
    InnerBlocks,
    __experimentalUseBlockPreview as useBlockPreview,
    store as blockEditorStore,
} from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { memo, useEffect, useMemo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useDebouncedCallback } from 'use-debounce';

function BlockPreview( { blocks, contextId, setActiveContextId, isHidden } ) {
    const blockPreviewProps = useBlockPreview( {
        blocks,
    } );

    const handleOnClick = () => setActiveContextId( contextId );

    const style = {
        display: isHidden ? 'none' : undefined,
    };

    return (
        <div
            { ...blockPreviewProps }
            className={ 'block-editor-inner-blocks enokh-blocks-query-loop-block-preview' }
            tabIndex={ 0 }
            role={ 'button' }
            onClick={ handleOnClick }
            onKeyPress={ handleOnClick }
            style={ style }
        />
    );
}

const MemoizedBlockPreview = memo( BlockPreview );

function setIsBlockPreview( innerBlocks ) {
    return innerBlocks.map( ( block ) => {
        const newInnerBlocks = setIsBlockPreview( block.innerBlocks );
        const attributes = Object.assign( {}, block.attributes, { isBlockPreview: true } );

        return Object.assign( {}, block, { attributes, innerBlocks: newInnerBlocks } );
    } );
}

export default function LoopRenderer( props ) {
    const { clientId, data, hasData, isResolvingData, hasResolvedData, templateLock, contextCallback } = props;

    const innerBlocks = useSelect( ( select ) => {
        return ( select( 'core/block-editor' ) as any )?.getBlocks( clientId );
    }, [] );

    const { getSelectedBlock } = useSelect( blockEditorStore, [] );
    const [ innerBlockData, setInnerBlockData ] = useState( [] );
    const [ activeContextId, setActiveContextId ] = useState();

    useEffect( () => {
        setInnerBlockData( setIsBlockPreview( innerBlocks ) );
    }, [] );

    const debounced = useDebouncedCallback( () => {
        setInnerBlockData( setIsBlockPreview( innerBlocks ) );
    }, 10 );

    const debounceBlocks = [ 'core/paragraph', 'core/heading', 'core/button' ];

    useEffect( () => {
        const selectedBlock = getSelectedBlock();

        if (
            debounceBlocks.includes( selectedBlock?.name ) &&
            ! selectedBlock?.attributes?.useDynamicData &&
            ! selectedBlock?.attributes?.dynamicContentType
        ) {
            debounced();
        } else {
            setInnerBlockData( setIsBlockPreview( innerBlocks ) );
        }
    }, [ JSON.stringify( innerBlocks ) ] );

    const dataContexts = useMemo( () => hasData && data.map( ( item ) => contextCallback( item ) ), [ data, hasData ] );

    if ( isResolvingData ) {
        return <Spinner />;
    }

    if ( hasResolvedData && ! hasData ) {
        return <p>{ __( 'No results.', 'enokh-blocks' ) }</p>;
    }

    return (
        dataContexts &&
        dataContexts.map( ( postContext ) => (
            <BlockContextProvider key={ postContext.postId } value={ postContext }>
                { postContext.postId === ( activeContextId || dataContexts[ 0 ]?.postId ) ? (
                    <InnerBlocks { ...props } templateLock={ templateLock } />
                ) : null }

                <MemoizedBlockPreview
                    blocks={ innerBlockData }
                    contextId={ postContext.postId }
                    setActiveContextId={ setActiveContextId }
                    isHidden={ postContext.postId === ( activeContextId || dataContexts[ 0 ]?.postId ) }
                />
            </BlockContextProvider>
        ) )
    );
}
