import { buildCSS } from '../../../utils';

const ContainerDesktopStyle = ( props: ContainerBlockProps ) => {
    const { attributes } = props;
    const selector = `.editor-styles-wrapper .enokh-blocks-container-${ attributes.uniqueId }`;
    const styles = [];

    styles[ `.enokh-blocks-grid-column-${ attributes.uniqueId }` ] = [
        {
            'margin-bottom': attributes.removeVerticalGap ? '0px !important' : false,
        },
    ];

    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};
export default ContainerDesktopStyle;
