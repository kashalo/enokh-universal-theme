import React from 'react';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import withUniqueId from '@enokh-blocks/hoc/withUniqueId';
import classnames from 'classnames';
import { BlockEditProps } from './types';
import BlockInspectorControls from './inspector-controls';
import { useSelect } from '@wordpress/data';
import withSetAttributes from '@enokh-blocks/hoc/withSetAttributes';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import BlockContext, { withBlockContext } from '@enokh-blocks/block-context';
import { applyFilters } from '@wordpress/hooks';
import { getResponsiveValue } from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockStyles from '../block-styles';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { setAttributes, attributes, clientId, className, isSelected } = props;
    const { uniqueId, display } = attributes;
    const { deviceType } = useContext( BlockContext );

    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;

    const classNames = classnames(
        'enokh-blocks-carousel-play-pause',
        className,
        `enokh-blocks-carousel-play-pause-${ uniqueId }`
    );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );

    let iconSVGSets: any = EnokhBlocksEditor.Config.icons;
    iconSVGSets = applyFilters( 'enokh-blocks.editor.iconSVGSets', iconSVGSets, { attributes } );

    const getPlayIcon = () => {
        const icon = getResponsiveValue( 'playIcon', display, deviceType, '' );
        const iconGroup = getResponsiveValue( 'playIconGroup', display, deviceType, '' );
        const selectedIconGroup = iconSVGSets[ iconGroup ] ?? null;
        return selectedIconGroup ? selectedIconGroup.svgs[ icon ].icon : null;
    };

    const getPauseIcon = () => {
        const icon = getResponsiveValue( 'pauseIcon', display, deviceType, '' );
        const iconGroup = getResponsiveValue( 'pauseIconGroup', display, deviceType, '' );
        const selectedIconGroup = iconSVGSets[ iconGroup ] ?? null;
        return selectedIconGroup ? selectedIconGroup.svgs[ icon ].icon : null;
    };

    return (
        <>
            <BlockInspectorControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
            <BlockStyles { ...props } />
            <div { ...blockProps }>
                <button className="play-button">
                    <span
                        dangerouslySetInnerHTML={ {
                            __html: getPlayIcon(),
                        } }
                    />
                </button>

                <button className="pause-button">
                    <span
                        dangerouslySetInnerHTML={ {
                            __html: getPauseIcon(),
                        } }
                    />
                </button>
            </div>
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withUniqueId, withBlockContext )( Edit );
