import React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { BlockControlsProps } from '../types';
import { getIcon } from '@enokh-blocks/utils';

const EditBlockControls: React.FunctionComponent< BlockControlsProps > = ( props ) => {
    const { insertBlocks } = useDispatch( 'core/block-editor' );
    const { uniqueId, clientId, setAttributes } = props;

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarDropdownMenu
                    icon={ <span>{ __( 'Add', 'enokh-blocks' ) }</span> }
                    label="Add carousel parts"
                    controls={ [
                        {
                            title: __( 'Add Arrows Navigation', 'enokh-blocks' ),
                            icon: getIcon( 'carousel-arrows' ),
                            onClick: () => {
                                insertBlocks( createBlock( 'enokh-blocks/carousel-arrows', {} ), undefined, clientId );
                            },
                        },
                        {
                            title: __( 'Add Navigation', 'enokh-blocks' ),
                            icon: getIcon( 'carousel-navigation' ),
                            onClick: () => {
                                insertBlocks(
                                    createBlock( 'enokh-blocks/carousel-navigation', {} ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                        {
                            title: __( 'Add Play/Pause', 'enokh-blocks' ),
                            icon: getIcon( 'carousel-play-pause' ),
                            onClick: () => {
                                insertBlocks(
                                    createBlock( 'enokh-blocks/carousel-play-pause', {
                                        display: {
                                            playIcon: 'play',
                                            playIconGroup: 'font-awesome-solid',
                                            pauseIcon: 'grip-lines-vertical',
                                            pauseIconGroup: 'font-awesome-solid',
                                            playSize: '1em',
                                            pauseSize: '1em',
                                        },
                                    } ),
                                    undefined,
                                    clientId
                                );
                            },
                        },
                        {
                            title: __( 'Add Scrollbar', 'enokh-blocks' ),
                            icon: getIcon( 'carousel-scrollbar' ),
                            onClick: () => {
                                insertBlocks( createBlock( 'enokh-blocks/carousel-scrollbar', {} ), undefined, clientId );
                            },
                        },
                    ] }
                />
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarButton
                    className="enokh-blocks-block-control-icon"
                    icon={ getIcon( 'full-screen' ) }
                    label={ __( 'Toggle Full Height', 'enokh-blocks' ) }
                    onClick={ () => {
                        setAttributes( {
                            height: 'fixed',
                            heightTablet: '',
                            heightMobile: '',
                            minHeight: '100vh',
                            minHeightTablet: '',
                            minHeightMobile: '',
                        } );
                    } }
                    showTooltip
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

export default EditBlockControls;
