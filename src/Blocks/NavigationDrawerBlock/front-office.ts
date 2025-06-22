// Stylesheets
import './front-office.scss';

import Controller from './resources/ts/controller';

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', () => new Controller().initialize( window.document ) );
} else {
    new Controller().initialize( window.document );
}
