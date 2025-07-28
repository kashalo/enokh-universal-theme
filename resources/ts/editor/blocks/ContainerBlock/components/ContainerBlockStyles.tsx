import React from 'react';
import { useContext, memo } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import ContainerStyle from '@enokh-blocks/editor/block-styles/container/Style';
import ContainerAdvancedBackgroundsStyle from '@enokh-blocks/editor/block-styles/container/AdvancedBackgroundsStyle';
import ContainerEffectsStyle from '@enokh-blocks/editor/block-styles/container/EffectsStyle';
import DisplayStyle from '@enokh-blocks/editor/block-styles/container/DisplayStyle';
import ContainerDesktopStyle from '@enokh-blocks/editor/block-styles/container/DesktopStyle';
import ContainerTabletStyle from '@enokh-blocks/editor/block-styles/container/TabletStyle';
import ContainerMobileStyle from '@enokh-blocks/editor/block-styles/container/MobileStyle';
import { needRebuildStyles } from '@enokh-blocks/utils';

const ContainerBlockStyles: React.FunctionComponent< ContainerBlockProps > = ( props ) => {
    const { deviceType } = useContext( BlockContext );

    return (
        <>
            <ContainerStyle { ...props } />
            <ContainerAdvancedBackgroundsStyle { ...props } />
            <ContainerEffectsStyle { ...props } />
            <DisplayStyle { ...props } />
            { deviceType && (
                <>
                    { deviceType === 'Desktop' && <ContainerDesktopStyle { ...props } /> }
                    { ( deviceType === 'Tablet' || deviceType === 'Mobile' ) && <ContainerTabletStyle { ...props } /> }
                    { deviceType === 'Mobile' && <ContainerMobileStyle { ...props } /> }
                </>
            ) }
        </>
    );
};

export default memo( ContainerBlockStyles, needRebuildStyles );
