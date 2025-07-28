import { useSelect } from '@wordpress/data';
import { store } from '@wordpress/core-data';

export default () =>
    useSelect( ( select ) => {
        const { getTaxonomies } = select( store ) as any;

        return getTaxonomies( { per_page: -1 } ) || [];
    }, [] );
