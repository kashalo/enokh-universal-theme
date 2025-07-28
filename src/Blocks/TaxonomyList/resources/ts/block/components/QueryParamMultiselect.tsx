import CustomSelectControl from '@enokh-blocks/components/CustomSelectControl';

const QueryParamMultiselect = ( props ) => {
    const { options, value } = props;

    return (
        <CustomSelectControl
            { ...props }
            isMulti
            id={ 'enokh-blocks-simple-multi-select' }
            value={ options.filter( ( option ) => value.includes( option.value ) ) }
        />
    );
};

export default QueryParamMultiselect;
