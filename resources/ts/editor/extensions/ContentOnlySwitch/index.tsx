// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Icon, lock, unlock } from '@wordpress/icons';
import { useEffect } from '@wordpress/element';
import { Flex, FlexItem, MenuItem, ToolbarButton, ToolbarGroup, Button } from '@wordpress/components';
import { hasBlockSupport } from '@wordpress/blocks';
import { BlockIcon, BlockMover, BlockControls, BlockSettingsMenuControls } from '@wordpress/block-editor';

// Implementation dependencies
import ContentOnlyEditingIcon from '@enokh-blocks/icons/content-only-editing';

const TEMPLATE_LOCK_ATTR = 'templateLock';
const CONTENT_ONLY_EDITING_SUPPORT = 'mah.contentOnlyEditing';
const CONTENT_ONLY_EDITING_ATTR = 'mahContentOnlyEditing';

/**
 * Extend attributes for blocks with support for "mah.contentOnlyEditing"
 *
 * @param settings
 * @param name
 */
const addContentOnlyAttributes = ( settings, name ) => {
    if ( hasBlockSupport( name, CONTENT_ONLY_EDITING_SUPPORT, false ) ) {
        settings.attributes = Object.assign( settings.attributes, {
            [ CONTENT_ONLY_EDITING_ATTR ]: {
                type: 'boolean',
                default: false,
            },
        } );
    }

    return settings;
};

/**
 * Extend the block edit element with contentOnly toggling controls
 */
const withContentOnlyControls = createHigherOrderComponent(
    ( BlockEdit ) => ( props ) => {
        const { blockType, blockVariation, userCanLockBlock, hasTemplateLockAttr, supportsContentOnlyEditing } =
            useSelect( ( select ) => {
                const { getBlockType, getActiveBlockVariation } = select( 'core/blocks' );
                const { canLockBlockType } = select( 'core/block-editor' );

                // @ts-ignore
                const blockTypeDef = getBlockType( props.name );

                return {
                    blockType: blockTypeDef,
                    // @ts-ignore
                    blockVariation: getActiveBlockVariation( props.name, props.attributes ),
                    // @ts-ignore
                    userCanLockBlock: canLockBlockType( props.name ) as boolean,
                    hasTemplateLockAttr: typeof blockTypeDef.attributes[ TEMPLATE_LOCK_ATTR ] !== 'undefined',
                    supportsContentOnlyEditing: hasBlockSupport(
                        props.name,
                        CONTENT_ONLY_EDITING_SUPPORT,
                        false
                    ) as boolean,
                };
            }, [] );

        const { setBlockEditingMode } = useDispatch( 'core/block-editor' );

        /**
         * Bail out if current block has no templateLock attribute nor the contentOnlyEditing attribute
         */
        if ( ! hasTemplateLockAttr && ! supportsContentOnlyEditing ) {
            return <BlockEdit { ...props } />;
        }

        /**
         * Determine current editing mode based on the block expectations
         */
        const isContentOnlyMode = hasTemplateLockAttr
            ? props.attributes[ TEMPLATE_LOCK_ATTR ] === 'contentOnly'
            : props.attributes[ CONTENT_ONLY_EDITING_ATTR ] === true;

        useEffect( () => {
            /**
             * Enable contentOnly editing for the block itself:
             * - When `templateLock` attribute exists, for the block itself and not their inner blocks
             * - When `mah.contentOnlyEditing` support exists
             */
            if ( isContentOnlyMode ) {
                setBlockEditingMode( props.clientId, 'contentOnly' );
            }
        } );

        /**
         * Determine editing mode updater based on the block expectations
         */
        const toggleEditingMode = () => {
            const enabledValue = hasTemplateLockAttr ? 'contentOnly' : true;
            const key = hasTemplateLockAttr ? TEMPLATE_LOCK_ATTR : CONTENT_ONLY_EDITING_ATTR;
            const value = isContentOnlyMode ? false : enabledValue;
            props.setAttributes( { [ key ]: value } );
            setBlockEditingMode( props.clientId, isContentOnlyMode ? 'default' : 'contentOnly' );
        };

        const toggleLabel = isContentOnlyMode
            ? _x( 'Disable content only editing', 'content only mode switcher', 'enokh-blocks' )
            : _x( 'Enable content only editing', 'content only mode switcher', 'enokh-blocks' );

        return (
            <>
                { props.isSelected && (
                    <>
                        { isContentOnlyMode && (
                            <BlockControls>
                                { userCanLockBlock && (
                                    <ToolbarGroup>
                                        <ToolbarButton
                                            onClick={ toggleEditingMode }
                                            label={ toggleLabel }
                                            icon={
                                                <>
                                                    <Icon icon={ ContentOnlyEditingIcon } />
                                                    <Icon icon={ isContentOnlyMode ? unlock : lock } />
                                                </>
                                            }
                                        />
                                    </ToolbarGroup>
                                ) }
                            </BlockControls>
                        ) }
                        <BlockSettingsMenuControls>
                            <MenuItem
                                icon={ ContentOnlyEditingIcon }
                                isSelected={ isContentOnlyMode }
                                onClick={ toggleEditingMode }
                            >
                                { toggleLabel }
                            </MenuItem>
                        </BlockSettingsMenuControls>
                    </>
                ) }
                <BlockEdit { ...props } />
            </>
        );
    },
    'withContentOnlyControls'
);

// addFilter( 'blocks.registerBlockType', 'enokh-blocks/content-only-attributes', addContentOnlyAttributes );
// addFilter( 'editor.BlockEdit', 'enokh-blocks/content-only-controls', withContentOnlyControls );
