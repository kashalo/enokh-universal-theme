const getAllShapes = (): blockShapeItem[] => {
    const allShapes = [];
    Object.keys( EnokhBlocksEditor.Config.blockShapes ).forEach( (key ) => {
        const shapes = EnokhBlocksEditor.Config.blockShapes[ key ].shapes;

        Object.keys( shapes ).forEach( ( shapeName ) => {
            allShapes[ shapeName ] = {
                label: shapes[ shapeName ].label,
                icon: shapes[ shapeName ].icon,
            };
        } );
    } );

    return allShapes;
};

export default getAllShapes;
