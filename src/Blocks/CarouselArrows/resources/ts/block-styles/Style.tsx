import { BlockEditProps } from '../block/types';
import { buildCSS } from '@enokh-blocks/utils';

const MainStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const { uniqueId, alignItems, justifyContent } = attributes;
    const selector =
        '.enokh-blocks-carousel-arrows-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
    const styles = [];

    const computedAlignItems =
        alignItems === 'center' ? alignItems : `flex-${ alignItems === 'top' ? 'start' : 'end' }`;
    const computedJustifyContent = [ 'start', 'end' ].includes( justifyContent )
        ? `flex-${ justifyContent }`
        : justifyContent;

    styles[ selector ] = [
        {
            display: 'flex',
            'align-items': computedAlignItems,
            'justify-content': computedJustifyContent,
        },
    ];

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
