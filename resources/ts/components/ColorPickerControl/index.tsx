import { RgbStringColorPicker, RgbaStringColorPicker } from 'react-colorful';
import { colord } from 'colord';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { ColorPalette, useSetting } from '@wordpress/block-editor';
import { useState, useEffect, useMemo, useRef } from '@wordpress/element';
import { Tooltip, BaseControl, RangeControl, Dropdown, Button, TextControl } from '@wordpress/components';
import { hexToRGBA, getIcon } from '../../utils';
import _isUndefined from 'lodash/isUndefined';

const ColorPickerControls = ( props: ColorPickerControlsProps ): JSX.Element => {
    const { value, onChange, onOpacityChange, label, alpha = false, valueOpacity = 1, tooltip } = props;

    const [ valueState, setValueState ] = useState( value || '' );
    const inputRef = useRef( null );

    const Component = alpha && 1 === valueOpacity ? RgbaStringColorPicker : RgbStringColorPicker;

    const isHex = ( hex ) => {
        return /^([0-9A-F]{3}){1,2}$/i.test( hex );
    };
    const allColours = [];
    const customColors = useSetting( 'color.palette.custom' );
    const themeColors = useSetting( 'color.palette.theme' );

    if ( themeColors && themeColors.length > 0 ) {
        themeColors.map( ( colorItem ) => {
            delete colorItem.slug;
            return colorItem;
        } );
        allColours.push( ...themeColors );
    }
    if ( customColors && customColors.length > 0 ) {
        customColors.map( ( colorItem ) => {
            delete colorItem.slug;
            return colorItem;
        } );
        allColours.push( ...customColors );
    }

    const getPaletteValue = ( colorValue ) => {
        if ( String( colorValue ).startsWith( 'var(' ) ) {
            const variableName = colorValue.match( /\(([^)]+)\)/ );

            if ( variableName ) {
                const variableValue = getComputedStyle( document.documentElement ).getPropertyValue(
                    variableName[ 1 ]
                );

                if ( variableValue ) {
                    colorValue = variableValue;
                }
            }
        }

        return colord( colorValue ).toRgbString();
    };

    const rgbColor = useMemo( () => getPaletteValue( value ), [ value ] );
    const debouncedSetColor = useDebounce( onChange );

    useEffect( () => {
        if ( value !== valueState ) {
            setValueState( value );
        }
    }, [ value ] );

    useEffect( () => {
        // Normalize undefined to empty‐string
        const normalizedValueState = valueState ?? '';
        const normalizedValue = value ?? '';

        if ( normalizedValue !== normalizedValueState ) {
            debouncedSetColor( valueState );
        }

        // Keep the input focused.
        setTimeout( () => {
            if ( inputRef.current ) {
                inputRef.current.focus();
            }
        }, 10 );
    }, [ valueState ] );

    const [ selectedColor, setSelectedColor ] = useState( '' );

    return (
        <div className="enokh-blocks-color-component">
            { !! label && <span className="enokh-blocks-color-component__label">{ label }</span> }

            <Dropdown
                className="enokh-blocks-color-component__toggle"
                contentClassName="enokh-blocks-color-component-content"
                popoverProps={ { placement: 'top-start' } }
                renderToggle={ ( { isOpen, onToggle } ) => {
                    const button = (
                        <Button
                            className="enokh-blocks-color-component__toggle-button"
                            onClick={ onToggle }
                            aria-expanded={ isOpen }
                        >
                            <span
                                className="enokh-blocks-color-component__toggle-indicator"
                                style={ { background: value ? hexToRGBA( value, valueOpacity ) : null } }
                            />
                        </Button>
                    );

                    return <>{ !! tooltip ? <Tooltip text={ tooltip }>{ button }</Tooltip> : button }</>;
                } }
                renderContent={ () => (
                    <>
                        <Component
                            color={ rgbColor }
                            onChange={ ( nextColor ) => {
                                if ( colord( nextColor ).isValid() ) {
                                    const alphaValue = colord( nextColor ).alpha();
                                    nextColor = 1 === alphaValue ? colord( nextColor ).toHex() : nextColor;
                                }

                                setValueState( nextColor );
                            } }
                        />

                        <div className="enokh-blocks-color-component-content__input-wrapper">
                            <TextControl
                                ref={ inputRef }
                                className="enokh-blocks-color-input"
                                type={ 'text' }
                                value={ valueState }
                                onChange={ ( nextColor ) => {
                                    if ( ! nextColor.startsWith( '#' ) && isHex( nextColor ) ) {
                                        nextColor = '#' + nextColor;
                                    }

                                    setValueState( nextColor );
                                } }
                                onBlur={ () => {
                                    if ( colord( value ).isValid() ) {
                                        const alphaValue = colord( value ).alpha();

                                        if ( 1 === alphaValue ) {
                                            setValueState( colord( value ).toHex() );
                                        }
                                    }
                                } }
                            />

                            <Button
                                isSmall
                                isSecondary
                                className="enokh-blocks-color-input-clear"
                                onClick={ () => {
                                    setValueState( '' );

                                    if ( alpha && 1 !== valueOpacity ) {
                                        onOpacityChange( 1 );
                                    }
                                } }
                            >
                                { __( 'Clear', 'enokh-blocks' ) }
                            </Button>
                        </div>

                        { alpha && 1 !== valueOpacity && (
                            <div className="enokh-blocks-color-component-content__opacity">
                                <Tooltip text={ __( 'Opacity', 'enokh-blocks' ) }>{ getIcon( 'gradient' ) }</Tooltip>

                                <RangeControl
                                    value={ valueOpacity ? valueOpacity : 0 }
                                    onChange={ ( opacityValue ) => onOpacityChange( opacityValue ) }
                                    min={ 0 }
                                    max={ 1 }
                                    step={ 0.01 }
                                    initialPosition={ 1 }
                                />
                            </div>
                        ) }

                        <BaseControl className="enokh-blocks-color-component-content__palette">
                            <ColorPalette
                                value={ value ? value : '' }
                                colors={ allColours }
                                onChange={ ( color ) => {
                                    setSelectedColor( color );
                                    setValueState( color );
                                } }
                                disableCustomColors={ true }
                                clearable={ false }
                            />
                        </BaseControl>
                    </>
                ) }
            />
        </div>
    );
};
export default ColorPickerControls;
