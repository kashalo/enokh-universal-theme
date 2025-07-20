export interface BlockAttributes {
    templateLock: string | boolean;
    position: string;
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;
    setAttributes: ( {}: Partial< BlockAttributes > ) => void;
}

export interface BlockSaveProps {
    isSelected: boolean;
    attributes: BlockAttributes;
}
