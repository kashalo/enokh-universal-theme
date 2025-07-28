import React from 'react';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { BlockEditProps } from './types';
import classnames from 'classnames';
import EditBlockControls from './block-controls';
import blockConfiguration from '../../../block.json';
import BlockInspectorControls from './inspector-controls';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import { withBlockContext } from '@enokh-blocks/block-context';
import BlockStyles from '../block-styles';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { setAttributes, attributes, clientId, className, isSelected } = props;
    const { uniqueId } = attributes;
    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;

    const classNames = classnames(
        'enokh-blocks-sharing-buttons',
        className,
        `enokh-blocks-sharing-buttons-${ uniqueId }`,
        {
            'enokh-blocks-sharing-buttons-empty': ! hasChildBlocks,
            'enokh-blocks-sharing-buttons-visual-guides': ! hasChildBlocks && ! isSelected,
        }
    );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );

    return (
        <>
            <BlockInspectorControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
            <EditBlockControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
            <BlockStyles { ...props } />
            { ! hasChildBlocks ? (
                <div { ...blockProps }>
                    <p>Start adding social button from the block toolbar...</p>
                    <InnerBlocks allowedBlocks={ blockConfiguration.allowedBlocks } renderAppender={ false } />
                </div>
            ) : (
                <>
                    <div { ...blockProps }>
                        <InnerBlocks allowedBlocks={ blockConfiguration.allowedBlocks } renderAppender={ false } />
                    </div>
                </>
            ) }
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withUniqueId, withBlockContext )( Edit );
