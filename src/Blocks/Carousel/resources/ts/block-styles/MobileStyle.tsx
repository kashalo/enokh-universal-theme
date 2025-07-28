import { BlockEditProps } from '../block/types';
import { buildCSS, spacingStyle } from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const MobileStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId } = attributes;
    const selector =
        '.enokh-blocks-carousel-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
    const styles = [];

    spacingStyle( styles, selector, attributes, deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MobileStyle;
