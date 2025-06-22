interface BlockProps< Attributes > {
	isSelected: boolean;
	attributes: Attributes;
	setAttributes: ( {}: Partial< Attributes > ) => void;
}

interface RestMenuLocationResponse {
	[ key: string ]: RestMenuLocation;
}

interface RestMenuLocation {
	name: string;
	description: string;
	menu: number;
}

interface SelectControlOption {
	label: string;
	value: string;
}
