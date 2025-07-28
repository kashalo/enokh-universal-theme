interface TextBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: TextBlockAttributes;
}

interface TextBlockAttributes extends BlockDefaultAttributes, DynamicContentAttributes {
    uniqueId: string;
    templateLock: string | boolean;
    anchor: string;
    element: string;
    content: string;
    ariaLabel: string;
    isGrid: boolean;
    isQueryLoopItem: boolean;
    gridId: string;
    tagName: string;
    textColor: string;
    textColorTablet: string;
    textColorMobile: string;
    textColorHover: string;
    textColorHoverTablet: string;
    textColorHoverMobile: string;
    linkColor: string;
    linkColorHover: string;
    textTransform: string;
    align: string;
    isDynamic: boolean;
    estimatedReadingTime: { [ propName: string ]: any };

    // Icon
    icon: string;
    hasIcon: boolean;
    iconLocation: string;
    iconLocationTablet: string;
    iconLocationTabletMobile: string;
    iconLocationMobile: string;
    column: number | null;
    columnTablet: number | null;
    columnMobile: number | null;
}

interface TextBlockProps {
    setAttributes: ( object ) => {};
    attributes: TextBlockAttributes;
    className: string;
    clientId: string;
    deviceType: string;
    isSelected: boolean;
    context: { [ propName: string ]: any };
    onReplace: Function | undefined;
}

interface TextBlockInspectorControlsProps {
    attributes: TextBlockAttributes;
    setAttributes: ( object ) => {};
    clientId: string;
}

interface TextBlockInspectorAdvancedControlsProps {
    attributes: TextBlockAttributes;
    setAttributes: ( object ) => {};
    clientId: string;
}

interface TextBlockControlsProps {
    attributes: TextBlockAttributes;
    setAttributes: ( object ) => {};
    context: { [ propName: string ]: any };
    clientId: string;
}

interface TextBlockSaveProps {
    attributes: TextBlockAttributes;
    clientId: string;
}
