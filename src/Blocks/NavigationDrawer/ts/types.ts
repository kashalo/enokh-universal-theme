export interface BlockAttributes {
	templateLock: boolean | string;
}

export interface BlockEditProps {
	isSelected: boolean;
	attributes: BlockAttributes;
	setAttributes: ( {}: Partial< BlockAttributes > ) => void;
}

export interface BlockSaveProps {
	attributes: BlockAttributes;
	setAttributes: ( {}: Partial< BlockAttributes > ) => void;
}
