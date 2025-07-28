import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { BlockEditProps } from './types';
import BlockInspectorControls from './inspector-controls';
import { useSelect } from '@wordpress/data';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import BlockContext, { withBlockContext } from '@enokh-blocks/block-context';
import { useContext } from '@wordpress/element';
import MainStyle from '../block-styles/Style';
import TabletStyle from '../block-styles/TabletStyle';
import MobileStyle from '../block-styles/MobileStyle';
import { getResponsiveValue } from '@enokh-blocks/utils';
import { applyFilters } from '@wordpress/hooks';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { setAttributes, attributes, clientId, className, isSelected } = props;
    const { uniqueId, iconDisplay } = attributes;
    const { deviceType } = useContext( BlockContext );

    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;

    const classNames = classnames( 'enokh-blocks-carousel-next', className, `enokh-blocks-carousel-next-${ uniqueId }`, {
        'enokh-blocks-carousel-next-visual-guides': ! hasChildBlocks && ! isSelected,
    } );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );

    let iconSVGSets: any = EnokhBlocksEditor.Config.icons;
    iconSVGSets = applyFilters( 'enokh-blocks.editor.iconSVGSets', iconSVGSets, { attributes } );
    const icon = getResponsiveValue( 'icon', iconDisplay, deviceType, '' );
    const iconGroup = getResponsiveValue( 'iconGroup', iconDisplay, deviceType, '' );
    const selectedIconGroup = iconSVGSets[ iconGroup ] ?? null;
    const selectedIcon = selectedIconGroup ? selectedIconGroup.svgs[ icon ].icon : null;

    return (
        <>
            <BlockInspectorControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />

            <MainStyle { ...props } />
            { [ 'Tablet', 'Mobile' ].includes( deviceType ) && <TabletStyle { ...props } /> }
            { [ 'Mobile' ].includes( deviceType ) && <MobileStyle { ...props } /> }
            <button { ...blockProps }>
                <span
                    dangerouslySetInnerHTML={ {
                        __html: selectedIcon,
                    } }
                />
            </button>
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withUniqueId, withBlockContext )( Edit );
