// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';
import {
    InspectorControls,
    withColors,
    __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
    __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

const COLOR_MARKER_SUPPORT = 'color.marker';
const COLOR_MARKER_SUPPORT_ATTR = 'markerColor';
const COLOR_MARKER_SUPPORT_CUSTOM_ATTR = 'customMarkerColor';

/**
 * Extend attributes for blocks with support for "color.marker"
 *
 * @param settings
 * @param name
 */
const addMarkerColorAttributes = ( settings, name ) => {
    if ( ! hasBlockSupport( name, COLOR_MARKER_SUPPORT, false ) ) {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            [ COLOR_MARKER_SUPPORT_ATTR ]: {
                type: 'string',
                default: '',
            },
            [ COLOR_MARKER_SUPPORT_CUSTOM_ATTR ]: {
                type: 'string',
                default: '',
            },
        },
    };
};

/**
 * Extend the block edit element with color controls for the "color.marker" support
 */
const withMarkerColorSupport = compose(
    withColors( {
        markerColor: 'marker-color',
        customMarkerColor: 'custom-marker-color',
    } ),
    createHigherOrderComponent(
        ( BlockEdit ) => ( props ) => {
            const colorGradientSettings = useMultipleOriginColorsAndGradients();

            const supportsMarkerColor = useSelect( ( select ) => {
                return hasBlockSupport( props.name, COLOR_MARKER_SUPPORT, false ) as boolean;
            }, [] );

            // Bail out if current block has no marker color support
            if ( ! supportsMarkerColor ) {
                return <BlockEdit { ...props } />;
            }

            const colorSlug =
                props.attributes[ COLOR_MARKER_SUPPORT_ATTR ] || props.attributes[ COLOR_MARKER_SUPPORT_CUSTOM_ATTR ];
            const colorValue = props.markerColor.color || props.attributes[ COLOR_MARKER_SUPPORT_CUSTOM_ATTR ];

            return (
                <>
                    { props.isSelected && (
                        <>
                            <InspectorControls group="color">
                                <ColorGradientSettingsDropdown
                                    settings={ [
                                        {
                                            label: _x( 'Marker', 'Marker color support controls', 'enokh-blocks' ),
                                            colorValue:
                                                props.markerColor.color ||
                                                props.attributes[ COLOR_MARKER_SUPPORT_CUSTOM_ATTR ],
                                            onColorChange: ( value ) => {
                                                props.setMarkerColor( value );
                                                props.setAttributes( { customMarkerColor: value } );
                                            },
                                        },
                                    ] }
                                    panelId={ props.clientId }
                                    hasColorsOrGradients={ false }
                                    disableCustomColors={ false }
                                    __experimentalIsRenderedInSidebar
                                    { ...colorGradientSettings }
                                />
                            </InspectorControls>
                        </>
                    ) }
                    { colorSlug && colorValue && (
                        <style>
                            { `#block-${ props.clientId } { --marker-color: ${ colorValue }; }` }
                            { `#block-${ props.clientId } ::marker { color: var(--marker-color); }` }
                        </style>
                    ) }
                    <BlockEdit { ...props } />
                </>
            );
        },
        'withMarkerColorSupport'
    )
);

addFilter( 'blocks.registerBlockType', 'enokh-blocks/marker-color-support-attributes', addMarkerColorAttributes );
addFilter( 'editor.BlockEdit', 'enokh-blocks/marker-color-support-controls', withMarkerColorSupport );
