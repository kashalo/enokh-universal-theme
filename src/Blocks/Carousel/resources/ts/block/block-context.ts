import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';

const carouselContext = defaultsDeep(
    {
        id: 'carousel',
        supports: {
            responsiveTabs: true,
            spacing: {
                enabled: true,
                padding: true,
                margin: false,
            },
        },
    },
    defaultContext
);

export default carouselContext;
