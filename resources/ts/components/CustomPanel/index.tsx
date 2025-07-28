import React from 'react';
import { PanelBody } from '@wordpress/components';
import useLocalStorageState from 'use-local-storage-state';

const CustomPanel: React.FunctionComponent< CustomPanelProps > = ( props ) => {
    const { title, id, initialOpen, children, className } = props;
    const [ panels, setPanels ] = useLocalStorageState( 'mahBlocksPanels', {
        defaultValue: {},
    } );

    return (
        <PanelBody
            title={ title }
            className={ className }
            initialOpen={ typeof panels[ id ] !== 'undefined' ? panels[ id ] : initialOpen }
            onToggle={ () => {
                const isOpen = panels[ id ] || ( typeof panels[ id ] === 'undefined' && initialOpen );

                setPanels( {
                    ...panels,
                    [ id ]: ! isOpen,
                } );
            } }
        >
            { children }
        </PanelBody>
    );
};

export default CustomPanel;
