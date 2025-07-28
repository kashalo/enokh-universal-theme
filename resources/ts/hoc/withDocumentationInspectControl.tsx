import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import {Fragment} from "react";
import React from 'react';

interface BlockDataItem {
    name: string;
    url: string;
}
const blockDataItems: BlockDataItem[] = [
    {
        name: 'enokh-blocks/button',
        url: '',
    },
    {
        name: 'enokh-blocks/container',
        url: '',
    },
    {
        name: 'enokh-blocks/grid',
        url: '',
    },
    {
        name: 'enokh-blocks/text',
        url: '',
    },
    {
        name: 'enokh-blocks/tabs',
        url: '',
    },
    {
        name: 'enokh-blocks/accordion',
        url: '',
    },
    {
        name: 'enokh-blocks/query-loop',
        url: '',
    },
    {
        name: 'enokh-blocks/term-featured-image',
        url: '',
    },
];
const defaultDocumentLink = '';
const withDocumentationInspectControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        const { name, state } = props;

        const blockData = blockDataItems.find( ( item ) => item.name === name );

        if ( blockData === undefined ) {
            return <BlockEdit { ...props } />;
        }

        const blockUrl = ! blockData.url || blockData.url === '' ? defaultDocumentLink : blockData.url;

        return (
            <Fragment>
                <BlockEdit { ...props } />
                <InspectorControls>
                    <PanelBody
                        title={ __( 'Documentation', 'enokh-blocks' ) }
                        initialOpen={ false }
                        className={ 'enokh-blocks-panel-label' }
                    >
                        <p>{ __( 'Need help with this block?', 'enokh-blocks' ) }</p>
                        <a href={ blockUrl } target="_blank" rel="noreferrer noopener">
                            { __( 'Visit the documentation', 'enokh-blocks' ) }
                        </a>
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withDocumentationInspectControl' );

addFilter( 'editor.BlockEdit', 'enokh-blocks/with-documentation-inspect-control', withDocumentationInspectControl, 999 );
