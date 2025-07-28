export interface BlockAttributes {
    uniqueId: string;
    spacing: { [ propName: string ]: any };

    //Layout
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
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
    className: string;
}

export interface BlockControlProps {
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
}
