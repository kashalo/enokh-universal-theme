export default class EnokhV2Accordion {
    private readonly accordion: HTMLDivElement;

    constructor( element: string ) {
        if ( ! element || 'string' !== typeof element ) {
            return;
        }

        this.accordion = document.getElementById( element ) as HTMLDivElement;
    }

    initialize = () => {
        this.accordion.classList.add( 'js' );

        const accordionItems = this.accordion.querySelectorAll( '.enokh-blocks-accordion-item' );

        if ( ! accordionItems || accordionItems.length <= 0 ) {
            return;
        }

        accordionItems.forEach( ( item, itemIdx ) => {
            new MahV2AccordionItem( item as HTMLDivElement, itemIdx, this.accordion.getAttribute( 'id' ) ).initialize();
        } );
    };
}

class MahV2AccordionItem {
    private readonly accordionItem: HTMLDivElement;
    private readonly accordionHeader: HTMLDivElement;
    private readonly accordionContent: HTMLDivElement;
    private readonly accordionToggle: HTMLSpanElement;
    private readonly accordionItemIdx: number;
    private readonly accordionId: string;

    constructor( element: HTMLDivElement, elementIndex: number, accordionId: string ) {
        if ( ! element ) {
            return;
        }

        this.accordionItemIdx = elementIndex;
        this.accordionItem = element;
        this.accordionId = accordionId;
        this.accordionHeader = this.accordionItem.querySelector( '.enokh-blocks-accordion-header' );
        this.accordionContent = this.accordionItem.querySelector( '.enokh-blocks-accordion-header-content-wrapper' );
        this.accordionToggle = this.accordionItem.querySelector( '.enokh-blocks-button-accordion-toggle' );
    }

    initialize = () => {
        this.toggleButton();
        this.toggleContent();

        this.accordionHeader.setAttribute( 'tabindex', '0' );
        this.accordionHeader.setAttribute( 'id', `${ this.accordionId }-tab-${ this.accordionItemIdx }` );
        this.accordionHeader.setAttribute( 'aria-controls', `${ this.accordionId }-panel-${ this.accordionItemIdx }` );

        this.accordionContent.setAttribute( 'id', `${ this.accordionId }-panel-${ this.accordionItemIdx }` );
        this.accordionContent.setAttribute( 'aria-labelledby', `${ this.accordionId }-tab-${ this.accordionItemIdx }` );
        this.accordionContent.setAttribute( 'role', 'region' );

        this.accordionToggle.querySelector( '.enokh-blocks-accordion-expand-icon' ).setAttribute( 'aria-hidden', 'true' );
        this.accordionToggle
            .querySelector( '.enokh-blocks-accordion-collapse-icon' )
            .setAttribute( 'aria-hidden', 'true' );

        this.accordionHeader.addEventListener( 'click', () => {
            this.accordionItem.classList.toggle( 'active' );
            this.toggleContent();
            this.toggleButton();
        } );
        this.accordionHeader.addEventListener( 'keydown', ( event: KeyboardEvent ) => {
            const selectedElement = event.target;
            const key = event.which;

            if ( key === 13 ) {
                this.accordionHeader.click();
            }
        } );
    };

    isActive = () => {
        return this.accordionItem.classList.contains( 'active' );
    };

    toggleButton = () => {
        this.accordionToggle.setAttribute( 'aria-expanded', this.isActive() ? 'true' : 'false' );
    };

    toggleContent = () => {
        this.accordionContent.setAttribute( 'aria-hidden', this.isActive() ? 'false' : 'true' );
        this.accordionContent.setAttribute( 'aria-expanded', this.isActive() ? 'true' : 'false' );
    };
}
