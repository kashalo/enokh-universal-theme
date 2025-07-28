import React from 'react';
import { useDeviceType } from '../stores';

export default ( WrappedComponent ) => {
    return ( props ) => {
        const [ deviceType ] = useDeviceType();

        return <WrappedComponent class="tes-test" { ...props } deviceType={ deviceType } />;
    };
};
