import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DisplayControls = ( props: DisplayControlsProps ): JSX.Element => {
    const { attributes, setAttributes } = props;

    const { hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;

    return (
        <PanelBody title={ __( 'Display', 'enokh-blocks' ) } initialOpen={ false } className="enokh-blocks-panel-label">
            <ToggleControl
                label={ __( 'Hide on desktop', 'enokh-blocks' ) }
                checked={ !! hideOnDesktop }
                onChange={ ( value ) => {
                    setAttributes( {
                        hideOnDesktop: value,
                    } );
                } }
            />

            <ToggleControl
                label={ __( 'Hide on tablet', 'enokh-blocks' ) }
                checked={ !! hideOnTablet }
                onChange={ ( value ) => {
                    setAttributes( {
                        hideOnTablet: value,
                    } );
                } }
            />

            <ToggleControl
                label={ __( 'Hide on mobile', 'enokh-blocks' ) }
                checked={ !! hideOnMobile }
                onChange={ ( value ) => {
                    setAttributes( {
                        hideOnMobile: value,
                    } );
                } }
            />
        </PanelBody>
    );
};

export default DisplayControls;
