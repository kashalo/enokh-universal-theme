interface TableOfContentBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: TableOfContentBlockAttributes;
    supports: any;
    isUsedInTemplate: boolean;
    filtersAdded: boolean;
}

interface TableOfContentBlockProps {
    setAttributes: ( object: any ) => {};
    attributes: TableOfContentBlockAttributes;
}

interface TableOfContentBlockAttributes {
    heading: string;
    headingLevel: number;
    textColor: string;
    linkColor: string;
    background: string;
    listStyle: string;
    headingFontSize: number;
    headingFontSizeClass: string;
    headingEnabled: boolean;
}
