import classnames from 'classnames';
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';

const Element = ( { tagName, htmlAttrs, children } ) => {
    return createElement( tagName, htmlAttrs, children );
};

const TextBlockSave = ( props: TextBlockSaveProps ) => {
    const { attributes } = props;
    const { uniqueId, anchor, element, content, hasIcon, iconLocation } = attributes;

    const maybeGenerateAnchor = (): string | null => {
        if ( anchor ) {
            return anchor;
        }

        if ( ! element.includes( 'h' ) ) {
            return null;
        }

        return `enokh-blocks-text-${ uniqueId }-${ element }`;
    };

    const htmlAttributes = {
        className: classnames( {
            'enokh-blocks-text': true,
            'enokh-blocks-text-text': true,
            [ `enokh-blocks-text-${ uniqueId }` ]: true,
            'has-icon': !! hasIcon,
        } ),
    };

    const blockProps = useBlockProps.save( htmlAttributes );
    blockProps.id = maybeGenerateAnchor();

    return (
        <Element tagName={ element } htmlAttrs={ blockProps }>
            { ( ! iconLocation || [ 'inline', 'left', 'before' ].includes( iconLocation ) ) && hasIcon && (
                <InnerBlocks.Content />
            ) }
            <RichText.Content value={ content } tagName={ undefined } className={ undefined } />
            { [ 'right', 'after' ].includes( iconLocation ) && hasIcon && <InnerBlocks.Content /> }
        </Element>
    );
};
export default TextBlockSave;
