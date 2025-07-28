import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { getIcon } from '@enokh-blocks/utils';

const EditBlockControls = ( { clientId, setAttributes, attributes } ): JSX.Element => {
    const { getBlockRootClientId, getBlockAttributes } = useSelect( ( select ) => select( 'core/block-editor' ), [] );

    const { removeBlock, updateBlockAttributes } = useDispatch( 'core/block-editor' );

    // @ts-ignore
    const parentBlock = getBlockRootClientId( clientId );

    if ( ! parentBlock ) {
        return <></>;
    }

    // @ts-ignore
    const parentAttributes = getBlockAttributes( parentBlock );
    const { templateLock: currentTemplateLock } = parentAttributes;

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    className="enokh-blocks-block-control-icon enokh-blocks-add-item"
                    icon={ getIcon( 'delete-tab' ) }
                    label={ __( 'Delete Tab Item', 'enokh-blocks' ) }
                    onClick={ () => {
                        updateBlockAttributes( parentBlock, {
                            templateLock: false,
                        } );
                        setTimeout( () => {
                            removeBlock( clientId );
                            updateBlockAttributes( parentBlock, {
                                templateLock: currentTemplateLock,
                            } );
                        }, 50 );
                    } }
                    showTooltip
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

export default EditBlockControls;
