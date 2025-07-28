import CustomSelectControl from '../../../../components/CustomSelectControl';
import { __ } from '@wordpress/i18n';

const groupBy = function ( arr, key, common ) {
    const currentGroups = {};
    return arr.reduce( ( grouped, obj ) => {
        const groupKey = obj[ key ] || common;

        if ( ! Object.keys( currentGroups ).includes( groupKey ) ) {
            const length = grouped.push( { label: groupKey, options: [ obj ] } );
            currentGroups[ groupKey ] = length - 1;
        } else {
            grouped[ currentGroups[ groupKey ] ].options.push( obj );
        }

        return grouped;
    }, [] );
};

const QueryParamSelector = ( props: any ): JSX.Element => {
    return (
        <CustomSelectControl
            id={ 'enokh-blocks-select-query-parameters' }
            label={ __( 'Select query parameter', 'enokh-blocks' ) }
            placeholder={ __( 'Select query parameter', 'enokh-blocks' ) }
            isSearchable
            pageSize={ 20 }
            { ...props }
            menuPlacement={ 'top' }
            options={ groupBy( props.options, 'group', 'Other' ) }
        />
    );
};
export default QueryParamSelector;
