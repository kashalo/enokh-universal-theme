interface BorderColorItem {
    [ propName: string ]: any;
}

interface DefaultBlockContextSupports {
    layout: {
        enabled: boolean;
        display: boolean;
        flexDirection: boolean;
        flexWrap: boolean;
        alignItems: boolean;
        justifyContent: boolean;
        columnGap: boolean;
        rowGap: boolean;
        zIndex: boolean;
        position: boolean;
        overflow: boolean;
        themeWidth: boolean;
    };
    flexChildPanel: {
        enabled: boolean;
        flex: boolean;
        order: boolean;
    };
    spacing: {
        enabled: boolean;
        padding: boolean;
        margin: boolean;
        inlineWidth: boolean;
        stackVertically: boolean;
        fillHorizontalSpace: boolean;
    };
    sizingPanel: {
        enabled: boolean;
        width: boolean;
        height: boolean;
        minWidth: boolean;
        minHeight: boolean;
        maxWidth: boolean;
        maxHeight: boolean;
        useGlobalMaxWidth: boolean;
        aspectRatio: boolean;
    };
    colors: {
        enabled: boolean;
        elements: ColorItem[];
    };
    typography: {
        enabled: boolean;
        alignment: boolean;
        fontWeight: boolean;
        textTransform: boolean;
        fontSize: boolean;
        lineHeight: boolean;
        letterSpacing: boolean;
        fontFamily: boolean;
        lineClamp: boolean;
    };

    borders: {
        enabled: boolean;
        borderColors: BorderColorItem[];
        borderTop: boolean;
        borderRight: boolean;
        borderLeft: boolean;
        borderBottom: boolean;
        borderRadius: boolean;
    };
    backgroundPanel: {
        enabled: boolean;
        backgroundImage: boolean;
        backgroundGradient: boolean;
    };
    icon: {
        enabled: boolean;
        location: any[];
        iconSize: boolean;
    };
    shapesPanel: {
        enabled: boolean;
    };
    effectsPanel: {
        enabled: boolean;
        boxShadows: boolean;
        textShadows: boolean;
        transforms: boolean;
        opacity: boolean;
        transitions: boolean;
        typography: boolean;
    };
    displayPanel: {
        enabled: boolean;
    };
    dividerPanel: {
        enabled: boolean;
    };
    a11yPanel: {
        enabled: boolean;
        altText: boolean;
        altDescription: boolean;
        role: boolean;
    };
}

interface DefaultBlockContextConfig {
    id?: string;
    blockName?: string;
    isInQueryLoop?: boolean;
    supports?: DefaultBlockContextSupports;
    deviceType?: string;
}
