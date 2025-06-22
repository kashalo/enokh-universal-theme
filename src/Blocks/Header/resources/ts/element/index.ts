import { ElementConfig } from '../types';

export default class Element {
	private static ATTR_INIT = 'data-header-initialized';
	private config: ElementConfig;
	private el: HTMLElement;

	constructor( config: ElementConfig, el: HTMLElement ) {
		this.config = config;
		this.el = el;
	}

	public initialize = (): this => {
		if ( this.el.getAttribute( Element.ATTR_INIT ) ) {
			return this;
		}

		this.el.setAttribute( Element.ATTR_INIT, '' );

		const stickinessHandler = ( el: HTMLElement ) => {
			if ( window.scrollY > 0 ) {
				el.classList.add( 'is-stuck' );
				return;
			}

			el.classList.remove( 'is-stuck' );
		};

		stickinessHandler( this.el );
		window.addEventListener( 'scroll', () => stickinessHandler( this.el ), {
			passive: true,
		} );
		window.addEventListener( 'resize', () => stickinessHandler( this.el ), {
			passive: true,
		} );

		return this;
	};
}
