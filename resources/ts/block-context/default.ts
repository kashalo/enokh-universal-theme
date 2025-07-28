import { __ } from '@wordpress/i18n';

const defaultContext = {
    id: '',
    blockName: '',
    isInQueryLoop: false,
    supports: {
        responsiveTabs: false,
        settingsPanel: {
            enabled: false,
            label: __( 'Block Settings', 'enokh-blocks' ),
            icon: 'wrench',
        },
        layout: {
            enabled: false,
            display: false,
            flexDirection: false,
            flexWrap: false,
            alignItems: false,
            justifyContent: false,
            columnGap: false,
            rowGap: false,
            zIndex: false,
            position: false,
            overflow: false,
            themeWidth: false,
        },
        flexChildPanel: {
            enabled: false,
            flex: false,
            order: false,
        },
        sizingPanel: {
            enabled: false,
            width: false,
            height: false,
            minWidth: false,
            minHeight: false,
            maxWidth: false,
            maxHeight: false,
            useGlobalMaxWidth: false,
            aspectRatio: false,
        },
        typography: {
            enabled: false,
            alignment: false,
            fontWeight: false,
            textTransform: false,
            fontSize: false,
            lineHeight: false,
            letterSpacing: false,
            fontFamily: false,
            lineClamp: false,
        },
        spacing: {
            enabled: false,
            padding: false,
            margin: false,
            inlineWidth: false,
            stackVertically: false,
            fillHorizontalSpace: false,
        },
        borders: {
            enabled: false,
            borderColors: [],
            borderTop: false,
            borderRight: false,
            borderBottom: false,
            borderLeft: false,
            borderRadius: false,
        },
        colors: {
            enabled: false,
            elements: [],
        },
        backgroundPanel: {
            enabled: false,
            backgroundImage: false,
            backgroundGradient: false,
        },
        shapesPanel: {
            enabled: false,
        },
        icon: {
            enabled: false,
            location: [],
            iconSize: false,
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
            altText: false,
            altDescription: false,
            role: false,
        },
    },
};

export default defaultContext;
