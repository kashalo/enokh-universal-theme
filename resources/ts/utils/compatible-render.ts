import { render, createRoot } from '@wordpress/element';

export default function compatibleRender( root: any, component: any ) {
    if ( undefined !== createRoot ) {
        createRoot( root ).render( component );
    } else {
        render( component, root );
    }
}
