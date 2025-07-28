import { useEffect, useState, useRef } from '@wordpress/element';
import { TextControl, BaseControl } from '@wordpress/components';
import { useSetting } from '@wordpress/block-editor';
import classnames from 'classnames';

import UnitDropdown from './UnitDropdown';
import unitList from './unit-list';
import _isUndefined from 'lodash/isUndefined';

const UnitControl = ( props: UnitControlProps ): JSX.Element => {
    const {
        label,
        units = [],
        defaultUnit = '',
        unitCount = 7,
        min = 0,
        max,
        step,
        id,
        disabled = false,
        overrideValue = null,
        overrideAction = () => null,
        onChange,
        value,
        placeholder,
        help = '',
        focusOnMount = false,
        onFocus = () => null,
        overrideUnits = false,
    } = props;

    const splitValues = ( values ) => {
        const unitRegex = unitList.join( '|' );
        const splitRegex = new RegExp( `(${ unitRegex })` );

        return values
            ? values
                  .toString()
                  .toLowerCase()
                  .split( splitRegex )
                  .filter( ( singleValue ) => '' !== singleValue )
            : [];
    };
    const unitsFromSetting = useSetting( 'spacing.units' );
    let visibleUnits = unitsFromSetting.length
        ? unitsFromSetting.slice( 0, unitCount )
        : units.concat( unitList ).slice( 0, unitCount );

    if ( units && units.length > 0 && !! overrideUnits ) {
        visibleUnits = units;
    }

    const getNumericValue = ( values ) => ( values.length > 0 ? values[ 0 ].trim() : '' );
    const defaultUnitValue = defaultUnit ? defaultUnit : visibleUnits[ 0 ];
    const getUnitValue = ( values ) => ( values.length > 1 ? values[ 1 ] : defaultUnitValue );

    /**
     * Split the current value for states
     */
    const splittedValues = splitValues( value );

    const [ unitValue, setUnitValue ] = useState( getUnitValue( splittedValues ) || '' );
    const [ numericValue, setNumericValue ] = useState( getNumericValue( splittedValues ) || '' );
    const [ placeholderValue, setPlaceholderValue ] = useState( '' );
    const isMounted = useRef( false );
    const wrapperRef = useRef( false );
    const inputRef = useRef( false );

    // Test if the value starts with a number, decimal or a single dash.
    const startsWithNumber = ( number ) => /^([-]?\d|[-]?\.)/.test( number );

    const setPlaceholders = () => {
        if ( ! value ) {
            const placeholderValues = overrideValue ? splitValues( overrideValue ) : splitValues( placeholder );

            setPlaceholderValue( getNumericValue( placeholderValues ) );
            setUnitValue( getUnitValue( placeholderValues ) );
        }
    };

    // Split the number and unit into two values.
    useEffect( () => {
        const newValue = overrideValue && disabled ? overrideValue : value;

        if ( startsWithNumber( newValue ) ) {
            const values = splitValues( newValue );

            setNumericValue( getNumericValue( values ) );
            setUnitValue( getUnitValue( values ) );
        } else {
            setNumericValue( newValue );
            setUnitValue( '' );
        }

        setPlaceholders();
    }, [ value, overrideValue ] );

    useEffect( () => {
        // Don't run this on first render.
        if ( ! isMounted.current ) {
            isMounted.current = true;
            return;
        }

        const hasOverride = !! overrideValue && !! disabled;

        const fullValue = startsWithNumber( numericValue ) ? numericValue + unitValue : numericValue;

        // Clear the placeholder if the units don't match.
        if ( ! fullValue ) {
            if ( unitValue !== getUnitValue( splitValues( placeholder ) ) ) {
                setPlaceholderValue( '' );
            } else {
                setPlaceholders();
            }
        }

        // Normalize undefined to empty‐string
        const normalizedFull = fullValue ?? '';
        const normalizedCurrent = value ?? '';

        if ( ! hasOverride && normalizedFull !== normalizedCurrent ) {
            onChange( fullValue );
        }
    }, [ numericValue, unitValue ] );

    useEffect( () => {
        if ( focusOnMount && inputRef?.current ) {
            // @ts-ignore
            inputRef.current.focus();
        }
    }, [ label ] );


    return (
        <BaseControl
            label={ label }
            help={ help }
            id={ id }
            className={ classnames( {
                'enokh-blocks-unit-control': true,
                'enokh-blocks-unit-control__disabled': !! disabled,
            } ) }
        >
            <div className="enokh-blocks-unit-control__input">
                <TextControl
                    type="text"
                    value={ numericValue }
                    placeholder={ placeholderValue }
                    id={ id }
                    min={ min }
                    max={ max }
                    step={ step }
                    autoComplete="off"
                    disabled={ disabled }
                    onChange={ ( newValue ) => setNumericValue( newValue ) }
                    onFocus={ () => {
                        onFocus();
                    } }
                    // @ts-ignore
                    ref={ inputRef }
                />

                <div className="enokh-blocks-unit-control__input--action">
                    { !! overrideAction && (
                        <div className="enokh-blocks-unit-control__override-action">{ overrideAction() } </div>
                    ) }

                    { ( startsWithNumber( numericValue ) ||
                        ( ! numericValue && ( ! placeholderValue || startsWithNumber( placeholderValue ) ) ) ) && (
                        <UnitDropdown
                            value={ unitValue }
                            disabled={ disabled || 1 === visibleUnits.length }
                            units={ visibleUnits }
                            onChange={ ( newValue ) => setUnitValue( newValue ) }
                        />
                    ) }
                </div>
            </div>
        </BaseControl>
    );
};
export default UnitControl;
