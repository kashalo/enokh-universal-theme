interface TabPanelConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: TabPanelAttributes;
}

interface TabPanelAttributes {
    templateLock: string | boolean;
    navigation: { [ key: string ]: any };
    panel: { [ key: string ]: any };
    uniqueId: string;
}

interface TabPanelProps {
    setAttributes: ( object ) => {};
    attributes: TabPanelAttributes;
    className: string;
    clientId: string;
    isSelected: boolean;
}

interface TabBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: TabBlockAttributes;
    parent: string[];
}

interface TabBlockAttributes {
    templateLock: string | boolean;
    name: string;
    innerTitle: string;
}

interface TabBlockProps {
    setAttributes: ( object ) => {};
    attributes: TabBlockAttributes;
    className: string;
    clientId: string;
    isSelected: boolean;
}
