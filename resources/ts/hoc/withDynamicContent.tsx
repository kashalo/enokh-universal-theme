import DynamicContentControls from '../components/InspectorControls/DynamicContentControls';
import { useBlockEditingMode } from '@wordpress/block-editor';
import usePostRecord from '@enokh-blocks/stores/usePostRecord';
import React, {Fragment} from 'react';

export default ( WrappedComponent ) => {
    return ( props: DynamicContentControlsProps ) => {
        const { attributes, setAttributes, context, name } = props;
        const { dynamicSource } = attributes;
        const postType = dynamicSource === 'current-post' ? context.postType : attributes.postType;
        const postId = dynamicSource === 'current-post' ? context.postId : attributes.postId;

        let dynamicBackgroundColor: string | undefined;
        let dynamicImage: number | undefined;
        const load = [ 'terms' ];
        const loadOptions = { taxonomy: 'species' };
        const { record, isLoading } = usePostRecord( postType, postId, load, loadOptions );

        if ( name === EnokhBlocksEditor.Blocks.ContainerBlock.name ) {
            dynamicImage = record?.featured_media;
            dynamicBackgroundColor = record?.terms?.[ 0 ]?.assoc_background_color;
        }

        const newAttributes = Object.assign( {}, attributes, {
            dynamicImage,
            dynamicBackgroundColor,
            postId,
            postType,
        } );

        const newProps = Object.assign( {}, props, {
            attributes: newAttributes,
        } );

        /**
         * Do not display controls if the block itself enabled contentOnly editing
         */
        if ( useBlockEditingMode() === 'contentOnly' ) {
            return <WrappedComponent { ...newProps } />;
        }

        return (
            <Fragment>
                <WrappedComponent { ...newProps } />
                <DynamicContentControls
                    context={ context }
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    name={ name }
                />
            </Fragment>
        );
    };
};
