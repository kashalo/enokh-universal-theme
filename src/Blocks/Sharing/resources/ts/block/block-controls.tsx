import React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { BlockControlProps } from './types';
import { getIcon } from '@enokh-blocks/utils';
import { share } from '@wordpress/icons';

const EditBlockControls: React.FunctionComponent< BlockControlProps > = ( props ) => {
    const { insertBlocks } = useDispatch( 'core/block-editor' );
    const { attributes, clientId, setAttributes } = props;
    const { uniqueId } = attributes;
    const defaultBlock: Partial< ButtonBlockAttributes > = {
        isSharing: true,
        hasIcon: true,
        removeText: true,
        useDynamicData: true,
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarDropdownMenu
                    icon={ <span>{ __( 'Add', 'enokh-blocks' ) }</span> }
                    label="Add Sharing Button"
                    controls={ [
                        {
                            title: __( 'Facebook', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'facebook-f',
                                    iconGroup: 'font-awesome-brands',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'facebook',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                        {
                            title: __( 'X', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'x-twitter',
                                    iconGroup: 'font-awesome-brands',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'x',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                        {
                            title: __( 'Pinterest', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'pinterest',
                                    iconGroup: 'font-awesome-brands',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'pinterest',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                        {
                            title: __( 'LinkedIn', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'linkedin',
                                    iconGroup: 'font-awesome-brands',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'linkedIn',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                        {
                            title: __( 'Reddit', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'reddit',
                                    iconGroup: 'font-awesome-brands',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'reddit',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                        {
                            title: __( 'Whatsapp', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'whatsapp',
                                    iconGroup: 'font-awesome-brands',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'whatsapp',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                        {
                            title: __( 'LINE', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'line',
                                    iconGroup: 'font-awesome-brands',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'line',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                        {
                            title: __( 'Email', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'envelope',
                                    iconGroup: 'font-awesome-solid',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'send-email',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },

                        {
                            title: __( 'Copy Link', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'copy',
                                    iconGroup: 'font-awesome-regular',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'copy-link',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },

                        {
                            title: __( 'Print', 'enokh-blocks' ),
                            icon: share,
                            onClick: () => {
                                const iconBlock = createBlock( 'enokh-blocks/icon', {
                                    icon: 'print',
                                    iconGroup: 'font-awesome-solid',
                                    height: '1em',
                                    width: '1em',
                                } );
                                const blockAttr = {
                                    ...defaultBlock,
                                    dynamicLinkType: 'print',
                                };
                                insertBlocks(
                                    createBlock( 'enokh-blocks/button', blockAttr, [ iconBlock ] ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                    ] }
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

export default EditBlockControls;
