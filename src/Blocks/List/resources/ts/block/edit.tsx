import React from 'react';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { BlockEditProps } from './types';
import { useSelect } from '@wordpress/data';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import BlockContext, { withBlockContext } from '@enokh-blocks/block-context';
import BlockInspectorControls from './inspector-controls';
import { useContext, useEffect } from '@wordpress/element';
import { getAttribute } from '@enokh-blocks/utils';
import BlockStyles from '../block-styles';
import blockConfiguration from '../../../block.json';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { setAttributes, attributes, clientId, className, isSelected } = props;
    const { uniqueId, listType, numerical, marker } = attributes;
    const { deviceType } = useContext( BlockContext );

    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;

    const classNames = classnames( 'enokh-blocks-list', className, `enokh-blocks-list-${ uniqueId }`, {
        'enokh-blocks-list-empty': ! hasChildBlocks,
        'enokh-blocks-list-visual-guides': ! hasChildBlocks && ! isSelected,
    } );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );
    const Tag = listType;
    const isOrdered = listType === 'ol';

    /**
     * Ordered attribute key
     */
    const startValueAttrName = getAttribute( 'startValue', { attributes: numerical, deviceType }, true );
    const reverseOrderAttrName = getAttribute( 'reverseOrder', { attributes: numerical, deviceType }, true );

    const reversed = !! isOrdered && !! numerical?.[ reverseOrderAttrName ];
    const startValue =
        !! isOrdered && !! numerical?.[ startValueAttrName ] ? numerical?.[ startValueAttrName ] : undefined;
    const { children, ...wrapperProps } = useInnerBlocksProps( blockProps, {
        allowedBlocks: [ blockConfiguration.allowedBlocks ],
        template: [ [ 'enokh-blocks/list-item' ] ],
    } );

    return (
        <>
            <BlockStyles { ...props } />
            <BlockInspectorControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
            <Tag { ...wrapperProps } ordered={ isOrdered } reversed={ reversed } start={ startValue }>
                { children }
            </Tag>
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withUniqueId, withBlockContext )( Edit );
