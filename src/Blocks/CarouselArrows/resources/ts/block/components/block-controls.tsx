import React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { BlockControlsProps } from '../types';
import { getIcon } from '@enokh-blocks/utils';
import { arrowConfig } from '../config';

const EditBlockControls: React.FunctionComponent< BlockControlsProps > = ( props ) => {
    const { insertBlocks } = useDispatch( 'core/block-editor' );
    const { uniqueId, clientId } = props;

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    className="enokh-blocks-block-control-icon"
                    icon={ getIcon( 'addContainer' ) }
                    label={ __( 'Add Previous Button', 'enokh-blocks' ) }
                    onClick={ () => {
                        insertBlocks( createBlock( 'enokh-blocks/carousel-previous', arrowConfig ), undefined, clientId );
                    } }
                    showTooltip
                />
                <ToolbarButton
                    className="enokh-blocks-block-control-icon"
                    icon={ getIcon( 'addContainer' ) }
                    label={ __( 'Add Next Button', 'enokh-blocks' ) }
                    onClick={ () => {
                        insertBlocks(
                            createBlock( 'enokh-blocks/carousel-next', {
                                ...arrowConfig,
                                display: { ...arrowConfig.display, icon: 'angle-right' },
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
