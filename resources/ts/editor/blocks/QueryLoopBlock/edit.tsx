import withUniqueId from '../../../hoc/withUniqueId';
import { compose } from '@wordpress/compose';
import { BlockContextProvider, InnerBlocks, useBlockProps, store } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import TemplateSelector from './components/TemplateSelector';
import QueryLoopBlockInspectorControls from './inspect-controls';
import QueryLoopBlockControls from './block-controls';

const QueryLoopBlockEdit = ( props: QueryLoopBlockProps ): JSX.Element => {
    const { attributes, clientId, setAttributes } = props;
    const { query } = attributes;
    const blockProps = useBlockProps();
    const hasInnerBlocks = useSelect(
        ( select ) => !! ( select( store ) as any ).getBlocks( clientId ).length,
        [ clientId ]
    );

    return (
        <>
            <div { ...blockProps }>
                { ! hasInnerBlocks ? (
                    <TemplateSelector clientId={ clientId } />
                ) : (
                    <>
                        <QueryLoopBlockControls
                            attributes={ attributes }
                            setAttributes={ setAttributes }
                            clientId={ clientId }
                        />
                        <QueryLoopBlockInspectorControls
                            attributes={ attributes }
                            setAttributes={ setAttributes }
                            clientId={ clientId }
                        />
                        <BlockContextProvider value={ { 'enokh-blocks/termQuery': query } }>
                            <InnerBlocks renderAppender={ false } />
                        </BlockContextProvider>
                    </>
                ) }
            </div>
        </>
    );
};

export default compose( withUniqueId )( QueryLoopBlockEdit );
