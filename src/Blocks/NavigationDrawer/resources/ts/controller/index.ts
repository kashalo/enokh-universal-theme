class Controller {
    public initialize = ( container: Document | HTMLElement ) => {
        document.documentElement.classList.add( 'has-navigation-drawer' );

        container.querySelector( '.enokh-blocks-navigation-drawer-backdrop' ).addEventListener( 'click', ( event ) => {
            document.documentElement.classList.remove( 'has-open-navigation-drawer' );
        } );
    };
}

export default Controller;
