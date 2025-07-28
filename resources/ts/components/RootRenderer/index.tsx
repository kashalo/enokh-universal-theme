import { createElement } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import classnames from 'classnames';
import { store } from '@wordpress/block-editor';

const RootRenderer = ( { name, clientId, align, children } ) => {
    const { getBlockRootClientId } = useSelect( ( select ) => select( 'core/block-editor' ), [] );

    const supportsLayout = useSelect( ( select ) => {
        const { getSettings } = select( store ) as any;

        return getSettings().supportsLayout || false;
    }, [] );

    const blockName = name.toString().replace( '/', '-' );

    const blockProps = {
        className: classnames( {
            'wp-block': true,
            'enokh-blocks-is-root-block': true,
            [ `enokh-blocks-root-block-${ blockName }` ]: true,
            [ `align${ align }` ]: supportsLayout,
        } ),
        'data-align': align && ! supportsLayout ? align : null,
        'data-block': clientId,
    };

    // @ts-ignore
    const parentBlock = getBlockRootClientId( clientId );

    if ( parentBlock ) {
        return children;
    }

    return createElement( 'div', blockProps, children );
};
export default RootRenderer;
