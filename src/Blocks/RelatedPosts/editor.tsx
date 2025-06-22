// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { Icon, post } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

// Components
import Edit from './ts/edit';

/**
 * Not reading block.json as it will increase build size
 */
registerBlockType( 'enokh-universal-theme/related-posts', {
	/* @ts-ignore: missing onPointerEnterCapture and onPointerLeaveCapture props */
	icon: <Icon icon={ post } />,
	edit: Edit,
	save: () => null,
} );
