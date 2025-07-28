import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

export const getColumnsFromLayout = ( layout: string, uniqueId: string ): any[] => {
    const columnsData = layout.split( '-' ) || [];

    return columnsData.map( ( col ) => ( {
        isGrid: true,
        gridId: uniqueId,
        paddingTop: '',
        paddingRight: '',
        paddingBottom: '',
        paddingLeft: '',
        sizing: {
            width: `${ col }%`,
            widthMobile: '100%',
        },
    } ) );
};

interface GridLayoutSelectorProps {
    uniqueId: string;
    onClick: Function;
    isDisabled?: boolean;
}
const GridLayoutSelector = ( props: GridLayoutSelectorProps ): JSX.Element => {
    const { uniqueId, onClick, isDisabled = false } = props;
    if ( isDisabled ) {
        return;
    }

    const layouts = [
        '100',
        '50-50',
        '33.33-33.33-33.33',
        '25-25-25-25',

        '25-75',
        '75-25',
        '25-25-50',
        '25-50-25',

        '50-25-25',
        '20-60-20',
        '20-20-20-20-20',
        '16-16-16-16-16-16',
    ];

    return (
        <Placeholder
            label={ __( 'Grid', 'enokh-blocks' ) }
            instructions={ __( 'Choose how many Containers to start with.', 'enokh-blocks' ) }
            className="enokh-blocks-select-layout"
        >
            <div className="enokh-blocks-grid-wrapper-layout-preview">
                { layouts.map( ( layout ) => {
                    const columnsData = getColumnsFromLayout( layout, uniqueId );

                    return (
                        <button
                            key={ `layout-${ layout }` }
                            className="enokh-blocks-grid-wrapper-layout-preview-btn"
                            onClick={ () => onClick( layout ) }
                        >
                            { columnsData.map( ( colAttrs, idx ) => {
                                const colWidth = colAttrs.sizing.width.replace( '%', '' ).replace( '.', '-' );

                                return (
                                    <div
                                        key={ `layout-${ layout }-col-${ idx }` }
                                        className={ classnames( 'enokh-blocks-col', `enokh-blocks-col-${ colWidth }` ) }
                                    />
                                );
                            } ) }
                        </button>
                    );
                } ) }
            </div>
        </Placeholder>
    );
};
export default GridLayoutSelector;
