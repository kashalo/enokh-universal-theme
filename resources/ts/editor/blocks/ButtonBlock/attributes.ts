export default {
    uniqueId: {
        type: 'string',
        default: '',
    },
    anchor: {
        type: 'string',
        default: '',
    },
    url: {
        type: 'string',
        source: 'attribute',
        selector: '.enokh-blocks-button',
        attribute: 'href',
        __experimentalRole: 'content',
    },
    hasUrl: {
        type: 'boolean',
    },
    target: {
        type: 'boolean',
        __experimentalRole: 'content',
    },
    relNoFollow: {
        type: 'boolean',
    },
    text: {
        type: 'string',
        source: 'html',
        selector: '.enokh-blocks-button-text',
        default: 'Button',
        __experimentalRole: 'content',
    },
    ariaLabel: {
        type: 'string',
        default: '',
        __experimentalRole: 'content',
    },
    hasButtonContainer: {
        type: 'boolean',
        default: false,
    },
    variantRole: {
        type: 'string',
        default: '',
    },
    buttonType: {
        type: 'string',
        default: 'link',
    },
    borderColor: {
        type: 'string',
        default: '',
    },
    borderColorOpacity: {
        type: 'number',
        default: 1,
    },
    backgroundColorHover: {
        type: 'string',
        default: '',
    },
    backgroundColorHoverOpacity: {
        type: 'number',
        default: 1,
    },
    backgroundColor: {
        type: 'string',
        default: '',
    },
    backgroundColorOpacity: {
        type: 'number',
        default: 1,
    },
    textColor: {
        type: 'string',
        default: '',
    },
    textColorHover: {
        type: 'string',
        default: '',
    },
    backgroundColorCurrent: {
        type: 'string',
        default: '',
    },
    textColorCurrent: {
        type: 'string',
        default: '',
    },
    textColorTablet: {
        type: 'string',
        default: '',
    },
    textColorHoverTablet: {
        type: 'string',
        default: '',
    },
    textColorCurrentTablet: {
        type: 'string',
        default: '',
    },
    textColorMobile: {
        type: 'string',
        default: '',
    },
    textColorHoverMobile: {
        type: 'string',
        default: '',
    },
    textColorCurrentMobile: {
        type: 'string',
        default: '',
    },
    backgroundColorTablet: {
        type: 'string',
        default: '',
    },
    backgroundColorHoverTablet: {
        type: 'string',
        default: '',
    },
    backgroundColorCurrentTablet: {
        type: 'string',
        default: '',
    },
    backgroundColorMobile: {
        type: 'string',
        default: '',
    },
    backgroundColorHoverMobile: {
        type: 'string',
        default: '',
    },
    backgroundColorCurrentMobile: {
        type: 'string',
        default: '',
    },
    textColorPressed: {
        type: 'string',
        default: '',
    },
    textColorPressedTablet: {
        type: 'string',
        default: '',
    },
    textColorPressedMobile: {
        type: 'string',
        default: '',
    },
    textColorDisabled: {
        type: 'string',
        default: '',
    },
    textColorDisabledTablet: {
        type: 'string',
        default: '',
    },
    textColorDisabledMobile: {
        type: 'string',
        default: '',
    },
    backgroundColorPressed: {
        type: 'string',
        default: '',
    },
    backgroundColorPressedTablet: {
        type: 'string',
        default: '',
    },
    backgroundColorPressedMobile: {
        type: 'string',
        default: '',
    },
    backgroundColorDisabled: {
        type: 'string',
        default: '',
    },
    backgroundColorDisabledTablet: {
        type: 'string',
        default: '',
    },
    backgroundColorDisabledMobile: {
        type: 'string',
        default: '',
    },
    removeText: {
        type: 'boolean',
        default: false,
    },
    isAccordionToggle: {
        type: 'boolean',
        default: false,
    },
    useTextShadow: {
        type: 'boolean',
        default: false,
    },
    textShadows: {
        type: 'array',
        default: [],
    },
    useTypography: {
        type: 'boolean',
        default: false,
    },
    typographyEffects: {
        type: 'array',
        default: [],
    },
};
