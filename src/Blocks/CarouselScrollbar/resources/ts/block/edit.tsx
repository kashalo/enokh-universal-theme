import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { BlockEditProps } from './types';
import BlockInspectorControls from './inspector-controls';
import { useSelect } from '@wordpress/data';
import BlockStyles from '../block-styles';
import { withBlockContext } from '@enokh-blocks/block-context';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';

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
        'enokh-blocks-carousel-scrollbar',
        className,
        `enokh-blocks-carousel-scrollbar-${ uniqueId }`,
        {
            'enokh-blocks-carousel-scrollbar-empty': ! hasChildBlocks,
            'enokh-blocks-carousel-scrollbar-visual-guides': ! hasChildBlocks && ! isSelected,
        }
    );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );

    return (
        <>
            <BlockStyles { ...props } />
            <BlockInspectorControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
            <div { ...blockProps }>
                <div className="enokh-blocks-carousel-scrollbar__drag" />
            </div>
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withUniqueId, withBlockContext )( Edit );
