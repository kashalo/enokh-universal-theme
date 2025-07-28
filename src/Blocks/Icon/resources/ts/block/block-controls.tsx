// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import { BlockControls, useBlockEditingMode } from '@wordpress/block-editor';
import { BaseControl, ToolbarButton, Dropdown } from '@wordpress/components';

// Implementation dependencies
import { BlockControlProps } from './types';
import IconPickerControl from './components/IconPickerControl';

const Controls: React.FunctionComponent< BlockControlProps > = ( props ) => {
    if ( useBlockEditingMode() !== 'contentOnly' ) {
        return null;
    }

    return (
        <BlockControls group="other">
            <Dropdown
                popoverProps={ { position: 'bottom right' } }
                renderToggle={ ( { isOpen, onToggle } ) => (
                    <ToolbarButton
                        onClick={ onToggle }
                        aria-haspopup="true"
                        aria-expanded={ isOpen }
                        onKeyDown={ ( event ) => {
                            if ( ! isOpen && event.keyCode === DOWN ) {
                                event.preventDefault();
                                onToggle();
                            }
                        } }
                    >
                        { _x( 'Icon', 'Icon block', 'enokh-blocks' ) }
                    </ToolbarButton>
                ) }
                renderContent={ () => (
                    <div className="enokh-blocks-icon__toolbar-dropdown-content">
                        <BaseControl
                            id="enokh-blocks-icon__toolbar-dropdown-icon"
                            label={ _x( 'Select icon', 'Icon block', 'enokh-blocks' ) }
                        >
                            <IconPickerControl
                                attributes={ props.attributes }
                                setAttributes={ props.setAttributes }
                                id={ props.clientId }
                            />
                        </BaseControl>
                    </div>
                ) }
            />
        </BlockControls>
    );
};

export default Controls;
