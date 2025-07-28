import {FC, Fragment} from 'react';
import { BlockEditProps } from './types';
import { useBlockProps } from '@wordpress/block-editor';
import BlockControls from './block-controls';
import BlockInspectorControls from './inpector-controls';
import blockConfiguration from '../../../block.json';
import ServerSideRender from '@wordpress/server-side-render';
import { compose } from '@wordpress/compose';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import BlockContext, { withBlockContext } from '@enokh-blocks/block-context';
import classnames from 'classnames';
import IconStyle from '../block-styles/Style';
import IconTabletStyle from '../block-styles/TabletStyle';
import { useContext } from '@wordpress/element';
import IconMobileStyle from '../block-styles/MobileStyle';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDynamicContent from '@enokh-blocks/hoc/withDynamicContent';
import IconBlockDynamicRenderer from './components/IconBlockDynamicRenderer';
import React from 'react';

const Edit: FC< BlockEditProps > = ( props ) => {
    const { attributes, setAttributes, clientId } = props;
    const { uniqueId, useDynamicData, isAccordionCollapse, isAccordionExpand } = attributes;
    const blockProps = useBlockProps( {
        className: classnames( {
            'enokh-blocks-icon': true,
            [ `enokh-blocks-icon-${ uniqueId }` ]: true,
            [ `enokh-blocks-accordion-collapse-icon enokh-blocks-accordion-collapse-icon-${ uniqueId }` ]:
                !! isAccordionCollapse,
            [ `enokh-blocks-accordion-expand-icon enokh-blocks-accordion-expand-icon-${ uniqueId }` ]: !! isAccordionExpand,
        } ),
    } );
    const { deviceType } = useContext( BlockContext );
    return (
        <Fragment>
            <BlockControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
            <BlockInspectorControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
            <IconStyle { ...props } />
            { ( deviceType === 'Tablet' || deviceType === 'Mobile' ) && <IconTabletStyle { ...props } /> }
            { deviceType === 'Mobile' && <IconMobileStyle { ...props } /> }

            <span { ...blockProps }>
                { ! useDynamicData && (
                    <ServerSideRender block={ blockConfiguration.name } attributes={ props.attributes } />
                ) }
                { !! useDynamicData && <IconBlockDynamicRenderer { ...props } /> }
            </span>
        </Fragment>
    );
};

export default compose( withSetAttributes, withDeviceType, withUniqueId, withBlockContext, withDynamicContent )( Edit );
