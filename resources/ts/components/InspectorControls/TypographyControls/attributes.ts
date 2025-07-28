export default function getTypographyAttributes( defaults ) {
    return {
        typography: {
            type: 'object',
            default: {},
        },
        fontWeight: {
            type: 'string',
            default: defaults.fontWeight,
        },
        textTransform: {
            type: 'string',
            default: '',
        },
        alignment: {
            type: 'string',
            default: defaults.alignment,
        },
        alignmentTablet: {
            type: 'string',
            default: defaults.alignmentTablet,
        },
        alignmentMobile: {
            type: 'string',
            default: defaults.alignmentMobile,
        },
        fontSize: {
            type: 'number',
            default: defaults.fontSize,
        },
        fontSizeTablet: {
            type: 'number',
            default: defaults.fontSizeTablet,
        },
        fontSizeMobile: {
            type: 'number',
            default: defaults.fontSizeMobile,
        },
        fontSizeUnit: {
            type: 'string',
            default: defaults.fontSizeUnit,
        },

        lineHeight: {
            type: 'number',
            default: defaults.lineHeight,
        },
        lineHeightTablet: {
            type: 'number',
            default: defaults.lineHeightTablet,
        },
        lineHeightMobile: {
            type: 'number',
            default: defaults.lineHeightMobile,
        },
        lineHeightUnit: {
            type: 'string',
            default: defaults.lineHeightUnit,
        },

        letterSpacing: {
            type: 'number',
            default: defaults.letterSpacing,
        },
        letterSpacingTablet: {
            type: 'number',
            default: defaults.letterSpacingTablet,
        },
        letterSpacingMobile: {
            type: 'number',
            default: defaults.letterSpacingMobile,
        },
    };
}
