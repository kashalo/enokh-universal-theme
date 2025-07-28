import GridlockInspectorControls from './inspector-controls';
import { compose } from '@wordpress/compose';
import withDeviceType from '../../../hoc/withDeviceType';
import withUniqueId from '../../../hoc/withUniqueId';
import BlockContext, { withBlockContext } from '../../../block-context';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useContext, useEffect, useState } from '@wordpress/element';
import classnames from 'classnames';
import GridLayoutSelector, { getColumnsFromLayout } from './components/GridLayoutSelector';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import GridStyle from '../../block-styles/grid/Style';
import GridTabletStyle from '../../block-styles/grid/TabletStyle';
import GridMobileStyle from '../../block-styles/grid/MobileStyle';
import GridBlockControls from './block-controls';
import QueryLoopRenderer from '../QueryLoopBlock/components/QueryLoopRenderer';
import withQueryLoop from '../../../hoc/withQueryLoop';
import TermListRenderer from '../../../../../src/Blocks/TaxonomyList/resources/ts/block/components/TermListRenderer';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import _values from 'lodash/values';
import _isEmpty from 'lodash/isEmpty';

const GridBlockEdit = ( props: GridBlockProps ): JSX.Element => {
    const { attributes, setAttributes, clientId, className, context } = props;
    const [ selectedLayout, setSelectedLayout ] = useState( false );
    const { deviceType } = useContext( BlockContext );
    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const { insertBlocks } = useDispatch( 'core/block-editor' );
    const defaultLayout: string | boolean = props.defaultLayout ? props.defaultLayout : false;
    const hasEmptyDivider = ! attributes.divider || _values( attributes.divider ).every( _isEmpty );

    useEffect( () => {
        setAttributes( {
            columns: innerBlocksCount,
        } );
    }, [ innerBlocksCount ] );

    useEffect( () => {
        const layout = defaultLayout || selectedLayout;
        if ( ! attributes.isQueryLoop && ! attributes.isTermQueryLoop && layout ) {
            const columnsData = getColumnsFromLayout( layout.toString(), attributes.uniqueId );
            const newColumns = [];

            columnsData.forEach( ( colAttrs ) => {
                newColumns.push( createBlock( 'enokh-blocks/container', colAttrs ) );
            } );

            setTimeout( () => {
                insertBlocks( newColumns, undefined, props.clientId, false );

                setSelectedLayout( false );
            }, 50 );
        }
    }, [
        selectedLayout,
        defaultLayout,
        attributes.uniqueId,
        props.clientId,
        attributes.isQueryLoop,
        attributes.isTermQueryLoop,
    ] );

    const blockAttributes = {
        className: classnames( {
            'enokh-blocks-grid-wrapper': true,
            [ `enokh-blocks-grid-wrapper-${ attributes.uniqueId }` ]: true,
            [ `${ className }` ]: undefined !== className,
            'enokh-blocks-post-template': !! attributes.isQueryLoop,
            [ `enokh-blocks-post-template-${ attributes.uniqueId }` ]: !! attributes.isQueryLoop,
            'enokh-blocks-term-template': !! attributes.isTermQueryLoop,
            [ `enokh-blocks-term-template-${ attributes.uniqueId }` ]: !! attributes.isTermQueryLoop,
            'enokh-blocks-has-divider': ! hasEmptyDivider,
        } ),
        id: attributes.anchor ? attributes.anchor : null,
    };

    const blockProps = useBlockProps( blockAttributes );

    return (
        <>
            <GridlockInspectorControls
                attributes={ attributes }
                setAttributes={ setAttributes }
                clientId={ clientId }
            />

            { ! attributes.isQueryLoop && ! attributes.isTermQueryLoop && (
                <GridBlockControls uniqueId={ attributes.uniqueId } clientId={ clientId } />
            ) }

            { /*Style Blocks*/ }
            <GridStyle { ...props } />
            { ( deviceType === 'Tablet' || deviceType === 'Mobile' ) && <GridTabletStyle { ...props } /> }
            { deviceType === 'Mobile' && <GridMobileStyle { ...props } /> }

            <div { ...blockProps }>
                { attributes.isQueryLoop || attributes.isTermQueryLoop || attributes.columns > 0 || selectedLayout ? (
                    <>
                        { ! attributes.isQueryLoop && ! attributes.isTermQueryLoop && (
                            <InnerBlocks
                                templateLock={ attributes.templateLock }
                                allowedBlocks={ [ 'enokh-blocks/container' ] }
                                renderAppender={ false }
                                clientId={ clientId }
                                uniqueId={ attributes.uniqueId }
                                attributes={ attributes }
                                context={ context }
                            />
                        ) }
                        { !! attributes.isQueryLoop && (
                            <QueryLoopRenderer
                                templateLock={ attributes.templateLock }
                                allowedBlocks={ [ 'enokh-blocks/container' ] }
                                renderAppender={ false }
                                clientId={ clientId }
                                uniqueId={ attributes.uniqueId }
                                attributes={ attributes }
                                context={ context }
                            />
                        ) }
                        { !! attributes.isTermQueryLoop && (
                            <TermListRenderer
                                templateLock={ attributes.templateLock }
                                allowedBlocks={ [ 'enokh-blocks/container' ] }
                                renderAppender={ false }
                                clientId={ clientId }
                                uniqueId={ attributes.uniqueId }
                                attributes={ attributes }
                                context={ context }
                            />
                        ) }
                    </>
                ) : (
                    <GridLayoutSelector uniqueId={ attributes.uniqueId } onClick={ setSelectedLayout } />
                ) }
            </div>
        </>
    );
};

export default compose(
    withSetAttributes,
    withDeviceType,
    withBlockContext,
    withQueryLoop,
    withUniqueId
)( GridBlockEdit );
