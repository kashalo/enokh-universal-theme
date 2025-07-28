import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import SourceControls from './components/SourceControls';
import ContentTypeControl from './components/ContentTypeControl';
import ExcerptControls from './components/ExcerptControls';
import LinkSourceControl from './components/LinkSourceControl';
import React from 'react';

const DynamicContentControls = ( props: DynamicContentControlsProps ): JSX.Element => {
    const { context, attributes, setAttributes, name } = props;
    const {
        postType,
        postId,
        useDynamicData,
        dynamicSource,
        dynamicContentType,
        isCaption,
        dynamicLinkType,
        dynamicLinkRemoveIfEmpty,
        isPagination,
        isSharing,
        termId,
        termTaxonomy,
    } = attributes;

    const isQueryLoopItem = 'isQueryLoopItem' in attributes ? attributes.isQueryLoopItem : false;
    const currentPostType = dynamicSource === 'current-post' ? context.postType : postType;
    const currentPostId = dynamicSource === 'current-post' ? context.postId : postId;
    const isInQueryLoop = 'undefined' !== typeof context[ 'enokh-blocks/queryId' ];
    const isAllowedLinkSource = ! [ 'enokh-blocks/icon' ].includes( name );

    useEffect( () => {
        if (
            'enokh-blocks/container' === name &&
            useDynamicData &&
            'featured-image' === dynamicContentType &&
            ( isQueryLoopItem || isInQueryLoop )
        ) {
            setAttributes( {
                bgImageInline: true,
            } );
        }
    }, [ dynamicContentType, isQueryLoopItem ] );

    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Dynamic Content', 'enokh-blocks' ) }
                initialOpen={ false }
                className="enokh-blocks-panel-label"
            >
                <ToggleControl
                    label={ __( 'Enable Dynamic Data', 'enokh-blocks' ) }
                    checked={ useDynamicData }
                    onChange={ ( value ) => {
                        setAttributes( { useDynamicData: value } );
                    } }
                />

                { useDynamicData && (
                    <>
                        <SourceControls
                            dynamicSource={ dynamicSource }
                            postType={ postType }
                            postId={ postId }
                            setAttributes={ setAttributes }
                            dynamicContentType={ dynamicContentType }
                            name={ name }
                            termId={ termId }
                            termTaxonomy={ termTaxonomy }
                        />

                        <ContentTypeControl
                            dynamicContentType={ dynamicContentType }
                            setAttributes={ setAttributes }
                            name={ name }
                            isCaption={ isCaption }
                            dynamicSource={ dynamicSource }
                            isSharing={ isSharing }
                        />

                        { dynamicContentType === 'post-excerpt' && (
                            <ExcerptControls attributes={ attributes } setAttributes={ setAttributes } />
                        ) }

                        { isAllowedLinkSource && (
                            <LinkSourceControl
                                linkType={ dynamicLinkType }
                                dynamicLinkRemoveIfEmpty={ dynamicLinkRemoveIfEmpty }
                                dynamicContentType={ dynamicContentType }
                                isPagination={ isPagination }
                                setAttributes={ setAttributes }
                                isSharing={ isSharing }
                                name={ name }
                                dynamicSource={ dynamicSource }
                            />
                        ) }
                    </>
                ) }
            </PanelBody>
        </InspectorControls>
    );
};
export default DynamicContentControls;
