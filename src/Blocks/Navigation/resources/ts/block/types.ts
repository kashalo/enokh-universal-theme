export interface BlockAttributes {
    layout: {};
    menuLocation: string;
    ariaLabel: string;
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;
    setAttributes: ( {}: Partial< BlockAttributes > ) => void;
}

export interface BlockControlsProps {
    attributes: BlockAttributes;
    setAttributes: ( {}: Partial< BlockAttributes > ) => void;
}

export interface BlockInspectorControlProps {
    attributes: BlockAttributes;
    setAttributes: ( {}: Partial< BlockAttributes > ) => void;
}
