// Implementation dependencies
import Controller from './resources/ts/controller';

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', () =>
		new Controller(
			window.MahUniversalTheme.Config.Blocks.Header
		).initialize( window.document )
	);
} else {
	new Controller( window.MahUniversalTheme.Config.Blocks.Header ).initialize(
		window.document
	);
}
