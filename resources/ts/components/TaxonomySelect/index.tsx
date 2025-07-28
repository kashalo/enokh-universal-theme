import CustomSelectControl from '../CustomSelectControl';
import { useMemo, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useDebounceState, usePersistentTaxonomyRecords } from '../../stores';

const TaxonomySelectControl = ( props: TaxonomSelectControlProps ): JSX.Element => {
    const { taxonomy, label, onChange, value = [], help, placeholder } = props;

    const [ loadValues, setLoadValues ] = useState( value.length > 0 );
    const [ search, setSearch ] = useDebounceState( '', 500 );
    const isSearchById = !! search.trim() && ! search.trim().match( /\D/g );
    const includeSearchId = isSearchById ? [ search.replace( /\D/g, '' ) ] : undefined;
    const { records, isLoading } = usePersistentTaxonomyRecords( taxonomy, {
        per_page: !! search ? 100 : 10,
        search: !! search && ! isSearchById ? search : undefined,
        include: loadValues ? value : includeSearchId,
    } );

    useEffect( () => {
        if ( loadValues && records.some( ( tax ) => value.includes( tax.id ) ) ) {
            setLoadValues( false );
        }
    }, [ JSON.stringify( records ), JSON.stringify( value ) ] );

    const taxonomiesOptions = useMemo( () => {
        const filteredTaxonomies = records.reduce( ( result, tax ) => {
            result.push( { value: tax.id, label: '#' + tax.id + ': ' + tax.name } );
            return result;
        }, [] );

        return filteredTaxonomies;
    }, [ JSON.stringify( records ) ] );

    const selectedValues = taxonomiesOptions.filter( ( option ) => value.includes( option.value ) );

    return (
        <CustomSelectControl
            id={ 'enokh-blocks-select-author' }
            label={ label || __( 'Select terms', 'enokh-blocks' ) }
            help={ help }
            placeholder={ placeholder || __( 'Search …', 'enokh-blocks' ) }
            options={ taxonomiesOptions }
            isMulti
            isSearchable
            value={ selectedValues }
            onChange={ onChange }
            isLoading={ isLoading }
            onInputChange={ ( inputValue, { action } ) => {
                if ( 'input-change' === action ) {
                    setSearch( inputValue );
                }
            } }
        />
    );
};
export default TaxonomySelectControl;
