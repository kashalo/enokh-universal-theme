interface QueryLoopBlockConfig {
    apiVersion: number;
    name: string;
    title: string;
    category: string;
    icon: string;
    attributes: QueryLoopBlockAttributes;
}

interface QueryLoopBlockProps {
    setAttributes: ( object ) => {};
    attributes: QueryLoopBlockAttributes;
    className: string;
    clientId: string;
}

interface QueryLoopBlockAttributes {
    uniqueId: string;
    inheritQuery: boolean;
    query: object;
    blockLabel: string;
}

interface QueryLoopLTemplateSelectorProps {
    clientId: string;
    isDisabled?: boolean;
}

interface QueryParamDateTimePickerProps {
    id?: string;
    label?: string;
    help?: string;
    value: any;

    onChange( any );
}

interface QueryLoopBlockInspectorControlsProps {
    attributes: QueryLoopBlockAttributes;
    setAttributes: ( object ) => {};
    clientId: string;
}

interface QueryLoopBlockBlockControlsProps {
    attributes: QueryLoopBlockAttributes;
    setAttributes: ( object ) => {};
    clientId: string;
}

interface QueryParamTaxonomyControlProps {
    id?: string;
    label?: string;
    placeholder?: string;
    value: {
        includeChildren: boolean;
        rest: string;
        taxonomy: string;
        terms: number[];
    };

    onChange( any );

    help?: string;
}
