// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import { BlockControls, useBlockEditingMode } from '@wordpress/block-editor';
import { Dropdown, TextControl, ToolbarButton } from '@wordpress/components';

// Implementation dependencies
import { BlockControlsProps } from './types';
import MenuLocationSelector from './components/MenuLocationSelector';

const Controls: React.FunctionComponent< BlockControlsProps > = ( props ) => {
    /**
     * Do not display controls if contentOnly editing is not enabled
     */
    if ( useBlockEditingMode() !== 'contentOnly' ) {
        return null;
    }

    return (
        <BlockControls>
            <Dropdown
                popoverProps={ { position: 'bottom right' } }
                renderToggle={ ( { isOpen, onToggle } ) => (
                    <ToolbarButton
                        onClick={onToggle}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onKeyDown={(event) => {
                            if (!isOpen && event.keyCode === DOWN) {
                                event.preventDefault();
                                onToggle();
                            }
                        }}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        { _x( 'Menu', 'Navigation block', 'mah-blocks' ) }
                    </ToolbarButton>
                ) }
                renderContent={ () => (
                    <div className="blocks-navigation__toolbar-dropdown-control">
                        <MenuLocationSelector
                            location={ props.attributes.menuLocation }
                            setLocation={ ( menuLocation ) => props.setAttributes( { menuLocation } ) }
                        />
                    </div>
                ) }
            />
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
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        { _x( 'Accessibility', 'Navigation block', 'mah-blocks' ) }
                    </ToolbarButton>
                ) }
                renderContent={ () => (
                    <div className="blocks-navigation__toolbar-dropdown-control">
                        <TextControl
                            label={ _x( 'Menu name', 'Navigation block', 'mah-blocks' ) }
                            value={ props.attributes.ariaLabel }
                            onChange={ ( value ) => props.setAttributes( { ariaLabel: value } ) }
                        />
                    </div>
                ) }
            />
        </BlockControls>
    );
};

export default Controls;
