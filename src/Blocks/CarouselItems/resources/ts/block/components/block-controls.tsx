import React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { BlockControlsProps } from '../types';
import { getIcon } from '@enokh-blocks/utils';

const EditBlockControls: React.FunctionComponent< BlockControlsProps > = ( props ) => {
    const { insertBlocks } = useDispatch( 'core/block-editor' );
    const { uniqueId, clientId, context } = props;

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    className="enokh-blocks-block-control-icon enokh-blocks-add-carousel-item"
                    icon={ getIcon( 'addContainer' ) }
                    label={ __( 'Add Carousel Item', 'enokh-blocks' ) }
                    onClick={ () => {
                        insertBlocks(
                            createBlock( 'enokh-blocks/container', {
                                isCarouselItem: true,
                                carouselId: uniqueId,
                                paddingTop: '',
                                paddingRight: '',
                                paddingBottom: '',
                                paddingLeft: '',
                                sizing: {
                                    minHeight: context[ 'enokh-blocks/minHeight' ],
                                    minHeightTablet: context[ 'enokh-blocks/minHeightTablet' ],
                                    minHeightMobile: context[ 'enokh-blocks/minHeightMobile' ],
                                },
                            } ),
                            undefined,
                            clientId
                        );
                    } }
                    showTooltip
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

export default EditBlockControls;
