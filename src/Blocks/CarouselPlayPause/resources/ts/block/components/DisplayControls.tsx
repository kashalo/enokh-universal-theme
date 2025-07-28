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
import { BaseControl } from '@wordpress/components';

const DisplayControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { id, deviceType } = useContext( BlockContext );
    const { display } = attributes;
    const displayDevice = deviceType === 'Desktop' ? '' : deviceType;

    const computedPlayIcons: IconSelectControlAttributes = {
        icon: getAttribute( 'playIcon', { attributes: display, deviceType } ),
        iconGroup: getAttribute( 'playIconGroup', { attributes: display, deviceType } ),
    };
    const computedPauseIcons: IconSelectControlAttributes = {
        icon: getAttribute( 'pauseIcon', { attributes: display, deviceType } ),
        iconGroup: getAttribute( 'pauseIconGroup', { attributes: display, deviceType } ),
    };

    const handleIconSelect = ( icon, iconGroup, type ) => {
        setAttributes( {
            display: {
                ...display,
                [ getAttribute( `${ type }Icon`, { attributes: display, deviceType }, true ) ]: icon,
                [ getAttribute( `${ type }IconGroup`, { attributes: display, deviceType }, true ) ]: iconGroup,
            },
        } );
    };

    const handleIconReset = ( type ) => {
        setAttributes( {
            display: {
                ...display,
                [ getAttribute( `${ type }Icon`, { attributes: display, deviceType }, true ) ]: '',
                [ getAttribute( `${ type }IconGroup`, { attributes: display, deviceType }, true ) ]: '',
            },
        } );
    };

    return (
        <CustomPanel id={ `${ id }DisplayControls` } title={ __( 'Display', 'enokh-blocks' ) } initialOpen={ false }>
            <BaseControl label="Play Icon" id="play-icon-base-control">
                <IconSelectControl
                    attributes={ computedPlayIcons }
                    onclick={ ( icon, iconGroup ) => {
                        handleIconSelect( icon, iconGroup, 'play' );
                    } }
                    onReset={ () => {
                        handleIconReset( 'play' );
                    } }
                />
            </BaseControl>

            <BaseControl label="Pause Icon" id="paused-icon-base-control">
                <IconSelectControl
                    attributes={ computedPauseIcons }
                    onclick={ ( icon, iconGroup ) => {
                        handleIconSelect( icon, iconGroup, 'pause' );
                    } }
                    onReset={ () => {
                        handleIconReset( 'pause' );
                    } }
                />
            </BaseControl>

            <UnitControl
                label={ __( 'Play Size', 'enokh-blocks' ) }
                id="enokh-blocks-carousel-play-icon-size"
                value={ display[ `playSize${ displayDevice }` ] || '' }
                placeholder={ getResponsivePlaceholder( 'playSize', display, deviceType ) }
                onChange={ ( value ) =>
                    setAttributes( {
                        display: {
                            ...display,
                            [ `playSize${ displayDevice }` ]: value,
                        },
                    } )
                }
            />
            <UnitControl
                label={ __( 'Pause Size', 'enokh-blocks' ) }
                id="enokh-blocks-carousel-pause-icon-size"
                value={ display[ `pauseSize${ displayDevice }` ] || '' }
                placeholder={ getResponsivePlaceholder( 'pauseSize', display, deviceType ) }
                onChange={ ( value ) =>
                    setAttributes( {
                        display: {
                            ...display,
                            [ `pauseSize${ displayDevice }` ]: value,
                        },
                    } )
                }
            />
        </CustomPanel>
    );
};

export default compose( withDeviceType )( DisplayControls ) as React.FunctionComponent<any>;
