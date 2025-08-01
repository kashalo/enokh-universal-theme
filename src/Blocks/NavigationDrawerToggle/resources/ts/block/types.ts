export interface BlockAttributes {
    labelEnabled: boolean;
    labelText: string;
    labelPosition: string;
    layout: {};
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
