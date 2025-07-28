import { BlockEditProps } from '../block/types';
import { buildCSS } from '@enokh-blocks/utils';

const TabletStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const { uniqueId, alignItemsTablet, justifyContentTablet } = attributes;
    const selector =
        '.enokh-blocks-carousel-arrows-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
    const styles = [];

    const computedAlignItems =
        alignItemsTablet === 'center' ? alignItemsTablet : `flex-${ alignItemsTablet === 'top' ? 'start' : 'end' }`;
    const computedJustifyContent = [ 'start', 'end' ].includes( justifyContentTablet )
        ? `flex-${ justifyContentTablet }`
        : justifyContentTablet;

    styles[ selector ] = [
        {
            display: 'flex',
            'align-items': alignItemsTablet !== '' ? computedAlignItems : null,
            'justify-content': justifyContentTablet !== '' ? computedJustifyContent : null,
        },
    ];

    return <style>{ buildCSS( styles ) }</style>;
};

export default TabletStyle;
