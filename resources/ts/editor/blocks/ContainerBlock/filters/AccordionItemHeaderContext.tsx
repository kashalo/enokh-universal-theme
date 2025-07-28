import { addFilter } from '@wordpress/hooks';
import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';

addFilter(
    'enokh-blocks.editor.blockContext',
    'enokh-blocks/container-context/accordion-item-header-context',
    ( context, props ) => {
        const { name } = props;

        if ( 'enokh-blocks/container' !== name ) {
            return context;
        }

        const { isAccordionItemHeader } = props.attributes;

        if ( ! isAccordionItemHeader ) {
            return context;
        }

        const newContext = defaultsDeep(
            {
                id: 'container',
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
                        zIndex: false,
                        position: false,
                        overflow: false,
                        themeWidth: false,
                    },
                },
            },
            defaultContext
        );
        return {
            ...context,
            ...newContext,
        };
    }
);
