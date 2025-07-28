import {
    borderStyle,
    borderStyleColor,
    buildCSS,
    coloursStyle,
    sizingStyle,
    spacingStyle,
    typographyStyle,
} from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const MainStyle: React.FunctionComponent< AccordionBlockProps > = ( props ) => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId, panel, headerItem } = attributes;
    const selector = '.enokh-blocks-accordion-header-' + uniqueId;
    const selectorHoverState = `${ selector }:hover`;
    const panelSelector = '.enokh-blocks-accordion-' + uniqueId + ' .enokh-blocks-accordion-item';
    const panelSelectorHoverState = `${ panelSelector }:hover`;
    const styles = [];

    /**
     * Header Item Styles
     */
    sizingStyle( styles, selector, headerItem );
    spacingStyle( styles, selector, headerItem );
    borderStyle( styles, selector, headerItem );
    coloursStyle( styles, selector, headerItem );
    typographyStyle( styles, selector, headerItem );
    // Border hover
    borderStyleColor( styles, selectorHoverState, headerItem, 'Hover' );
    coloursStyle( styles, selectorHoverState, headerItem, 'Hover' );

    /**
     * Panel Item Styles
     */
    spacingStyle( styles, panelSelector, panel );
    borderStyle( styles, panelSelector, panel );
    borderStyleColor( styles, panelSelectorHoverState, panel, 'Hover' );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MainStyle;
