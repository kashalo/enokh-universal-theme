import classnames from 'classnames';
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';

const Element = ( { tagName, htmlAttrs, children } ) => {
    return createElement( tagName, htmlAttrs, children );
};

export default ( props: ButtonBlockProps ) => {
    const { attributes } = props;

    const {
        uniqueId,
        text,
        url,
        target,
        relNoFollow,
        ariaLabel,
        anchor,
        buttonType,
        iconLocation,
        hasIcon,
        removeText,
        isAccordionToggle,
    } = attributes;

    const relAttributes = [];

    if ( relNoFollow ) {
        relAttributes.push( 'nofollow' );
    }

    if ( target ) {
        relAttributes.push( 'noopener', 'noreferrer' );
    }

    const htmlAttributes = {
        className: classnames( {
            'enokh-blocks-button': true,
            'wp-block-button__link': true,
            [ `enokh-blocks-button-${ uniqueId }` ]: true,
            'enokh-blocks-button-text': true,
            'enokh-blocks-button__go-to-top': buttonType === 'go-to-top',
            'enokh-blocks-button-accordion-toggle': !! isAccordionToggle,
        } ),
        href: !! url && buttonType === 'link' ? url : null,
        target: !! target && buttonType === 'link' ? '_blank' : null,
        rel: relAttributes && relAttributes.length > 0 && buttonType === 'link' ? relAttributes.join( ' ' ) : null,
        'aria-label': !! ariaLabel ? ariaLabel : null,
        id: anchor ? anchor : null,
    };

    const blockProps = useBlockProps.save( htmlAttributes );
    const linkButtonTagName = url ? 'a' : 'span';
    const buttonTagName = [ 'button', 'go-to-top' ].includes( buttonType ) ? 'button' : linkButtonTagName;

    return (
        <Element tagName={ buttonTagName } htmlAttrs={ blockProps }>
            { iconLocation === 'left' && hasIcon && <InnerBlocks.Content /> }
            { ! removeText && <RichText.Content value={ text } tagName={ undefined } className={ undefined } /> }
            { iconLocation === 'right' && hasIcon && <InnerBlocks.Content /> }
        </Element>
    );
};
