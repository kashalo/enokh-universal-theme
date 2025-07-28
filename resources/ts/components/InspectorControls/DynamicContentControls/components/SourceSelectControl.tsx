import { __ } from '@wordpress/i18n';
import CustomSelectControl from '../../../CustomSelectControl';

const getOptions = ( dynamicContentType, name ) => {
    if ( name === 'enokh-blocks/icon' ) {
        return [ { value: 'taxonomy', label: __( 'Taxonomy', 'enokh-blocks' ) } ];
    }

    return [
        {
            value: 'current-post',
            label:
                'caption' === dynamicContentType
                    ? __( 'Current image', 'enokh-blocks' )
                    : __( 'Current post', 'enokh-blocks' ),
        },
        { value: 'current-term', label: __( 'Current Term', 'enokh-blocks' ) },
        { value: 'post-type', label: __( 'Post type', 'enokh-blocks' ) },
    ];
};

export default ( props: SourceSelectControlProps ) => {
    const { postType, onChange, help, name } = props;
    const options: any = getOptions( props.value, name );
    const value = options.filter( ( option ) => option.value === postType );

    return (
        <CustomSelectControl
            id={ 'enokh-blocks-select-source-control' }
            label={ __( 'Data source', 'enokh-blocks' ) }
            help={ help }
            placeholder={ __( 'Select source', 'enokh-blocks' ) }
            options={ options }
            value={ value }
            onChange={ onChange }
        />
    );
};
