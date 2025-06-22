// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { Icon, header } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

// Components
import Edit from './resources/ts/block/edit';
import Save from './resources/ts/block/save';

/**
 * Not reading block.json as it will increase build size
 */
registerBlockType( 'enokh-universal-theme/header', {
	/* @ts-ignore: missing onPointerEnterCapture and onPointerLeaveCapture props */
	icon: <Icon icon={ header } />,
	edit: Edit,
	save: Save,
} );
