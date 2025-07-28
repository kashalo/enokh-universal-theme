import { compose } from '@wordpress/compose';
import ButtonBlockInspectorControls from './inpector-controls';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import BlockContext, { withBlockContext } from '@enokh-blocks/block-context';
import withDynamicContent from '@enokh-blocks/hoc/withDynamicContent';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { createElement, useContext, useEffect, useRef, useState } from '@wordpress/element';
import { RichText, useBlockProps, InnerBlocks, useBlockEditingMode } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import RootRenderer from '@enokh-blocks/components/RootRenderer';
import ButtonStyle from '@enokh-blocks/editor/block-styles/button/Style';
import ButtonBlockControls from './block-controls';
import ButtonTabletStyle from '@enokh-blocks/editor/block-styles/button/TabletStyle';
import ButtonMobileStyle from '@enokh-blocks/editor/block-styles/button/MobileStyle';
import ButtonBlockDynamicRenderer from './components/ButtonBlockDynamicRenderer';
import ButtonInspectorAdvancedControls from '@enokh-blocks/editor/blocks/ButtonBlock/components/ButtonInspectorAdvancedControls';
import { useSelect } from '@wordpress/data';
import ButtonEffectsStyle from '@enokh-blocks/editor/block-styles/button/EffectsStyle';

function Element( { tagName, htmlAttrs, children } ) {
    return createElement( tagName, htmlAttrs, children );
}

const ButtonBlockEdit = ( props: ButtonBlockProps ): JSX.Element => {
    const { attributes, setAttributes, clientId, isSelected, context } = props;
    const { deviceType } = useContext( BlockContext );
    const {
        anchor,
        ariaLabel,
        typography,
        hasButtonContainer,
        buttonType,
        variantRole,
        relNoFollow,
        target,
        uniqueId,
        url,
        text,
        hasIcon,
        iconLocation,
        removeText,
        isAccordionToggle,
    } = attributes;
    const [ toggleCurrent, setToggleCurrent ] = useState( false );

    const relAttributes = [];

    if ( relNoFollow ) {
        relAttributes.push( 'nofollow' );
    }

    if ( target ) {
        relAttributes.push( 'noopener', 'noreferrer' );
    }
    const buttonRef = useRef( null );
    const htmlAttributes = {
        className: classnames( {
            'enokh-blocks-button': true,
            'wp-block-button__link': true,
            [ `enokh-blocks-button-${ uniqueId }` ]: true,
            'enokh-blocks-button-text': true,
            'enokh-blocks-button__go-to-top': buttonType === 'go-to-top',
            'enokh-blocks-button-accordion-toggle': !! isAccordionToggle,
        } ),
        rel: relAttributes && relAttributes.length > 0 && 'link' === buttonType ? relAttributes.join( ' ' ) : null,
        'aria-label': !! ariaLabel ? ariaLabel : null,
        id: anchor ? anchor : null,
        ref: buttonRef,
        'data-button-is-current': toggleCurrent ? true : undefined,
    };
    const blockProps = useBlockProps( htmlAttributes );
    const richTextFormats = [ 'core/bold', 'core/italic', 'core/strikethrough', 'core/superscript', 'core/subscript' ];
    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;

    let buttonTagName = url ? 'a' : 'span';
    if ( buttonType === 'button' ) {
        buttonTagName = 'span';
    }

    useEffect( () => {
        // Initialize default attributes upon adding new
        if ( uniqueId === '' && ! variantRole ) {
            setAttributes( {
                display: 'inline-flex',
                justifyContent: 'center',
            } );
        }
    }, [] );

    useEffect( () => {
        setAttributes( {
            hasIcon: innerBlocksCount > 0,
        } );
    }, [ innerBlocksCount ] );

    const blockToolbarProps = {
        ...props,
        toggleCurrent,
        setToggleCurrent,
    };

    return (
        <>
            { useBlockEditingMode() !== 'contentOnly' && isSelected && (
                <>
                    <ButtonBlockInspectorControls
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        clientId={ clientId }
                    />
                    <ButtonInspectorAdvancedControls
                        buttonType={ buttonType }
                        setAttributes={ setAttributes }
                        iconLocation={ iconLocation }
                        ariaLabel={ ariaLabel }
                        removeText={ removeText }
                    />
                    <ButtonBlockControls { ...blockToolbarProps } />
                </>
            ) }

            <ButtonStyle { ...props } />
            <ButtonEffectsStyle { ...props } />
            { ( deviceType === 'Tablet' || deviceType === 'Mobile' ) && <ButtonTabletStyle { ...props } /> }
            { deviceType === 'Mobile' && <ButtonMobileStyle { ...props } /> }
            { attributes.useDynamicData && ( !! attributes.dynamicContentType || !! attributes.dynamicLinkType ) ? (
                <ButtonBlockDynamicRenderer { ...props } />
            ) : (
                <RootRenderer name={ EnokhBlocksEditor.Blocks.ButtonBlock.name } clientId={ clientId } align="">
                    <Element tagName={ buttonTagName } htmlAttrs={ blockProps }>
                        { iconLocation === 'left' && <InnerBlocks allowedBlocks={ [ 'enokh-blocks/icon' ] } /> }

                        { ! removeText && (
                            <RichText
                                name={ EnokhBlocksEditor.Blocks.ButtonBlock.name }
                                placeholder={ __( 'Add text…', 'enokh-blocks' ) }
                                value={ text }
                                onChange={ ( value ) => setAttributes( { text: value } ) }
                                allowedFormats={ richTextFormats }
                                isSelected={ isSelected }
                                attributes={ attributes }
                                context={ context }
                            />
                        ) }

                        { iconLocation === 'right' && <InnerBlocks allowedBlocks={ [ 'enokh-blocks/icon' ] } /> }
                    </Element>
                </RootRenderer>
            ) }
        </>
    );
};

export default compose(
    withSetAttributes,
    withDeviceType,
    withBlockContext,
    withDynamicContent,
    withUniqueId
)( ButtonBlockEdit );
