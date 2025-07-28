import React from 'react';
import { useBlockProps, InnerBlocks, BlockContextProvider } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { BlockEditProps } from './types';
import { useSelect } from '@wordpress/data';
import BlockInspectorControls from './inspector-controls';
import TemplateSelector from './components/TemplateSelector';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { setAttributes, attributes, clientId, className, isSelected } = props;
    const { uniqueId } = attributes;

    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;

    const classNames = classnames( 'enokh-blocks-taxonomy-list', className, `enokh-blocks-taxonomy-list-${ uniqueId }`, {
        'enokh-blocks-taxonomy-list-empty': ! hasChildBlocks,
        'enokh-blocks-taxonomy-list-visual-guides': ! hasChildBlocks && ! isSelected,
    } );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );
    return (
        <>
            <div { ...blockProps }>
                { ! hasChildBlocks ? (
                    <TemplateSelector clientId={ clientId } />
                ) : (
                    <>
                        <BlockInspectorControls
                            attributes={ attributes }
                            setAttributes={ setAttributes }
                            clientId={ clientId }
                        />
                        <InnerBlocks renderAppender={ false } />
                    </>
                ) }
            </div>
        </>
    );
};

export default compose( withUniqueId )( Edit );
