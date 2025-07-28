import getDynamicContentAttributes from '../../../../components/InspectorControls/DynamicContentControls/attributes';
import useDynamicContent from '../../../../stores/useDynamicContent';
import { createElement } from '@wordpress/element';
import classnames from 'classnames';
import RootRenderer from '../../../../components/RootRenderer';
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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

const TextBlockDynamicRenderer = ( props: TextBlockProps ): JSX.Element => {
    const { attributes, context, clientId, deviceType, setAttributes } = props;

    let dynamicAttributes = filterAttributes( attributes, Object.keys( getDynamicContentAttributes() ) );
    dynamicAttributes = {
        ...dynamicAttributes,
        estimatedReadingTime: attributes.estimatedReadingTime,
        deviceType,
    };
    const attributesWithContext = applyContext( context, dynamicAttributes );
    const { dynamicContentType, dynamicLinkType, termSeparator } = attributesWithContext;
    const rawContent = useDynamicContent( attributesWithContext, EnokhBlocksEditor.Blocks.TextBlock.name );
    const content = !! attributes.dynamicContentType ? rawContent : attributes.content;

    attributes.content = content;

    const { uniqueId, element, anchor } = attributes;
    const tagName = dynamicContentType !== 'terms' && !! dynamicLinkType ? 'a' : 'span';

    const htmlAttributes = {
        className: classnames( {
            'enokh-blocks-text': true,
            [ `enokh-blocks-text-${ uniqueId }` ]: true,
            'has-icon': !! attributes.hasIcon,
        } ),
        id: anchor ? anchor : null,
    };
    const blockProps = useBlockProps( htmlAttributes );
    return (
        <>
            <RootRenderer name={ EnokhBlocksEditor.Blocks.TextBlock.name } clientId={ clientId } align="">
                <Element tagName={ element } htmlAttrs={ blockProps }>
                    <InnerBlocks renderAppender={ false } allowedBlocks={ [ 'enokh-blocks/icon' ] } />
                    <RichText.Content
                        name={ EnokhBlocksEditor.Blocks.TextBlock.name }
                        value={ content }
                        tagName={ tagName }
                    />
                </Element>
            </RootRenderer>
        </>
    );
};
export default TextBlockDynamicRenderer;
