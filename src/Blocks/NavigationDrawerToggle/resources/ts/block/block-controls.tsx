// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import { BlockControls, useBlockEditingMode } from '@wordpress/block-editor';
import { Dropdown, TextControl, ToolbarButton } from '@wordpress/components';

// Implementation dependencies
import { BlockControlsProps } from './types';

const Controls: React.FunctionComponent< BlockControlsProps > = ( props ) => {
    /**
     * Do not display controls if contentOnly editing is not enabled
     */
    if ( useBlockEditingMode() !== 'contentOnly' ) {
        return null;
    }

    return (
        <BlockControls>
            { props.attributes.labelEnabled && (
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
                            }} placeholder={undefined} onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}                        >
                            { _x( 'Label', 'Navigation Drawer Toggle block', 'mah-blocks' ) }
                        </ToolbarButton>
                    ) }
                    renderContent={ () => (
                        <div className="blocks-navigation-drawer-toggle__toolbar-dropdown-control">
                            <TextControl
                                label={ _x( 'Label text', 'Navigation Drawer Toggle block', 'mah-blocks' ) }
                                value={ props.attributes.labelText }
                                onChange={ ( labelText ) => props.setAttributes( { labelText } ) }
                            />
                        </div>
                    ) }
                />
            ) }
        </BlockControls>
    );
};

export default Controls;
