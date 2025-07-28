import getDynamicContentAttributes from '../../../../components/InspectorControls/DynamicContentControls/attributes';
import useDynamicContent from '../../../../stores/useDynamicContent';
import { createElement, useRef } from '@wordpress/element';
import classnames from 'classnames';
import RootRenderer from '../../../../components/RootRenderer';
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const applyContext = ( context, attributes ) => {
    if ( [ 'current-post', 'current-term' ].includes( attributes.dynamicSource ) ) {
        return Object.assign( {}, attributes, context );
    }

    return attributes;
};

const filterAttributes = ( attributes, allowedKeys = [] ) =>
    Object.keys( attributes )
        .filter( ( key ) => allowedKeys.includes( key ) )
        .reduce( ( result, key ) => Object.assign( {}, result, { [ key ]: attributes[ key ] } ), {} );

const Element = ( { tagName, htmlAttrs, children } ) => {
    return createElement( tagName, htmlAttrs, children );
};

const ButtonBlockDynamicRenderer = ( props: ButtonBlockProps ): JSX.Element => {
    const { attributes, context, clientId, setAttributes, isSelected } = props;

    const dynamicAttributes = filterAttributes( attributes, Object.keys( getDynamicContentAttributes() ) );
    const attributesWithContext = applyContext( context, dynamicAttributes );
    const { dynamicContentType, dynamicLinkType, termSeparator } = attributesWithContext;
    const rawContent = useDynamicContent( attributesWithContext, EnokhBlocksEditor.Blocks.ButtonBlock.name );
    const content = !! attributes.dynamicContentType ? rawContent : attributes.text;

    attributes.text = content;

    const { uniqueId, anchor, relNoFollow, target, buttonType, ariaLabel, url, text, removeText } = attributes;
    let buttonTagName = url ? 'a' : 'span';
    if ( buttonType === 'button' ) {
        buttonTagName = 'span';
    }
    const tagName = dynamicContentType !== 'terms' && !! dynamicLinkType ? 'a' : 'span';
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
        } ),
        rel: relAttributes && relAttributes.length > 0 && 'link' === buttonType ? relAttributes.join( ' ' ) : null,
        'aria-label': !! ariaLabel ? ariaLabel : null,
        id: anchor ? anchor : null,
        ref: buttonRef,
    };
    const richTextFormats = [ 'core/bold', 'core/italic', 'core/strikethrough' ];
    const blockProps = useBlockProps( htmlAttributes );
    return (
        <>
            <RootRenderer name={ EnokhBlocksEditor.Blocks.ButtonBlock.name } clientId={ clientId } align="">
                <Element tagName={ buttonTagName } htmlAttrs={ blockProps }>
                    { attributes.iconLocation === 'left' && <InnerBlocks allowedBlocks={ [ 'enokh-blocks/icon' ] } /> }
                    { !! dynamicContentType && ! removeText && (
                        <RichText.Content
                            name={ EnokhBlocksEditor.Blocks.ButtonBlock.name }
                            value={ content }
                            tagName={ undefined }
                        />
                    ) }

                    { ! dynamicContentType && ! removeText && (
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

                    { attributes.iconLocation === 'right' && <InnerBlocks allowedBlocks={ [ 'enokh-blocks/icon' ] } /> }
                </Element>
            </RootRenderer>
        </>
    );
};
export default ButtonBlockDynamicRenderer;
