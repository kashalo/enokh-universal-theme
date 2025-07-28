export interface BlockAttributes {
    uniqueId: string;
    iconDisplay: { [ propName: string ]: any };
    spacing: { [ propName: string ]: any };
    borders: { [ propName: string ]: any };
    sizing: { [ propName: string ]: any };
    borderColor: string;
    borderColorHover: string;
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
    useGlobalMaxWidth: boolean;

    //Layout
    wrapperDisplay: string;
    flexDirection: string;
    flexWrap: string;
    alignItems: string;
    justifyContent: string;
    columnGap: string;
    rowGap: string;
    position: string;
    overflowX: string;
    overflowY: string;
    zindex: number;
    flexGrow: string;
    flexShrink: string;
    flexBasis: string;
    order: string;
    includeAdminBar: false;

    wrapperDisplayTablet: string;
    flexDirectionTablet: string;
    flexWrapTablet: string;
    alignItemsTablet: string;
    justifyContentTablet: string;
    columnGapTablet: string;
    rowGapTablet: string;
    positionTablet: string;
    overflowXTablet: string;
    overflowYTablet: string;
    zindexTablet: number;
    flexGrowTablet: string;
    flexShrinkTablet: string;
    flexBasisTablet: string;
    orderTablet: string;

    wrapperDisplayMobile: string;
    flexDirectionMobile: string;
    flexWrapMobile: string;
    alignItemsMobile: string;
    justifyContentMobile: string;
    columnGapMobile: string;
    rowGapMobile: string;
    positionMobile: string;
    overflowXMobile: string;
    overflowYMobile: string;
    zindexMobile: number;
    flexGrowMobile: string;
    flexShrinkMobile: string;
    flexBasisMobile: string;
    orderMobile: string;
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
