// Stylesheets
import './editor.scss';

// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { Icon, navigation } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

// Implementation dependencies
import blockJson from './block.json';
import Edit from './resources/ts/block/edit';

/**
 * Not reading block.json as it will increase build size
 */
registerBlockType( blockJson.name, {
    icon: <Icon icon={ navigation } />,
    edit: Edit,
    save: () => null,
} );
