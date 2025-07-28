import { PanelBody, ToggleControl } from '@wordpress/components';
import { BlockIcon, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { subscribe, select } from '@wordpress/data';

const config = EnokhBlocksEditor.Blocks.TableOfContent;

const textBlockConfig = EnokhBlocksEditor.Blocks.TextBlock;
const textBlockControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        if ( props.name !== textBlockConfig.name ) {
            return <BlockEdit { ...props } />;
        }

        const { addToTableOfContent } = props.attributes;

        return (
            <>
                <BlockEdit { ...props } />
                <InspectorControls>
                    <PanelBody initialOpen={ false } title={ __( 'Table of content block Settings' ) }>
                        <ToggleControl
                            label={ __( 'Add to table of content Block?' ) }
                            onChange={ () => {
                                props.setAttributes( { addToTableOfContent: ! addToTableOfContent } );
                            } }
                            checked={ addToTableOfContent }
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'textBlockControl' );

if ( config.isUsedInTemplate ) {
    addFilter( 'editor.BlockEdit', 'enokh-blocks/text-inspector-controls', textBlockControl );

    EnokhBlocksEditor.Blocks.TableOfContent.filtersAdded = true;
}

addFilter( 'blocks.registerBlockType', 'enokh-blocks/text-attributes', ( props ) => {
    if ( textBlockConfig.name !== props.name ) {
        return props;
    }

    props.attributes = Object.assign( props.attributes, {
        addToTableOfContent: {
            type: 'boolean',
            default: false,
        },
    } );
    return props;
} );

const { getBlocks: getBlockList } = select( 'core/editor' );

subscribe( () => {
    if ( config.filtersAdded ) {
        return;
    }

    const blocks = getBlockList();

    let isUsed = false;

    for ( let index = 0; index < blocks.length; index++ ) {
        if ( blocks[ index ].name === config.name ) {
            isUsed = true;
            break;
        }
    }

    EnokhBlocksEditor.Blocks.TableOfContent.filtersAdded = isUsed;

    if ( isUsed ) {
        addFilter( 'editor.BlockEdit', 'enokh-blocks/text-inspector-controls', textBlockControl );
        EnokhBlocksEditor.Blocks.TableOfContent.filtersAdded = true;
        return;
    }

    EnokhBlocksEditor.Blocks.TableOfContent.filtersAdded = false;
} );
