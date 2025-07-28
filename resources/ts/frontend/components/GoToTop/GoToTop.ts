export default class MahGoToTop {
    private readonly $el: HTMLButtonElement;

    constructor( element: HTMLButtonElement ) {
        if ( ! element ) {
            return;
        }

        this.$el = element;
    }

    public init = () => {
        this.$el.addEventListener( 'click', () => {
            window.scroll( {
                top: 0,
                behavior: 'smooth',
            } );
        } );

        document.addEventListener( 'scroll', () => {
            this.btnVisibility();
        } );
    };

    btnVisibility = () => {
        if ( document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) {
            this.$el.style.visibility = 'visible';
        } else {
            this.$el.style.visibility = 'hidden';
        }
    };
}
