import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default () =>
    useSelect( ( select ) => {
        const { getPostTypes } = select( coreStore ) as any;

        return getPostTypes( { per_page: -1 } ) || [];
    }, [] );
