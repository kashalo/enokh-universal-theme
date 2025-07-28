export interface BlockAttributes {
    uniqueId: string;
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

export interface BlockControlsProps {
    uniqueId: string;
    clientId: string;
    context: { [ propName: string ]: any };
}
