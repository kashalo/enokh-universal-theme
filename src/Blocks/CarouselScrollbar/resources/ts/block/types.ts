export interface BlockAttributes {
    uniqueId: string;
    display: { [ propName: string ]: any };
    sizing: { [ propName: string ]: any };
    colors: { [ propName: string ]: any };
    borders: { [ propName: string ]: any };
    borderColor: string;
    borderColorHover: string;
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
