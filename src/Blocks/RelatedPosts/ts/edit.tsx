// Third-party dependencies
import React from 'react';

// WordPress dependencies
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

const Edit: React.FunctionComponent< RelatedPostsBlockEditProps > = (
	props
) => {
	return (
		<div { ...useBlockProps() }>
			<ServerSideRender
				block="enokh-universal-theme/related-posts"
				attributes={ props.attributes }
			/>
		</div>
	);
};

export default Edit;
