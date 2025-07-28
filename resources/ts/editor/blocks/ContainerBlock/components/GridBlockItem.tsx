export default ( { isGrid, uniqueId, children } ) => {
    if ( ! isGrid ) {
        return children;
    }

    return <div className={ `enokh-blocks-grid-column enokh-blocks-grid-column-${ uniqueId }` }>{ children }</div>;
};
