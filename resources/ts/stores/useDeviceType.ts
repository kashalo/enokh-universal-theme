import { useDispatch, useSelect, dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import useLocalStorageState from 'use-local-storage-state';

export default ( initialDeviceType: string = 'Desktop' ) => {
    const [ localDeviceType, setLocalDeviceType ] = useLocalStorageState( 'MahUniversal2ThemeDeviceType', {
        defaultValue: initialDeviceType,
    } );

    if ( ! dispatch( 'core/edit-post' ) ) {
        const setDeviceType = ( type: string ) => {
            setLocalDeviceType( type );
        };

        return [ localDeviceType, setDeviceType ];
    }

    const { __experimentalSetPreviewDeviceType: setPreviewDeviceType = () => {} } = useDispatch( 'core/edit-post' );

    const previewDeviceType = useSelect( ( select ) => {
        const editPost: any = select( 'core/edit-post' );
        return editPost.__experimentalGetPreviewDeviceType();
    }, [] );

    useEffect( () => {
        if ( previewDeviceType !== localDeviceType ) {
            setLocalDeviceType( previewDeviceType );
        }
    }, [ previewDeviceType ] );

    const setDeviceType = ( type: string ) => {
        setPreviewDeviceType( type );
        setLocalDeviceType( type );
    };

    if ( previewDeviceType !== localDeviceType ) {
        return [ previewDeviceType, setDeviceType ];
    }

    return [ localDeviceType, setDeviceType ];
};
