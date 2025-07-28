import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { BaseControl } from '@wordpress/components';

const CustomSelectControl = ( props: any ): JSX.Element => {
    const customStyles = {
        indicatorSeparator: () => ( {
            display: 'none',
        } ),

        indicatorsContainer: ( provided ) => ( {
            ...provided,
            maxHeight: '30px',
        } ),

        menuPortal: ( base ) => ( {
            ...base,
            zIndex: 999999,
        } ),

        control: ( base ) => ( {
            ...base,
            marginBottom: '8px',
        } ),
        valueContainer: ( base ) => ( {
            ...base,
            padding: '0 6px',
        } ),
        input: ( base ) => ( {
            ...base,
            margin: 0,
            padding: 0,
        } ),
    };

    const customTheme = ( provided ) => ( {
        borderRadius: 2,
        colors: {
            ...provided.colors,
            primary: 'var(--wp-admin-theme-color)',
            neutral20: '#757575',
            neutral30: '#757575',
        },
        spacing: {
            controlHeight: 30,
            baseUnit: 3,
            menuGutter: 3,
        },
    } );

    const defaultProps = {
        className: 'enokh-blocks-advanced-select',
        classNamePrefix: 'enokh-blocks-advanced-select',
        isSearchable: false,
        styles: customStyles,
        instanceId: 'input-field',
        maxMenuHeight: 250,
        theme: customTheme,
        menuPortalTarget: document.querySelector( 'body' ),
        menuPlacement: 'auto',
    };

    const wrapperStyles = Object.assign(
        {},
        {
            marginBottom: '24px',
        },
        props?.wrapperStyles
    );

    const SelectComponent = props?.isCreatable ? CreatableSelect : Select;

    const finalProps = Object.assign( {}, defaultProps, props );

    return (
        <div className="enokh-blocks-advanced-select" style={ wrapperStyles }>
            <BaseControl id={ finalProps.id } label={ finalProps.label } help={ finalProps.help }>
                <SelectComponent { ...finalProps } />
            </BaseControl>
        </div>
    );
};

export default CustomSelectControl;
