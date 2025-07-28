import { Inserter } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { _x, __, sprintf } from '@wordpress/i18n';
import { Button, Icon, Tooltip } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import { getIcon } from '../../../../utils';

const ContainerChildAppender = ( props: ContainerChildAppenderProps ): JSX.Element => {
    const { clientId, isSelected, attributes } = props;
    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;
    const { selectBlock } = useDispatch( 'core/block-editor' );

    const appender = false;

    return (
        <>
            { isSelected && (
                <Inserter
                    position="bottom right"
                    rootClientId={ clientId }
                    __experimentalIsQuick
                    renderToggle={ ( { onToggle, disabled, isOpen, blockTitle, hasSingleBlockType } ) => {
                        const label = hasSingleBlockType
                            ? sprintf(
                                  // translators: %s: the name of the block when there is only one
                                  _x( 'Add %s', 'directly add the only allowed block', 'enokh-blocks' ),
                                  blockTitle
                              )
                            : _x( 'Add block', 'Generic label for block inserter button', 'enokh-blocks' );

                        return (
                            <Tooltip text={ label }>
                                <Button
                                    className={ 'block-editor-button-block-appender' }
                                    onClick={ onToggle }
                                    aria-haspopup={ ! hasSingleBlockType ? 'true' : undefined }
                                    aria-expanded={ ! hasSingleBlockType ? isOpen : undefined }
                                    disabled={ disabled }
                                    label={ label }
                                >
                                    <Icon icon={ plus } />
                                </Button>
                            </Tooltip>
                        );
                    } }
                    isAppender
                />
            ) }

            { ! hasChildBlocks && ! isSelected && (
                <Button
                    className="enokh-blocks-container-selector"
                    onClick={ () => selectBlock( clientId ) }
                    aria-label={ __( 'Select Container', 'enokh-blocks' ) }
                >
                    <span className="enokh-blocks-container-selector__icon">{ getIcon( 'container' ) }</span>
                </Button>
            ) }
        </>
    );
};

export default ContainerChildAppender;
