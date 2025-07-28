import CustomSelectControl from '../CustomSelectControl';
import { __ } from '@wordpress/i18n';
import { useDebounceState, usePersistentPostRecords } from '../../stores';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

const PostTypeRecordsSelect = ( props ): JSX.Element => {
    const {
        postType,
        label,
        value,
        placeholder,
        filterName = 'enokh-blocks.editor.post-type-record-select',
        ...otherProps
    } = props;

    const [ loadValues, setLoadValues ] = useState( value.length > 0 );
    const [ search, setSearch ] = useDebounceState( '', 500 );
    const isSearchById = !! search.trim() && ! search.trim().match( /\D/g );
    const includeSearchId = isSearchById ? [ search.replace( /\D/g, '' ) ] : undefined;
    const { records, isLoading } = usePersistentPostRecords( postType, {
        per_page: !! search ? 100 : 10,
        search: !! search && ! isSearchById ? search : undefined,
        include: loadValues ? value : includeSearchId,
    } );

    useEffect( () => {
        if ( loadValues && records.some( ( post ) => value.includes( post.id ) ) ) {
            setLoadValues( false );
        }
    }, [ JSON.stringify( records ), JSON.stringify( value ) ] );

    const recordOptions: any = useMemo( () => {
        const options = records?.map( ( post ) => {
            const title = post.title && post.title.raw ? post.title.raw : post.slug;

            return { value: post.id, label: `#${ post.id }: ${ title }` };
        } );

        return applyFilters( filterName, options );
    }, [ records, postType ] );

    const selectedValues = recordOptions.filter( ( option ) => value.includes( option.value ) );

    return (
        <CustomSelectControl
            id={ 'enokh-blocks-select-posts' }
            label={ label || __( 'Select post', 'enokh-blocks' ) }
            placeholder={ placeholder || __( 'Search posts…', 'enokh-blocks' ) }
            value={ selectedValues }
            isLoading={ isLoading }
            isSearchable
            isMulti
            { ...otherProps }
            options={ recordOptions }
            onInputChange={ ( inputValue, { action } ) => {
                if ( 'input-change' === action ) {
                    setSearch( inputValue );
                }
            } }
        />
    );
};
export default PostTypeRecordsSelect;
