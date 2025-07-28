import React from "react";

export default ( WrappedComponent ) => {
    return ( props ) => {
        const { attributes } = props;

        const newProps = attributes.isQueryLoop
            ? Object.assign( {}, props, {
                  defaultLayout: '100',
                  templateLock: 'all',
              } )
            : props;

        return <WrappedComponent { ...newProps } />;
    };
};
