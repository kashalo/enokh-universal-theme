interface ContainerBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: ContainerBlockAttributes;
}

interface bgOptions {
    selector: string;
    opacity: number;
    overlay: boolean;
    position: string;
    size: string;
    repeat: string;
    attachment: string;
}

interface shapeItem {
    color: string;
    colorOpacity: number;
    flipHorizontally: boolean;
    height: number | string;
    heightMobile?: number | string;
    heightTablet?: number | string;
    location: string;
    shape: string;
    width: number | string;
    widthMobile?: number | string;
    widthTablet?: number | string;
    zindex: number | string;
}

interface AdvanceBackgroundItem {
    attachment?: string;
    device?: string;
    id?: number | string;
    imageSize?: string;
    opacity?: number;
    position?: string;
    repeat?: string;
    size?: string;
    state: string;
    target: string;
    type?: string;
    url?: string;
    colorOne?: string;
    colorTwo?: string;
    direction?: number | string;
    stopOne?: number | string;
    stopTwo?: number | string;
    customSelector?: string;
    colorOneOpacity?: number;
    colorTwoOpacity?: number;
}

interface ContainerBlockAttributes extends BlockDefaultAttributes, DynamicContentAttributes {
    uniqueId: string;
    templateLock: string | boolean;
    anchor: string;
    isGrid: boolean;
    isQueryLoopItem: boolean;
    isCarouselItem: boolean;
    isTermQueryLoopItem: boolean;
    isTabHeader: boolean;
    isAccordionItemHeader: boolean;
    isAccordionItemHeaderInner: boolean;
    isAccordionItemContent: boolean;
    gridId: string;
    carouselId: string;
    tabPanelId: string;
    tagName: string;
    width: number;
    widthTablet: number;
    widthMobile: number;
    autoWidthTablet: boolean;
    autoWidthMobile: boolean;
    flexBasisUnit: string;
    outerContainer: string;
    innerContainer: string;
    containerWidth: number;
    minHeight: number;
    minHeightUnit: string;
    minHeightTablet: number;
    minHeightUnitTablet: string;
    minHeightMobile: number;
    minHeightUnitMobile: string;
    borderColor: string;
    borderColorOpacity: number;
    backgroundColor: string;
    backgroundColorTablet: string;
    backgroundColorMobile: string;
    backgroundColorOpacity: number;
    backgroundColorOpacityTablet: number;
    backgroundColorOpacityMobile: number;
    gradient: boolean;
    gradientDirection: number;
    gradientColorOne: string;
    gradientColorOneOpacity: number;
    gradientColorStopOne: number;
    gradientColorTwo: string;
    gradientColorTwoOpacity: number;
    gradientColorStopTwo: number;
    gradientSelector: string;
    textColor: string;
    textColorTablet: string;
    textColorMobile: string;
    linkColor: string;
    linkColorTablet: string;
    linkColorMobile: string;
    linkColorHover: string;
    linkColorHoverTablet: string;
    linkColorHoverMobile: string;
    bgImage: { [ propName: string ]: any };
    bgOptions: bgOptions;
    bgImageSize: string;
    bgImageInline: boolean;
    verticalAlignment: string;
    verticalAlignmentTablet: string;
    verticalAlignmentMobile: string;
    innerZindex: number;
    removeVerticalGap: boolean;
    removeVerticalGapTablet: boolean;
    removeVerticalGapMobile: boolean;
    fontWeight: string;
    fontSize: number;
    fontSizeTablet: number;
    fontSizeMobile: number;
    fontSizeUnit: number;
    textTransform: string;
    align: string;
    shapeDividers: shapeItem[];
    isDynamic: boolean;
    blockVersion: number;
    useInnerContainer: boolean;
    variantRole: string;
    blockLabel: string;
    advancedBackgrounds: AdvanceBackgroundItem[];
    useAdvancedBackgrounds: boolean;
    useBoxShadow: boolean;
    boxShadows: any[];
    useTextShadow: boolean;
    textShadows: any[];
    hideOnDesktop: boolean;
    hideOnTablet: boolean;
    hideOnMobile: boolean;
    dynamicImage: number | undefined;
    dynamicBackgroundColor: string | undefined;
    linkType: string;
    url: string;
    hiddenLinkAriaLabel: string;
    target: string;
    relNoFollow: string;
    relSponsored: string;
    removeIfEmpty: boolean;

    /**
     * [MOWE-148] Transform Effect
     */
    useTransform: boolean;
    transforms: { [ propName: string ]: any }[];
    transformDisableInEditor: boolean;

    /**
     * [MOWE-197] Opacity and Transition
     */
    useOpacity: boolean;
    opacities: { [ propName: string ]: any }[];
    useTransition: boolean;
    transitions: { [ propName: string ]: any }[];
    opacityDisableInEditor: boolean;

    /**
     * [MOWE-167] Aspect ratio
     */
    aspectRatio: string | undefined;
    aspectRatioTablet: string | undefined;
    aspectRatioMobile: string | undefined;

    /**
     * [MOWE-149] Up-scroll stickiness
     */
    stickyOnScroll: string | undefined;
    stickyOnScrollTablet: string | undefined;
    stickyOnScrollMobile: string | undefined;

    /**
     * [MOWE-155] Divider settings
     */
    divider: { [ propName: string ]: any };

    /**
     * [MOWE-183] Container ALT Text for A11Y
     */
    altText: string;
    role: string;
}

interface ContainerBlockProps {
    setAttributes: ( object ) => {};
    attributes: ContainerBlockAttributes;
    className: string;
    clientId: string;
    deviceType: string;
    isSelected: boolean;
    context: { [ propName: string ]: any };
}

interface ContainerBlockInspectorControlsProps {
    attributes: ContainerBlockAttributes;
    setAttributes: ( object ) => {};
    clientId: string;
}

interface ContainerChildAppenderProps {
    clientId: string;
    isSelected: boolean;
    attributes: ContainerBlockAttributes;
}
