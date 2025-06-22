// Stylesheets
import './editor.scss';

// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { Icon, search } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

// Implementation dependencies
import blockConfiguration from './block.json';
import Edit from './resources/ts/block/edit';

registerBlockType( blockConfiguration.name, {
    icon: <Icon icon={ search } />,
    edit: Edit,
    save: () => null,
} );
