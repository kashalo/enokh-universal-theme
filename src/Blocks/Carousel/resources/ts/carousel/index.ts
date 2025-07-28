import MahCarousel from './Carousel';
import domReady from '@wordpress/dom-ready';

domReady( () => {
    document.querySelectorAll( '.enokh-blocks-carousel' ).forEach( ( blockItem: HTMLElement ) => {
        new MahCarousel( blockItem ).init();
    } );
} );
