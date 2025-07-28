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

const MobileStyle: React.FunctionComponent< AccordionBlockProps > = ( props ) => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId, headerItem, panel } = attributes;
    const selector = '.enokh-blocks-accordion-header-' + uniqueId;
    const selectorHoverState = `${ selector }:hover`;
    const panelSelector = '.enokh-blocks-accordion-' + uniqueId + ' .enokh-blocks-accordion-item';
    const panelSelectorHoverState = `${ panelSelector }:hover`;
    const styles = [];

    sizingStyle( styles, selector, headerItem, deviceType );
    spacingStyle( styles, selector, headerItem, deviceType );
    spacingStyle( styles, selector, headerItem, deviceType );
    borderStyle( styles, selector, headerItem, deviceType );
    coloursStyle( styles, selector, headerItem, deviceType );
    typographyStyle( styles, selector, headerItem, deviceType );
    // Border hover
    borderStyleColor( styles, selectorHoverState, headerItem, 'Hover', deviceType );
    coloursStyle( styles, selectorHoverState, headerItem, 'Hover', deviceType );

    /**
     * Panel Item Styles
     */
    spacingStyle( styles, panelSelector, panel, deviceType );
    borderStyle( styles, panelSelector, panel, deviceType );
    borderStyleColor( styles, panelSelectorHoverState, panel, 'Hover', deviceType );

    return <style>{ buildCSS( styles ) }</style>;
};

export default MobileStyle;
