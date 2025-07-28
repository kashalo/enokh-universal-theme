export default ( { isCarouselItem, uniqueId, children } ) => {
    if ( ! isCarouselItem ) {
        return children;
    }

    return <div className={ `enokh-blocks-carousel-item enokh-blocks-carousel-item-${ uniqueId }` }>{ children }</div>;
};
