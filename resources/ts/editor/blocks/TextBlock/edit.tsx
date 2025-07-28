import TextBlockInspectorControls from './inspector-controls';
import withSetAttributes from '../../../hoc/withSetAttributes';
import withDeviceType from '../../../hoc/withDeviceType';
import BlockContext, { withBlockContext } from '../../../block-context';
import withDynamicContent from '../../../hoc/withDynamicContent';
import withUniqueId from '../../../hoc/withUniqueId';
import { compose } from '@wordpress/compose';
import TextBlockControls from './block-controls';
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import RootRenderer from '../../../components/RootRenderer';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { createElement, useContext, useEffect, useMemo, useRef } from '@wordpress/element';
import classnames from 'classnames';
import { useSelect } from '@wordpress/data';
import TextBlockDynamicRenderer from './components/TextBlockDynamicRenderer';
import TextStyle from '../../block-styles/text/Style';
import TextBlockInspectorAdvancedControls from './components/TextBlockInspectorAdvancedControls';

const Element = ( { tagName, htmlAttrs, children } ) => {
    return createElement( tagName, htmlAttrs, children );
};
const onSplit = ( attributes, clientId ) => ( value, isOriginal ) => {
    let block;

    if ( isOriginal || value ) {
        block = createBlock( EnokhBlocksEditor.Blocks.TextBlock.name, {
            ...attributes,
            content: value,
        } );
    } else {
        block = createBlock( 'core/paragraph' );
    }

    if ( isOriginal ) {
        block.clientId = clientId;
    }

    return block;
};

const TextBlockEdit = ( props: TextBlockProps ): JSX.Element => {
    const { clientId, attributes, setAttributes, context, onReplace } = props;
    const {
        uniqueId,
        element,
        content,
        anchor,
        ariaLabel,
        dynamicContentType,
        dynamicLinkType,
        hasIcon,
        iconLocation,
    } = attributes;
    const { deviceType } = useContext( BlockContext );
    const ref = useRef( null );
    const htmlAttributes = {
        className: classnames( {
            'enokh-blocks-text': true,
            'enokh-blocks-text-text': true,
            [ `enokh-blocks-text-${ uniqueId }` ]: true,
        } ),
        id: anchor ? anchor : null,
        ref,
    };
    const blockProps = useBlockProps( htmlAttributes );
    const richTextFormats = null;
    const tagName = dynamicContentType !== 'terms' && !! dynamicLinkType ? 'a' : 'span';
    // @ts-ignore
    const linkAllowedFormats = useSelect( ( select ) => select( 'core/rich-text' ).getFormatTypes(), [] );

    const textFormats = useMemo( () => {
        if ( linkAllowedFormats && !! dynamicLinkType ) {
            return linkAllowedFormats
                .filter( ( format ) => format.name !== 'core/link' )
                .map( ( formatNames ) => formatNames.name );
        }

        return richTextFormats;
    }, [ linkAllowedFormats, richTextFormats, dynamicLinkType ] );

    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;

    useEffect( () => {
        const hasIconBlock = innerBlocksCount > 0;
        setAttributes( {
            hasIcon: hasIconBlock,
            ...( hasIconBlock && {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            } ),
        } );
    }, [ innerBlocksCount ] );

    return (
        <>
            <TextBlockInspectorControls
                attributes={ attributes }
                setAttributes={ setAttributes }
                clientId={ clientId }
            />
            <TextBlockInspectorAdvancedControls
                attributes={ attributes }
                setAttributes={ setAttributes }
                clientId={ clientId }
            />
            <TextBlockControls
                attributes={ attributes }
                setAttributes={ setAttributes }
                context={ context }
                clientId={ clientId }
            />
            <TextStyle { ...props } deviceType="" />
            { ( deviceType === 'Tablet' || deviceType === 'Mobile' ) && <TextStyle { ...props } /> }
            { deviceType === 'Mobile' && <TextStyle { ...props } /> }

            { attributes.useDynamicData && !! attributes.dynamicContentType ? (
                <TextBlockDynamicRenderer { ...props } />
            ) : (
                <RootRenderer name={ EnokhBlocksEditor.Blocks.TextBlock.name } clientId={ clientId } align="">
                    <Element tagName={ element } htmlAttrs={ blockProps }>
                        { ( ! iconLocation || [ 'left', 'before' ].includes( iconLocation ) ) && (
                            <InnerBlocks allowedBlocks={ [ 'enokh-blocks/icon' ] } />
                        ) }

                        <RichText
                            name={ EnokhBlocksEditor.Blocks.TextBlock.name }
                            value={ content }
                            onChange={ ( newContent ) => setAttributes( { content: newContent } ) }
                            placeholder={ __( 'Type something…', 'enokh-blocks' ) }
                            tagName={ tagName }
                            onSplit={ onSplit( attributes, clientId ) }
                            onReplace={ onReplace }
                            allowedFormats={ textFormats }
                        />

                        { [ 'right', 'after' ].includes( iconLocation ) && (
                            <InnerBlocks allowedBlocks={ [ 'enokh-blocks/icon' ] } />
                        ) }
                    </Element>
                </RootRenderer>
            ) }
        </>
    );
};

export default compose(
    withSetAttributes,
    withDeviceType,
    withBlockContext,
    withDynamicContent,
    withUniqueId
)( TextBlockEdit );
