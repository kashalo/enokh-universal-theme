interface AccordionBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: AccordionBlockAttributes;
}

interface AccordionBlockAttributes {
    templateLock: string | boolean;
    uniqueId: string;
    headerItem: { [ propName: string ]: any };
    panel: { [ propName: string ]: any };
}

interface AccordionBlockProps {
    setAttributes: ( object ) => {};
    attributes: AccordionBlockAttributes;
    className: string;
    clientId: string;
    isSelected: boolean;
}

interface AccordionItemBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: AccordionBlockAttributes;
    parent: string[];
}

interface AccordionItemBlockAttributes {
    heading: string;
    title: string;
    isOpen: boolean;
    uniqueId: string;
}

interface AccordionItemBlockProps {
    setAttributes: ( object ) => {};
    attributes: AccordionItemBlockAttributes;
    className: string;
    clientId: string;
    name: string;
    isSelected: boolean;
}
