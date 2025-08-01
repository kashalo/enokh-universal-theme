import { DOWN } from '@wordpress/keycodes';
import { __, sprintf } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { AlignmentToolbar, BlockControls, useBlockEditingMode } from '@wordpress/block-editor';
import typographyOptions from '../../../components/InspectorControls/TypographyControls/options';
import { getAttribute } from '../../../utils';
import { Dropdown, TextControl, ToolbarButton, ToolbarGroup, Path, SVG } from '@wordpress/components';
import { plusCircle } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

const HeadingLevelIcon = ( { level } ) => {
    const levelToPath = {
        h1: 'M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z',
        h2: 'M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z',
        h3: 'M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z',
        h4: 'M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z',
        h5: 'M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z',
        h6: 'M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z',
        p: 'M7.411 18V6.005h3.887c1.474 0 2.429.067 2.881.184.687.185 1.257.57 1.726 1.173.452.603.687 1.374.687 2.329 0 .737-.135 1.357-.403 1.86-.268.502-.603.904-1.021 1.189-.403.284-.821.469-1.257.57-.57.117-1.407.167-2.496.167H9.823V18H7.411zm2.412-9.968v3.401h1.324c.955 0 1.591-.05 1.926-.184.319-.118.57-.319.754-.587.185-.268.268-.57.268-.938 0-.435-.117-.787-.385-1.072a1.607 1.607 0 00-.972-.536c-.284-.05-.87-.084-1.742-.084H9.823z',
        div: 'M6.969 6.005h4.423c1.005 0 1.759.084 2.295.235.703.2 1.306.57 1.809 1.105.503.52.871 1.173 1.14 1.944.267.754.385 1.708.385 2.83 0 .99-.118 1.844-.369 2.547-.302.871-.72 1.592-1.273 2.128-.419.402-.989.72-1.709.955-.536.167-1.24.251-2.144.251H6.969V6.005zm2.43 2.027v7.94h1.808c.67 0 1.156-.033 1.458-.1.402-.1.72-.268.972-.502.268-.235.485-.62.636-1.156.168-.536.251-1.273.251-2.195 0-.938-.083-1.641-.25-2.144-.152-.486-.386-.888-.688-1.156-.285-.285-.67-.469-1.122-.57-.335-.067-.989-.117-1.977-.117H9.398z',
    };

    if ( ! levelToPath.hasOwnProperty( level ) ) {
        return null;
    }

    let viewBox = '0 0 20 20';

    if ( 'p' === level ) {
        viewBox = '0 0 24 24';
    }

    return (
        <SVG width="24" height="24" viewBox={ viewBox } xmlns="http://www.w3.org/2000/svg">
            <Path d={ levelToPath[ level ] } />
        </SVG>
    );
};

const TextBlockControls = ( props: TextBlockControlsProps ): JSX.Element => {
    const { attributes, setAttributes, clientId } = props;
    const { element, isCaption } = attributes;
    const { deviceType } = useContext( BlockContext );
    const { insertBlocks } = useDispatch( 'core/block-editor' );
    const iconTemplate = [ 'enokh-blocks/icon', {}, [] ];

    /**
     * While on contentOnly editing mode, only allow changing:
     * - HTML Anchor
     */
    if ( useBlockEditingMode() === 'contentOnly' ) {
        return (
            <BlockControls group="other">
                <Dropdown
                    popoverProps={ { position: 'bottom right' } }
                    renderToggle={ ( { isOpen, onToggle } ) => (
                        <ToolbarButton
                            onClick={ onToggle }
                            aria-haspopup="true"
                            aria-expanded={ isOpen }
                            onKeyDown={ ( event ) => {
                                if ( ! isOpen && event.keyCode === DOWN ) {
                                    event.preventDefault();
                                    onToggle();
                                }
                            } }
                        >
                            { __( 'HTML Anchor' ) }
                        </ToolbarButton>
                    ) }
                    renderContent={ () => (
                        <TextControl
                            className="enokh-blocks-text__toolbar-content-textarea"
                            label={ __( 'HTML Anchor' ) }
                            help={ __(
                                'Enter a word or two — without spaces — to make a unique web address just for this block, called an “anchor.” Then, you’ll be able to link directly to this section of your page.'
                            ) }
                            value={ props.attributes.anchor || '' }
                            onChange={ ( anchor ) =>
                                props.setAttributes( { anchor: anchor.replace( ANCHOR_REGEX, '-' ) } )
                            }
                            __nextHasNoMarginBottom
                        />
                    ) }
                />
            </BlockControls>
        );
    }

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon={ plusCircle }
                    label={ __( 'Add Icon', 'enokh-blocks' ) }
                    onClick={ () => {
                        insertBlocks( createBlocksFromInnerBlocksTemplate( [ iconTemplate ] ), undefined, clientId );
                    } }
                    showTooltip
                />
            </ToolbarGroup>

            { ! isCaption && (
                <ToolbarGroup
                    isCollapsed={ true }
                    icon={ <HeadingLevelIcon level={ element } /> }
                    // @ts-ignore
                    label={ __( 'Change Text Element', 'enokh-blocks' ) }
                    controls={ [
                        {
                            isActive: element === 'h1',
                            icon: <HeadingLevelIcon level={ 'h1' } />,
                            title: sprintf(
                                // translators: %s: heading level
                                __( 'Heading %s', 'enokh-blocks' ),
                                '1'
                            ),
                            onClick: () => {
                                setAttributes( { element: 'h1' } );
                            },
                        },
                        {
                            isActive: element === 'h2',
                            icon: <HeadingLevelIcon level={ 'h2' } />,
                            title: sprintf(
                                // translators: %s: heading level
                                __( 'Heading %s', 'enokh-blocks' ),
                                '2'
                            ),
                            onClick: () => {
                                setAttributes( { element: 'h2' } );
                            },
                        },
                        {
                            isActive: element === 'h3',
                            icon: <HeadingLevelIcon level={ 'h3' } />,
                            title: sprintf(
                                // translators: %s: heading level
                                __( 'Heading %s', 'enokh-blocks' ),
                                '3'
                            ),
                            onClick: () => {
                                setAttributes( { element: 'h3' } );
                            },
                        },
                        {
                            isActive: element === 'h4',
                            icon: <HeadingLevelIcon level={ 'h4' } />,
                            title: sprintf(
                                // translators: %s: heading level
                                __( 'Heading %s', 'enokh-blocks' ),
                                '4'
                            ),
                            onClick: () => {
                                setAttributes( { element: 'h4' } );
                            },
                        },
                        {
                            isActive: element === 'h5',
                            icon: <HeadingLevelIcon level={ 'h5' } />,
                            title: sprintf(
                                // translators: %s: heading level
                                __( 'Heading %s', 'enokh-blocks' ),
                                '5'
                            ),
                            onClick: () => {
                                setAttributes( { element: 'h5' } );
                            },
                        },
                        {
                            isActive: element === 'h6',
                            icon: <HeadingLevelIcon level={ 'h6' } />,
                            title: sprintf(
                                // translators: %s: heading level
                                __( 'Heading %s', 'enokh-blocks' ),
                                '6'
                            ),
                            onClick: () => {
                                setAttributes( { element: 'h6' } );
                            },
                        },
                        {
                            isActive: element === 'p',
                            icon: <HeadingLevelIcon level={ 'p' } />,
                            title: __( 'Paragraph', 'enokh-blocks' ),
                            onClick: () => {
                                setAttributes( { element: 'p' } );
                            },
                        },
                        {
                            isActive: 'div' === element,
                            icon: <HeadingLevelIcon level={ 'div' } />,
                            title: __( 'Div', 'enokh-blocks' ),
                            onClick: () => {
                                setAttributes( { element: 'div' } );
                            },
                        },
                    ] }
                />
            ) }
            <AlignmentToolbar
                value={ getAttribute( 'textAlign', { attributes: attributes.typography, deviceType } ) }
                onChange={ ( value ) => {
                    setAttributes( {
                        typography: {
                            [ getAttribute( 'textAlign', { attributes: attributes.typography, deviceType }, true ) ]:
                                value,
                        },
                    } );
                } }
                alignmentControls={ typographyOptions.alignments }
            />
        </BlockControls>
    );
};

export default TextBlockControls;
