import QueryParamControlItem from './QueryParamControlItem';

const attributeValueNormalizer = ( attribute: string, value: any ) => {
    switch ( attribute ) {
        case 'order':
        case 'orderby':
        case 'isFeaturedTerm':
            return value.value;

        default:
            return value;
    }
};

const QueryParamControl = ( props: any ) => {
    const { parameter, query, setParameter, removeParameter } = props;
    const { dependencies = {} } = parameter;
    const parameterValue = query[ parameter.id ];

    function onChangeControl( newValue ) {
        setParameter( parameter.id, attributeValueNormalizer( parameter.id, newValue ) );
    }

    const dependenciesValues = Object.keys( dependencies ).reduce( ( dependenciesProps, dependencyKey ) => {
        dependenciesProps[ dependencyKey ] = query[ dependencies[ dependencyKey ] ] || dependencies[ dependencyKey ];

        return dependenciesProps;
    }, {} );

    function ParameterControl( value, onChange, onClickRemove, index ) {
        return (
            <QueryParamControlItem
                { ...parameter }
                value={ value }
                onChange={ onChange }
                onClickRemove={ onClickRemove }
                dependencies={ dependenciesValues }
                key={ index }
            />
        );
    }

    if ( ! parameter.isRepeatable ) {
        return ParameterControl( parameterValue, onChangeControl, removeParameter, parameter.id );
    }

    return (
        <>
            { Array.isArray( parameterValue ) &&
                parameterValue.map( ( value, idx ) => {
                    const onChange = ( newValue ) => {
                        parameterValue[ idx ] = newValue;
                        setParameter( parameter.id, [ ...parameterValue ] );
                    };

                    const onClickRemove = ( id ) => {
                        parameterValue.splice( idx, 1 );

                        if ( parameterValue.length === 0 ) {
                            removeParameter( id );
                        } else {
                            setParameter( parameter.id, [ ...parameterValue ] );
                        }
                    };
                    return ParameterControl( value, onChange, onClickRemove, `${ parameter.id }${ idx }` );
                } ) }
        </>
    );
};

export default QueryParamControl;
