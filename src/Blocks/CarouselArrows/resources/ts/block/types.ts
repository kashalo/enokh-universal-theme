export interface BlockAttributes {
    uniqueId: string;
    alignItems: string;
    alignItemsTablet: string;
    alignItemsMobile: string;
    justifyContent: string;
    justifyContentTablet: string;
    justifyContentMobile: string;
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

export interface BlockControlsProps {
    uniqueId: string;
    clientId: string;
}
