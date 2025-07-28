import React from 'react';
import { BlockInspectorControlProps } from '../types';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { compose } from '@wordpress/compose';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import UnitControl from '@enokh-blocks/components/UnitControl';
import IconSelectControl from '@enokh-blocks/components/IconSelectControl';

const DisplayControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { id, deviceType } = useContext( BlockContext );
    const { iconDisplay } = attributes;
    const displayDevice = deviceType === 'Desktop' ? '' : deviceType;

    const computedIcons: IconSelectControlAttributes = {
        icon: getAttribute( 'icon', { attributes: iconDisplay, deviceType } ),
        iconGroup: getAttribute( 'iconGroup', { attributes: iconDisplay, deviceType } ),
    };

    const handleIconSelect = ( icon, iconGroup ) => {
        setAttributes( {
            iconDisplay: {
                ...iconDisplay,
                [ getAttribute( 'icon', { attributes: iconDisplay, deviceType }, true ) ]: icon,
                [ getAttribute( 'iconGroup', { attributes: iconDisplay, deviceType }, true ) ]: iconGroup,
            },
        } );
    };

    const handleIconReset = () => {
        setAttributes( {
            iconDisplay: {
                ...iconDisplay,
                [ getAttribute( 'icon', { attributes: iconDisplay, deviceType }, true ) ]: '',
                [ getAttribute( 'iconGroup', { attributes: iconDisplay, deviceType }, true ) ]: '',
            },
        } );
    };

    return (
        <CustomPanel id={ `${ id }DisplayControls` } title={ __( 'Display', 'enokh-blocks' ) } initialOpen={ false }>
            <IconSelectControl attributes={ computedIcons } onclick={ handleIconSelect } onReset={ handleIconReset } />
            <UnitControl
                label={ __( 'Size', 'enokh-blocks' ) }
                id="enokh-blocks-carousel-nav-shape-size"
                value={ iconDisplay[ `size${ displayDevice }` ] || '' }
                placeholder={ getResponsivePlaceholder( 'size', iconDisplay, deviceType ) }
                onChange={ ( value ) =>
                    setAttributes( {
                        iconDisplay: {
                            ...iconDisplay,
                            [ `size${ displayDevice }` ]: value,
                        },
                    } )
                }
            />
        </CustomPanel>
    );
};

export default compose( withDeviceType )( DisplayControls ) as React.FunctionComponent<any>;
