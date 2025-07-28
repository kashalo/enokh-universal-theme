export default function getIconAttributes() {
    return {
        icon: {
            type: 'string',
            source: 'html',
            selector: '.enokh-blocks-icon',
            default: '',
        },
        hasIcon: {
            type: 'boolean',
            default: false,
        },

        iconLocation: {
            type: 'string',
            default: 'left',
        },
        iconLocationTablet: {
            type: 'string',
            default: '',
        },
        iconLocationMobile: {
            type: 'string',
            default: '',
        },
        removeText: {
            type: 'boolean',
            default: false,
        },
        iconStyles: {
            type: 'object',
            default: {
                height: '',
                width: '',
                paddingBottom: '',
                paddingLeft: '',
                paddingRight: '',
                paddingTop: '',

                heightTablet: '',
                widthTablet: '',
                paddingBottomTablet: '',
                paddingLeftTablet: '',
                paddingRightTablet: '',
                paddingTopTablet: '',

                heightMobile: '',
                widthMobile: '',
                paddingBottomMobile: '',
                paddingLeftMobile: '',
                paddingRightMobile: '',
                paddingTopMobile: '',
            },
        },
    };
}
