// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { _x } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import { BlockControls, useBlockEditingMode } from '@wordpress/block-editor';
import { TextareaControl, ToolbarButton, Dropdown } from '@wordpress/components';

// Implementation dependencies
import { BlockToolbarControlProps } from './types';

const SearchBlockControls: React.FunctionComponent< BlockToolbarControlProps > = ( props ) => {
    /**
     * Do not display controls if contentOnly editing is not enabled
     */
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
                        { _x( 'Placeholder', 'Search block', 'enokh-blocks' ) }
                    </ToolbarButton>
                ) }
                renderContent={ () => (
                    <TextareaControl
                        className="blocks-search__toolbar_content_textarea"
                        label={ _x( 'Placeholder', 'Search block', 'enokh-blocks' ) }
                        value={ props.attributes.placeholderText }
                        onChange={ ( placeholderText ) => props.setAttributes( { placeholderText } ) }
                        __nextHasNoMarginBottom
                    />
                ) }
            />
        </BlockControls>
    );
};

export default SearchBlockControls;
