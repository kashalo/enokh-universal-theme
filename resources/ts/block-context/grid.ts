import defaultContext from './default';
import { defaultsDeep } from 'lodash';

const gridContext = defaultsDeep(
    {
        id: 'container',
        supports: {
            responsiveTabs: true,
            layout: {
                enabled: true,
                display: true,
                flexDirection: false,
                flexWrap: false,
                alignItems: false,
                justifyContent: false,
                columnGap: false,
                rowGap: false,
                zIndex: false,
                position: false,
                overflow: false,
                themeWidth: false,
            },
            dividerPanel: {
                enabled: true,
            },
        },
    },
    defaultContext
);

export default gridContext;
