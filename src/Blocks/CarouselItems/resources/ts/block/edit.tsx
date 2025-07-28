import React from 'react';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { BlockEditProps } from './types';
import BlockInspectorControls from './inspector-controls';
import { useSelect } from '@wordpress/data';
import EditBlockControls from './components/block-controls';
import BlockStyles from '../block-styles';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { setAttributes, attributes, clientId, className, isSelected, context } = props;
    const { uniqueId } = attributes;

    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;

    const classNames = classnames(
        'enokh-blocks-carousel-items__container',
        className,
        `enokh-blocks-carousel-items__container-${ uniqueId }`,
        {
            'enokh-blocks-carousel-items__container-empty': ! hasChildBlocks,
            'enokh-blocks-carousel-items__container-visual-guides': ! hasChildBlocks && ! isSelected,
        }
    );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );

    return (
        <>
            <BlockStyles { ...props } />
            <div { ...blockProps }>
                <>
                    <EditBlockControls uniqueId={ uniqueId } clientId={ clientId } context={ context } />
                    <BlockInspectorControls
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        clientId={ clientId }
                    />
                    <InnerBlocks renderAppender={ false } allowedBlocks={ [ 'enokh-blocks/container' ] } />
                </>
            </div>
        </>
    );
};

export default compose( withUniqueId )( Edit );
