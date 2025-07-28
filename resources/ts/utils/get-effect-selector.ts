const getEffectSelector = ( effectData: Array< any >, attributes: any, selector: string, key: number ): object => {
    const effects = effectData;

    let state = '';

    if ( 'undefined' !== typeof effects[ key ].state && 'normal' !== effects[ key ].state ) {
        state = effects[ key ].state;
    }

    let device = '';

    if ( 'undefined' !== typeof effects[ key ].device && 'all' !== effects[ key ].device ) {
        device = effects[ key ].device;
    }

    let backgroundType = '';

    if ( 'background' === effects[ key ].type ) {
        backgroundType = 'background';
    } else if ( 'gradient' === effects[ key ].type ) {
        backgroundType = 'gradient';
    }

    let element = 'element' + backgroundType + state + device;

    if ( effects[ key ].target && 'self' !== effects[ key ].target ) {
        element = effects[ key ].target + backgroundType + state + device;

        if ( effects[ key ].customSelector ) {
            element = effects[ key ].customSelector + backgroundType + state + device;
        }
    }

    if ( 'hover' === state ) {
        state = ':hover';
    }

    let effectSelector = selector + state;

    if ( 'innerContainer' === effects[ key ].target ) {
        effectSelector = '.enokh-blocks-container-' + attributes.uniqueId + state + ' > .enokh-blocks-inside-container';
    }

    if ( 'backgroundImage' === effects[ key ].target ) {
        effectSelector = selector + state + ':before';
    }

    if ( 'icon' === effects[ key ].target ) {
        effectSelector = selector + state + ' .enokh-blocks-icon';
    }

    if ( 'customSelector' === effects[ key ].target ) {
        effectSelector = selector + state + ' ' + effects[ key ].customSelector;
    }

    if ( 'pseudo-element' === effects[ key ].target ) {
        effectSelector = selector + state + ':before';

        if ( 'undefined' !== typeof effects[ key ].direction ) {
            effectSelector = selector + state + ':after';
        }
    }

    return {
        element,
        effectSelector,
    };
};
export default getEffectSelector;
