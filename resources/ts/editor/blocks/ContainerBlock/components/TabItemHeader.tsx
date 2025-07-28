export default ( { isTabHeader, uniqueId, children } ) => {
    if ( ! isTabHeader ) {
        return children;
    }

    return <div className={ `enokh-blocks-tab-item-header enokh-blocks-tab-item-header-${ uniqueId }` }>{ children }</div>;
};
