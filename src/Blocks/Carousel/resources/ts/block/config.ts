import { __ } from '@wordpress/i18n';
import { carouselOption, heightOption } from './enum';

const variantOptions = [
    {
        label: __( 'Default', 'enokh-blocks' ),
        value: carouselOption.Default,
    },
    {
        label: __( 'Cover flow', 'enokh-blocks' ),
        value: carouselOption.Coverflow,
    },
];

const heightOptions = [
    {
        label: __( 'Adaptive', 'enokh-blocks' ),
        value: heightOption.Adaptive,
    },
    {
        label: __( 'Fixed', 'enokh-blocks' ),
        value: heightOption.Fixed,
    },
];

export { variantOptions, heightOptions };
