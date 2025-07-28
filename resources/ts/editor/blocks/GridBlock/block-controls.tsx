import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { getIcon } from '../../../utils';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

const GridBlockControls = ( { uniqueId, clientId } ): JSX.Element => {
    const { insertBlocks } = useDispatch( 'core/block-editor' );

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    className="enokh-blocks-block-control-icon enokh-blocks-add-grid-item"
                    icon={ getIcon( 'addContainer' ) }
                    label={ __( 'Add Grid Item', 'enokh-blocks' ) }
                    onClick={ () => {
                        insertBlocks(
                            createBlock( 'enokh-blocks/container', {
                                isGrid: true,
                                gridId: uniqueId,
                                paddingTop: '',
                                paddingRight: '',
                                paddingBottom: '',
                                paddingLeft: '',
                                sizing: {
                                    width: '50%',
                                    widthMobile: '100%',
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

export default GridBlockControls;
