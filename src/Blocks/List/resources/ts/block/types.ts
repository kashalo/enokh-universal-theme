export interface BlockAttributes {
    uniqueId: string;
    listType: string;
    typography: { [ propName: string ]: any };
    borders: { [ propName: string ]: any };
    spacing: { [ propName: string ]: any };
    listSpacing: { [ propName: string ]: any };
    column: null | number;
    columnTablet: null | number;
    columnMobile: null | number;
    colors: { [ propName: string ]: any };
    marker: { [ propName: string ]: any };
    numerical: { [ propName: string ]: any };
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

export interface BlockStyleProps extends BlockEditProps {
    deviceType: string;
}
