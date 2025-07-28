import {
    borderStyle,
    borderStyleColor,
    buildCSS,
    flexChildStyle,
    hexToRGBA,
    layoutStyle,
    sizingStyle,
    spacingStyle,
    typographyStyle,
} from '../../../utils';
import { sprintf } from '@wordpress/i18n';

const ButtonTabletStyle = ( props: ButtonBlockProps ): JSX.Element => {
    const { attributes } = props;
    const { uniqueId, hasButtonContainer } = attributes;
    const deviceType = 'Tablet';
    const {
        textColorTablet,
        textColorHoverTablet,
        textColorCurrentTablet,
        backgroundColorTablet,
        backgroundColorHoverTablet,
        backgroundColorCurrentTablet,
    } = attributes;

    const containerSelector = !! hasButtonContainer ? '.enokh-blocks-button-wrapper ' : '';
    let selector = '.enokh-blocks-button-' + uniqueId;
    selector = '.editor-styles-wrapper ' + containerSelector + selector;

    const styles = [];
    /**
     * Colours
     */
    styles[ selector ] = [
        {
            'background-color': hexToRGBA( backgroundColorTablet, 1 ),
            color: textColorTablet,
        },
    ];
    const currentSelector = sprintf(
        '%1$s[data-button-is-current], %1$s[data-button-is-current]:hover, %1$s[data-button-is-current]:active, %1$s[data-button-is-current]:focus',
        selector
    );
    styles[ currentSelector ] = [
        {
            'background-color': backgroundColorCurrentTablet,
            color: textColorCurrentTablet,
        },
    ];
    /**
     * Accordion icon color
     */
    styles[ `${ selector } .enokh-blocks-accordion-expand-icon` ] = [
        {
            color: textColorCurrentTablet,
        },
    ];
    // Hover
    styles[ selector + ':hover, ' + selector + ':focus, ' + selector + ':active' ] = [
        {
            'background-color': hexToRGBA( backgroundColorHoverTablet, 1 ),
            color: textColorHoverTablet, // eslint-disable-line quote-props
        },
    ];

    typographyStyle( styles, selector, attributes, deviceType );
    sizingStyle( styles, selector, attributes, deviceType );
    borderStyle( styles, selector, attributes, deviceType );
    spacingStyle( styles, selector, attributes, deviceType );
    layoutStyle( styles, selector, attributes, deviceType );
    flexChildStyle( styles, selector, attributes, deviceType );

    borderStyleColor(
        styles,
        selector + ':hover, ' + selector + ':focus, ' + selector + ':active',
        attributes,
        'Hover',
        deviceType
    );
    borderStyleColor( styles, currentSelector, attributes, 'Current', deviceType );

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};
export default ButtonTabletStyle;
