import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { BlockControls, URLInput } from '@wordpress/block-editor';
import {
    ToolbarGroup,
    ToolbarButton,
    Dropdown,
    BaseControl,
    ToggleControl,
    SelectControl,
    TextControl,
} from '@wordpress/components';
import { getIcon, hasUrl as hasContainerUrl } from '@enokh-blocks/utils';
import DOMPurify from 'dompurify';
import React from 'react';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

const ContainerBlockControls: React.FunctionComponent< any > = ( props ) => {
    const { attributes, setAttributes, clientId } = props;
    const { insertBlocks } = useDispatch( 'core/block-editor' );
    const {
        url,
        linkType,
        hiddenLinkAriaLabel,
        target,
        relSponsored,
        relNoFollow,
        useDynamicData,
        dynamicLinkType,
        isTabHeader,
    } = attributes;

    const POPOVER_PROPS = {
        className: 'block-editor-block-settings-menu__popover',
        position: 'bottom right',
    };

    let typeMessage = __(
        'This makes your Element Tag a link element. It uses valid HTML5 coding but will break if you add interactive elements (links or buttons) inside the container.',
        'enokh-blocks'
    );

    if ( linkType === 'hidden-link' ) {
        typeMessage = __(
            'This adds a hidden link inside your container and tells it to cover the entire element. It is less prone to breakage, but is not as clean as the wrapper method.',
            'enokh-blocks'
        );
    }

    return (
        <BlockControls>
            <ToolbarGroup>
                <Dropdown
                    contentClassName="enokh-blocks-container-link-dropdown"
                    popoverProps={ POPOVER_PROPS }
                    renderToggle={ ( { isOpen, onToggle } ) => (
                        <ToolbarButton
                            icon={ getIcon( 'link' ) }
                            label={
                                ! hasContainerUrl( attributes )
                                    ? __( 'Set Container Link', 'enokh-blocks' )
                                    : __( 'Change Container Link', 'enokh-blocks' )
                            }
                            onClick={ onToggle }
                            aria-expanded={ isOpen }
                            isPressed={ !! hasContainerUrl( attributes ) }
                        />
                    ) }
                    renderContent={ () => (
                        <Fragment>
                            { ! useDynamicData && (
                                <BaseControl className="enokh-blocks-container-link-wrapper">
                                    <URLInput
                                        className={ 'enokh-blocks-container-link' }
                                        value={ url }
                                        onChange={ ( value ) => {
                                            setAttributes( {
                                                url: value,
                                            } );
                                        } }
                                    />
                                </BaseControl>
                            ) }

                            { !! useDynamicData && dynamicLinkType !== '' && (
                                <div
                                    style={ {
                                        width: '300px',
                                        // @ts-ignore
                                        'font-style': 'italic',
                                        'margin-bottom': !! dynamicLinkType ? '15px' : '0',
                                    } }
                                >
                                    { __( 'This container is using a dynamic link.', 'enokh-blocks' ) }
                                </div>
                            ) }

                            { !! hasContainerUrl( attributes ) && (
                                <Fragment>
                                    <ToggleControl
                                        label={ __( 'Open link in a new tab', 'enokh-blocks' ) }
                                        checked={ target || '' }
                                        onChange={ ( value ) => {
                                            setAttributes( {
                                                target: value,
                                            } );
                                        } }
                                    />

                                    <ToggleControl
                                        label={ __( 'Add rel="nofollow"', 'enokh-blocks' ) }
                                        checked={ relNoFollow || '' }
                                        onChange={ ( value ) => {
                                            setAttributes( {
                                                relNoFollow: value,
                                            } );
                                        } }
                                    />

                                    <ToggleControl
                                        label={ __( 'Add rel="sponsored"', 'enokh-blocks' ) }
                                        checked={ relSponsored || '' }
                                        onChange={ ( value ) => {
                                            setAttributes( {
                                                relSponsored: value,
                                            } );
                                        } }
                                    />

                                    <SelectControl
                                        label={ __( 'Link Type', 'enokh-blocks' ) }
                                        help={ typeMessage }
                                        value={ linkType }
                                        options={ [
                                            { label: __( 'Hidden Link', 'enokh-blocks' ), value: 'hidden-link' },
                                            { label: __( 'Wrapper', 'enokh-blocks' ), value: 'wrapper' },
                                        ] }
                                        onChange={ ( value ) => {
                                            setAttributes( {
                                                linkType: value,
                                            } );
                                        } }
                                    />
                                </Fragment>
                            ) }

                            { !! hasContainerUrl( attributes ) && linkType === 'hidden-link' && (
                                <TextControl
                                    label={ __( 'Aria Label', 'enokh-blocks' ) }
                                    help={ __( 'Help screen readers understand what this link does.', 'enokh-blocks' ) }
                                    type={ 'text' }
                                    value={ hiddenLinkAriaLabel }
                                    onChange={ ( value ) => {
                                        setAttributes( {
                                            hiddenLinkAriaLabel: DOMPurify.sanitize( value ),
                                        } );
                                    } }
                                />
                            ) }
                        </Fragment>
                    ) }
                />
            </ToolbarGroup>
            { !! isTabHeader && (
                <>
                    <ToolbarGroup>
                        <ToolbarButton
                            className="enokh-blocks-block-control-icon"
                            icon={ getIcon( 'add-to-container-button' ) }
                            label={ __( 'Add Button', 'enokh-blocks' ) }
                            onClick={ () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    hasIcon: true,
                                    removeText: true,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    spacing: {
                                        paddingTop: '12px',
                                        paddingLeft: '12px',
                                        paddingRight: '12px',
                                        paddingBottom: '12px',
                                    },
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            } }
                            showTooltip
                        />
                        <ToolbarButton
                            className="enokh-blocks-block-control-icon"
                            icon={ getIcon( 'icons' ) }
                            label={ __( 'Add Icon', 'enokh-blocks' ) }
                            onClick={ () => {
                                insertBlocks(
                                    createBlock( 'enokh-blocks/icon', {
                                        height: '1em',
                                        width: '1em',
                                    } ),
                                    undefined,
                                    clientId
                                );
                            } }
                            showTooltip
                        />
                    </ToolbarGroup>
                </>
            ) }
        </BlockControls>
    );
};

export default ContainerBlockControls;
