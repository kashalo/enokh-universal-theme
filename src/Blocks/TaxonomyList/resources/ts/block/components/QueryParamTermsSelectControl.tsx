import TaxonomySelectControl from '@enokh-blocks/components/TaxonomySelect';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { useTaxonomies } from '@enokh-blocks/stores';
import { __ } from '@wordpress/i18n';
import { QueryParamTermsSelectControlProps } from '../types';
import { FC } from 'react';
import SingleTaxonomySelectControl from '@enokh-blocks/components/SingleTaxonomySelect';

const QueryParamTermsSelectControl: FC< QueryParamTermsSelectControlProps > = ( props ) => {
    const { placeholder, value, onChange, help, taxonomy: taxonomyValue } = props;
    const [ taxonomy, setTaxonomy ] = useState( taxonomyValue );
    const [ term, setTerm ] = useState( value );

    const taxonomies = useTaxonomies();

    useEffect( () => {
        if ( taxonomyValue !== taxonomy ) {
            setTaxonomy( taxonomyValue );
        }

        if ( JSON.stringify( value ) !== JSON.stringify( term ) ) {
            setTerm( value );
        }
    }, [ taxonomyValue ] );

    useEffect( () => {
        if ( !! taxonomy ) {
            onChange( term );
        }
    }, [ taxonomy, JSON.stringify( term ) ] );

    return (
        <>
            { taxonomy && (
                <>
                    <SingleTaxonomySelectControl
                        taxonomy={ taxonomy }
                        value={ term }
                        placeholder={ placeholder || __( 'Search term…', 'enokh-blocks' ) }
                        onChange={ ( newValue ) => {
                            setTerm( newValue.value );
                        } }
                        help={ ! term ? __( 'You must select a term. Search by name or ID.', 'enokh-blocks' ) : help }
                    />
                </>
            ) }
        </>
    );
};
export default QueryParamTermsSelectControl;
