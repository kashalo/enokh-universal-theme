import { useSelect } from '@wordpress/data';
import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import EditBlockControls from './block-controls';

const Edit = ( props: TabBlockProps ): JSX.Element => {
    const {
        clientId,
        attributes: { templateLock, name, innerTitle },
        setAttributes,
        className,
    } = props;

    const hasInnerBlocks = useSelect(
        // @ts-ignore
        ( select ) => select( 'core/block-editor' ).getBlocks( props.clientId ).length > 0,
        []
    );

    const newItemTemplate = [
        [
            'enokh-blocks/container',
            {
                isTabHeader: true,
                lock: {
                    remove: true,
                    move: true,
                },
            },
            [ [ 'enokh-blocks/text', { element: 'p' } ] ],
        ],
        [ 'enokh-blocks/text', { element: 'p' } ],
    ];

    const classNames = classnames( className );
    const { children, ...blockProps } = useInnerBlocksProps( useBlockProps( { className: classNames } ), {
        template: hasInnerBlocks ? null : newItemTemplate,
        templateLock,
    } );

    return (
        <>
            <EditBlockControls clientId={ clientId } attributes={ props.attributes } setAttributes={ setAttributes } />
            <div { ...blockProps }>{ children }</div>
        </>
    );
};

export default Edit;
