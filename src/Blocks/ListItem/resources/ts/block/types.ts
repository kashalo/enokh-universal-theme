export interface BlockAttributes {
    uniqueId: string;
    content: string;
    typography: { [ propName: string ]: any };
    borders: { [ propName: string ]: any };
    spacing: { [ propName: string ]: any };
    colors: { [ propName: string ]: any };
    listMarker: { [ propName: string ]: any };
    listType: string;
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
    className: string;
    context: { [ propName: string ]: any };
    mergeBlocks: any;
}

export interface BlockInspectorControlProps {
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
}

export interface BlockStyleProps extends BlockEditProps {
    deviceType: string;
}
