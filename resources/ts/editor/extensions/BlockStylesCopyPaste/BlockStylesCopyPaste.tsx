import { __ } from '@wordpress/i18n';
import { ToolbarGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { getIcon, noStyleAttributes } from '@enokh-blocks/utils';

const { localStorage } = window;

const POPOVER_PROPS = {
    className: 'block-editor-block-settings-menu__popover',
    position: 'bottom right',
};

const BlockStylesCopyPaste: React.FunctionComponent< any > = ( props ) => {
    const { onPaste, attributes, name } = props;

    const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
    const { getBlockAttributes, getMultiSelectedBlockClientIds, hasMultiSelection } = useSelect(
        ( select ) => select( 'core/block-editor' ),
        []
    );

    let blockName = '';

    if ( name === 'enokh-blocks/container' ) {
        blockName = 'EnokhContainer';
    } else if ( name === 'enokh-blocks/button' ) {
        blockName = 'EnokhButton';
    } else if ( name === 'enokh-blocks/text' ) {
        blockName = 'EnokhText';
    } else if ( name === 'enokh-blocks/icon' ) {
        blockName = 'EnokhIcon';
    }

    const copiedStyles = JSON.parse( localStorage.getItem( blockName + 'Style' ) );

    const copyAction = () => {
        const copyStyles = {};

        Object.keys( attributes ).forEach( ( attribute ) => {
            if ( ! noStyleAttributes.includes( attribute ) ) {
                copyStyles[ attribute ] = attributes[ attribute ];
            }
        } );

        localStorage.setItem( blockName + 'Style', JSON.stringify( copyStyles ) );
    };

    const pasteAction = () => {
        const pasteItem = JSON.parse( localStorage.getItem( blockName + 'Style' ) );

        if ( pasteItem ) {
            onPaste( pasteItem );
            // localStorage.removeItem( blockName + 'Style' );
        }
    };

    const clearAction = () => {
        if (
            // eslint-disable-next-line no-alert
            window.confirm(
                // @ts-ignore
                hasMultiSelection()
                    ? __( 'This will remove all styles from these blocks.', 'enokh-blocks' )
                    : __( 'This will remove all styles from this block.', 'enokh-blocks' )
            )
        ) {
            // @ts-ignore
            const clientIds = hasMultiSelection() ? getMultiSelectedBlockClientIds() : [ props.clientId ];

            const newAttributes = {};

            clientIds.forEach( ( clientId ) => {
                // @ts-ignore
                const blockAttributes = getBlockAttributes( clientId );

                const preservedAttributes = {};

                Object.keys( blockAttributes ).forEach( ( attribute ) => {
                    if ( noStyleAttributes.includes( attribute ) ) {
                        preservedAttributes[ attribute ] = blockAttributes[ attribute ];
                    }
                } );

                const newBlock = createBlock( name, preservedAttributes );

                newAttributes[ clientId ] = newBlock?.attributes;
            } );

            updateBlockAttributes( clientIds, newAttributes, true );
        }
    };


    return (
        <ToolbarGroup
            isCollapsed={ true }
            icon={ getIcon( 'copy' ) }
            // @ts-ignore
            label={ __( 'Styles', 'enokh-blocks' ) }
            popoverProps={ POPOVER_PROPS }
            controls={ [
                {
                    title: __( 'Copy Styles', 'enokh-blocks' ),
                    onClick: copyAction,
                    // @ts-ignore
                    isDisabled: hasMultiSelection(),
                },
                {
                    title: __( 'Paste Styles', 'enokh-blocks' ),
                    onClick: pasteAction,
                    isDisabled: ! copiedStyles,
                },
                {
                    title: __( 'Clear Styles', 'enokh-blocks' ),
                    onClick: clearAction,
                },
            ] }
        />
    );
};

export default BlockStylesCopyPaste;
