import { __ } from '@wordpress/i18n';
import { BaseControl, Button, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import React from 'react';
import { useState } from '@wordpress/element';
import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import { useDebounce } from '@wordpress/compose';

const sanitizeSVG = ( string ) => string;

const IconSelectControl: React.FunctionComponent< IconSelectControlProps > = ( props ) => {
    const { attributes, onclick, onReset } = props;
    const { icon, iconGroup } = attributes;
    const [ term, setTerm ] = useState( '' );

    const iconConfigs = EnokhBlocksEditor.Config.icons;
    let iconSVGSets: any = _cloneDeep( iconConfigs );
    iconSVGSets = applyFilters( 'enokh-blocks.editor.iconSVGSets', iconSVGSets, { attributes } );

    const debouncedSetTerm = useDebounce( ( newTerm ) => {
        setTerm( newTerm );
    }, 500 );

    if ( !! term ) {
        Object.keys( iconSVGSets ).forEach( ( iconSVGSetKey ) => {
            let svgItems = iconSVGSets[ iconSVGSetKey ].svgs;
            svgItems = {
                ...Object.fromEntries( Object.entries( svgItems ).filter( ( [ key ] ) => key.includes( term ) ) ),
            };

            if ( _isEmpty( svgItems ) ) {
                delete iconSVGSets[ iconSVGSetKey ];
                return;
            }
            iconSVGSets[ iconSVGSetKey ].svgs = { ...svgItems };
        } );
    }

    return (
        <>
            <BaseControl className="enokh-blocks-svg-html">
                <div className="enokh-blocks-icon-preview">
                    <span
                        dangerouslySetInnerHTML={ {
                            __html: sanitizeSVG(
                                iconSVGSets[ iconGroup ]?.svgs[ icon ]
                                    ? iconSVGSets[ iconGroup ]?.svgs[ icon ].icon
                                    : ''
                            ),
                        } }
                    />
                    <Button isSmall className="reset-icon is-secondary" onClick={ onReset }>
                        <span className="editor-block-types-list__item-icon">{ __( 'Clear', 'enokh-blocks' ) }</span>
                    </Button>
                </div>
            </BaseControl>

            <BaseControl className="enokh-blocks-icon-chooser-wrapper">
                <TextControl
                    onChange={(value) => {
                        debouncedSetTerm(value);
                    }}
                    placeholder="Search icon..."
                    className="enokh-blocks-icon-chooser__search-input" value={''}                />
                { Object.keys( iconSVGSets ).map( ( svg, i ) => {
                    const svgItems = iconSVGSets[ svg ].svgs;

                    return (
                        <PanelBody
                            className="enokh-blocks-panel-label enokh-blocks-icon-panel"
                            title={ iconSVGSets[ svg ].group }
                            initialOpen={ false }
                            key={ i }
                        >
                            <PanelRow>
                                <BaseControl>
                                    <ul className="enokh-blocks-icon-chooser">
                                        { Object.keys( svgItems ).map( ( svgItem, index ) => {
                                            return (
                                                <li key={ `editor-block-types-list-item-${ index }` }>
                                                    <Button
                                                        className="editor-block-list-item-button"
                                                        onClick={ () => {
                                                            onclick( svgItem, svg );
                                                        } }
                                                    >
                                                        { typeof svgItems[ svgItem ].icon === 'string' ? (
                                                            <>
                                                                <span
                                                                    className="editor-block-types-list__item-icon"
                                                                    dangerouslySetInnerHTML={ {
                                                                        __html: sanitizeSVG( svgItems[ svgItem ].icon ),
                                                                    } }
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="editor-block-types-list__item-icon">
                                                                    { svgItems[ svgItem ].icon }
                                                                </span>
                                                            </>
                                                        ) }
                                                    </Button>
                                                </li>
                                            );
                                        } ) }
                                    </ul>
                                </BaseControl>
                            </PanelRow>
                        </PanelBody>
                    );
                } ) }
            </BaseControl>
        </>
    );
};
export default IconSelectControl;
