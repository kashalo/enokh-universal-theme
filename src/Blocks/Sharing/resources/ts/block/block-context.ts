import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';

const sharingContext = defaultsDeep(
    {
        id: 'sharing',
        supports: {
            responsiveTabs: true,
            layout: {
                enabled: true,
                display: true,
                flexDirection: true,
                flexWrap: true,
                alignItems: true,
                justifyContent: true,
                columnGap: true,
                rowGap: true,
                zIndex: true,
                position: true,
            },
            flexChildPanel: {
                enabled: true,
                flex: true,
                order: true,
            },
            spacing: {
                enabled: true,
                padding: true,
                margin: true,
            },
        },
    },
    defaultContext
);

export default sharingContext;
