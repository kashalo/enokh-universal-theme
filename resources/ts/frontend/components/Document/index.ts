// Implementation dependencies
import Controller from './Controller';

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', () => new Controller().initialize( window.document ) );
} else {
    new Controller().initialize( window.document );
}
