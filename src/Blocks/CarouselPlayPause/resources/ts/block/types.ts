export interface BlockAttributes {
    uniqueId: string;
    display: { [ propName: string ]: any };
    spacing: { [ propName: string ]: any };
    borders: { [ propName: string ]: any };
    borderColor: string;
    borderColorHover: string;
    playTextColor: string;
    playTextColorTablet: string;
    playTextColorMobile: string;
    playTextColorHover: string;
    playTextColorHoverTablet: string;
    playTextColorHoverMobile: string;
    pauseTextColor: string;
    pauseTextColorTablet: string;
    pauseTextColorMobile: string;
    pauseTextColorHover: string;
    pauseTextColorHoverTablet: string;
    pauseTextColorHoverMobile: string;
    playBackgroundColor: string;
    playBackgroundColorTablet: string;
    playBackgroundColorMobile: string;
    playBackgroundColorHover: string;
    playBackgroundColorHoverTablet: string;
    playBackgroundColorHoverMobile: string;
    pauseBackgroundColor: string;
    pauseBackgroundColorTablet: string;
    pauseBackgroundColorMobile: string;
    pauseBackgroundColorHover: string;
    pauseBackgroundColorHoverTablet: string;
    pauseBackgroundColorHoverMobile: string;
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
    className: string;
}

export interface BlockInspectorControlProps {
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
}
