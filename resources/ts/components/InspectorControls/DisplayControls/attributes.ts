export default function getDisplayAttributes() {
    return {
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
    };
}
