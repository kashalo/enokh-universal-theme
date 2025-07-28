import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Tooltip } from '@wordpress/components';
import { link, linkOff } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';
import UnitControl from '../UnitControl';
import { isNumeric } from '../../utils';

const labels = {
    default: [
        __( 'Top', 'enokh-blocks' ),
        __( 'Left', 'enokh-blocks' ),
        __( 'Right', 'enokh-blocks' ),
        __( 'Bottom', 'enokh-blocks' ),
    ],
    borderRadius: [
        __( 'Top Left', 'enokh-blocks' ),
        __( 'Top Right', 'enokh-blocks' ),
        __( 'Bottom Left', 'enokh-blocks' ),
        __( 'Bottom Right ', 'enokh-blocks' ),
    ],
};

const DimensionsControl = ( props: DimensionsControlProps ): JSX.Element => {
    const {
        label = __( 'Padding', 'enokh-blocks' ),
        units = [],
        attributeNames = [],
        values,
        placeholders,
        onChange,
    } = props;

    const attributes = attributeNames.reduce( ( o, k ) => {
        o[ k ] = values[ k ];

        return o;
    }, {} );

    const [ sync, setSync ] = useState( false );
    const [ lastFocused, setLastFocused ] = useState( '' );

    useEffect( () => {
        const areAllValuesEqual = ( arr ) =>
            arr.length === attributeNames.length && arr.every( ( value ) => value === arr[ 0 ] );
        const attributeValues = Object.values( attributes ).filter( ( n ) => n );
        setSync( areAllValuesEqual( attributeValues ) );
    }, [ JSON.stringify( attributes ) ] );

    const syncUnits = () => {
        const sides = [ ...attributeNames ].reverse();

        const firstValue = sides.reduce( ( result, key ) => {
            return attributes[ key ] || isNumeric( attributes[ key ] ) ? attributes[ key ] : result;
        }, '' );

        if ( ! firstValue ) {
            setSync( ! sync );

            return;
        }

        const syncValue = lastFocused ? attributes[ lastFocused ] : firstValue;

        const newAttributes = attributeNames.reduce( ( o, key ) => ( { ...o, [ key ]: syncValue } ), {} );
        onChange( newAttributes );
        setSync( ! sync );
    };

    const style = attributeNames.find( ( name ) => name.includes( 'Radius' ) ) ? 'corners' : 'circle';

    return (
        <BaseControl className="enokh-blocks-dimensions-control" label={ label } id={ attributeNames[ 0 ] }>
            <Tooltip text={ !! sync ? __( 'Unlink Sides', 'enokh-blocks' ) : __( 'Link Sides', 'enokh-blocks' ) }>
                <Button
                    className="enokh-blocks-dimensions-control_sync"
                    aria-label={ !! sync ? __( 'Unlink Sides', 'enokh-blocks' ) : __( 'Link Sides', 'enokh-blocks' ) }
                    // @ts-ignore
                    variant={ !! sync ? 'primary' : '' }
                    aria-pressed={ !! sync }
                    onClick={ () => syncUnits() }
                >
                    { !! sync ? link : linkOff }
                </Button>
            </Tooltip>

            <div
                className={ 'enokh-blocks-dimensions-control__inputs style-' + style }
                style={ { display: !! sync ? 'block' : '' } }
            >
                { attributeNames.map( ( attributeName, index ) => {
                    if ( sync && index > 0 ) {
                        return null;
                    }

                    return (
                        <div key={ attributeName }>
                            <UnitControl
                                id={ attributeName }
                                value={ attributes[ attributeName ] || '' }
                                placeholder={ placeholders[ attributeName ] || '' }
                                units={ units }
                                onChange={ ( value ) => {
                                    let newAttributes = {};

                                    if ( sync ) {
                                        newAttributes = attributeNames.reduce(
                                            ( o, key ) => ( { ...o, [ key ]: value } ),
                                            {}
                                        );
                                    } else {
                                        newAttributes[ attributeName ] = value;
                                    }

                                    onChange( newAttributes );
                                } }
                                // @ts-ignore
                                onFocus={ () => setLastFocused( attributeName ) }
                            />

                            { ! sync && (
                                <label htmlFor={ attributeName } className="enokh-blocks-dimensions-control__label">
                                    { attributeName.includes( 'Radius' )
                                        ? labels.borderRadius[ index ]
                                        : labels.default[ index ] }
                                </label>
                            ) }
                        </div>
                    );
                } ) }
            </div>
        </BaseControl>
    );
};

export default DimensionsControl;
