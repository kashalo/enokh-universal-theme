export interface BlockAttributes {
    placeholderText: string;
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;
    setAttributes: ( {}: Partial< BlockAttributes > ) => void;
}

export interface BlockToolbarControlProps {
    attributes: BlockAttributes;
    setAttributes: ( {}: Partial< BlockAttributes > ) => void;
}

export interface BlockInspectorControlProps {
    attributes: BlockAttributes;
    setAttributes: ( {}: Partial< BlockAttributes > ) => void;
}
