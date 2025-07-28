import PostTypeControl from '../../../../components/InspectorControls/DynamicContentControls/components/PostTypeControl';
import { ToggleControl, TextControl } from '@wordpress/components';
import { isArray, isObject } from 'lodash';
import QueryParamRemoveButton from './QueryParamRemoveButton';
import QueryParamSelect from './QueryParamSelect';
import QueryParamMultiselect from './QueryParamMultiselect';
import QueryParamDateTimePicker from './QueryParamDateTimePicker';
import QueryParamTaxonomyControl from './QueryParamTaxonomyControl';
import QueryParamPostsSelect from './QueryParamPostsSelect';

const getParameterControl = ( parameterType: string ) => {
    switch ( parameterType ) {
        case 'text':
        case 'number':
            return TextControl;
        case 'postTypeSelect':
            return PostTypeControl;
        case 'select':
            return QueryParamSelect;
        case 'toggleControl':
            return ToggleControl;
        case 'multiSelect':
            return QueryParamMultiselect;
        case 'dateTimePicker':
            return QueryParamDateTimePicker;
        case 'taxonomySelect':
            return QueryParamTaxonomyControl;
        case 'postsSelect':
            return QueryParamPostsSelect;
    }
};

const QueryParamControlItem = ( props: any ) => {
    const {
        id,
        type,
        label,
        description,
        selectOptions = [],
        isSticky,
        value,
        default: defaultValue,
        onChange,
        onClickRemove,
        dependencies,
        placeholder,
    } = props;

    const Control = getParameterControl( type );
    let controlDescription = description;

    if ( 'per_page' === id && ( '-1' === value || parseInt( value ) > 50 ) ) {
        controlDescription += `'Editor only: A maximum of 50 posts can be previewed in the editor.`;
    }

    const defaultValuePlaceholder =
        !! defaultValue && ( ! isArray( defaultValue ) || ! isObject( defaultValue ) ) ? defaultValue : undefined;

    const controlPlaceholder = placeholder || defaultValuePlaceholder;

    return (
        <>
            { Control && (
                <div className={ 'enokh-blocks-parameter-component' }>
                    <Control
                        id={ id }
                        type={ type }
                        label={ label }
                        help={ controlDescription }
                        options={ selectOptions }
                        value={ value }
                        placeholder={ controlPlaceholder }
                        onChange={ onChange }
                        { ...dependencies }
                    />
                    { ! isSticky && <QueryParamRemoveButton id={ id } onClick={ onClickRemove } /> }
                </div>
            ) }
        </>
    );
};

export default QueryParamControlItem;
