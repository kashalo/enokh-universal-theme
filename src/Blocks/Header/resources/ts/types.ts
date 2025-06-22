export interface ElementConfig {
	wrapperClass: string;
}

export interface BlockAttributes {
	templateLock: boolean | string;
}

export interface BlockEditProps extends BlockProps< BlockAttributes > {
	attributes: BlockAttributes;
}

export interface BlockSaveProps extends BlockProps< BlockAttributes > {
	attributes: BlockAttributes;
}
