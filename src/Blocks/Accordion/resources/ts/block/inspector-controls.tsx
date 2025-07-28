import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { TabPanel } from '@wordpress/components';
import PanelSettingsControls from './components/PanelSettingsControls';
import HeaderItemSettingsControls from './components/HeaderItemSettingsControls';

const BlockInspectorControls: React.FunctionComponent< AccordionBlockProps > = ( props ) => {
    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                <TabPanel
                    tabs={ [
                        {
                            name: 'enokh-blocks-accordion-panel-settings',
                            title: 'Panel',
                        },
                        {
                            name: 'enokh-blocks-accordion-panel-header-item-settings',
                            title: 'Header Item',
                        },
                    ] }
                >
                    { ( tab ) => {
                        if ( tab.name === 'enokh-blocks-accordion-panel-settings' ) {
                            return <PanelSettingsControls { ...props } />;
                        }
                        if ( tab.name === 'enokh-blocks-accordion-panel-header-item-settings' ) {
                            return <HeaderItemSettingsControls { ...props } />;
                        }
                    } }
                </TabPanel>
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
