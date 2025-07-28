import { BlockEditProps } from '../block/types';
import { buildCSS, getAttribute, spacingStyle } from '@enokh-blocks/utils';

const TabletStyle: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { attributes } = props;
    // const { deviceType } = useContext( BlockContext );
    const deviceType = 'Tablet';
    const { uniqueId } = attributes;
    const selector =
        '.enokh-blocks-carousel-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
    const styles = [];

    spacingStyle( styles, selector, attributes, deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default TabletStyle;
