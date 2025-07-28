const hasUrl = ( attributes: any ) => {
    const { url, useDynamicData, dynamicLinkType } = attributes;

    return url || ( useDynamicData && dynamicLinkType !== '' );
};

export default hasUrl;
