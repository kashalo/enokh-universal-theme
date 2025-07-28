import { BlockEditProps } from '../block/types';
import { buildCSS } from '@enokh-blocks/utils';

const MobileStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const { uniqueId, alignItemsMobile, justifyContentMobile } = attributes;
    const selector =
        '.enokh-blocks-carousel-arrows-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
    const styles = [];

    const computedAlignItems =
        alignItemsMobile === 'center' ? alignItemsMobile : `flex-${ alignItemsMobile === 'top' ? 'start' : 'end' }`;
    const computedJustifyContent = [ 'start', 'end' ].includes( justifyContentMobile )
        ? `flex-${ justifyContentMobile }`
        : justifyContentMobile;

    styles[ selector ] = [
        {
            display: 'flex',
            'align-items': alignItemsMobile !== '' ? computedAlignItems : null,
            'justify-content': justifyContentMobile !== '' ? computedJustifyContent : null,
        },
    ];

    return <style>{ buildCSS( styles ) }</style>;
};

export default MobileStyle;
