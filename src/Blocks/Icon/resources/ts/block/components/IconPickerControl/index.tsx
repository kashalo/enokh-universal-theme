import { __ } from '@wordpress/i18n';
import { BaseControl, Button, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';
import { IconPickerControlProps } from '../../types';
import { useDebounce } from '@wordpress/compose';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';

const sanitizeSVG = ( string ) => string;

const IconPickerControl = ( props: IconPickerControlProps ) => {
    const { attributes, setAttributes, id } = props;
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

    const flexAttributes: any = {};
    // if ( ! attributes.display.includes( 'flex' ) ) {
    //     flexAttributes.display = 'headline' === id ? 'flex' : 'inline-flex';
    // }
    // if ( ! attributes.alignItems ) {
    //     flexAttributes.alignItems = 'center';
    // }
    // if ( ! attributes.columnGap ) {
    //     flexAttributes.columnGap = '0.5em';
    // }

    const styleAttributes: any = {};
    if ( ! attributes.height ) {
        styleAttributes.height = '1em';
    }
    if ( ! attributes.width ) {
        styleAttributes.width = '1em';
    }

    return (
        <>
            <BaseControl className="enokh-blocks-svg-html">
                <div className="enokh-blocks-icon-preview">
                    <span
                        dangerouslySetInnerHTML={ {
                            __html: sanitizeSVG( iconConfigs[ iconGroup ]?.svgs[ icon ].icon ),
                        } }
                    />
                    <Button
                        isSmall
                        className="reset-icon is-secondary"
                        onClick={ () => {
                            setAttributes( {
                                icon: '',
                                iconGroup: '',
                                hasIcon: false,
                                removeText: false,
                            } );
                        } }
                    >
                        <span className="editor-block-types-list__item-icon">{ __( 'Clear', 'enokh-blocks' ) }</span>
                    </Button>
                </div>
            </BaseControl>

            <BaseControl className="enokh-blocks-icon-chooser-wrapper">
                 {/*// @ts-ignore */}
                <TextControl
                    onChange={(value) => {
                        debouncedSetTerm(value);
                    }}
                    placeholder="Search icon..."
                    className="enokh-blocks-icon-chooser__search-input"
                />
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
                                                            setAttributes( {
                                                                icon: svgItem,
                                                                iconGroup: svg,
                                                                hasIcon: true,
                                                                ...flexAttributes,
                                                                ...styleAttributes,
                                                            } );
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
export default IconPickerControl;
