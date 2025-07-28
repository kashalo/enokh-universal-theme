import { InspectorControls, useBlockEditingMode } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { BlockInspectorControlProps } from './types';
import { PanelBody, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import IconPickerControl from './components/IconPickerControl';
import FlexControl from '@enokh-blocks/components/FlexControl';
import UnitControl from '@enokh-blocks/components/UnitControl';
import { getResponsivePlaceholder, getAttribute } from '@enokh-blocks/utils';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';
import LayoutControls from '@enokh-blocks/components/InspectorControls/LayoutControls';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';
import AccessibilityControls from './components/AccessibilityControls';

const colorItems = [
    {
        group: 'text',
        label: __( 'Text', 'enokh-blocks' ),
        items: [
            {
                attribute: 'textColor',
            },
            {
                tooltip: __( 'Hover', 'enokh-blocks' ),
                attribute: 'textColorHover',
            },
        ],
    },
];

const BlockInspectorControls = ( props: BlockInspectorControlProps ): JSX.Element => {
    const { attributes, setAttributes, clientId } = props;
    const { deviceType } = useContext( BlockContext );
    const computedStyles = {
        deviceType,
        attributes,
        setAttributes,
        clientId,
    };

    const { icon, useDynamicData } = attributes;

    /**
     * Do not display controls if the block itself enabled contentOnly editing
     */
    if ( useBlockEditingMode() === 'contentOnly' ) {
        return null;
    }


    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                <PanelBody title={ __( 'Icon', 'enokh-blocks' ) } initialOpen={ false }>
                    { !! useDynamicData ? (
                        <Notice className="enokh-blocks-option-notice" status="info" isDismissible={ false }>
                            { __( 'Using icon as dynamic content.', 'enokh-blocks' ) }
                        </Notice>
                    ) : (
                        <IconPickerControl attributes={ attributes } setAttributes={ setAttributes } id="" />
                    ) }
                </PanelBody>
                {/*@ts-ignore*/}
                <LayoutControls attributes={ attributes } setAttributes={ setAttributes } />
                <SpacingControls
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    computedStyles={ computedStyles }
                />
                <BorderControls attributes={ attributes } setAttributes={ setAttributes } />
                <PanelBody title={ __( 'Size', 'enokh-blocks' ) } initialOpen={ false }>
                    <FlexControl>
                        <UnitControl
                            id="enokh-blocks-icon-width"
                            label={ __( 'Icon Size', 'enokh-blocks' ) }
                            value={ getAttribute( 'width', { attributes, deviceType } ) }
                            placeholder={ getResponsivePlaceholder( 'width', attributes, deviceType ) }
                            onChange={ ( value ) => {
                                setAttributes( {
                                    [ getAttribute( 'width', { attributes, deviceType }, true ) ]: value,
                                    [ getAttribute( 'height', { attributes, deviceType }, true ) ]: value,
                                } );
                            } }
                        />
                    </FlexControl>
                </PanelBody>

                { deviceType === 'Desktop' && (
                    <ColorControls attributes={ attributes } setAttributes={ setAttributes } />
                ) }

                <AccessibilityControls { ...props } />
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
