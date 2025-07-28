export interface BlockAttributes {
    uniqueId: string;
    icon: string;
    iconGroup: string;
    height: string;
    width: string;
    textColor: string;
    textColorHover: string;

    heightTablet: string;
    widthTablet: string;

    heightMobile: string;
    widthMobile: string;

    borderColor: string;
    borderColorOpacity: number;

    backgroundColor: string;
    backgroundColorOpacity: number;

    display: string;
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

    // Tablet
    displayTablet: string;
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

    // Mobile
    displayMobile: string;
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

    spacing: { [ propName: string ]: any };
    marginUnit: string;
    paddingUnit: string;
    borderRadiusUnit: string;
    sizing: [];
    borders: { [ propName: string ]: any };

    // A11Y
    altText: string;
    altDescription: string;

    // Dynamic Content
    useDynamicData: boolean;
    dynamicContentType: string;
    dynamicLinkType: string;
    dynamicSource: string;
    termTaxonomy: string;
    termId: number;

    isAccordionExpand: boolean;
    isAccordionCollapse: boolean;
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
}

export interface BlockControlProps {
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
}

export interface BlockInspectorControlProps {
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
}

export interface IconPickerControlProps {
    attributes: BlockAttributes;
    setAttributes( object );
    id: string;
}
