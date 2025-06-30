class Controller {
    public initialize = ( container: Document | HTMLElement ) => {
        container.querySelector( '.enokh-blocks-navigation-drawer-toggle' ).addEventListener( 'click', ( event ) => {
            document.documentElement.classList.toggle( 'has-open-navigation-drawer' );
        } );
    };
}

export default Controller;
