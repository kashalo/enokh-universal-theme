import React from 'react';
import { BlockControlsProps, BlockInspectorControlProps } from '../types';
import { variantOptions } from '../config';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

const DisplayControls: React.FunctionComponent< BlockControlsProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { id } = useContext( BlockContext );
    const { variant } = attributes;
    return (
        <CustomPanel id={ `${ id }DisplayControls` } title={ __( 'Display', 'enokh-blocks' ) } initialOpen={ false }>
            <SelectControl
                label={ __( 'Display', 'enokh-blocks' ) }
                value={ variant }
                options={ variantOptions }
                onChange={ ( value: string ) =>
                    setAttributes( {
                        variant: value,
                    } )
                }
            />
        </CustomPanel>
    );
};

export default DisplayControls;
