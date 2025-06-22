import { ElementConfig } from '../types';
import Element from '../element';

class Controller {
	private config: ElementConfig;

	constructor( config: ElementConfig ) {
		this.config = config;
	}

	initialize = ( container: Document | HTMLElement ): this => {
		const headers = container.querySelectorAll(
			`.${ this.config.wrapperClass }`
		);

		[].forEach.call( headers, ( header: HTMLElement ) => {
			new Element( this.config, header ).initialize();
		} );

		return this;
	};
}

export default Controller;
