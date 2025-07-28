import {
    borderStyle,
    borderStyleColor,
    buildCSS,
    coloursStyle,
    layoutStyle,
    sizingStyle,
    spacingStyle,
} from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const MobileStyle: React.FunctionComponent< TabPanelProps > = ( props ) => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId, navigation } = attributes;
    const selector = '.enokh-blocks-tab-item-header-' + uniqueId + ' > .block-editor-block-list__block';
    const selectorHoverState = `${ selector }:hover`;
    const styles = [];

    layoutStyle( styles, selector, navigation, deviceType );
    sizingStyle( styles, selector, navigation, deviceType );
    spacingStyle( styles, selector, navigation, deviceType );
    spacingStyle( styles, selector, navigation, deviceType );
    borderStyle( styles, selector, navigation, deviceType );
    coloursStyle( styles, selector, navigation, deviceType );
    // Border hover
    borderStyleColor( styles, selectorHoverState, navigation, 'Hover', deviceType );
    coloursStyle( styles, selectorHoverState, navigation, 'Hover', deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MobileStyle;
