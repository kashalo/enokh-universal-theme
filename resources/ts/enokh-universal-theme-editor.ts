// Stylesheets
import '../scss/enokh-universal-theme-editor.scss';


// Blocks
import "./editor/blocks/ContainerBlock";
import "./editor/blocks/GridBlock";
import "./editor/blocks/QueryLoopBlock";
import "./editor/blocks/TextBlock";
import "./editor/blocks/TermFeaturedImageBlock";
import "./editor/blocks/TableOfContent";
import "./editor/blocks/ButtonBlock";

// Extensions
import './editor/extensions/ContentOnlySwitch';
import './editor/extensions/MarkerColorSupport';
import './editor/extensions/QueryLoopPagination';
import './editor/extensions/BlockStylesCopyPaste';
import './editor/extensions/SyncAccordionStyles';
import './editor/extensions/TemplateArea';

// HOC
import './hoc/withDocumentationInspectControl'

// Plugins
import './editor/plugins/ExcludeFromSearch';


// WordPress dependencies
import {
	getBlockType,
	unregisterBlockType,
	unregisterBlockStyle,
} from '@wordpress/blocks';

import domReady from '@wordpress/dom-ready';

const coreBlocksToDeregister = [
	// 'core/archives',
	// 'core/audio',
	// 'core/avatar',
	// 'core/block',
	// 'core/button',
	// 'core/buttons',
	// 'core/calendar',
	// 'core/categories',
	// 'core/code',
	// 'core/column',
	// 'core/columns',
	// 'core/comment-author-avatar',
	// 'core/comment-author-name',
	// 'core/comment-content',
	// 'core/comment-date',
	// 'core/comment-edit-link',
	// 'core/comment-reply-link',
	// 'core/comments',
	// 'core/comments-pagination',
	// 'core/comments-pagination-next',
	// 'core/comments-pagination-numbers',
	// 'core/comments-pagination-previous',
	// 'core/comments-title',
	// 'core/comment-template',
	// 'core/cover',
	// 'core/details',
	// 'core/embed',
	// 'core/file',
	// 'core/freeform',
	// 'core/gallery',
	// 'core/group',
	// 'core/heading',
	// 'core/home-link',
	// 'core/html',
	// 'core/image',
	// 'core/latest-comments',
	// 'core/latest-posts',
	// 'core/list',
	// 'core/list-item',
	// 'core/loginout',
	// 'core/media-text',
	// 'core/missing', we need this to be there for missing blocks
	// 'core/more',
	// 'core/navigation',
	// 'core/navigation-link',
	// 'core/navigation-submenu',
	// 'core/nextpage',
	// 'core/page-list',
	// 'core/page-list-item',
	// 'core/paragraph',
	// 'core/post-author',
	// 'core/post-author-biography',
	// 'core/post-author-name',
	// 'core/post-comment',
	// 'core/post-comments-count',
	// 'core/post-comments-form',
	// 'core/post-comments-link',
	// 'core/post-content',
	// 'core/post-date',
	// 'core/post-excerpt',
	// 'core/post-featured-image',
	// 'core/post-navigation-link',
	// 'core/post-template',
	// 'core/post-terms',
	// 'core/post-time-to-read',
	// 'core/post-title',
	// 'core/preformatted',
	// 'core/pullquote',
	// 'core/query',
	// 'core/query-no-results',
	// 'core/query-pagination',
	// 'core/query-pagination-next',
	// 'core/query-pagination-numbers',
	// 'core/query-pagination-previous',
	// 'core/query-title',
	// 'core/quote',
	// 'core/read-more',
	'core/rss',
	'core/search',
	// 'core/separator',
	'core/shortcode',
	// 'core/site-logo',
	'core/site-tagline',
	'core/site-title',
	// 'core/social-link',
	// 'core/social-links',
	// 'core/spacer',
	// 'core/table',
	// 'core/table-of-contents',
	'core/tag-cloud',
	// 'core/template-part',
	// 'core/term-description',
	// 'core/text-columns',
	// 'core/verse',
	// 'core/video',
	'core/widget-area',
	'core/legacy-widget',
	'core/widget-group',
];

domReady( () => {
	// Remove default core/site-logo styles.
	unregisterBlockStyle( 'core/site-logo', 'default' );
	unregisterBlockStyle( 'core/site-logo', 'rounded' );

	// Remove default core/image styles.
	unregisterBlockStyle( 'core/image', 'default' );
	unregisterBlockStyle( 'core/image', 'rounded' );

	coreBlocksToDeregister.forEach( ( block ) => {
		if ( getBlockType( block ) ) {
			unregisterBlockType( block );
		}
	} );
} );
