import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';
import { getAccordionItemIds } from './utils';
import { isEqual, omit, isEmpty } from 'lodash';
import { noStyleAttributes } from '@enokh-blocks/utils';

const allowedBlocks = [ 'enokh-blocks/container', 'enokh-blocks/button' ];

const withSyncAccordionStyles = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props: any ) => {
        const { name, attributes, clientId, isSelected } = props;

        const isValidBlocks =
            allowedBlocks.includes( name ) &&
            ( attributes.isAccordionToggle || attributes.isAccordionItemContent || attributes.isAccordionItemHeader );

        const { isAccordionToggle, isAccordionItemContent, isAccordionItemHeader } = attributes;

        if ( ! isValidBlocks ) {
            return <BlockEdit { ...props } />;
        }

        const { getBlockParentsByBlockName, getBlocks } = useSelect(
            ( select ) => select( blockEditorStore ) as any,
            []
        );
        const { updateBlockAttributes } = useDispatch( blockEditorStore );
        const [ currentClientId ] = useState( clientId );
        const firstUpdate = useRef( true );
        const attributesRef = useRef( omit( attributes, noStyleAttributes ) );

        const syncAccordionStyles = ( type: string ) => {
            const omittedAttributes = omit( attributes, noStyleAttributes );
            const changedAttributes = {};

            for ( const [ key, value ] of Object.entries( omittedAttributes ) ) {
                if ( ! isEqual( attributesRef.current[ key ], value ) ) {
                    changedAttributes[ key ] = value;
                }
            }

            if ( isEmpty( changedAttributes ) ) {
                return;
            }

            attributesRef.current = omittedAttributes;

            const accordionId = getBlockParentsByBlockName( clientId, 'enokh-blocks/accordion', true )[ 0 ];
            const accordionItems = getBlocks( accordionId );
            const itemIds = getAccordionItemIds( accordionItems, type, { clientId }, getBlocks );

            updateBlockAttributes( itemIds, changedAttributes );
        };

        // Sync the styles whenever attributes are changed.
        useEffect( () => {
            if ( firstUpdate.current ) {
                firstUpdate.current = false;
                return;
            }

            // Check current clientId to prevent infinite loop updating attributes.
            if ( clientId === currentClientId && isSelected ) {
                if ( isAccordionToggle ) {
                    syncAccordionStyles( 'accordion-toggle' );
                }

                if ( isAccordionItemContent ) {
                    syncAccordionStyles( 'accordion-content' );
                }

                if ( isAccordionItemHeader ) {
                    syncAccordionStyles( 'accordion-header' );
                }
            }
        }, [ JSON.stringify( attributes ) ] );

        return (
            <>
                <BlockEdit { ...props } />
            </>
        );
    };
}, 'withSyncAccordionStyles' );

addFilter( 'editor.BlockEdit', 'enokh-blocks/accordion/inspectorControls', withSyncAccordionStyles );
