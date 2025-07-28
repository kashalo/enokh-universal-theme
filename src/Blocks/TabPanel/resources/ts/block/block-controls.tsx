import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { getIcon } from '@enokh-blocks/utils';

const EditBlockControls = ( { clientId, setAttributes, attributes } ): JSX.Element => {
    const { insertBlocks } = useDispatch( 'core/block-editor' );
    const { templateLock: currentTemplateLock } = attributes;
    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    className="enokh-blocks-block-control-icon enokh-blocks-add-item"
                    icon={ getIcon( 'add-tab' ) }
                    label={ __( 'Add Tab Item', 'enokh-blocks' ) }
                    onClick={ () => {
                        setAttributes( {
                            templateLock: false,
                        } );
                        setTimeout( () => {
                            insertBlocks( createBlock( 'enokh-blocks/tab', {} ), undefined, clientId );
                            setAttributes( {
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
