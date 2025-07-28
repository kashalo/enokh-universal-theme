class Controller {
    initialize = ( document: Document ): this => {
        let lastPosition = 0;

        /**
         * Necessary for sticky behaviors per device breakpoint
         * @see https://inpsyde.atlassian.net/browse/MOWE-149
         */
        document.addEventListener(
            'scroll',
            function () {
                const currentPosition = document.documentElement.scrollTop;

                if ( currentPosition > lastPosition ) {
                    document.documentElement.classList.add( 'has-scrolled-down' );
                    document.documentElement.classList.remove( 'has-scrolled-up' );
                } else {
                    document.documentElement.classList.add( 'has-scrolled-up' );
                    document.documentElement.classList.remove( 'has-scrolled-down' );
                }

                lastPosition = currentPosition <= 0 ? 0 : currentPosition;
            },
            false
        );

        return this;
    };
}

export default Controller;
