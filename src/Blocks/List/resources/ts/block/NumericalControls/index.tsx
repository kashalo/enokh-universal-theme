import { FC } from 'react';
import { BlockInspectorControlProps } from '../types';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { getAttribute } from '@enokh-blocks/utils';
import { listStyleOptions } from '../config';
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';

const NumericalControls: FC< BlockInspectorControlProps > = ( props ) => {
    const { attributes, setAttributes } = props;
    const { numerical } = attributes;
    const { id, deviceType } = useContext( BlockContext );
    /**
     * Attribute Names
     */
    const listStyleAttrName = getAttribute( 'listStyle', { attributes: numerical, deviceType }, true );
    const startValueAttrName = getAttribute( 'startValue', { attributes: numerical, deviceType }, true );
    const reverseOrderAttrName = getAttribute( 'reverseOrder', { attributes: numerical, deviceType }, true );

    return (
        <CustomPanel title={ __( 'Numerical Controls' ) } initialOpen={ false } id={ `${ id }NumericalControls` }>
            <SelectControl
                label={ __( 'List Style', 'enokh-blocks' ) }
                value={ numerical[ listStyleAttrName ] ?? '' }
                options={ listStyleOptions }
                onChange={ ( value: string ) =>
                    setAttributes( {
                        numerical: {
                            ...numerical,
                            [ listStyleAttrName ]: value,
                        },
                    } )
                }
            />
            { deviceType === 'Desktop' && (
                <TextControl
                    label={ __( 'Start value', 'enokh-blocks' ) }
                    type="number"
                    onChange={ ( value ) => {
                        const int = parseInt( value, 10 );

                        setAttributes( {
                            numerical: {
                                ...numerical,
                                [ startValueAttrName ]: isNaN( int ) ? null : int,
                            },
                        } );
                    } }
                    value={
                        Number.isInteger( numerical[ startValueAttrName ] )
                            ? numerical[ startValueAttrName ].toString( 10 )
                            : ''
                    }
                    step="1"
                />
            ) }
            { deviceType === 'Desktop' && (
                <ToggleControl
                    label={ __( 'Reverse order', 'enokh-blocks' ) }
                    checked={ numerical[ reverseOrderAttrName ] || false }
                    onChange={ ( value ) => {
                        setAttributes( {
                            numerical: {
                                ...numerical,
                                [ reverseOrderAttrName ]: value || false,
                            },
                        } );
                    } }
                />
            ) }
        </CustomPanel>
    );
};

export default NumericalControls;
