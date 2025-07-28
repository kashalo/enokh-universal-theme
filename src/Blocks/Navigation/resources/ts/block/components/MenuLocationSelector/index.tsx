// Third-party dependencies
import React, { useState } from 'react';

// WordPress dependencies
import { SelectControl, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

// Implementation dependencies
import { ComponentProps } from './types';
import { _x } from '@wordpress/i18n';

const MenuLocationSelector: React.FunctionComponent< ComponentProps > = ( props ) => {
    const [ locations, setLocations ] = useState( null );

    if ( locations === null ) {
        apiFetch( { path: '/wp/v2/menu-locations' } ).then( ( response: RestMenuLocationResponse ) => {
            setLocations(
                Object.values( response ).map( ( restLocation ): SelectControlOption => {
                    return {
                        label: restLocation.description,
                        value: restLocation.name,
                    };
                } )
            );
        } );
        return <Spinner  />;
    }

    const noSelectionOption: SelectControlOption = {
        label: '---',
        value: '',
    };

    return (
        <SelectControl
            label={ _x( 'Select menu location', 'Navigation block', 'enokh-blocks' ) }
            value={ props.location }
            options={ locations ? [ noSelectionOption, ...locations ] : [] }
            onChange={ props.setLocation }
        />
    );
};

export default MenuLocationSelector;
