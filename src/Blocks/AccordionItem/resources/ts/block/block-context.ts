import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';

const accordionItemContext = defaultsDeep(
    {
        id: 'accordion-item',
        supports: {
            responsiveTabs: true,
        },
    },
    defaultContext
);

export default accordionItemContext;
