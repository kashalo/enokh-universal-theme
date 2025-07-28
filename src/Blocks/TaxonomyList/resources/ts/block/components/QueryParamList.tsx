import paramOptions from '../query-parameters';
import QueryParamControl from './QueryParamControl';

const getParametersList = ( query ) => {
    const options = paramOptions.filter( ( param ) => param.isSticky );

    return options.concat(
        Object.keys( query )
            .map( ( id ) => paramOptions.find( ( param ) => id === param.id && ! param.isSticky ) )
            .filter( Boolean )
    );
};
const QueryParamList = ( props: any ): JSX.Element => {
    const { query, setParameter, removeParameter } = props;
    const parameterList = getParametersList( query );
    return (
        <>
            <div style={ { marginBottom: '1.33em' } }>
                { parameterList &&
                    parameterList.map( ( parameter ) => (
                        <QueryParamControl
                            key={ parameter.id }
                            parameter={ parameter }
                            query={ query }
                            setParameter={ setParameter }
                            removeParameter={ removeParameter }
                        />
                    ) ) }
            </div>
        </>
    );
};

export default QueryParamList;
