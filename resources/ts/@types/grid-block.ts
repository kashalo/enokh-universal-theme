interface GridBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: ContainerBlockAttributes;
}

interface GridBlockAttributes {
    uniqueId: string;
    templateLock: string | boolean;
    anchor: string;
    columns: number;
    horizontalGap: string;
    verticalGap: string;
    verticalAlignment: string;
    horizontalGapTablet: string;
    verticalGapTablet: string;
    verticalAlignmentTablet: string;
    horizontalGapMobile: string;
    verticalGapMobile: string;
    verticalAlignmentMobile: string;
    horizontalAlignment: string;
    horizontalAlignmentTablet: string;
    horizontalAlignmentMobile: string;
    isDynamic: boolean;
    isQueryLoop: boolean;
    isTermQueryLoop: boolean;
    display: string;
    displayTablet: string;
    displayMobile: string;

    divider: { [ propName: string ]: any };
}

interface GridBlockProps {
    setAttributes: ( object ) => {};
    attributes: GridBlockAttributes;
    className: string;
    clientId: string;
    deviceType: string;
    isSelected: boolean;
    defaultLayout?: string;
    context: { [ propName: string ]: any };
}

interface GridBlockInspectorControlsProps {
    attributes: GridBlockAttributes;
    setAttributes: ( object ) => {};
    clientId: string;
}
