import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '../../../components/InspectorControls/BreakpointTabs';
import LayoutControls from '../../../components/InspectorControls/LayoutControls';
import SpacingControls from '../../../components/InspectorControls/SpacingControls';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import SizingControls from '../../../components/InspectorControls/SizingControls';
import ColorControls from '../../../components/InspectorControls/ColorControls';
import TypographyControls from '../../../components/InspectorControls/TypographyControls';
import BorderControls from '../../../components/InspectorControls/BorderControls';
import ShapeControls from '../../../components/InspectorControls/ShapeControls';
import BackgroundControls from '../../../components/InspectorControls/BackgroundControls';
import EffectControls from '../../../components/InspectorControls/EffectControls';
import DisplayControls from '../../../components/InspectorControls/DisplayControls';
import DividerControls from '@enokh-blocks/components/InspectorControls/DividerControls';
import AccessibilityControls from '@enokh-blocks/components/InspectorControls/AccessibilityControls';

const ContainerBlockInspectorControls = ( props: ContainerBlockInspectorControlsProps ): JSX.Element => {
    const { attributes, setAttributes, clientId } = props;
    const {
        deviceType,
        supports: {
            sizingPanel,
            layout,
            spacing,
            borders,
            colors,
            typography,
            shapesPanel,
            backgroundPanel,
            effectsPanel,
            displayPanel,
            dividerPanel,
            a11yPanel,
        },
    } = useContext( BlockContext );
    const computedStyles = {
        deviceType,
        attributes,
        setAttributes,
        clientId,
    };

    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                { layout.enabled && <LayoutControls attributes={ attributes } setAttributes={ setAttributes } /> }
                { sizingPanel.enabled && <SizingControls attributes={ attributes } setAttributes={ setAttributes } /> }
                { spacing.enabled && (
                    <SpacingControls
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        computedStyles={ computedStyles }
                    />
                ) }
                { borders.enabled && <BorderControls attributes={ attributes } setAttributes={ setAttributes } /> }
                { colors.enabled && <ColorControls attributes={ attributes } setAttributes={ setAttributes } /> }
                { typography.enabled && (
                    <TypographyControls
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        computedStyles={ computedStyles }
                    />
                ) }
                { shapesPanel.enabled && <ShapeControls attributes={ attributes } setAttributes={ setAttributes } /> }
                { backgroundPanel.enabled && (
                    <BackgroundControls attributes={ attributes } setAttributes={ setAttributes } />
                ) }
                { effectsPanel.enabled && (
                    <EffectControls< ContainerBlockAttributes >
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                    />
                ) }
                { displayPanel.enabled && (
                    <DisplayControls attributes={ attributes } setAttributes={ setAttributes } />
                ) }
                { dividerPanel.enabled && (
                    <DividerControls< ContainerBlockAttributes >
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                    />
                ) }
                { a11yPanel.enabled && (
                    <AccessibilityControls< ContainerBlockAttributes >
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        clientId={ clientId }
                    />
                ) }
            </InspectorControls>
        </>
    );
};

export default ContainerBlockInspectorControls;
