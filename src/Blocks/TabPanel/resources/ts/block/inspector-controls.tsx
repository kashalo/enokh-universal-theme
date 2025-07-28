import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '@enokh-blocks/components/InspectorControls/BreakpointTabs';
import { TabPanel } from '@wordpress/components';
import PanelSettingsControls from './components/PanelSettingsControls';
import NavigationItemSettingsControls from './components/NavigationItemSettingsControls';

const BlockInspectorControls: React.FunctionComponent< TabPanelProps > = ( props ) => {
    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />

                <TabPanel
                    tabs={ [
                        {
                            name: 'enokh-blocks-tab-panel-settings',
                            title: 'Panel',
                        },
                        {
                            name: 'enokh-blocks-tab-panel-navigation-settings',
                            title: 'Navigation Item',
                        },
                    ] }
                >
                    { ( tab ) => {
                        if ( tab.name === 'enokh-blocks-tab-panel-settings' ) {
                            return <PanelSettingsControls { ...props } />;
                        }
                        if ( tab.name === 'enokh-blocks-tab-panel-navigation-settings' ) {
                            return <NavigationItemSettingsControls { ...props } />;
                        }
                    } }
                </TabPanel>
            </InspectorControls>
        </>
    );
};

export default BlockInspectorControls;
