import containerDefaultValues from './defaults';
export default {
    uniqueId: {
        type: 'string',
        default: '',
    },
    templateLock: {
        type: [ 'string', 'boolean' ],
        enum: [ 'all', 'insert', 'contentOnly', false ],
    },
    anchor: {
        type: 'string',
        default: '',
    },
    isGrid: {
        type: 'boolean',
        default: false,
    },
    isQueryLoopItem: {
        type: 'boolean',
        default: false,
    },
    isCarouselItem: {
        type: 'boolean',
        default: false,
    },
    isTermQueryLoopItem: {
        type: 'boolean',
        default: false,
    },
    isTabHeader: {
        type: 'boolean',
        default: false,
    },
    isAccordionItemHeader: {
        type: 'boolean',
        default: false,
    },
    isAccordionItemHeaderInner: {
        type: 'boolean',
        default: false,
    },
    isAccordionItemContent: {
        type: 'boolean',
        default: false,
    },
    gridId: {
        type: 'string',
        default: '',
    },
    carouselId: {
        type: 'string',
        default: '',
    },
    tabPanelId: {
        type: 'string',
        default: '',
    },
    tagName: {
        type: 'string',
        default: containerDefaultValues.tagName,
    },
    width: {
        type: 'number',
        default: containerDefaultValues.width,
    },
    widthTablet: {
        type: 'number',
        default: containerDefaultValues.widthTablet,
    },
    widthMobile: {
        type: 'number',
        default: containerDefaultValues.widthMobile,
    },
    autoWidthTablet: {
        type: 'boolean',
        default: containerDefaultValues.autoWidthTablet,
    },
    autoWidthMobile: {
        type: 'boolean',
        default: containerDefaultValues.autoWidthMobile,
    },
    flexBasisUnit: {
        type: 'string',
        default: containerDefaultValues.flexBasisUnit,
    },
    outerContainer: {
        type: 'string',
        default: containerDefaultValues.outerContainer,
    },
    innerContainer: {
        type: 'string',
        default: containerDefaultValues.innerContainer,
    },
    containerWidth: {
        type: 'number',
        default: containerDefaultValues.containerWidth,
    },
    minHeight: {
        type: 'number',
        default: containerDefaultValues.minHeight,
    },
    minHeightUnit: {
        type: 'string',
        default: containerDefaultValues.minHeightUnit,
    },
    minHeightTablet: {
        type: 'number',
        default: containerDefaultValues.minHeightTablet,
    },
    minHeightUnitTablet: {
        type: 'string',
        default: containerDefaultValues.minHeightUnitTablet,
    },
    minHeightMobile: {
        type: 'number',
        default: containerDefaultValues.minHeightMobile,
    },
    minHeightUnitMobile: {
        type: 'string',
        default: containerDefaultValues.minHeightUnitMobile,
    },
    borderColor: {
        type: 'string',
        default: containerDefaultValues.borderColor,
    },
    borderColorOpacity: {
        type: 'number',
        default: containerDefaultValues.borderColorOpacity,
    },
    backgroundColor: {
        type: 'string',
        default: containerDefaultValues.backgroundColor,
    },
    backgroundColorTablet: {
        type: 'string',
        default: containerDefaultValues.backgroundColorTablet,
    },
    backgroundColorMobile: {
        type: 'string',
        default: containerDefaultValues.backgroundColorMobile,
    },
    backgroundColorOpacity: {
        type: 'number',
        default: containerDefaultValues.backgroundColorOpacity,
    },
    backgroundColorOpacityTablet: {
        type: 'number',
        default: containerDefaultValues.backgroundColorOpacityTablet,
    },
    backgroundColorOpacityMobile: {
        type: 'number',
        default: containerDefaultValues.backgroundColorOpacityMobile,
    },
    gradient: {
        type: 'boolean',
        default: containerDefaultValues.gradient,
    },
    gradientDirection: {
        type: 'number',
        default: containerDefaultValues.gradientDirection,
    },
    gradientColorOne: {
        type: 'string',
        default: containerDefaultValues.gradientColorOne,
    },
    gradientColorOneOpacity: {
        type: 'number',
        default: containerDefaultValues.gradientColorOneOpacity,
    },
    gradientColorStopOne: {
        type: 'number',
        default: containerDefaultValues.gradientColorStopOne,
    },
    gradientColorTwo: {
        type: 'string',
        default: containerDefaultValues.gradientColorTwo,
    },
    gradientColorTwoOpacity: {
        type: 'number',
        default: containerDefaultValues.gradientColorTwoOpacity,
    },
    gradientColorStopTwo: {
        type: 'number',
        default: containerDefaultValues.gradientColorStopTwo,
    },
    gradientSelector: {
        type: 'string',
        default: 'element',
    },
    textColor: {
        type: 'string',
        default: containerDefaultValues.textColor,
    },
    textColorTablet: {
        type: 'string',
        default: containerDefaultValues.textColorTablet,
    },
    textColorMobile: {
        type: 'string',
        default: containerDefaultValues.textColorMobile,
    },
    linkColor: {
        type: 'string',
        default: containerDefaultValues.linkColor,
    },
    linkColorTablet: {
        type: 'string',
        default: containerDefaultValues.linkColorTablet,
    },
    linkColorMobile: {
        type: 'string',
        default: containerDefaultValues.linkColorMobile,
    },
    linkColorHover: {
        type: 'string',
        default: containerDefaultValues.linkColorHover,
    },
    linkColorHoverTablet: {
        type: 'string',
        default: containerDefaultValues.linkColorHoverTablet,
    },
    linkColorHoverMobile: {
        type: 'string',
        default: containerDefaultValues.linkColorHoverMobile,
    },
    bgImage: {
        type: 'object',
        default: containerDefaultValues.bgImage,
    },
    bgOptions: {
        type: 'object',
        default: {
            selector: containerDefaultValues.bgOptions.selector,
            opacity: containerDefaultValues.bgOptions.opacity,
            overlay: containerDefaultValues.bgOptions.overlay,
            position: containerDefaultValues.bgOptions.position,
            size: containerDefaultValues.bgOptions.size,
            repeat: containerDefaultValues.bgOptions.repeat,
            attachment: containerDefaultValues.bgOptions.attachment,
        },
    },
    bgImageSize: {
        type: 'string',
        default: containerDefaultValues.bgImageSize,
    },
    bgImageInline: {
        type: 'boolean',
        default: containerDefaultValues.bgImageInline,
    },
    verticalAlignment: {
        type: 'string',
        default: containerDefaultValues.verticalAlignment,
    },
    verticalAlignmentTablet: {
        type: 'string',
        default: containerDefaultValues.verticalAlignmentTablet,
    },
    verticalAlignmentMobile: {
        type: 'string',
        default: containerDefaultValues.verticalAlignmentMobile,
    },
    innerZindex: {
        type: 'number',
        default: containerDefaultValues.innerZindex,
    },
    removeVerticalGap: {
        type: 'boolean',
        default: containerDefaultValues.removeVerticalGap,
    },
    removeVerticalGapTablet: {
        type: 'boolean',
        default: containerDefaultValues.removeVerticalGapTablet,
    },
    removeVerticalGapMobile: {
        type: 'boolean',
        default: containerDefaultValues.removeVerticalGapMobile,
    },
    fontFamily: {
        type: 'string',
        default: containerDefaultValues.fontFamily,
    },
    fontFamilyFallback: {
        type: 'string',
        default: containerDefaultValues.fontFamilyFallback,
    },
    googleFont: {
        type: 'boolean',
        default: containerDefaultValues.googleFont,
    },
    googleFontVariants: {
        type: 'string',
        default: containerDefaultValues.googleFontVariants,
    },
    fontWeight: {
        type: 'string',
        default: containerDefaultValues.fontWeight,
    },
    fontSize: {
        type: 'number',
        default: containerDefaultValues.fontSize,
    },
    fontSizeTablet: {
        type: 'number',
        default: containerDefaultValues.fontSizeTablet,
    },
    fontSizeMobile: {
        type: 'number',
        default: containerDefaultValues.fontSizeMobile,
    },
    fontSizeUnit: {
        type: 'string',
        default: containerDefaultValues.fontSizeUnit,
    },
    textTransform: {
        type: 'string',
        default: '',
    },
    align: {
        type: 'string',
        default: '',
    },
    shapeDividers: {
        type: 'array',
        default: [],
    },
    isDynamic: {
        type: 'boolean',
    },
    blockVersion: {
        type: 'number',
    },
    useInnerContainer: {
        type: 'boolean',
        default: false,
    },
    variantRole: {
        type: 'string',
        default: '',
    },
    blockLabel: {
        type: 'string',
        default: '',
    },
    elementId: {
        type: 'string',
        default: '',
    },
    cssClasses: {
        type: 'string',
        default: '',
    },
    useAdvancedBackgrounds: {
        type: 'boolean',
        default: false,
    },
    advancedBackgrounds: {
        type: 'array',
        default: [],
    },
    useTextShadow: {
        type: 'boolean',
        default: false,
    },
    textShadows: {
        type: 'array',
        default: [],
    },
    useBoxShadow: {
        type: 'boolean',
        default: false,
    },
    boxShadows: {
        type: 'array',
        default: [],
    },
    hideOnDesktop: {
        type: 'boolean',
        default: false,
    },
    hideOnTablet: {
        type: 'boolean',
        default: false,
    },
    hideOnMobile: {
        type: 'boolean',
        default: false,
    },
    dynamicImage: {
        type: 'number',
        default: undefined,
    },
    dynamicBackgroundColor: {
        type: 'string',
        default: undefined,
    },
    linkType: {
        type: 'string',
        default: 'hidden-link',
    },
    url: {
        type: 'string',
        default: '',
    },
    hiddenLinkAriaLabel: {
        type: 'string',
        default: '',
    },
    target: {
        type: 'boolean',
    },
    relNoFollow: {
        type: 'boolean',
    },
    relSponsored: {
        type: 'boolean',
    },
    removeIfEmpty: {
        type: 'boolean',
        default: false,
    },
    useTransform: {
        type: 'boolean',
        default: false,
    },
    transforms: {
        type: 'array',
        default: [],
    },
    transformDisableInEditor: {
        type: 'boolean',
        default: false,
    },
    useOpacity: {
        type: 'boolean',
        default: false,
    },
    opacities: {
        type: 'array',
        default: [],
    },
    opacityDisableInEditor: {
        type: 'boolean',
        default: false,
    },
    useTransition: {
        type: 'boolean',
        default: false,
    },
    transitions: {
        type: 'array',
        default: [],
    },
    aspectRatio: {
        type: 'string',
        default: '',
    },
    aspectRatioTablet: {
        type: 'string',
        default: '',
    },
    aspectRatioMobile: {
        type: 'string',
        default: '',
    },
    stickyOnScroll: {
        type: 'string',
        default: '',
    },
    stickyOnScrollTablet: {
        type: 'string',
        default: '',
    },
    stickyOnScrollMobile: {
        type: 'string',
        default: '',
    },
    altText: {
        type: 'string',
        default: '',
    },
    role: {
        type: 'string',
        default: '',
    },
};
