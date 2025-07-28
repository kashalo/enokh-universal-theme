import { __ } from '@wordpress/i18n';
import { renderToString } from '@wordpress/element';
import { BaseControl, Button, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

const sanitizeSVG = ( string ) => string;

const IconPickerControl = ( props: IconPickerControlProps ) => {
    const { attributes, setAttributes, id } = props;

    const { icon, iconStyles, removeText } = attributes;

    let iconSVGSets: any = {};

    iconSVGSets = applyFilters( 'enokh-blocks.editor.iconSVGSets', iconSVGSets, { attributes } );

    const flexAttributes: any = {};
    if ( ! attributes.display.includes( 'flex' ) ) {
        flexAttributes.display = 'headline' === id ? 'flex' : 'inline-flex';
    }
    if ( ! attributes.alignItems ) {
        flexAttributes.alignItems = 'center';
    }
    if ( ! attributes.columnGap ) {
        flexAttributes.columnGap = '0.5em';
    }

    const styleAttributes: any = {};
    if ( ! attributes.iconStyles.height ) {
        styleAttributes.height = '1em';
    }
    if ( ! attributes.iconStyles.width ) {
        styleAttributes.width = '1em';
    }

    return (
        <>
            <BaseControl className="enokh-blocks-svg-html">
                <TextControl
                    label={ __( 'Icon SVG HTML', 'enokh-blocks' ) }
                    value={ icon }
                    onChange={ ( value ) => {
                        setAttributes( { icon: sanitizeSVG( value ) } );

                        if ( value !== '' ) {
                            setAttributes( {
                                hasIcon: true,
                                ...flexAttributes,
                                iconStyles: {
                                    ...styleAttributes,
                                },
                            } );
                        } else {
                            setAttributes( {
                                hasIcon: false,
                            } );
                        }
                    } }
                />

                <div className="enokh-blocks-icon-preview">
                    <span dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } } />
                    <Button
                        isSmall
                        className="reset-icon is-secondary"
                        onClick={ () => {
                            setAttributes( {
                                icon: '',
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
                                                <li key={ `editor-pblock-types-list-item-${ index }` }>
                                                    <Button
                                                        className="editor-block-list-item-button"
                                                        onClick={ () => {
                                                            let iconValue = svgItems[ svgItem ].icon;

                                                            if ( typeof iconValue !== 'string' ) {
                                                                iconValue = renderToString( iconValue );
                                                            }

                                                            setAttributes( {
                                                                icon: iconValue,
                                                                hasIcon: true,
                                                                ...flexAttributes,
                                                                iconStyles: {
                                                                    ...styleAttributes,
                                                                },
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
