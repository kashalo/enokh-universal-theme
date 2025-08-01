import QueryParamSelect from './QueryParamSelect';
import TaxonomySelectControl from '../../../../components/TaxonomySelect';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { useTaxonomies } from '../../../../stores';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const QueryParamTaxonomyControl = ( props: QueryParamTaxonomyControlProps ): JSX.Element => {
    const { label, placeholder, value, onChange, help } = props;
    const [ taxonomy, setTaxonomy ] = useState( value.taxonomy );
    const [ terms, setTerms ] = useState( value.terms );
    const [ includeChildren, setIncludeChildren ] = useState( false !== value.includeChildren );

    const taxonomies = useTaxonomies();

    const isHierarchical = useMemo( () => {
        const tax = taxonomies.filter( ( record ) => record.slug === taxonomy );

        return !! tax[ 0 ] ? tax[ 0 ].hierarchical : false;
    }, [ JSON.stringify( taxonomies ), taxonomy ] );

    useEffect( () => {
        if ( value.taxonomy !== taxonomy ) {
            setTaxonomy( value.taxonomy );
        }

        if ( JSON.stringify( value.terms ) !== JSON.stringify( terms ) ) {
            setTerms( value.terms );
        }
    }, [ value ] );

    useEffect( () => {
        if ( !! taxonomy ) {
            const tax = taxonomies.filter( ( record ) => record.slug === taxonomy );
            const rest = !! tax[ 0 ] ? tax[ 0 ].rest_base : undefined;
            const hierarchical = !! tax[ 0 ] ? tax[ 0 ].hierarchical : false;

            onChange( {
                taxonomy,
                terms,
                rest,
                includeChildren: hierarchical ? includeChildren : undefined,
            } );
        }
    }, [ taxonomy, JSON.stringify( terms ), includeChildren ] );

    const taxonomiesOptions = useMemo(
        () =>
            taxonomies
                .filter( ( tax ) => 'nav_menu' !== tax.slug )
                .map( ( tax ) => ( { value: tax.slug, label: tax.name } ) ),
        [ JSON.stringify( taxonomies ) ]
    );

    return (
        <>
            <QueryParamSelect
                wrapperStyles={ { marginBottom: '8px' } }
                label={ label }
                placeholder={ placeholder || __( 'Select taxonomy', 'enokh-blocks' ) }
                options={ taxonomiesOptions }
                value={ taxonomy }
                onChange={ ( option ) => {
                    setTaxonomy( option.value );
                    setTerms( [] );
                } }
            />

            { taxonomy && (
                <>
                    <TaxonomySelectControl
                        taxonomy={ taxonomy }
                        value={ terms }
                        placeholder={ placeholder || __( 'Search terms…', 'enokh-blocks' ) }
                        onChange={ ( newValue ) => {
                            const newTerms = newValue.reduce( ( result, option ) => {
                                result.push( option.value );

                                return result;
                            }, [] );

                            setTerms( newTerms );
                        } }
                        help={
                            terms.length === 0
                                ? __( 'You must select at least one term. Search by name or ID.', 'enokh-blocks' )
                                : help
                        }
                    />

                    { isHierarchical && (
                        <ToggleControl
                            checked={ includeChildren }
                            label={ __( 'Include child terms', 'enokh-blocks' ) }
                            onChange={ setIncludeChildren }
                        />
                    ) }
                </>
            ) }
        </>
    );
};
export default QueryParamTaxonomyControl;
