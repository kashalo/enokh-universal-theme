import React from 'react';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { BlockEditProps } from './types';
import BlockInspectorControls from './inspector-controls';
import { useSelect } from '@wordpress/data';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import BlockContext, { withBlockContext } from '@enokh-blocks/block-context';
import { useContext } from '@wordpress/element';
import BlockStyles from '../block-styles';
import { arrowConfig } from './config';
import EditBlockControls from './components/block-controls';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { setAttributes, attributes, clientId, className, isSelected } = props;
    const { uniqueId } = attributes;
    const { deviceType } = useContext( BlockContext );

    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;

    const classNames = classnames(
        'enokh-blocks-carousel-arrows',
        className,
        `enokh-blocks-carousel-arrows-${ uniqueId }`,
        {
            'enokh-blocks-carousel-arrows-empty': ! hasChildBlocks,
            'enokh-blocks-carousel-arrows-visual-guides': ! hasChildBlocks && ! isSelected,
        }
    );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );

    const BLOCKS_TEMPLATE = [
        [ 'enokh-blocks/carousel-previous', arrowConfig ],
        [ 'enokh-blocks/carousel-next', { ...arrowConfig, display: { ...arrowConfig.display, icon: 'angle-right' } } ],
    ];

    return (
        <>
            <BlockInspectorControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
            <BlockStyles { ...props } />
            <EditBlockControls uniqueId={ uniqueId } clientId={ clientId } />

            <div { ...blockProps }>
                <InnerBlocks template={ BLOCKS_TEMPLATE } />
            </div>
        </>
    );
};

export default compose( withUniqueId, withDeviceType, withBlockContext )( Edit );
