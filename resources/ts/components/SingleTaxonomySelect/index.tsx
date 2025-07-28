import CustomSelectControl from '../CustomSelectControl';
import { useMemo, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useDebounceState, usePersistentTaxonomyRecords } from '../../stores';
import { FC } from 'react';

const SingleTaxonomySelectControl: FC< SingleTaxonomySelectControlProps > = ( props ) => {
    const { taxonomy, label, onChange, value, help, placeholder } = props;

    const [ loadValue, setLoadValue ] = useState( !! value );
    const [ search, setSearch ] = useDebounceState( '', 500 );
    const isSearchById = !! search.trim() && ! search.trim().match( /\D/g );
    const includeSearchId = isSearchById ? [ search.replace( /\D/g, '' ) ] : undefined;
    const { records, isLoading } = usePersistentTaxonomyRecords( taxonomy, {
        per_page: !! search ? 100 : 10,
        search: !! search && ! isSearchById ? search : undefined,
        include: loadValue ? value : includeSearchId,
    } );

    useEffect( () => {
        if ( loadValue && records.some( ( tax ) => value === tax.id ) ) {
            setLoadValue( false );
        }
    }, [ JSON.stringify( records ), value ] );

    const taxonomiesOptions = useMemo( () => {
        const filteredTaxonomies = records.reduce( ( result, tax ) => {
            result.push( { value: tax.id, label: '#' + tax.id + ': ' + tax.name } );
            return result;
        }, [] );

        return filteredTaxonomies;
    }, [ JSON.stringify( records ) ] );

    const selectedValues = taxonomiesOptions.filter( ( option ) => value === option.value );

    return (
        <CustomSelectControl
            id={ 'enokh-blocks-select-term' }
            label={ label || __( 'Select term', 'enokh-blocks' ) }
            help={ help }
            placeholder={ placeholder || __( 'Search …', 'enokh-blocks' ) }
            options={ taxonomiesOptions }
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
export default SingleTaxonomySelectControl;
