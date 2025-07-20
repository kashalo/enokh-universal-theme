// Third-party dependencies
import React, { Fragment } from 'react';
import classnames from 'classnames';

// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { navigation } from '@wordpress/icons';
import { Placeholder } from '@wordpress/components';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

// Implementation dependencies
import blockConfiguration from '../../../block.json';
import { BlockEditProps } from './types';
import BlockControls from './block-controls';
import InspectorControls from './inspector-controls';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { isSelected, attributes, setAttributes } = props;
    const { layout, ...ssrAttributes } = attributes;

    const blockProps = useBlockProps( {
        className: classnames( {
            'enokh-blocks-navigation': true,
            'has-menu-location': props.attributes.menuLocation,
            [ `uses-${ props.attributes.menuLocation }-menu-location` ]: props.attributes.menuLocation,
        } ),
    } );
    const { children, ...wrapperProps } = useInnerBlocksProps( blockProps );

    return (
        <Fragment>
            { isSelected && (
                <>
                    <BlockControls attributes={ props.attributes } setAttributes={ props.setAttributes } />
                    <InspectorControls attributes={ props.attributes } setAttributes={ props.setAttributes } />
                </>
            ) }

            <nav { ...wrapperProps }>
                { attributes.menuLocation ? (
                    <ServerSideRender
                        block={ blockConfiguration.name }
                        attributes={ ssrAttributes }
                        skipBlockSupportAttributes={ true }
                    />
                ) : (
                    <Placeholder
                        icon={ navigation }
                        label={ _x( 'Please select a navigation menu location', 'Navigation block', 'mah-blocks' ) }
                    />
                ) }
            </nav>
        </Fragment>
    );
};

export default Edit;
