import React from 'react';
import { BaseControl, Button, PanelBody, PanelRow, TextControl, VisuallyHidden } from '@wordpress/components';
import { useState, createRoot } from '@wordpress/element';
import '../../../../scss/admin/term-icon-selector.scss';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import { useDebounce } from '@wordpress/compose';

interface TermIconSelectorProps {
    initialIconSet: string;
    initialIcon: string;
}
const config = EnokhBlocksTermIconConfig;
const TermIconSelector: React.FunctionComponent< TermIconSelectorProps > = ( props ) => {
    const { initialIcon, initialIconSet } = props;
    const [ iconSet, setIconSet ] = useState( initialIconSet );
    const [ iconSvg, setIconSvg ] = useState( initialIcon );
    const [ term, setTerm ] = useState( '' );
    const { iconInputName, iconSetInputName, icons } = config;

    const iconSVGSets = _cloneDeep( icons );

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

    // Preview the selected one
    const selectedIconGroup = icons[ iconSet ] ?? null;
    const selectedIcon = selectedIconGroup ? selectedIconGroup.svgs[ iconSvg ].icon : null;
    return (
        <>
            <VisuallyHidden>
                <TextControl value={ iconSet } onChange={ () => {} } name={ iconSetInputName } />
                <TextControl value={ iconSvg } onChange={ () => {} } name={ iconInputName } />
            </VisuallyHidden>

            <div className="enokh-blocks-term-icon-preview">
                { selectedIcon ? (
                    <>
                        <span>Selected Icon: </span>
                        <span
                            dangerouslySetInnerHTML={ {
                                __html: selectedIcon,
                            } }
                        />
                    </>
                ) : (
                    <span> Please Select an Icon</span>
                ) }
            </div>

            <BaseControl className="enokh-blocks-term-icon-chooser-wrapper">
                <TextControl
                    onChange={(value) => {
                        debouncedSetTerm(value);
                    }}
                    placeholder="Search icon..." value={''}                />
                { Object.keys( iconSVGSets ).map( ( svg, i ) => {
                    const svgItems = iconSVGSets[ svg ].svgs;

                    return (
                        <PanelBody
                            className="enokh-blocks-term-icon-panel-label enokh-blocks-term-icon-panel"
                            title={ iconSVGSets[ svg ].group }
                            initialOpen={ false }
                            key={ i }
                        >
                            <PanelRow>
                                <BaseControl>
                                    <ul className="enokh-blocks-term-icon-chooser">
                                        { Object.keys( svgItems ).map( ( svgItem, index ) => {
                                            return (
                                                <li key={ `editor-block-types-list-item-${ index }` }>
                                                    <Button
                                                        className="editor-block-list-item-button"
                                                        onClick={ () => {
                                                            setIconSet( svg );
                                                            setIconSvg( svgItem );
                                                        } }
                                                    >
                                                        { typeof svgItems[ svgItem ].icon === 'string' ? (
                                                            <>
                                                                <span
                                                                    className="editor-block-types-list__item-icon"
                                                                    dangerouslySetInnerHTML={ {
                                                                        __html: svgItems[ svgItem ].icon,
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

const rootElement = document.getElementById( 'enokh-blocks-term-icon-selector-root' );
const root = createRoot( rootElement );
root.render(
    <TermIconSelector initialIcon={ rootElement.dataset.icon } initialIconSet={ rootElement.dataset.iconSet } />
);
