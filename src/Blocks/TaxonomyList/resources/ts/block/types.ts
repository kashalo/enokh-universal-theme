export interface BlockAttributes {
    uniqueId: string;
    inheritQuery: boolean;
    taxonomyType: string;
    showPostCounts: boolean;
    showEmpty: boolean;
    showOnlyTopLevel: boolean;
    showHierarchy: boolean;
    query: { [ propName: string ]: any };
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
    className: string;
    context: { [ propName: string ]: any };
}

export interface BlockInspectorControlProps {
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
}

export interface BlockComponentProps {
    attributes: BlockAttributes;
    setAttributes( object );
    context: { [ propName: string ]: any };
    clientId: string;
}

export interface TermListRendererProps {
    context: { [ propName: string ]: any };
    clientId: string;
}

export interface TemplateSelectorProps {
    clientId: string;
    isDisabled?: boolean;
    setAttributes( object );
}

export interface BlockControlsProps {
    uniqueId: string;
    clientId: string;
    setAttributes( object );
}

export interface QueryParamTermsSelectControlProps {
    id?: string;
    label?: string;
    placeholder?: string;
    taxonomy: string;
    value: number | undefined;

    onChange( any );

    help?: string;
}
