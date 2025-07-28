import { useSelect } from '@wordpress/data';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import EditBlockControls from './block-controls';
import blockConfiguration from '../../../block.json';
import BlockInspectorControls from './inspector-controls';
import { compose } from '@wordpress/compose';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import BlockContext, { withBlockContext } from '@enokh-blocks/block-context';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import { useContext } from '@wordpress/element';
import BlockStyles from '..//block-styles';

const Edit = ( props: TabPanelProps ): JSX.Element => {
    const { className } = props;
    const { deviceType } = useContext( BlockContext );
    const {
        attributes: { templateLock },
        setAttributes,
        clientId,
    } = props;

    const hasInnerBlocks = useSelect(
        // @ts-ignore
        ( select ) => select( 'core/block-editor' ).getBlocks( props.clientId ).length > 0,
        []
    );

    const classNames = classnames( className );
    const { children, ...blockProps } = useInnerBlocksProps( useBlockProps( { className: classNames } ), {
        allowedBlocks: [ blockConfiguration.allowedBlocks ],
        template: hasInnerBlocks ? null : [ [ 'enokh-blocks/tab', {} ] ],
        templateLock,
    } );

    return (
        <>
            <BlockStyles { ...props } />
            <div { ...blockProps }>{ children }</div>
            <EditBlockControls clientId={ clientId } setAttributes={ setAttributes } attributes={ props.attributes } />
            <BlockInspectorControls { ...props } />
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withBlockContext, withUniqueId )( Edit );
