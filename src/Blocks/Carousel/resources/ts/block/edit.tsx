import React from 'react';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { BlockEditProps } from './types';
import BlockInspectorControls from './inspector-controls';
import { useSelect } from '@wordpress/data';
import TemplateSelector from './template-selector';
import blockConfiguration from '../../../block.json';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import { withBlockContext } from '@enokh-blocks/block-context';
import EditBlockControls from './components/block-controls';
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

    const classNames = classnames( 'enokh-blocks-carousel', className, `enokh-blocks-carousel-${ uniqueId }`, {
        'enokh-blocks-carousel-empty': ! hasChildBlocks,
        'enokh-blocks-carousel-visual-guides': ! hasChildBlocks && ! isSelected,
    } );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );

    return (
        <>
            { ! hasChildBlocks ? (
                <TemplateSelector clientId={ clientId } setAttributes={ setAttributes } />
            ) : (
                <>
                    <BlockInspectorControls
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        clientId={ clientId }
                    />
                    <EditBlockControls uniqueId={ uniqueId } clientId={ clientId } setAttributes={ setAttributes } />

                    <BlockStyles { ...props } />
                    <div { ...blockProps }>
                        <InnerBlocks allowedBlocks={ blockConfiguration.allowedBlocks } />
                    </div>
                </>
            ) }
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withUniqueId, withBlockContext )( Edit );
