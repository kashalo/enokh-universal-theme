interface FooterBlockAttributes {
	templateLock: boolean | string;
}

interface FooterBlockEditProps extends BlockProps< FooterBlockAttributes > {
	attributes: FooterBlockAttributes;
}

interface FooterBlockSaveProps extends BlockProps< FooterBlockAttributes > {
	attributes: FooterBlockAttributes;
}
