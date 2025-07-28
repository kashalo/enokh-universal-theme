import EnokhAccordion from './Accordion';
import EnokhV2Accordion from './V2Accordion';

new EnokhAccordion( '.enokh-blocks-accordion' );

window.addEventListener( 'DOMContentLoaded', () => {
    const newAccordionElements = document.querySelectorAll( '[data-enokh-accordion]' );

    if ( ! newAccordionElements.length ) {
        return;
    }

    newAccordionElements.forEach( ( element ) => {
        new EnokhV2Accordion( element.getAttribute( 'id' ) ).initialize();
    } );
} );
