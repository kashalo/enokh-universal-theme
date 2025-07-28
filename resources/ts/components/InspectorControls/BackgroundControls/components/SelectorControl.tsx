import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

const SelectorControl = ( props: SelectorControlProps ): JSX.Element => {
    const { value, onChange, position, useInnerContainer } = props;
    let help = null;

    if ( ! useInnerContainer && 'pseudo-element' === value ) {
        help = __(
            'Note: This image will sit on top of content inside this Container unless the content has its own Container with "Position" set to "Relative" (Layout panel).',
            'enokh-blocks'
        );

        if ( ! position ) {
            help = __(
                'Note: You need to set your "Position" option to "Relative" (Layout panel) or this image will overflow out of this Container.',
                'enokh-blocks'
            );
        }
    }


    return (
        <SelectControl
            label={ __( 'Selector', 'enokh-blocks' ) }
            // @ts-ignore
            value={ value }
            options={ [
                { label: __( 'Element', 'enokh-blocks' ), value: 'element' },
                { label: __( 'Pseudo Element', 'enokh-blocks' ), value: 'pseudo-element' },
            ] }
            onChange={ onChange }
            help={ help }
        />
    );
};
export default SelectorControl;
