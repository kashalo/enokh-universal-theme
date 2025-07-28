const getAccordionItemIds = ( items, type, { clientId }, getBlocks ) => {
    const accordionItems = items;
    const accordionToggleIds = [];
    const accordionContentIds = [];
    const accordionHeaderIds = [];

    accordionItems.forEach( ( item ) => {
        item?.innerBlocks.forEach( ( innerItem ) => {
            if ( type === 'accordion-toggle' && innerItem?.attributes?.isAccordionItemHeader ) {
                // Find the toggle button that nested inside the header
                const accordionHeaderItems = getBlocks( innerItem?.clientId );

                accordionHeaderItems.forEach( ( accordionHeaderItem ) => {
                    if ( accordionHeaderItem?.attributes?.isAccordionToggle ) {
                        accordionToggleIds.push( accordionHeaderItem?.clientId );
                    }
                } );
            }

            if ( innerItem?.attributes?.isAccordionItemContent ) {
                accordionContentIds.push( innerItem?.clientId );
            }

            if ( innerItem?.attributes?.isAccordionItemHeader ) {
                accordionHeaderIds.push( innerItem?.clientId );
            }
        } );
    } );

    let itemIds = [];

    if ( type === 'accordion-toggle' ) {
        itemIds = accordionToggleIds;
    } else if ( type === 'accordion-content' ) {
        itemIds = accordionContentIds;
    } else if ( type === 'accordion-header' ) {
        itemIds = accordionHeaderIds;
    }

    return itemIds;
};

export { getAccordionItemIds };
