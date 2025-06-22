// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { Icon, footer } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

// Components
import Edit from './ts/edit';
import Save from './ts/save';

/**
 * Not reading block.json as it will increase build size
 */
registerBlockType( 'enokh-universal-theme/footer', {
	/* @ts-ignore: missing onPointerEnterCapture and onPointerLeaveCapture props */
	icon: <Icon icon={ footer } />,
	edit: Edit,
	save: Save,
} );
