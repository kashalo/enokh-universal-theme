import {
    buildCSS,
    getAttribute,
    layoutStyle,
    lineClampStyle,
    needRebuildStyles,
    spacingStyle,
    typographyStyle,
} from '../../../utils';
import { memo } from '@wordpress/element';

const TextStyle = ( props: TextBlockProps ): JSX.Element => {
    const { attributes, clientId, deviceType } = props;

    const { uniqueId, element, textColor, textColorHover } = attributes;
    const selector = `${ element }.enokh-blocks-text-${ uniqueId }`;
    const columnAttrName = getAttribute( 'column', { attributes, deviceType }, true );
    const textColorAttrName = getAttribute( 'textColor', { attributes, deviceType }, true );
    const textColorHoverAttrName = getAttribute( 'textColorHover', { attributes, deviceType }, true );

    const styles = [];
    styles[ '.editor-styles-wrapper ' + selector ] = [
        {
            color: attributes[ textColorAttrName ],
        },
    ];

    if ( attributes[ columnAttrName ] && attributes[ columnAttrName ] > 0 ) {
        styles[ `.editor-styles-wrapper ${ selector } .rich-text` ] = [
            {
                columns: attributes[ columnAttrName ],
            },
        ];
    }

    layoutStyle( styles, `.block-editor-block-list__layout ${ selector }`, attributes, deviceType );
    typographyStyle( styles, selector, attributes, deviceType );
    spacingStyle( styles, selector, attributes, deviceType );
    lineClampStyle( styles, `.editor-styles-wrapper ${ selector } .rich-text`, attributes, deviceType );

    styles[ '.editor-styles-wrapper .enokh-blocks-text ' + selector ] = [
        {
            color: attributes[ textColorAttrName ],
        },
    ];
    // Hover
    styles[
        '.editor-styles-wrapper ' +
            selector +
            ':hover, ' +
            '.editor-styles-wrapper ' +
            selector +
            ':focus, ' +
            '.editor-styles-wrapper ' +
            selector +
            ':active'
    ] = [
        {
            color: attributes[ textColorHoverAttrName ],
        },
    ];

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};
export default memo( TextStyle, needRebuildStyles );
