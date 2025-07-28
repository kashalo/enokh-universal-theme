import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import BlockStylesCopyPaste from '@enokh-blocks/editor/extensions/BlockStylesCopyPaste/BlockStylesCopyPaste';

const allowedBlocks = [ 'enokh-blocks/container', 'enokh-blocks/button', 'enokh-blocks/text', 'enokh-blocks/icon' ];

const withBlockStyleCopyPasteToolbar = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        const { name, setAttributes, attributes } = props;
        const { isQueryLoopItem, isCarouselItem, isTabHeader, isGrid } = attributes;
        const isAllowed =
            allowedBlocks.includes( name ) && ! isQueryLoopItem && ! isCarouselItem && ! isTabHeader && ! isGrid;

        return (
            <Fragment>
                <BlockEdit { ...props } />

                { isAllowed && (
                    <Fragment>
                        <BlockControls>
                            <BlockStylesCopyPaste { ...props } onPaste={ ( value ) => setAttributes( value ) } />
                        </BlockControls>
                    </Fragment>
                ) }
            </Fragment>
        );
    };
}, 'withBlockStyleCopyPasteToolbar' );

addFilter( 'editor.BlockEdit', 'enokh-blocks-pro/block-styles/toolbar', withBlockStyleCopyPasteToolbar );
