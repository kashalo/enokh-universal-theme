import domReady from '@wordpress/dom-ready';

const copyURL = async ( event: MouseEvent, elm: HTMLElement ) => {
    event.preventDefault();

    try {
        const copyUrl = window.location.href;
        await navigator.clipboard.writeText( copyUrl );
        elm.classList.add( 'copied' );
        setTimeout( () => {
            elm.classList.remove( 'copied' );
        }, 1500 );
    } catch ( err ) {
        console.error( 'Failed to copy: ', err );
    }
};

domReady( () => {
    document.querySelectorAll( '.enokh-blocks-button__copy-link' ).forEach( ( item: HTMLElement ) => {
        const icon = item.querySelector( 'span' );
        const copiedSpan = document.createElement( 'span' );

        // Add classes
        icon.classList.forEach( ( c ) => {
            copiedSpan.classList.add( c );
        } );
        copiedSpan.classList.add( 'enokh-blocks-icon__copied-link' );
        copiedSpan.innerHTML =
            '<svg class="mah-icon mah-icon--check mah-icon--font-awesome-solid--check enokh-blocks-icon" version="1.1" width="28" height="32" viewBox="0 0 28 32" alt="icon: check" data-icon-set="font-awesome-solid" data-icon-name="check" role="img" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M27.413 6.588c0.781 0.781 0.781 2.050 0 2.831l-16 16c-0.781 0.781-2.050 0.781-2.831 0l-8-8c-0.781-0.781-0.781-2.050 0-2.831s2.050-0.781 2.831 0l6.587 6.581 14.587-14.581c0.781-0.781 2.050-0.781 2.831 0z"></path></svg>';

        item.appendChild( copiedSpan );
        item.addEventListener( 'click', async ( event ) => {
            await copyURL( event, item );
        } );
    } );

    document.querySelectorAll( '.enokh-blocks-button__print' ).forEach( ( item: HTMLElement ) => {
        item.addEventListener( 'click', async ( event ) => {
            event.preventDefault();
            window.print();
        } );
    } );
} );
