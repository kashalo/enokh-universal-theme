interface ButtonBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: ButtonBlockAttributes;
}

interface ButtonBlockAttributes extends BlockDefaultAttributes, DynamicContentAttributes {
    uniqueId: string;
    anchor: string;
    url: string;
    hasUrl: boolean;
    target: boolean;
    relNoFollow: boolean;
    text: string;
    ariaLabel: string;
    hasButtonContainer: boolean;
    variantRole: string;
    buttonType: string;
    borderColor: string;
    borderColorOpacity: number;
    backgroundColor: string;
    backgroundColorOpacity: number;
    backgroundColorHover: string;
    backgroundColorHoverOpacity: number;
    textColor: string;
    textColorHover: string;
    backgroundColorCurrent: string;
    textColorCurrent: string;
    textColorPressed: string;
    textColorDisabled: string;
    backgroundColorPressed: string;
    backgroundColorDisabled: string;

    // Icon
    icon: string;
    hasIcon: boolean;
    iconLocation: string;
    iconLocationTablet: string;
    iconLocationTabletMobile: string;
    iconLocationMobile: string;
    removeText: boolean;

    // Tablet
    textColorTablet: string;
    textColorHoverTablet: string;
    textColorCurrentTablet: string;
    backgroundColorTablet: string;
    backgroundColorHoverTablet: string;
    backgroundColorCurrentTablet: string;
    backgroundColorPressedTablet: string;
    backgroundColorDisabledTablet: string;
    textColorPressedTablet: string;
    textColorDisabledTablet: string;

    // Mobile
    textColorMobile: string;
    textColorHoverMobile: string;
    textColorCurrentMobile: string;
    backgroundColorMobile: string;
    backgroundColorHoverMobile: string;
    backgroundColorCurrentMobile: string;
    backgroundColorPressedMobile: string;
    backgroundColorDisabledMobile: string;
    textColorPressedMobile: string;
    textColorDisabledMobile: string;

    isAccordionToggle: boolean;

    /**
     * MOWE-199 Implement Effects Panel to Button
     */
    useTextShadow: boolean;
    textShadows: any[];
    useTypography: boolean;
    typographyEffects: any[];
}

interface ButtonBlockProps {
    setAttributes: ( object ) => {};
    attributes: ButtonBlockAttributes;
    className: string;
    clientId: string;
    deviceType: string;
    isSelected: boolean;
    context: { [ propName: string ]: any };
    name: string;
}

interface ButtonBlockInspectorControlsProps {
    attributes: ButtonBlockAttributes;
    setAttributes: ( object ) => {};
    clientId: string;
}

interface ButtonBlockToolbarProps extends ButtonBlockProps {
    toggleCurrent: boolean;
    setToggleCurrent( value: boolean );
}
