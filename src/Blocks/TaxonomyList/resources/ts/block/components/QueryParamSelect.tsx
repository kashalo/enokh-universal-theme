import CustomSelectControl from '@enokh-blocks/components/CustomSelectControl';

const QueryParamSelect = ( props ) => {
    const { options, value } = props;

    return (
        <CustomSelectControl
            { ...props }
            id={ 'enokh-blocks-simple-select' }
            value={ options.filter( ( option ) => option.value === value ) }
        />
    );
};

export default QueryParamSelect;
