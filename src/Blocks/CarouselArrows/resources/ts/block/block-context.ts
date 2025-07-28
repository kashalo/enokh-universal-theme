import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';

const carouselArrowsContext = defaultsDeep(
    {
        id: 'carouselArrows',
        supports: {
            responsiveTabs: true,
        },
    },
    defaultContext
);

export default carouselArrowsContext;
