import { TabPanel } from '@wordpress/components';
import TabColorPickerControl from '@enokh-blocks/components/TabColorPickerControl';

export default function ColourTabPanel( {
    name,
    colors,
    attributes,
    deviceType,
    setAttributes,
    sync,
    currentTabName,
}: ColourTabPanelProps ) {
    return (
        <TabPanel
            className="mah-colour-tab-panel"
            tabs={ colors.map( ( color ) => ( {
                name: color.state,
                title: color.tooltip,
                className: `tab-${ color.state || 'Default' }`,
            } ) ) }
            initialTabName={ currentTabName }
        >
            { ( tab ) => {
                const borderColor = colors.find( ( b ) => b.state === tab.name );
                const colorKey = name + 'Color' + borderColor.state + ( deviceType !== 'Desktop' ? deviceType : '' );

                return (
                    <TabColorPickerControl
                        key={ 'border' + tab.title }
                        tooltip={ borderColor?.tooltip }
                        value={ attributes.borders[ colorKey ] || '' }
                        alpha={ borderColor.alpha || false }
                        onChange={ ( nextColor ) => {
                            const baseKey =
                                name + 'Color' + borderColor.state + ( deviceType !== 'Desktop' ? deviceType : '' );
                            const newAttributes = {
                                [ baseKey ]: nextColor,
                            };

                            if ( sync ) {
                                [ 'borderRight', 'borderBottom', 'borderLeft' ].forEach( ( side ) => {
                                    newAttributes[
                                        side +
                                            'Color' +
                                            borderColor.state +
                                            ( deviceType !== 'Desktop' ? deviceType : '' )
                                    ] = nextColor;
                                } );
                            }

                            setAttributes( {
                                borders: {
                                    ...newAttributes,
                                },
                            } );
                        } }
                    />
                );
            } }
        </TabPanel>
    );
}
