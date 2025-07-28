import paramOptions from '../query-parameters';
import QueryParamControl from './QueryParamControl';
import { __ } from '@wordpress/i18n';

const getParametersList = ( query ) => {
    const options = paramOptions.filter( ( param ) => param.isSticky );

    return options.concat(
        Object.keys( query )
            .map( ( id ) => paramOptions.find( ( param ) => id === param.id && ! param.isSticky ) )
            .filter( Boolean )
    );
};
const QueryParamList = ( props: any ): JSX.Element => {
    const { query, setParameter, removeParameter, attributes } = props;
    const parameterList = getParametersList( query );
    const postTypeConfig = {
        id: 'post_type',
        type: 'postTypeSelect',
        default: 'post',
        label: __( 'Post type', 'enokh-blocks' ),
        description: __( 'Retrieves posts by post types.', 'enokh-blocks' ),
        group: __( 'Post type', 'enokh-blocks' ),
        isSticky: true,
    };
    return (
        <>
            { ! attributes.inheritQuery && (
                <div style={ { marginBottom: '1.33em' } }>
                    <QueryParamControl
                        key="post_type"
                        parameter={ postTypeConfig }
                        query={ query }
                        setParameter={ setParameter }
                        removeParameter={ removeParameter }
                    />
                </div>
            ) }
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
