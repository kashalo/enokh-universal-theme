/* eslint-disable react/no-is-mounted */
export default class EnokhTabs {
    keys: {
        end: number;
        home: number;
        left: number;
        up: number;
        right: number;
        down: number;
    };
    direction: {
        37: number;
        38: number;
        39: number;
        40: number;
    };
    settings: {
        orientation: string;
        onCreate: ( () => void ) | null;
        onTabChange: ( () => void ) | null;
    };
    $tabs: NodeListOf< Element >;

    constructor( element: string, options: object = {} ) {
        this.keys = {
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
        };

        this.direction = {
            37: -1,
            38: -1,
            39: 1,
            40: 1,
        };

        const defaults = {
            orientation: 'horizontal',
            onCreate: null,
            onTabChange: null,
        };

        if ( ! element || typeof element !== 'string' ) {
            console.error( '10up Tabs: No target supplied. A valid target (tab area) must be used.' );
            return;
        }

        this.$tabs = document.querySelectorAll( element );

        if ( ! this.$tabs ) {
            console.error( '10up Tabs: Target not found. A valid target (tab area) must be used.' );
            return;
        }

        this.settings = Object.assign( {}, defaults, options );

        for ( const tabArea of this.$tabs ) {
            this.setupTabs( tabArea );
        }

        if ( this.settings.onCreate && typeof this.settings.onCreate === 'function' ) {
            // @ts-ignore
            this.settings.onCreate.call();
        }
    }

    setupTabs( tabArea: Element ): void {
        const tabLinks = tabArea.querySelectorAll( '.tab-list [role="tab"]' );
        const tabList = tabArea.querySelector( '.tab-list' );

        tabList.setAttribute( 'aria-orientation', this.settings.orientation );

        for ( const tabLink of tabLinks ) {
            const tabId = tabLink.getAttribute( 'aria-controls' );
            const tabLinkId = `tab-${ tabId }`;
            const tabContent = document.getElementById( tabId );

            tabLink.setAttribute( 'id', tabLinkId );
            tabLink.setAttribute( 'aria-selected', 'false' );
            tabLink.setAttribute( 'tabindex', '-1' );
            ( tabLink.parentNode as HTMLElement ).setAttribute( 'role', 'presentation' );

            tabContent.setAttribute( 'aria-labelledby', tabLinkId );
            tabContent.setAttribute( 'aria-hidden', 'true' );

            this.goToTab( 0, tabArea );

            tabLink.addEventListener( 'click', ( event ) => {
                event.preventDefault();

                if (
                    ! ( ( event.target as HTMLElement ).parentNode as HTMLElement ).classList.contains( 'is-active' )
                ) {
                    this.goToTab( event, tabArea );
                }
            } );

            tabLink.addEventListener( 'keyup', ( event: KeyboardEvent ) => {
                if (
                    event.which === 32 &&
                    ! ( ( event.target as HTMLElement ).parentNode as HTMLElement ).classList.contains( 'is-active' )
                ) {
                    event.preventDefault();
                    this.goToTab( event, tabArea );
                }
            } );

            tabLink.addEventListener( 'keydown', ( event: KeyboardEvent ) => {
                const key = event.keyCode;
                const newIndex = this.determineNextTab( event, tabArea, tabLinks );

                switch ( key ) {
                    case this.keys.end:
                        event.preventDefault();
                        this.goToTab( parseInt( String( tabLinks.length - 1 ), 10 ), tabArea, true );
                        break;
                    case this.keys.home:
                        event.preventDefault();
                        this.goToTab( 0, tabArea, true );
                        break;
                    case this.keys.up:
                    case this.keys.down:
                        if ( this.settings.orientation === 'vertical' ) {
                            event.preventDefault();
                            this.goToTab( newIndex, tabArea, true );
                        }
                        break;
                }
            } );

            tabLink.addEventListener( 'keyup', ( event: KeyboardEvent ) => {
                const key = event.keyCode;
                const newIndex = this.determineNextTab( event, tabArea, tabLinks );

                switch ( key ) {
                    case this.keys.left:
                    case this.keys.right:
                        if ( this.settings.orientation === 'horizontal' ) {
                            this.goToTab( newIndex, tabArea, true );
                        }
                        break;
                }
            } );
        }
    }

    determineNextTab( event: KeyboardEvent, tabArea: Element, tabLinks: NodeListOf< Element > ): number {
        const key = event.keyCode;

        const currentTab = tabArea.querySelector( '.tab-list li.is-active [role="tab"]' );
        const currentIndex = [].indexOf.call( tabLinks, currentTab );
        const desiredIndex = parseInt( currentIndex + this.direction[ key ], 10 );

        return desiredIndex >= tabLinks.length // eslint-disable-line no-nested-ternary
            ? 0
            : 0 > desiredIndex
            ? parseInt( String( tabLinks.length - 1 ), 10 )
            : desiredIndex;
    }

    goToTab( tab: number | Event, tabArea: Element, setFocus = false ): void {
        const type = typeof tab;
        const isEvent = type === 'function' || ( type === 'object' && !! tab );

        const tabItems = tabArea.querySelectorAll( '.tab-list li [role="tab"]' );
        const oldTab = tabArea.querySelector( '.tab-list li.is-active [role="tab"]' );

        if ( oldTab ) {
            const oldTabId = oldTab.getAttribute( 'aria-controls' );
            const oldTabContent = document.getElementById( oldTabId );

            oldTab.setAttribute( 'aria-selected', 'false' );
            oldTab.setAttribute( 'tabindex', '-1' );
            ( oldTab.parentNode as HTMLElement ).classList.remove( 'is-active' );

            oldTabContent.setAttribute( 'aria-hidden', 'true' );
            oldTabContent.classList.remove( 'is-active' );
            oldTabContent.removeAttribute( 'tabindex' );
        }

        const newTab: HTMLElement = ( isEvent ? ( tab as Event ).target : tabItems[ tab as number ] ) as HTMLElement;

        if ( newTab ) {
            const newTabId = newTab.getAttribute( 'aria-controls' );
            const newTabContent = document.getElementById( newTabId );

            newTab.setAttribute( 'aria-selected', 'true' );
            newTab.removeAttribute( 'tabindex' );
            ( newTab.parentNode as HTMLElement ).classList.add( 'is-active' );

            if ( setFocus ) {
                newTab.focus();
            }

            newTabContent.setAttribute( 'aria-hidden', 'false' );
            newTabContent.classList.add( 'is-active' );
            newTabContent.setAttribute( 'tabindex', '0' );

            if ( this.settings.onTabChange && typeof this.settings.onTabChange === 'function' ) {
                // @ts-ignore
                this.settings.onTabChange.call();
            }
        }
    }
}
