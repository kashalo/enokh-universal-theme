import React from 'react';
import { BlockInspectorControlProps } from '../types';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { __ } from '@wordpress/i18n';
import { alignItemsOptions, justifyContentOptions } from '../config';
import LayoutControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/LayoutControl';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import { compose } from '@wordpress/compose';
import withDeviceType from '@enokh-blocks/hoc/withDeviceType';

const LayoutControls: React.FunctionComponent< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { id, deviceType } = useContext( BlockContext );
    const directionValue = 'row';

    return (
        <CustomPanel id={ `${ id }LayoutControls` } title={ __( 'Layout', 'enokh-blocks' ) } initialOpen={ false }>
            <LayoutControl
                value={ getAttribute( 'alignItems', props ) }
                onChange={ ( value ) =>
                    setAttributes( {
                        [ getAttribute( 'alignItems', props, true ) ]:
                            value !== getAttribute( 'alignItems', props ) ? value : '',
                    } )
                }
                label={ __( 'Align Items', 'enokh-blocks' ) }
                attributeName="alignItems"
                directionValue={ directionValue }
                fallback={ getResponsivePlaceholder( 'alignItems', attributes, deviceType, '' ) }
                options={ alignItemsOptions }
            />

            <LayoutControl
                value={ getAttribute( 'justifyContent', props ) }
                onChange={ ( value ) =>
                    setAttributes( {
                        [ getAttribute( 'justifyContent', props, true ) ]:
                            value !== getAttribute( 'justifyContent', props ) ? value : '',
                    } )
                }
                label={ __( 'Justify Content', 'enokh-blocks' ) }
                attributeName="justifyContent"
                directionValue={ directionValue }
                fallback={ getResponsivePlaceholder( 'justifyContent', attributes, deviceType, '' ) }
                options={ justifyContentOptions }
            />
        </CustomPanel>
    );
};

export default compose( withDeviceType )( LayoutControls ) as React.FunctionComponent<any> ;
