import { buildCSS, dividerStyle, layoutStyle } from '../../../utils';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';

const GridTabletStyle = ( props: GridBlockProps ): JSX.Element => {
    const { attributes } = props;
    const { deviceType } = useContext( BlockContext );

    const {
        uniqueId,
        horizontalGapTablet,
        verticalGapTablet,
        verticalAlignmentTablet,
        horizontalAlignmentTablet,
        isQueryLoop,
        isTermQueryLoop,
    } = attributes;

    const styles = [];

    let gridSelector =
        '.enokh-blocks-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
    gridSelector = !! isQueryLoop
        ? '.enokh-blocks-post-template-' + uniqueId + ' > .enokh-blocks-post-template-wrapper'
        : gridSelector;
    gridSelector = !! isTermQueryLoop
        ? '.enokh-blocks-term-template-' + uniqueId + ' > .enokh-blocks-term-template-wrapper'
        : gridSelector;

    const gridItemSelector = isQueryLoop
        ? gridSelector + ' > .block-editor-inner-blocks'
        : gridSelector + ' > .enokh-blocks-grid-column';

    const gridItemDividerSelector =
        isQueryLoop || isTermQueryLoop
            ? gridItemSelector + ' > div > .enokh-blocks-grid-column::before'
            : gridItemSelector + '::before';

    layoutStyle( styles, `.block-editor-block-list__layout ${ gridSelector }`, attributes, deviceType );
    dividerStyle( styles, gridItemDividerSelector, attributes, deviceType, isQueryLoop || isTermQueryLoop );
    styles[ gridSelector ] = [
        {
            'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null,
            'justify-content': 'inherit' !== horizontalAlignmentTablet ? horizontalAlignmentTablet : null,
            'margin-left': horizontalGapTablet || horizontalGapTablet !== '' ? '-' + horizontalGapTablet : null,
            'row-gap': verticalGapTablet !== '' ? verticalGapTablet : null,
        },
    ];

    styles[ gridItemSelector ] = [
        {
            'padding-left': horizontalGapTablet,
            'margin-bottom': '',
        },
    ];

    return <style>{ buildCSS( styles ) }</style>;
};

export default GridTabletStyle;
