import { BlockControls, URLInput, useBlockEditingMode } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToolbarButton, ToolbarGroup, Dropdown, ToggleControl } from '@wordpress/components';
import { link, plusCircle } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { getIcon, hasUrl as hasContainerUrl } from '@enokh-blocks/utils';

const POPOVER_PROPS = {
    className: 'block-editor-block-settings-menu__popover',
    placement: 'bottom-end',
};
const ButtonBlockControls = ( props: ButtonBlockToolbarProps ): JSX.Element => {
    const { attributes, setAttributes, clientId, toggleCurrent, setToggleCurrent } = props;
    const { url, target, relNoFollow, useDynamicData, dynamicLinkType, buttonType } = attributes;

    const hasDynamicLink = useDynamicData && dynamicLinkType;
    const showButtonLinkControl = 'link' === buttonType;
    const { insertBlocks } = useDispatch( 'core/block-editor' );
    const iconTemplate = [ 'enokh-blocks/icon', {}, [] ];

    /**
     * Do not display controls if the block itself enabled contentOnly editing
     */
    if ( useBlockEditingMode() === 'contentOnly' ) {
        return null;
    }

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon={ plusCircle }
                    label={ __( 'Add Icon', 'enokh-blocks' ) }
                    onClick={ () => {
                        insertBlocks( createBlocksFromInnerBlocksTemplate( [ iconTemplate ] ), undefined, clientId );
                    } }
                    showTooltip
                />
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarButton
                    icon={ getIcon( 'checked-bulb' ) }
                    label={ __( 'Toggle Current State', 'enokh-blocks' ) }
                    onClick={ () => {
                        setToggleCurrent( ! toggleCurrent );
                    } }
                    showTooltip
                    isPressed={ !! toggleCurrent }
                />
            </ToolbarGroup>
            <ToolbarGroup>
                { ( ! useDynamicData || hasDynamicLink ) && showButtonLinkControl && (
                    <Dropdown
                        contentClassName="enokh-blocks-button-link-dropdown"
                        popoverProps={ POPOVER_PROPS }
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <ToolbarButton
                                icon={ link }
                                label={ ! url ? __( 'Add Link', 'enokh-blocks' ) : __( 'Change Link', 'enokh-blocks' ) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                                isPressed={ !! url }
                            />
                        ) }
                        renderContent={ () => (
                            <>
                                { ! useDynamicData && (
                                    <URLInput
                                        className={ 'enokh-blocks-button-link' }
                                        value={ url }
                                        onChange={ ( value ) => {
                                            setAttributes( {
                                                url: value,
                                                hasUrl: !! value,
                                            } );
                                        } }
                                    />
                                ) }

                                { !! useDynamicData && (
                                    <div
                                        style={ {
                                            width: '300px',
                                            fontStyle: 'italic',
                                            marginBottom: !! dynamicLinkType ? '15px' : '0',
                                        } }
                                    >
                                        { __( 'This button is using a dynamic link.', 'enokh-blocks' ) }
                                    </div>
                                ) }

                                { ( !! url || hasDynamicLink ) && (
                                    <>
                                        <ToggleControl
                                            label={ __( 'Open link in a new tab', 'enokh-blocks' ) }
                                            checked={ target || false }
                                            onChange={ ( value ) => {
                                                setAttributes( {
                                                    target: value,
                                                } );
                                            } }
                                        />

                                        <ToggleControl
                                            label={ __( 'Add rel="nofollow"', 'enokh-blocks' ) }
                                            checked={ relNoFollow || false }
                                            onChange={ ( value ) => {
                                                setAttributes( {
                                                    relNoFollow: value,
                                                } );
                                            } }
                                        />
                                    </>
                                ) }
                            </>
                        ) }
                    />
                ) }
            </ToolbarGroup>
        </BlockControls>
    );
};

export default ButtonBlockControls;
