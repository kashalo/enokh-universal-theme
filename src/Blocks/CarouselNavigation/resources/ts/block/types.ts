export interface BlockAttributes {
    uniqueId: string;
    borderColor: string;
    typography: { [ key: string ]: any };
    borders: { [ key: string ]: any };
    spacing: { [ propName: string ]: any };
    shape: { [ propName: string ]: any };
    variant: string;
    orientation: string;
    alignItems: string;
    alignItemsTablet: string;
    alignItemsMobile: string;
    justifyContent: string;
    justifyContentTablet: string;
    justifyContentMobile: string;
    gap: string;
    gapTablet: string;
    gapMobile: string;
    textColor: string;
    textColorTablet: string;
    textColorMobile: string;
    textColorHover: string;
    textColorHoverTablet: string;
    textColorHoverMobile: string;
    backgroundColor: string;
    backgroundColorTablet: string;
    backgroundColorMobile: string;
    backgroundColorHover: string;
    backgroundColorHoverTablet: string;
    backgroundColorHoverMobile: string;
    enableAdvancedPosition: boolean;
    advancedPosition: { [ key: string ]: any };
    element: { [ propName: string ]: any };
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;

    setAttributes( object );

    clientId: string;
    className: string;
}

export interface BlockInspectorControlProps {
    attributes: BlockAttributes;

    setAttributes( object );

    clientId: string;
}

export interface BlockControlsProps {
    attributes: BlockAttributes;

    setAttributes( object );
}
