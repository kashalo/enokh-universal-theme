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
import { useMemo } from '@wordpress/element';
import _cloneDeep from 'lodash/cloneDeep';
import { applyFilters } from '@wordpress/hooks';

const MainStyle: React.FunctionComponent< BlockStyleProps > = ( props ) => {
    const { attributes, deviceType, clientId } = props;
    const { uniqueId, listType, numerical, marker, listSpacing } = attributes;
    const { icon, iconGroup, size } = marker;
    const selector = '.enokh-blocks-list-' + uniqueId;
    const styles = [];

    const columnAttrName = getAttribute( 'column', { attributes, deviceType }, true );
    const listStyleAttrName = getAttribute( 'listStyle', { attributes: numerical, deviceType }, true );
    const iconSizeAttrName = getAttribute( 'size', { attributes: marker, deviceType }, true );
    const columnGap = getAttribute( 'columnGap', { attributes, deviceType } );
    const listPosition = getAttribute( 'listPosition', { attributes, deviceType } );

    const isOrdered = listType === 'ol';
    const iconSVGSets = useMemo( () => {
        const baseSets = _cloneDeep( EnokhBlocksEditor.Config.icons );

        return applyFilters( 'enokh-blocks.editor.iconSVGSets', baseSets, { attributes } );
    }, [ clientId ] );
    const hasIcon = iconSVGSets[ iconGroup ]?.svgs[ icon ];

    styles[ selector ] = [];

    if ( attributes[ columnAttrName ] && attributes[ columnAttrName ] > 0 ) {
        styles[ selector ].push( {
            columns: attributes[ columnAttrName ],
            'column-gap': columnGap,
        } );
    }

    if ( isOrdered ) {
        styles[ selector ].push( {
            'list-style-type': numerical[ listStyleAttrName ],
        } );
    }

    if ( listPosition ) {
        styles[ selector ].push( {
            'list-style-position': listPosition,
        } );

        styles[ `${ selector } .enokh-blocks-list-item__content` ] = [
            {
                display: 'inline',
            },
        ];
    }

    if ( ! isOrdered && !! icon && !! iconGroup ) {
        const alignItems = getAttribute( 'alignItems', { attributes: marker, deviceType } ) ?? '';
        const computedAlignItems =
            alignItems === 'center' ? alignItems : `flex-${ alignItems === 'top' ? 'start' : 'end' }`;

        styles[ selector ].push( {
            'list-style': 'none',
        } );

        styles[ `${ selector } .enokh-blocks-list-item__has-bullet:before` ] = [
            {
                width: marker[ iconSizeAttrName ] ?? '',
                height: marker[ iconSizeAttrName ] ?? '',
                '-webkit-mask-size': `${ marker[ iconSizeAttrName ] ?? '' } ${ marker[ iconSizeAttrName ] ?? '' }`,
                'mask-size': `${ marker[ iconSizeAttrName ] ?? '' } ${ marker[ iconSizeAttrName ] ?? '' }`,
            },
        ];

        styles[ `${ selector } .enokh-blocks-list-item__has-bullet` ] = [
            {
                'align-items': computedAlignItems,
            },
        ];

        spacingStyle( styles, `${ selector } .enokh-blocks-list-item__has-bullet:before`, marker, deviceType );
        colourGroupStyle(
            styles,
            `${ selector } .enokh-blocks-list-item__has-bullet:before`,
            'background-color',
            'markerColor',
            attributes.colors,
            '',
            deviceType
        );
    }

    typographyStyle( styles, selector, attributes, deviceType );
    spacingStyle( styles, selector, attributes, deviceType );
    borderStyle( styles, selector, attributes, deviceType );
    coloursStyle( styles, selector, attributes.colors, '', deviceType );
    colourGroupStyle( styles, `${ selector } a`, 'color', 'linkColor', attributes.colors, '', deviceType );
    colourGroupStyle( styles, `${ selector } a:hover`, 'color', 'linkColor', attributes.colors, 'Hover', deviceType );

    /**
     * Marker
     */
    colourGroupStyle( styles, `${ selector } ::marker`, 'color', 'markerColor', attributes.colors, '', deviceType );

    if ( hasIcon ) {
        styles[ `${ selector } .enokh-blocks-list-item__has-bullet:before` ].push( {
            'mask-image': `url('data:image/svg+xml,${ iconSVGSets[ iconGroup ]?.svgs[ icon ].icon }')`,
            '-webkit-mask-image': `url('data:image/svg+xml,${ iconSVGSets[ iconGroup ]?.svgs[ icon ].icon }')`,
            height: size,
            width: size,
        } );
    }

    /**
     * Default list item spacing
     */
    spacingStyle( styles, `${ selector } li`, { spacing: listSpacing }, deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
