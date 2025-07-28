import { addFilter } from '@wordpress/hooks';
import defaultContext from '@enokh-blocks/block-context/default';
import { defaultsDeep } from 'lodash';

addFilter(
    'enokh-blocks.editor.blockContext',
    'enokh-blocks/container-context/accordion-item-header-inner-context',
    ( context, props ) => {
        const { name } = props;

        if ( 'enokh-blocks/container' !== name ) {
            return context;
        }

        const { isAccordionItemHeaderInner } = props.attributes;

        if ( ! isAccordionItemHeaderInner ) {
            return context;
        }

        const newContext = defaultsDeep(
            {
                id: 'container',
                supports: {
                    responsiveTabs: true,
                    settingsPanel: {
                        enabled: true,
                        icon: 'container-settings',
                    },
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
                    flexChildPanel: {
                        enabled: true,
                        flex: true,
                        order: true,
                    },
                    sizingPanel: {
                        enabled: true,
                        width: false,
                        height: false,
                        minWidth: true,
                        minHeight: true,
                        maxWidth: true,
                        maxHeight: true,
                        useGlobalMaxWidth: true,
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

        return {
            ...context,
            ...newContext,
        };
    }
);
