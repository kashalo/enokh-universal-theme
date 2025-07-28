import { __ } from '@wordpress/i18n';
import { alignLeft, alignCenter, alignRight, alignJustify } from '@wordpress/icons';

const typographyOptions = {
    fontWeight: [
        { value: '', label: __( 'Default', 'enokh-blocks' ) },
        { value: 'normal', label: __( 'Normal', 'enokh-blocks' ) },
        { value: 'bold', label: __( 'Bold', 'enokh-blocks' ) },
        { value: '100', label: __( '100 - Thin', 'enokh-blocks' ) },
        { value: '200', label: __( '200 - Extra light', 'enokh-blocks' ) },
        { value: '300', label: __( '300 - Light', 'enokh-blocks' ) },
        { value: '400', label: __( '400 - Normal', 'enokh-blocks' ) },
        { value: '500', label: __( '500 - Medium', 'enokh-blocks' ) },
        { value: '600', label: __( '600 - Semi bold', 'enokh-blocks' ) },
        { value: '700', label: __( '700 - Bold', 'enokh-blocks' ) },
        { value: '800', label: __( '800 - Extra bold', 'enokh-blocks' ) },
        { value: '900', label: __( '900 - Black', 'enokh-blocks' ) },
    ],
    textTransform: [
        { value: '', label: __( 'Default', 'enokh-blocks' ) },
        { value: 'uppercase', label: __( 'Uppercase', 'enokh-blocks' ) },
        { value: 'lowercase', label: __( 'Lowercase', 'enokh-blocks' ) },
        { value: 'capitalize', label: __( 'Capitalize', 'enokh-blocks' ) },
        { value: 'initial', label: __( 'Normal', 'enokh-blocks' ) },
    ],
    alignments: [
        {
            icon: alignLeft,
            title: __( 'Align text left', 'enokh-blocks' ),
            align: 'left',
        },
        {
            icon: alignCenter,
            title: __( 'Align text center', 'enokh-blocks' ),
            align: 'center',
        },
        {
            icon: alignRight,
            title: __( 'Align text right', 'enokh-blocks' ),
            align: 'right',
        },
        {
            icon: alignJustify,
            title: __( 'Justify text', 'enokh-blocks' ),
            align: 'justify',
        },
    ],
};

export default typographyOptions;
