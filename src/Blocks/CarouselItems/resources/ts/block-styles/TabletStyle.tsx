import { BlockEditProps } from '../block/types';
import { buildCSS } from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const TabletStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { context, attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId } = attributes;
    const selector =
        '.enokh-blocks-carousel-items__container-' +
        uniqueId +
        ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
    const styles = [];

    styles[ selector ] = [
        {
            'row-gap': `${ context[ 'enokh-blocks/carouselSpaceBetweenTablet' ] }px`,
        },
    ];

    return <style>{ buildCSS( styles ) }</style>;
};

export default TabletStyle;
