interface TermFeaturedImageBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: TermFeaturedImageBlockAttributes;
}

interface TermFeaturedImageBlockAttributes {
    aspectRatio: string;
    width: string;
    height: string;
    scale: string;
    rel: string;
    sizeSlug: string;
}

interface TermFeaturedImageBlockProps {
    setAttributes: ( object ) => {};
    attributes: TermFeaturedImageBlockAttributes;
    className: string;
    clientId: string;
    isSelected: boolean;
}
