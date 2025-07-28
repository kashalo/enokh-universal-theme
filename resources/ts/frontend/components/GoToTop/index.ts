import EnokhGoToTop from '@enokh-blocks/frontend/components/GoToTop/GoToTop';
import domReady from '@wordpress/dom-ready';

domReady( () => {
    document.querySelectorAll( '.enokh-blocks-button__go-to-top' ).forEach( ( blockItem: HTMLButtonElement ) => {
        new EnokhGoToTop( blockItem ).init();
    } );
} );
