import { BlockInspectorControlProps } from './types';
import { InspectorControls } from '@wordpress/block-editor';
import React from 'react';
import { __ } from '@wordpress/i18n';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { ToggleControl, Button } from '@wordpress/components';
import CustomSelectControl from '@enokh-blocks/components/CustomSelectControl';
import { useTaxonomies } from '@enokh-blocks/stores';
import { useEffect, useMemo, useState } from '@wordpress/element';
import queryParameterOptions from './query-parameters';
import { isEqual } from 'lodash';
import QueryParamSelector from '@enokh-blocks/editor/blocks/QueryLoopBlock/components/QueryParamSelector';
import QueryParamList from './components/QueryParamList';
import useQueryReducer from '@enokh-blocks/editor/blocks/QueryLoopBlock/hooks/useQueryReducer';
import _isEmpty from 'lodash/isEmpty';

const BlockInspectorControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { inheritQuery, showOnlyTopLevel, taxonomyType } = attributes;
    const { queryState, insertParameters, setParameter, removeParameter } = useQueryReducer( attributes.query );
    const [ displayParameterSelect, setDisplayParameterSelect ] = useState( false );
    const taxonomies = useTaxonomies();
    const taxonomiesOptions = useMemo(
        () =>
            taxonomies
                .filter( ( tax ) => 'nav_menu' !== tax.slug )
                .map( ( tax ) => ( { value: tax.slug, label: tax.name } ) ),
        [ JSON.stringify( taxonomies ) ]
    );

    useEffect( () => {
        if ( _isEmpty( attributes.query ) ) {
            insertParameters( {
                taxonomyType: 'category',
                terms_number: '',
                hide_empty: true,
            } );
        }
    }, [] );

    useEffect( () => {
        setAttributes( { query: queryState } );
    }, [ JSON.stringify( queryState ), ! isEqual( attributes.query, queryState ) ] );

    const parameterOptions = useMemo(
        () =>
            queryParameterOptions.map( ( parameter: any ) => {
                parameter.isDisabled = ! parameter.isRepeatable && Object.keys( queryState ).includes( parameter.id );

                return parameter;
            } ),
        [ queryState ]
    );

    const selectTaxonomy = taxonomiesOptions.filter( ( option ) => option.value === taxonomyType );

    return (
        <InspectorControls>
            <CustomPanel
                title={ __( 'Query Parameters', 'enokh-blocks' ) }
                initialOpen={ false }
                className={ 'enokh-blocks-panel-label' }
                id="taxonomyListQueryParameters"
            >
                <ToggleControl
                    label={ __( 'Inherit query from template', 'enokh-blocks' ) }
                    help={ __(
                        'Toggle to use the global query context that is set with the current template, such as an archive or search.',
                        'enokh-blocks'
                    ) }
                    checked={ !! attributes.inheritQuery }
                    onChange={ ( value ) => setAttributes( { inheritQuery: value } ) }
                />
                { ! inheritQuery && (
                    <CustomSelectControl
                        wrapperStyles={ { marginBottom: '8px' } }
                        label={ __( 'Taxonomy', 'enokh-blocks' ) }
                        placeholder={ __( 'Select taxonomy', 'enokh-blocks' ) }
                        options={ taxonomiesOptions }
                        value={ selectTaxonomy }
                        onChange={ ( option ) => {
                            setAttributes( { taxonomyType: option.value } );
                            setParameter( 'taxonomyType', option.value );
                        } }
                        id={ 'enokh-blocks-simple-select' }
                        isLoading={ taxonomiesOptions.length === 0 }
                    />
                ) }
                <ToggleControl
                    label={ __( 'Show post counts', 'enokh-blocks' ) }
                    checked={ !! attributes.showPostCounts }
                    onChange={ ( value ) => {
                        setAttributes( { showPostCounts: value } );
                        if ( !! value ) {
                            setParameter( 'showPostCounts', true );
                        } else {
                            removeParameter( 'showPostCounts' );
                        }
                    } }
                />
                <ToggleControl
                    label={ __( 'Show empty taxonomies', 'enokh-blocks' ) }
                    checked={ !! attributes.showEmpty }
                    onChange={ ( value ) => {
                        setAttributes( { showEmpty: value } );
                        setParameter( 'hide_empty', ! value );
                    } }
                />
                <ToggleControl
                    label={ __( 'Show only top level taxonomies', 'enokh-blocks' ) }
                    checked={ !! attributes.showOnlyTopLevel }
                    onChange={ ( value ) => {
                        setAttributes( { showOnlyTopLevel: value } );
                        if ( !! value ) {
                            setParameter( 'showOnlyTopLevel', true );
                        } else {
                            removeParameter( 'showOnlyTopLevel' );
                        }
                    } }
                />
                { /*{ ! showOnlyTopLevel && (*/ }
                { /*    <ToggleControl*/ }
                { /*        label={ __( 'Show hierarchy', 'enokh-blocks' ) }*/ }
                { /*        checked={ !! attributes.showHierarchy }*/ }
                { /*        onChange={ ( value ) => {*/ }
                { /*            setAttributes({showHierarchy: value})*/ }
                { /*            if(!!value) {*/ }
                { /*                setParameter( 'showHierarchy', true )*/ }
                { /*            } else {*/ }
                { /*                removeParameter('showOnlyTopLevel');*/ }
                { /*            }*/ }
                { /*        } }*/ }
                { /*    />*/ }
                { /*) }*/ }

                <QueryParamList
                    query={ queryState }
                    setParameter={ setParameter }
                    removeParameter={ removeParameter }
                    attributes={ attributes }
                />

                { ! displayParameterSelect && (
                    <div style={ { marginBottom: '1.33em' } }>
                        <Button
                            isPrimary
                            text={ __( 'Add Parameter', 'enokh-blocks' ) }
                            onClick={ () => {
                                setDisplayParameterSelect( true );
                            } }
                        />
                    </div>
                ) }

                { displayParameterSelect && (
                    <QueryParamSelector
                        options={ parameterOptions }
                        onChange={ ( option ) => {
                            if (
                                !! option.isRepeatable &&
                                Array.isArray( option.default ) &&
                                !! option.repeatableDefaultValue
                            ) {
                                const parameterValue = !! queryState[ option.id ]
                                    ? queryState[ option.id ]
                                    : option.default;

                                setParameter( option.id, [ ...parameterValue, option.repeatableDefaultValue ] );
                            } else {
                                setParameter( option.id, option.default );
                            }

                            setDisplayParameterSelect( false );
                        } }
                    />
                ) }
            </CustomPanel>
        </InspectorControls>
    );
};

export default BlockInspectorControls;
