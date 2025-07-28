import CustomSelectControl from '../../../CustomSelectControl';
import { usePostTypes } from '../../../../stores';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const PostTypeControl = ( props: PostTypeControlProps ): JSX.Element => {
    const { postType, onChange, value, help } = props;
    const postTypes = usePostTypes();

    const enabledPostTypes = useMemo( () => {
        return postTypes.filter( ( type ) => type.viewable && 'attachment' !== type.slug );
    }, [ postTypes ] );

    const postTypeOptions = useMemo( () => {
        return enabledPostTypes.reduce( ( result, type ) => {
            result.push( { value: type.slug, label: type.name } );
            return result;
        }, [] );
    }, [ enabledPostTypes ] );

    const selectValue = postTypeOptions.filter( ( option ) => option.value === postType || option.value === value );

    return (
        <CustomSelectControl
            id={ 'enokh-blocks-select-post-type' }
            label={ __( 'Select post type', 'enokh-blocks' ) }
            help={ help }
            placeholder={ __( 'Select post type', 'enokh-blocks' ) }
            options={ postTypeOptions }
            value={ selectValue }
            onChange={ onChange }
            isLoading={ postTypeOptions.length === 0 }
        />
    );
};
export default PostTypeControl;
