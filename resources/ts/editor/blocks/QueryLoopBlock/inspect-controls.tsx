import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useState } from '@wordpress/element';
import QueryParamSelector from './components/QueryParamSelector';
import QueryParamList from './components/QueryParamList';
import useQueryReducer from './hooks/useQueryReducer';
import queryParameterOptions from './query-parameters';
import { PanelBody, ToggleControl, Button } from '@wordpress/components';
import { isEqual } from 'lodash';

const QueryLoopBlockInspectorControls = ( props: QueryLoopBlockInspectorControlsProps ): JSX.Element => {
    const { attributes, setAttributes } = props;
    const { queryState, insertParameters, setParameter, removeParameter } = useQueryReducer( attributes.query );
    const [ displayParameterSelect, setDisplayParameterSelect ] = useState( false );
    const isObjectEmpty = ( obj: object ) =>
        obj && Object.keys( obj ).length === 0 && Object.getPrototypeOf( obj ) === Object.prototype;

    useEffect( () => {
        if ( isObjectEmpty( attributes.query ) ) {
            insertParameters( {
                post_type: 'post',
                per_page: 10,
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

    return (
        <InspectorControls>
            <PanelBody title={ __( 'Query Parameters', 'enokh-blocks' ) } initialOpen={ false }>
                <ToggleControl
                    label={ __( 'Inherit query from template', 'enokh-blocks' ) }
                    help={ __(
                        'Toggle to use the global query context that is set with the current template, such as an archive or search.',
                        'enokh-blocks'
                    ) }
                    checked={ !! attributes.inheritQuery }
                    onChange={ ( value ) => setAttributes( { inheritQuery: value } ) }
                />

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
            </PanelBody>
        </InspectorControls>
    );
};

export default QueryLoopBlockInspectorControls;
