import { buildCSS, dividerStyle, layoutStyle } from '../../../utils';

const GridStyle = ( props: GridBlockProps ): JSX.Element => {
    const { attributes } = props;

    const {
        uniqueId,
        horizontalGap,
        verticalGap,
        verticalAlignment,
        horizontalAlignment,
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

    const gridItemSelector =
        isQueryLoop || isTermQueryLoop
            ? gridSelector + ' > .block-editor-inner-blocks'
            : gridSelector + ' > .enokh-blocks-grid-column';

    const gridItemDividerSelector =
        isQueryLoop || isTermQueryLoop
            ? gridItemSelector + ' > div > .enokh-blocks-grid-column::before'
            : gridItemSelector + '::before';

    layoutStyle( styles, `.block-editor-block-list__layout ${ gridItemSelector }`, attributes );
    dividerStyle( styles, gridItemDividerSelector, attributes, '', isQueryLoop || isTermQueryLoop );
    styles[ gridSelector ] = [
        {
            'align-items': verticalAlignment,
            'justify-content': horizontalAlignment,
            'margin-left': horizontalGap || horizontalGap !== '' ? '-' + horizontalGap : null,
            'row-gap': verticalGap,
        },
    ];

    styles[ gridItemSelector ] = [
        {
            'padding-left': horizontalGap,
            'margin-bottom': '',
        },
    ];

    return <style>{ buildCSS( styles ) }</style>;
};

export default GridStyle;
