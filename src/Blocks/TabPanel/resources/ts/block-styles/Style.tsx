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

const MainStyle: React.FunctionComponent< TabPanelProps > = ( props ) => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId, navigation } = attributes;
    const selector = '.enokh-blocks-tab-item-header-' + uniqueId + ' > .block-editor-block-list__block';
    const selectorHoverState = `${ selector }:hover`;
    const styles = [];

    layoutStyle( styles, selector, navigation );
    sizingStyle( styles, selector, navigation );
    spacingStyle( styles, selector, navigation );
    spacingStyle( styles, selector, navigation );
    borderStyle( styles, selector, navigation );
    coloursStyle( styles, selector, navigation );
    // Border hover
    borderStyleColor( styles, selectorHoverState, navigation, 'Hover' );
    coloursStyle( styles, selectorHoverState, navigation, 'Hover' );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
