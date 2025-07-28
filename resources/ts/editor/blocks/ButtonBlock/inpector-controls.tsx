import { InspectorControls, useBlockEditingMode } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import LayoutControls from '@enokh-blocks/components/InspectorControls/LayoutControls';
import SpacingControls from '@enokh-blocks/components/InspectorControls/SpacingControls';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import SizingControls from '@enokh-blocks/components/InspectorControls/SizingControls';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';
import TypographyControls from '@enokh-blocks/components/InspectorControls/TypographyControls';
import BorderControls from '@enokh-blocks/components/InspectorControls/BorderControls';
import EffectControls from '@enokh-blocks/components/InspectorControls/EffectControls';

const ButtonBlockInspectorControls = ( props: ButtonBlockInspectorControlsProps ): JSX.Element => {
    const { attributes, setAttributes, clientId } = props;
    const {
        deviceType,
        supports: { effectsPanel },
    } = useContext( BlockContext );
    const computedStyles = {
        deviceType,
        attributes,
        setAttributes,
        clientId,
    };

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
                <LayoutControls attributes={ attributes } setAttributes={ setAttributes } />
                <SizingControls attributes={ attributes } setAttributes={ setAttributes } />
                <SpacingControls
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    computedStyles={ computedStyles }
                />
                <BorderControls attributes={ attributes } setAttributes={ setAttributes } />
                <ColorControls attributes={ attributes } setAttributes={ setAttributes } />
                <TypographyControls
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                    computedStyles={ computedStyles }
                />
                { effectsPanel.enabled && (
                    <EffectControls< ButtonBlockAttributes >
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                    />
                ) }
            </InspectorControls>
        </>
    );
};

export default ButtonBlockInspectorControls;
