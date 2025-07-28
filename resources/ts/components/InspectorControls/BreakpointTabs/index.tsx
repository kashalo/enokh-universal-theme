import { __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import { Icon, desktop, tablet, mobile } from '@wordpress/icons';
import { memo, useCallback, useEffect } from '@wordpress/element';
import { useDeviceType } from '../../../stores';
import { compatibleRender } from '../../../utils';

function DeviceButton( { deviceKey, label, isActive, onClick, icon } ) {
    return (
        <Tooltip text={ label }>
            <Button isPressed={ isActive } onClick={ () => onClick( deviceKey ) }>
                <Icon icon={ icon } />
            </Button>
        </Tooltip>
    );
}

const MemoizedDeviceButton = memo( DeviceButton );

const devices = [
    {
        key: 'Desktop',
        label: __( 'Show options for all devices', 'enokh-blocks' ),
        icon: desktop,
    },
    {
        key: 'Tablet',
        label: __( 'Show options for tablet devices', 'enokh-blocks' ),
        icon: tablet,
    },
    {
        key: 'Mobile',
        label: __( 'Show options for mobile devices', 'enokh-blocks' ),
        icon: mobile,
    },
];

const ResponsiveTabButtons = (): JSX.Element => {
    const [ deviceType, setDeviceType ] = useDeviceType();
    const onClickDeviceButton = useCallback( setDeviceType, [] );

    return (
        <>
            { devices &&
                devices.map( ( device ) => (
                    <MemoizedDeviceButton
                        key={ device.key }
                        deviceKey={ device.key }
                        label={ device.label }
                        isActive={ deviceType === device.key }
                        icon={ device.icon }
                        onClick={ onClickDeviceButton }
                    />
                ) ) }
        </>
    );
};

const ResponsiveTabs = (): JSX.Element => {
    useEffect( () => {
        const BlockInspectorControls = document.querySelector( '.block-editor-block-inspector' );
        const ResponsiveTabsElement = document.querySelector( '.enokh-blocks-responsive-tabs' );

        if ( ! BlockInspectorControls || ResponsiveTabsElement ) {
            return;
        }

        const panelHeader: HTMLElement = document.querySelector( '.edit-post-sidebar .edit-post-sidebar__panel-tabs' );
        const panelHeaderHeight = panelHeader ? `${ panelHeader.offsetHeight }px` : 0;
        const buttonWrapper: HTMLDivElement = document.createElement( 'div' );
        buttonWrapper.classList.add( 'enokh-blocks-responsive-tabs' );
        buttonWrapper.setAttribute( 'style', `top: ${ panelHeaderHeight }` );
        BlockInspectorControls.prepend( buttonWrapper );

        compatibleRender( document.querySelector( '.enokh-blocks-responsive-tabs' ), <ResponsiveTabButtons /> );
    }, [] );

    return null;
};

export default memo( ResponsiveTabs );
