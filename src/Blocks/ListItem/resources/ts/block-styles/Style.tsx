import { BlockStyleProps } from '../block/types';
import {
    borderStyle,
    buildCSS,
    colourGroupStyle,
    coloursStyle,
    getAttribute,
    spacingStyle,
    typographyStyle,
} from '@enokh-blocks/utils';

const MainStyle: React.FunctionComponent< BlockStyleProps > = ( props ) => {
    const { attributes, deviceType } = props;
    const { uniqueId } = attributes;
    const selector = '.enokh-blocks-list-item.enokh-blocks-list-item-' + uniqueId;
    const styles = [];

    const columnAttrName = getAttribute( 'column', { attributes, deviceType }, true );

    styles[ selector ] = [
        {
            columns: attributes[ columnAttrName ],
        },
    ];

    typographyStyle( styles, selector, attributes, deviceType );
    spacingStyle( styles, selector, attributes, deviceType );
    borderStyle( styles, selector, attributes, deviceType );
    coloursStyle( styles, selector, attributes.colors, '', deviceType );

    colourGroupStyle( styles, `${ selector } a`, 'color', 'linkColor', attributes.colors, '', deviceType );
    colourGroupStyle( styles, `${ selector } a:hover`, 'color', 'linkColor', attributes.colors, 'Hover', deviceType );

    colourGroupStyle(
        styles,
        `${ selector } .enokh-blocks-list-item__has-bullet:before`,
        'background-color',
        'markerColor',
        attributes.colors,
        '',
        deviceType
    );
    /**
     * Marker
     */
    colourGroupStyle( styles, `${ selector }::marker`, 'color', 'markerColor', attributes.colors, '', deviceType );
    colourGroupStyle( styles, `${ selector } ::marker`, 'color', 'markerColor', attributes.colors, '', deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
