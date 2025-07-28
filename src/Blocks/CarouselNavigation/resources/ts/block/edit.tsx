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
import { applyFilters } from '@wordpress/hooks';
import { useContext } from '@wordpress/element';
import { getResponsiveValue } from '@enokh-blocks/utils';
import BlockStyles from '../block-styles';

const Edit: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { setAttributes, attributes, clientId, className, isSelected } = props;
    const { uniqueId, shape, variant } = attributes;
    const { deviceType } = useContext( BlockContext );

    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;

    const classNames = classnames(
        'enokh-blocks-carousel-navigation',
        className,
        `enokh-blocks-carousel-navigation-${ uniqueId }`,
        {
            'enokh-blocks-carousel-navigation-empty': ! hasChildBlocks,
            'enokh-blocks-carousel-navigation-visual-guides': ! hasChildBlocks && ! isSelected,
        }
    );
    const blockAttributes: any = {
        className: classNames,
    };
    const blockProps = useBlockProps( blockAttributes );
    let iconSVGSets: any = EnokhBlocksEditor.Config.icons;
    iconSVGSets = applyFilters( 'enokh-blocks.editor.iconSVGSets', iconSVGSets, { attributes } );

    const icon = getResponsiveValue( 'icon', shape, deviceType, '' );
    const iconGroup = getResponsiveValue( 'iconGroup', shape, deviceType, '' );
    const selectedIconGroup = iconSVGSets[ iconGroup ] ?? null;
    const selectedIcon = selectedIconGroup ? selectedIconGroup.svgs[ icon ].icon : null;

    return (
        <>
            <BlockInspectorControls attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } />
            <BlockStyles { ...props } />

            <div { ...blockProps }>
                <div className="enokh-blocks-carousel-navigation__items-wrapper">
                    { variant === 'shape' && (
                        <>
                            <span
                                className="enokh-blocks-carousel-navigation__item active"
                                dangerouslySetInnerHTML={ {
                                    __html: selectedIcon,
                                } }
                            />
                            <span
                                className="enokh-blocks-carousel-navigation__item"
                                dangerouslySetInnerHTML={ {
                                    __html: selectedIcon,
                                } }
                            />
                            <span
                                className="enokh-blocks-carousel-navigation__item"
                                dangerouslySetInnerHTML={ {
                                    __html: selectedIcon,
                                } }
                            />
                        </>
                    ) }

                    { variant === 'fraction' && <span className="enokh-blocks-carousel-navigation__fraction">1/x</span> }

                    { variant === 'element' && (
                        <>
                            <span className="enokh-blocks-carousel-navigation__element-item active" />
                            <span className="enokh-blocks-carousel-navigation__element-item" />
                            <span className="enokh-blocks-carousel-navigation__element-item" />
                        </>
                    ) }
                </div>
            </div>
        </>
    );
};

export default compose( withSetAttributes, withDeviceType, withUniqueId, withBlockContext )( Edit );
