import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import {
    borderStyle,
    buildCSS,
    flexChildStyle,
    hexToRGBA,
    layoutStyle,
    sizingStyle,
    spacingStyle,
    typographyStyle,
    borderStyleColor,
} from '../../../utils';
import { sprintf } from '@wordpress/i18n';

const ButtonStyle = ( props: ButtonBlockProps ): JSX.Element => {
    const { attributes, clientId } = props;
    const { deviceType } = useContext( BlockContext );
    const {
        uniqueId,
        backgroundColor,
        backgroundColorOpacity,
        textColor,
        backgroundColorHover,
        backgroundColorHoverOpacity,
        textColorHover,
        hasButtonContainer,
        backgroundColorCurrent,
        textColorCurrent,
    } = attributes;

    const containerSelector = !! hasButtonContainer ? '.enokh-blocks-button-wrapper ' : '';
    let selector = '.enokh-blocks-button-' + uniqueId;
    selector = '.editor-styles-wrapper ' + containerSelector + selector;

    const styles = [];
    styles[ selector ] = [
        {
            'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
            color: textColor, // eslint-disable-line quote-props
        },
    ];

    typographyStyle( styles, selector, attributes );
    sizingStyle( styles, selector, attributes );
    borderStyle( styles, selector, attributes );
    spacingStyle( styles, selector, attributes );
    layoutStyle( styles, selector, attributes );
    flexChildStyle( styles, selector, attributes );

    const currentSelector = sprintf(
        '%1$s[data-button-is-current], %1$s[data-button-is-current]:hover, %1$s[data-button-is-current]:active, %1$s[data-button-is-current]:focus',
        selector
    );

    styles[ currentSelector ] = [
        {
            'background-color': backgroundColorCurrent,
            color: textColorCurrent,
        },
    ];

    /**
     * Accordion icon color
     */
    styles[ `${ selector } .enokh-blocks-accordion-expand-icon` ] = [
        {
            color: textColorCurrent,
        },
    ];

    // Hover
    styles[ selector + ':hover, ' + selector + ':focus, ' + selector + ':active' ] = [
        {
            'background-color': hexToRGBA( backgroundColorHover, backgroundColorHoverOpacity ),
            color: textColorHover, // eslint-disable-line quote-props
        },
    ];
    borderStyleColor(
        styles,
        selector + ':hover, ' + selector + ':focus, ' + selector + ':active',
        attributes,
        'Hover'
    );
    borderStyleColor( styles, currentSelector, attributes, 'Current' );

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};
export default ButtonStyle;
