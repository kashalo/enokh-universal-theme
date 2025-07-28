import React from 'react';
import { BlockEditProps } from '../block/types';
import { useContext, memo } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import MainStyle from './Style';
import TabletStyle from './TabletStyle';
import MobileStyle from './MobileStyle';
import { needRebuildStyles } from '@enokh-blocks/utils';

const BlockStyles: React.FunctionComponent< BlockEditProps > = ( props ) => {
    const { deviceType } = useContext( BlockContext );

    return (
        <>
            <MainStyle { ...props } />
            { deviceType && (
                <>
                    { [ 'Tablet', 'Mobile' ].includes( deviceType ) && <TabletStyle { ...props } /> }
                    { [ 'Mobile' ].includes( deviceType ) && <MobileStyle { ...props } /> }
                </>
            ) }
        </>
    );
};

export default memo( BlockStyles, needRebuildStyles );
