/* eslint-disable */
export default class EnokhAccordion {
    private readonly accordions: NodeList;

    constructor( element: string ) {
        if ( ! element || 'string' !== typeof element ) {
            return;
        }

        this.accordions = document.querySelectorAll( element );

        if ( ! this.accordions ) {
            return;
        }

        document.documentElement.classList.add( 'js' );

        this.accordions.forEach( ( accordionArea, index ) => {
            this.setupAccordion( accordionArea, index );
        } );
    }

    /**
     * Initialize a given accordion area.
     * Configure accordion properties and set ARIA attributes.
     *
     * @param {element} accordionArea      The accordionArea to scope changes.
     * @param {number}  accordionAreaIndex The index of the accordionArea.
     * @return {null}
     */
    setupAccordion( accordionArea, accordionAreaIndex ) {
        const allAccordionLinks = accordionArea.querySelectorAll( '.enokh-blocks-accordion__header' );
        const allAccordionContent = accordionArea.querySelectorAll( '.enokh-blocks-accordion__content' );

        // Make sure accordionLinks and accordionContent are direct descendants of accordionArea
        const accordionLinks = Array.prototype.slice
            .call( allAccordionLinks )
            .filter( ( link ) => link.parentNode === accordionArea );
        const accordionContent = Array.prototype.slice
            .call( allAccordionContent )
            .filter( ( content ) => content.parentNode === accordionArea );

        // Handle keydown event to move between accordion items
        accordionArea.addEventListener( 'keydown', ( event ) => {
            const selectedElement = event.target;
            const key = event.which;

            // Make sure the selected element is a header and a direct descendant of the current accordionArea
            if (
                selectedElement.classList.contains( 'enokh-blocks-accordion__header' ) &&
                selectedElement.parentNode === accordionArea
            ) {
                this.accessKeyBindings( accordionLinks, selectedElement, key, event );
            }
        } );

        // Set ARIA attributes for accordion links
        accordionLinks.forEach( ( accordionLink, index ) => {
            accordionLink.hasAttribute('id') || accordionLink.setAttribute( 'id', `tab${ accordionAreaIndex }-${ index }` );
            accordionLink.hasAttribute('aria-expanded') || accordionLink.setAttribute( 'aria-expanded', 'false' );
            accordionLink.hasAttribute('aria-controls') || accordionLink.setAttribute( 'aria-controls', `panel${ accordionAreaIndex }-${ index }` );

            // Handle click event to toggle accordion items
            accordionLink.addEventListener( 'click', ( event ) => {
                event.preventDefault();
                this.toggleAccordionItem( event );
            } );
        } );

        // Set ARIA attributes for accordion content areas
        accordionContent.forEach( ( accordionContent, index ) => {
            accordionContent.hasAttribute('id') || accordionContent.setAttribute( 'id', `panel${ accordionAreaIndex }-${ index }` );
            accordionContent.hasAttribute('aria-hidden') || accordionContent.setAttribute( 'aria-hidden', 'true' );
            accordionContent.hasAttribute('aria-labelledby') || accordionContent.setAttribute( 'aria-labelledby', `tab${ accordionAreaIndex }-${ index }` );
            accordionContent.hasAttribute('role') || accordionContent.setAttribute( 'role', 'region' );
        } );
    }

    /**
     * Open a given accordion item
     * Add or remove necessary CSS classes and toggle ARIA attributes.
     *
     * @param {element} accordionLink    The accordion heading link
     * @param {element} accordionContent The accordion content to open
     * @return {null}
     */
    openAccordionItem( accordionLink, accordionContent ) {
        accordionLink.setAttribute( 'aria-expanded', 'true' );
        accordionContent.setAttribute( 'aria-hidden', 'false' );
    }

    /**
     * Close a given accordion item
     * Add or remove necessary CSS classes and toggle ARIA attributes.
     *
     * @param {element} accordionLink    The accordion heading link
     * @param {element} accordionContent The accordion content to open
     * @return {null}
     */
    closeAccordionItem( accordionLink, accordionContent ) {
        accordionLink.setAttribute( 'aria-expanded', 'false' );
        accordionContent.setAttribute( 'aria-hidden', 'true' );
    }

    /**
     * Toggles a given accordion item.
     * Add or remove necessary CSS classes and toggle ARIA attributes.

     * @param {Object} event The accordion click event
     * @returns {null}
     */
    toggleAccordionItem( event ) {
        const accordionLink = event.target;
        const accordionContent = accordionLink.nextElementSibling;
        const accordionHeading = accordionContent.querySelector( '.enokh-blocks-accordion__label' );

        // Toggle active class on accordion link and content.
        accordionLink.classList.toggle( 'is-active' );
        accordionContent.classList.toggle( 'is-active' );

        // Set focus on the accordion heading.
        if ( accordionHeading ) {
            accordionHeading.setAttribute( 'tabindex', -1 );
            accordionHeading.focus();
        }

        if ( accordionContent.classList.contains( 'is-active' ) ) {
            this.openAccordionItem( accordionLink, accordionContent );
        } else {
            this.closeAccordionItem( accordionLink, accordionContent );
        }
    }

    /**
     * Moves and focus between items based on the selected item and the key pressed.

     * @param {element[]} accordionLinks  The array of accordion links.
     * @param {element}   selectedElement The accordion link where the key action triggers.
     * @param {number}    key             The key code of the key pressed.
     * @param {Object}    event           The accordion keydown event.
     * @returns {null}
     */
    accessKeyBindings( accordionLinks, selectedElement, key, event ) {
        let linkIndex;

        accordionLinks.forEach( ( accordionLink, index ) => {
            if ( selectedElement == accordionLink ) {
                linkIndex = index;
            }
        } );

        switch ( key ) {
            //End key
            case 35:
                linkIndex = accordionLinks.length - 1;
                event.preventDefault();
                break;
            //Home key
            case 36:
                linkIndex = 0;
                event.preventDefault();
                break;
            //Up arrow
            case 38:
                linkIndex--;
                if ( 0 > linkIndex ) {
                    linkIndex = accordionLinks.length - 1;
                }
                event.preventDefault();
                break;
            //Down arrow
            case 40:
                linkIndex++;
                if ( linkIndex > accordionLinks.length - 1 ) {
                    linkIndex = 0;
                }
                event.preventDefault();
                break;
        }

        const newLinkIndex = linkIndex;
        accordionLinks[ newLinkIndex ].focus();
    }
}
/* eslint-enable */
