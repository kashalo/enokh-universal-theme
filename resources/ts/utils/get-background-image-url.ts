import { GetDynamicImage, getMediaUrl } from '../utils';

const getBackgroundImageUrl = ( props ): string => {
    const { attributes } = props;

    const { bgImage, useDynamicData, dynamicContentType, bgImageSize } = attributes;

    let url = bgImage?.image?.url;
    const dynamicImage = GetDynamicImage( props );

    if ( useDynamicData && 'featured-image' === dynamicContentType ) {
        url = getMediaUrl( dynamicImage, bgImageSize );
    }

    return url;
};
export default getBackgroundImageUrl;
