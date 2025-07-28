import { useSelect } from '@wordpress/data';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import blockConfig from '../../../block.json';
import BlockInspectorControls from './inspector-controls';
import { compose } from '@wordpress/compose';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import { withBlockContext } from '@enokh-blocks/block-context';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import BlockStyles from '../block-styles';

const Edit = ( props: AccordionBlockProps ): JSX.Element => {
    const { attributes } = props;
    const { uniqueId } = attributes;
    const classNames = classnames( 'enokh-blocks-accordion', `enokh-blocks-accordion-${ uniqueId }`, props.className );

    const hasInnerBlocks = useSelect(
        // @ts-ignore
        ( select ) => select( 'core/block-editor' ).getBlocks( props.clientId ).length > 0,
        []
    );

    const blockProps = useInnerBlocksProps( useBlockProps( { className: classNames } ), {
        allowedBlocks: blockConfig.allowedBlocks,
        template: hasInnerBlocks ? null : [ [ 'enokh-blocks/accordion-item' ] ],
        templateLock: props.attributes.templateLock,
    } );

    return (
        <>
            <div { ...blockProps } />
            <BlockStyles { ...props } />
            <BlockInspectorControls { ...props } />
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withBlockContext, withUniqueId )( Edit );
