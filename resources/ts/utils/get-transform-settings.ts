import { getEffectSelector } from '@enokh-blocks/utils';

type TransformAttributesType = ContainerBlockAttributes;

const getTransformData = ( attributes: TransformAttributesType, selector: string ) => {
    const transformData = {};
    const transforms = attributes.transforms;

    if ( ! transforms ) {
        return transformData;
    }

    Object.keys( transforms ).forEach( ( _, key ) => {
        const selectorData: any = getEffectSelector( transforms, attributes, selector, key );
        const transFormType: string = transforms[ key ].type ?? '';

        if ( typeof transformData[ selectorData.element ] === 'undefined' ) {
            transformData[ selectorData.element ] = {
                selector: selectorData.effectSelector,
                transforms: [],
                state: transforms[ key ].state,
                device: transforms[ key ].device,
            };
        }

        if ( transFormType === 'translate' ) {
            const translateX = !! transforms[ key ].translateX ? transforms[ key ].translateX : '0';
            const translateY = !! transforms[ key ].translateY ? transforms[ key ].translateY : '0';

            if ( translateX || translateY ) {
                transformData[ selectorData.element ].transforms.push(
                    'translate3d(' + translateX + ',' + translateY + ',0)'
                );
            }
        }

        if ( transFormType === 'rotate' ) {
            if ( transforms[ key ].rotate || 0 === transforms[ key ].rotate ) {
                transformData[ selectorData.element ].transforms.push( 'rotate(' + transforms[ key ].rotate + 'deg)' );
            }
        }

        if ( transFormType === 'scale' ) {
            if ( transforms[ key ].scale || 0 === transforms[ key ].scale ) {
                transformData[ selectorData.element ].transforms.push( 'scale(' + transforms[ key ].scale + ')' );
            }
        }
    } );

    return transformData;
};

export default getTransformData;
