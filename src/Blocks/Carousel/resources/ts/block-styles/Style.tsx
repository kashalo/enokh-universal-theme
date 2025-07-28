import { BlockEditProps } from '../block/types';
import { buildCSS, getAttribute, spacingStyle } from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const MainStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId } = attributes;
    const selector =
        '.enokh-blocks-carousel-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
    const styles = [];

    const height = getAttribute( 'height', { attributes, deviceType } );
    const minHeight = getAttribute( 'minHeight', { attributes, deviceType } );

    // styles[ selector ] = [
    //     {
    //         height: height === 'adaptive' ? 'auto' : minHeight,
    //     },
    // ];

    spacingStyle( styles, selector, attributes );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
