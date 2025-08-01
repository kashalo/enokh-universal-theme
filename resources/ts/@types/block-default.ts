interface BlockDefaultAttributes {
    display: string;
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
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    marginLeft: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
    borderSizeTop: string;
    borderSizeRight: string;
    borderSizeBottom: string;
    borderSizeLeft: string;
    borderRadiusTopRight: string;
    borderRadiusBottomRight: string;
    borderRadiusTopLeft: string;
    absoluteTop: string;
    absoluteBottom: string;
    absoluteLeft: string;
    absoluteRight: string;
    stickyTop: string;
    stickyBottom: string;

    // Tablet
    displayTablet: string;
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
    marginTopTablet: string;
    marginRightTablet: string;
    marginBottomTablet: string;
    marginLeftTablet: string;
    paddingTopTablet: string;
    paddingRightTablet: string;
    paddingBottomTablet: string;
    paddingLeftTablet: string;
    borderSizeTopTablet: string;
    borderSizeRightTablet: string;
    borderSizeBottomTablet: string;
    borderSizeLeftTablet: string;
    borderRadiusTopRightTablet: string;
    borderRadiusBottomRightTablet: string;
    borderRadiusTopLeftTablet: string;
    absoluteTopTablet: string;
    absoluteBottomTablet: string;
    absoluteLeftTablet: string;
    absoluteRightTablet: string;
    stickyTopTablet: string;
    stickyBottomTablet: string;

    // Mobile
    displayMobile: string;
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
    marginTopMobile: string;
    marginRightMobile: string;
    marginBottomMobile: string;
    marginLeftMobile: string;
    paddingTopMobile: string;
    paddingRightMobile: string;
    paddingBottomMobile: string;
    paddingLeftMobile: string;
    borderSizeTopMobile: string;
    borderSizeRightMobile: string;
    borderSizeBottomMobile: string;
    borderSizeLeftMobile: string;
    borderRadiusTopRightMobile: string;
    borderRadiusBottomRightMobile: string;
    borderRadiusTopLeftMobile: string;
    absoluteTopMobile: string;
    absoluteBottomMobile: string;
    absoluteLeftMobile: string;
    absoluteRightMobile: string;
    stickyTopMobile: string;
    stickyBottomMobile: string;

    spacing: { [ propName: string ]: any };
    marginUnit: string;
    paddingUnit: string;
    borderRadiusUnit: string;
    sizing: [];
    useGlobalMaxWidth: boolean;
    typography: {
        fontSize?: string;
        fontWeight?: string;
        textAlign?: string;
        textTransform?: string;
        lineClamp?: number | string;
    };
    iconStyles: {
        height: string;
        width: string;
        paddingBottom: string;
        paddingLeft: string;
        paddingRight: string;
        paddingTop: string;

        heightTablet: string;
        widthTablet: string;
        paddingBottomTablet: string;
        paddingLeftTablet: string;
        paddingRightTablet: string;
        paddingTopTablet: string;

        heightMobile: string;
        widthMobile: string;
        paddingBottomMobile: string;
        paddingLeftMobile: string;
        paddingRightMobile: string;
        paddingTopMobile: string;
    };
    borders: { [ propName: string ]: any };
    includeAdminBar: boolean;
}
