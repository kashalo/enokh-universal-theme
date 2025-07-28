import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

addFilter( 'enokh-blocks.editor.blockContext', 'enokh-blocks/container-context/remove-supports', ( context, props ) => {
    const { name } = props;

    if ( 'enokh-blocks/container' !== name ) {
        return context;
    }

    const { isTabHeader } = props.attributes;

    if ( ! isTabHeader ) {
        return context;
    }

    const newContextSupport = {
        responsiveTabs: false,
        settingsPanel: {
            enabled: false,
            icon: 'container-settings',
        },
        layout: {
            enabled: false,
            display: true,
            flexDirection: true,
            flexWrap: true,
            alignItems: true,
            justifyContent: true,
            columnGap: true,
            rowGap: true,
            zIndex: true,
            position: true,
            overflow: true,
            themeWidth: true,
        },
        flexChildPanel: {
            enabled: false,
            flex: true,
            order: true,
        },
        sizingPanel: {
            enabled: false,
            width: true,
            height: true,
            minWidth: true,
            minHeight: true,
            maxWidth: true,
            maxHeight: true,
            useGlobalMaxWidth: true,
        },
        typography: {
            enabled: false,
            alignment: true,
            fontWeight: true,
            textTransform: true,
            fontSize: true,
        },
        spacing: {
            enabled: false,
            padding: true,
            margin: true,
        },
        borders: {
            enabled: false,
            borderColors: [
                {
                    state: '',
                    tooltip: __( 'Border', 'enokh-blocks' ),
                    alpha: true,
                },
                {
                    state: 'Hover',
                    tooltip: __( 'Border Hover', 'enokh-blocks' ),
                    alpha: true,
                },
            ],
            borderTop: true,
            borderRight: true,
            borderBottom: true,
            borderLeft: true,
            borderRadius: true,
        },
        colors: {
            enabled: false,
            elements: [
                {
                    group: 'background',
                    label: __( 'Background', 'enokh-blocks' ),
                    items: [
                        {
                            attribute: 'backgroundColor',
                            alpha: true,
                        },
                    ],
                },
                {
                    group: 'text',
                    label: __( 'Text', 'enokh-blocks' ),
                    items: [
                        {
                            attribute: 'textColor',
                        },
                    ],
                },
                {
                    group: 'link',
                    label: __( 'Link', 'enokh-blocks' ),
                    items: [
                        {
                            attribute: 'linkColor',
                        },
                        {
                            tooltip: __( 'Hover', 'enokh-blocks' ),
                            attribute: 'linkColorHover',
                        },
                    ],
                },
            ],
        },
        backgroundPanel: {
            enabled: false,
            backgroundImage: true,
            backgroundGradient: true,
        },
        shapesPanel: {
            enabled: false,
        },
        effectsPanel: {
            enabled: false,
            boxShadows: false,
            textShadows: false,
            transforms: false,
            opacity: false,
            transitions: false,
            typography: false,
        },
        displayPanel: {
            enabled: false,
        },
        dividerPanel: {
            enabled: false,
        },
        a11yPanel: {
            enabled: false,
        },
    };

    context.supports = newContextSupport;

    return context;
} );
