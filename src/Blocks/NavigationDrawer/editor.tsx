// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { Icon, sidebar } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

// Implementation dependencies
import blockConfiguration from './block.json';
import Edit from './ts/edit';
import Save from './ts/save';

// Register block type
registerBlockType( blockConfiguration.name, {
	/* @ts-ignore: missing onPointerEnterCapture and onPointerLeaveCapture props */
	icon: <Icon icon={ sidebar } />,
	edit: Edit,
	save: Save,
} );
