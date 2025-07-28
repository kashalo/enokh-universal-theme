/* eslint-disable @typescript-eslint/no-shadow */
import React, { KeyboardEvent } from 'react';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import { useBlockProps, RichText, useInnerBlocksProps } from '@wordpress/block-editor';
import { compose, useMergeRefs } from '@wordpress/compose';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { BlockEditProps } from './types';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import { withBlockContext } from '@enokh-blocks/block-context';
import useEnter from './hooks/use-enter';
import useSpace from './hooks/use-space';
import useMerge from './hooks/use-merge';
import BlockInspectorControls from './inspector-controls';
import BlockStyles from '../block-styles';
import _cloneDeep from 'lodash/cloneDeep';
import { applyFilters } from '@wordpress/hooks';
import { useEffect, useMemo } from '@wordpress/element';
import _isEqual from 'lodash/isEqual';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { setAttributes, attributes, clientId, className, isSelected, mergeBlocks, context } = props;
    const { uniqueId, content } = attributes;

    const classNames = classnames( 'enokh-blocks-list-item', className, `enokh-blocks-list-item-${ uniqueId }` );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );
    const useEnterRef = useEnter( { content, clientId } );
    const useSpaceRef = useSpace( clientId );
    const onMerge = useMerge( clientId, mergeBlocks );
    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        renderAppender: false,
        __unstableDisableDropZone: true,
    } );

    const isUnordered = context[ 'enokh-blocks/listType' ] === 'ul';
    const marker = context[ 'enokh-blocks/listMarker' ] ?? {};
    const { icon, iconGroup } = marker;

    const iconSVGSets = useMemo( () => {
        const baseSets = _cloneDeep( EnokhBlocksEditor.Config.icons );

        return applyFilters( 'enokh-blocks.editor.iconSVGSets', baseSets, { attributes } );
    }, [ clientId ] );

    const hasIcon = iconSVGSets[ iconGroup ]?.svgs[ icon ];

    useEffect( () => {
        if ( _isEqual( marker, attributes.listMarker ) ) {
            return;
        }

        setAttributes( {
            listMarker: marker,
        } );
    }, [ marker ] );

    const onPaste = ( event: React.ClipboardEvent ) => {
        const html = event.clipboardData?.getData( 'text/html' );
        if ( html ) {
            const parser = new DOMParser();
            const doc = parser.parseFromString( html, 'text/html' );
            const list = doc.body.querySelector( 'ul, ol' );
            if ( list ) {
                event.preventDefault();
                const items = Array.from( list.querySelectorAll( 'li' ) );
                if ( items.length > 0 ) {
                    // Set first item’s content
                    setAttributes( { content: items[ 0 ].innerHTML } );
                    // Insert remaining items as new list-item blocks
                    const newBlocks = items
                        .slice( 1 )
                        .map( ( li ) => createBlock( 'enokh-blocks/list-item', { content: li.innerHTML } ) );
                    // @ts-ignore
                    dispatch( 'core/block-editor' ).insertBlocks( newBlocks, undefined, clientId );
                }
            }
        }
        // Fallback: handle plain-text pasted lists (newline-separated)
        const text = event.clipboardData?.getData( 'text/plain' ) || '';
        const lines = text
            .split( /\r?\n/ )
            .map( ( line ) => line.trim() )
            .filter( ( line ) => line );

        if ( lines.length > 1 ) {
            event.preventDefault();
            const newBlocks = lines.map( ( line ) => createBlock( 'enokh-blocks/list-item', { content: line } ) );
            // Replace the current block with all new blocks
            // @ts-ignore
            dispatch( 'core/block-editor' ).replaceBlocks( clientId, newBlocks );
        }
    };

    return (
        <>
            <BlockStyles { ...props } />
            { isSelected && <BlockInspectorControls { ...props } /> }
            <li { ...blockProps }>
                <div
                    className={ classnames( {
                        'enokh-blocks-list-item__content': true,
                        'enokh-blocks-list-item__has-bullet': hasIcon,
                    } ) }
                >
                    <RichText
                        tagName="span"
                        ref={ useMergeRefs( [ useEnterRef, useSpaceRef ] ) }
                        identifier="content"
                        value={ attributes.content }
                        onChange={ ( newContent ) => setAttributes( { content: newContent } ) }
                        onMerge={ onMerge }
                        placeholder="List item"
                        className="enokh-blocks-list-item__text"
                        onPaste={ onPaste }
                    />
                </div>
                <div className="enokh-blocks-list-item__children">{ innerBlocksProps.children }</div>
            </li>
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withUniqueId, withBlockContext )( Edit );
