import classnames from 'classnames';
import { hasNumericValue, getIcon, getAttribute, getResponsivePlaceholder } from '../../../../utils';
import CustomRangeControl from '../../../CustomRangeControl';
import ColorPickerControl from '../../../ColorPickerControl';
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Tooltip, Button, TextControl, SelectControl, ToggleControl, BaseControl } from '@wordpress/components';
import UnitControl from '@enokh-blocks/components/UnitControl';
import FlexControl from '@enokh-blocks/components/FlexControl';
import FontWeightControl from '@enokh-blocks/components/InspectorControls/TypographyControls/components/FontWeightControl';
import TextTransformControl from '@enokh-blocks/components/InspectorControls/TypographyControls/components/TextTransformControl';
import LetterSpacingControl from '@enokh-blocks/components/InspectorControls/TypographyControls/components/LetterSpacingControl';

export default class EffectItemControl< T extends Record< string, any > > extends Component<
    EffectItemControlProps< T >
> {
    render() {
        const {
            attributes,
            setAttributes,
            effectType,
            effectName,
            effectOptions,
            effectLabel,
            onClose,
            useEffectName,
        } = this.props;

        const { bgOptions } = attributes;

        const effects = attributes[ effectName ];

        return (
            <>
                { effects.map( ( effect, index ) => {
                    return (
                        <Fragment key={ index }>
                            <div className="enokh-blocks-dropdown-container">
                                <div className="enokh-blocks-dropdown-header">
                                    <span className="enokh-blocks-dropdown-type-label">{ effectLabel }</span>

                                    <Tooltip text={ __( 'Delete Effect', 'enokh-blocks' ) }>
                                        <Button
                                            className="enokh-blocks-delete-transform"
                                            onClick={ () => {
                                                // eslint-disable-next-line
                                                if ( window.confirm( __( 'This will permanently delete this transform.', 'enokh-blocks' ) ) ) {
                                                    const effectValues = [ ...effects ];

                                                    effectValues.splice( index, 1 );
                                                    setAttributes( { [ effectName ]: effectValues } );

                                                    if ( effectValues.length === 0 ) {
                                                        setAttributes( { [ useEffectName ]: false } );
                                                        onClose();
                                                    }
                                                }
                                            } }
                                            icon={ getIcon( 'trash' ) }
                                        />
                                    </Tooltip>
                                </div>

                                <div className="enokh-blocks-dropdown-options">
                                    { 'transforms' === effectType && (
                                        <div className="enokh-blocks-transform-type">
                                            <SelectControl
                                                label={ __( 'Type', 'enokh-blocks' ) }
                                                value={ effects[ index ].type }
                                                options={ [
                                                    {
                                                        label: __( 'Choose..', 'enokh-blocks' ),
                                                        value: '',
                                                    },
                                                    {
                                                        label: __( 'Translate', 'enokh-blocks' ),
                                                        value: 'translate',
                                                    },
                                                    {
                                                        label: __( 'Rotate', 'enokh-blocks' ),
                                                        value: 'rotate',
                                                    },
                                                    {
                                                        label: __( 'Scale', 'enokh-blocks' ),
                                                        value: 'scale',
                                                    },
                                                ] }
                                                onChange={ ( value ) => {
                                                    const effectValues = [ ...effects ];

                                                    effectValues[ index ] = {
                                                        ...effectValues[ index ],
                                                        type: value,
                                                    };

                                                    setAttributes( {
                                                        [ effectName ]: effectValues,
                                                    } );
                                                } }
                                            />
                                        </div>
                                    ) }

                                    { 'filters' === effectType && (
                                        <div className="enokh-blocks-transform-type">
                                            <SelectControl
                                                label={ __( 'Type', 'enokh-blocks' ) }
                                                value={ effects[ index ].type }
                                                options={ [
                                                    {
                                                        label: __( 'Choose..', 'enokh-blocks' ),
                                                        value: '',
                                                    },
                                                    {
                                                        label: __( 'Blur', 'enokh-blocks' ),
                                                        value: 'blur',
                                                    },
                                                    {
                                                        label: __( 'Brightness', 'enokh-blocks' ),
                                                        value: 'brightness',
                                                    },
                                                    {
                                                        label: __( 'Contrast', 'enokh-blocks' ),
                                                        value: 'contrast',
                                                    },
                                                    {
                                                        label: __( 'Grayscale', 'enokh-blocks' ),
                                                        value: 'grayscale',
                                                    },
                                                    {
                                                        label: __( 'Hue-Rotate', 'enokh-blocks' ),
                                                        value: 'hue-rotate',
                                                    },
                                                    {
                                                        label: __( 'Invert', 'enokh-blocks' ),
                                                        value: 'invert',
                                                    },
                                                    {
                                                        label: __( 'Saturate', 'enokh-blocks' ),
                                                        value: 'saturate',
                                                    },
                                                    {
                                                        label: __( 'Sepia', 'enokh-blocks' ),
                                                        value: 'sepia',
                                                    },
                                                ] }
                                                onChange={ ( value ) => {
                                                    const effectValues = [ ...effects ];

                                                    effectValues[ index ] = {
                                                        ...effectValues[ index ],
                                                        type: value,
                                                    };

                                                    setAttributes( {
                                                        [ effectName ]: effectValues,
                                                    } );
                                                } }
                                            />
                                        </div>
                                    ) }

                                    <div className="enokh-blocks-dropdown-option-device">
                                        <SelectControl
                                            label={ __( 'Device', 'enokh-blocks' ) }
                                            value={ effects[ index ].device }
                                            options={ [
                                                { label: __( 'All', 'enokh-blocks' ), value: 'all' },
                                                {
                                                    label: __( 'Desktop', 'enokh-blocks' ),
                                                    value: 'desktop',
                                                },
                                                {
                                                    label: __( 'Tablet', 'enokh-blocks' ),
                                                    value: 'tablet-only',
                                                },
                                                {
                                                    label: __( 'Tablet + Mobile', 'enokh-blocks' ),
                                                    value: 'tablet',
                                                },
                                                {
                                                    label: __( 'Mobile', 'enokh-blocks' ),
                                                    value: 'mobile',
                                                },
                                            ] }
                                            onChange={ ( value ) => {
                                                const effectValues = [ ...effects ];

                                                effectValues[ index ] = {
                                                    ...effectValues[ index ],
                                                    device: value,
                                                };

                                                setAttributes( {
                                                    [ effectName ]: effectValues,
                                                } );
                                            } }
                                        />
                                    </div>

                                    <div className="enokh-blocks-dropdown-option-state">
                                        <SelectControl
                                            label={ __( 'State', 'enokh-blocks' ) }
                                            value={ effects[ index ].state }
                                            options={ [
                                                {
                                                    label: __( 'Normal', 'enokh-blocks' ),
                                                    value: 'normal',
                                                },
                                                { label: __( 'Hover', 'enokh-blocks' ), value: 'hover' },
                                            ] }
                                            onChange={ ( value ) => {
                                                const effectValues = [ ...effects ];

                                                effectValues[ index ] = {
                                                    ...effectValues[ index ],
                                                    state: value,
                                                };

                                                setAttributes( {
                                                    [ effectName ]: effectValues,
                                                } );
                                            } }
                                        />
                                    </div>

                                    { effectOptions.length > 1 && (
                                        <Fragment>
                                            <div
                                                className={ classnames(
                                                    'enokh-blocks-dropdown-option-target',
                                                    'backgroundImage' === effects[ index ].target
                                                        ? 'enokh-blocks-dropdown-target-bg-image'
                                                        : ''
                                                ) }
                                            >
                                                <SelectControl
                                                    label={ __( 'Target', 'enokh-blocks' ) }
                                                    value={ effects[ index ].target }
                                                    options={ effectOptions }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            target: value,
                                                        };

                                                        if ( 'backgroundImage' === value ) {
                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                                bgOptions: {
                                                                    ...bgOptions,
                                                                    selector: 'pseudo-element',
                                                                },
                                                            } );
                                                        } else {
                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                            } );
                                                        }
                                                    } }
                                                />

                                                { 'backgroundImage' === effects[ index ].target && (
                                                    <div className="enokh-blocks-dropdown-bg-image-notice">
                                                        <Tooltip
                                                            text={ __(
                                                                'Your background image must be set to Pseudo Element for effects to work.',
                                                                'enokh-blocks'
                                                            ) }
                                                        >
                                                            { getIcon( 'info' ) }
                                                        </Tooltip>
                                                    </div>
                                                ) }
                                            </div>

                                            { 'customSelector' === effects[ index ].target && (
                                                <div className="enokh-blocks-dropdown-custom-selector">
                                                    <TextControl
                                                        label={ __( 'Custom Selector', 'enokh-blocks' ) }
                                                        type={ 'text' }
                                                        placeholder=".enokh-blocks-icon"
                                                        value={
                                                            effects[ index ].customSelector
                                                                ? effects[ index ].customSelector
                                                                : ''
                                                        }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...effects ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                customSelector: value,
                                                            };

                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                            } );
                                                        } }
                                                    />
                                                </div>
                                            ) }
                                        </Fragment>
                                    ) }

                                    <div className="enokh-blocks-dropdown-separator"></div>

                                    { 'box-shadow' === effectType && (
                                        <Fragment>
                                            <div className="enokh-blocks-dropdown-option enokh-blocks-dropdown-option-no-grow">
                                                <BaseControl
                                                    id="enokh-blocks-box-shadow-inset"
                                                    label={ __( 'Inset', 'enokh-blocks' ) }
                                                >
                                                    <ToggleControl
                                                        checked={!!effects[index].inset}
                                                        onChange={(value) => {
                                                            const effectValues = [...effects];

                                                            effectValues[index] = {
                                                                ...effectValues[index],
                                                                inset: value,
                                                            };

                                                            setAttributes({
                                                                [effectName]: effectValues,
                                                            });
                                                        }} label={''}                                                    />
                                                </BaseControl>
                                            </div>

                                            <div className="enokh-blocks-dropdown-option enokh-blocks-dropdown-option-no-grow">
                                                <BaseControl
                                                    id="enokh-blocks-box-shadow-color"
                                                    label={ __( 'Color', 'enokh-blocks' ) }
                                                >
                                                    <ColorPickerControl
                                                        value={ effects[ index ].color }
                                                        alpha={ true }
                                                        valueOpacity={ effects[ index ].colorOpacity }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...effects ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                color: value,
                                                            };

                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                            } );
                                                        } }
                                                        onOpacityChange={ ( value ) => {
                                                            const effectValues = [ ...effects ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                colorOpacity: value,
                                                            };

                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                            } );
                                                        } }
                                                    />
                                                </BaseControl>
                                            </div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Horizontal Offset(px)', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].xOffset )
                                                            ? effects[ index ].xOffset
                                                            : ''
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            xOffset: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    rangeMin={ -50 }
                                                    rangeMax={ 50 }
                                                    step={ 1 }
                                                />
                                            </div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Vertical Offset(px)', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].yOffset )
                                                            ? effects[ index ].yOffset
                                                            : ''
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            yOffset: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    rangeMin={ -50 }
                                                    rangeMax={ 50 }
                                                    step={ 1 }
                                                />
                                            </div>

                                            <div className="enokh-blocks-dropdown-separator"></div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Blur(px)', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].blur )
                                                            ? effects[ index ].blur
                                                            : ''
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            blur: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    inputMin={ 0 }
                                                    rangeMin={ 0 }
                                                    rangeMax={ 50 }
                                                    step={ 1 }
                                                />
                                            </div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Spread(px)', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].spread )
                                                            ? effects[ index ].spread
                                                            : ''
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            spread: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    rangeMin={ -50 }
                                                    rangeMax={ 50 }
                                                />
                                            </div>
                                        </Fragment>
                                    ) }

                                    { 'text-shadow' === effectType && (
                                        <Fragment>
                                            <div className="enokh-blocks-dropdown-option enokh-blocks-dropdown-option-no-grow">
                                                <BaseControl
                                                    id="enokh-blocks-text-shadow-color"
                                                    label={ __( 'Color', 'enokh-blocks' ) }
                                                >
                                                    <ColorPickerControl
                                                        value={ effects[ index ].color }
                                                        alpha={ true }
                                                        valueOpacity={ effects[ index ].colorOpacity }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...effects ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                color: value,
                                                            };

                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                            } );
                                                        } }
                                                        onOpacityChange={ ( value ) => {
                                                            const effectValues = [ ...effects ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                colorOpacity: value,
                                                            };

                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                            } );
                                                        } }
                                                    />
                                                </BaseControl>
                                            </div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Horizontal Offset(px)', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].xOffset )
                                                            ? effects[ index ].xOffset
                                                            : ''
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            xOffset: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    rangeMin={ -50 }
                                                    rangeMax={ 50 }
                                                    step={ 1 }
                                                />
                                            </div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Vertical Offset(px)', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].yOffset )
                                                            ? effects[ index ].yOffset
                                                            : ''
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            yOffset: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    rangeMin={ -50 }
                                                    rangeMax={ 50 }
                                                    step={ 1 }
                                                />
                                            </div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Blur(px)', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].blur )
                                                            ? effects[ index ].blur
                                                            : ''
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            blur: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    inputMin={ 0 }
                                                    rangeMin={ 0 }
                                                    rangeMax={ 50 }
                                                    step={ 1 }
                                                />
                                            </div>
                                        </Fragment>
                                    ) }

                                    { 'transforms' === effectType && (
                                        <>
                                            { 'translate' === effects[ index ].type && (
                                                <>
                                                    <div className="enokh-blocks-dropdown-option">
                                                        <UnitControl
                                                            id="enokh-blocks-transform-translate-x"
                                                            label={ __( 'Translate X', 'enokh-blocks' ) }
                                                            value={
                                                                effects[ index ].translateX
                                                                    ? effects[ index ].translateX
                                                                    : ''
                                                            }
                                                            onChange={ ( value ) => {
                                                                const effectValues = [ ...effects ];

                                                                effectValues[ index ] = {
                                                                    ...effectValues[ index ],
                                                                    translateX: value,
                                                                };

                                                                setAttributes( {
                                                                    [ effectName ]: effectValues,
                                                                } );
                                                            } }
                                                        />
                                                    </div>

                                                    <div className="enokh-blocks-dropdown-option">
                                                        <UnitControl
                                                            id="enokh-blocks-transform-translate-x"
                                                            label={ __( 'Translate Y', 'enokh-blocks' ) }
                                                            value={
                                                                effects[ index ].translateY
                                                                    ? effects[ index ].translateY
                                                                    : ''
                                                            }
                                                            onChange={ ( value ) => {
                                                                const effectValues = [ ...effects ];

                                                                effectValues[ index ] = {
                                                                    ...effectValues[ index ],
                                                                    translateY: value,
                                                                };

                                                                setAttributes( {
                                                                    [ effectName ]: effectValues,
                                                                } );
                                                            } }
                                                        />
                                                    </div>
                                                </>
                                            ) }

                                            { 'rotate' === effects[ index ].type && (
                                                <Fragment>
                                                    <div className="enokh-blocks-dropdown-option">
                                                        <CustomRangeControl
                                                            label={ __( 'Rotate (deg)', 'enokh-blocks' ) }
                                                            value={
                                                                hasNumericValue( effects[ index ].rotate )
                                                                    ? effects[ index ].rotate
                                                                    : ''
                                                            }
                                                            onChange={ ( value ) => {
                                                                const effectValues = [ ...effects ];

                                                                effectValues[ index ] = {
                                                                    ...effectValues[ index ],
                                                                    rotate: value,
                                                                };

                                                                setAttributes( {
                                                                    [ effectName ]: effectValues,
                                                                } );
                                                            } }
                                                            rangeMin={ 0 }
                                                            rangeMax={ 360 }
                                                            step={ 1 }
                                                        />
                                                    </div>
                                                </Fragment>
                                            ) }

                                            { 'scale' === effects[ index ].type && (
                                                <Fragment>
                                                    <div className="enokh-blocks-dropdown-option">
                                                        <CustomRangeControl
                                                            label={ __( 'Scale', 'enokh-blocks' ) }
                                                            value={
                                                                hasNumericValue( effects[ index ].scale )
                                                                    ? effects[ index ].scale
                                                                    : ''
                                                            }
                                                            onChange={ ( value ) => {
                                                                const effectValues = [ ...effects ];

                                                                effectValues[ index ] = {
                                                                    ...effectValues[ index ],
                                                                    scale: value,
                                                                };

                                                                setAttributes( {
                                                                    [ effectName ]: effectValues,
                                                                } );
                                                            } }
                                                            rangeMin={ 0 }
                                                            rangeMax={ 2 }
                                                            step={ 0.1 }
                                                            initialPosition="1"
                                                            placeholder="1"
                                                        />
                                                    </div>
                                                </Fragment>
                                            ) }
                                        </>
                                    ) }

                                    { 'transition' === effectType && (
                                        <>
                                            <div className="enokh-blocks-dropdown-option">
                                                <TextControl
                                                    label={ __( 'Timing Function', 'enokh-blocks' ) }
                                                    type={ 'text' }
                                                    value={ effects[ index ].timingFunction || '' }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            timingFunction: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                />
                                            </div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <TextControl
                                                    label={ __( 'CSS Property', 'enokh-blocks' ) }
                                                    type={ 'text' }
                                                    value={ effects[ index ].property || '' }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            property: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                />
                                            </div>

                                            <div className="enokh-blocks-dropdown-separator"></div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Transition Duration(sec)', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].duration )
                                                            ? effects[ index ].duration
                                                            : ''
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            duration: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    inputMin={ 0 }
                                                    inputMax={ 1 }
                                                    rangeMin={ 0 }
                                                    rangeMax={ 1 }
                                                    step={ 0.1 }
                                                />
                                            </div>

                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Delay(sec)', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].delay )
                                                            ? effects[ index ].delay
                                                            : ''
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            delay: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    inputMin={ 0 }
                                                    inputMax={ 1 }
                                                    rangeMin={ 0 }
                                                    rangeMax={ 1 }
                                                    step={ 0.1 }
                                                />
                                            </div>
                                        </>
                                    ) }

                                    { 'opacity' === effectType && (
                                        <>
                                            <div className="enokh-blocks-dropdown-option">
                                                <CustomRangeControl
                                                    label={ __( 'Opacity', 'enokh-blocks' ) }
                                                    value={
                                                        hasNumericValue( effects[ index ].opacity )
                                                            ? effects[ index ].opacity
                                                            : 1
                                                    }
                                                    onChange={ ( value ) => {
                                                        const effectValues = [ ...effects ];

                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            opacity: value,
                                                        };

                                                        setAttributes( {
                                                            [ effectName ]: effectValues,
                                                        } );
                                                    } }
                                                    rangeMin={ 0 }
                                                    rangeMax={ 1 }
                                                    step={ 0.1 }
                                                />
                                            </div>
                                        </>
                                    ) }

                                    { 'typography' === effectType && (
                                        <>
                                            <div className="enokh-blocks-dropdown-option">
                                                <FlexControl>
                                                    <FontWeightControl
                                                        value={ effects[ index ].fontWeight }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...effects ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                fontWeight: value,
                                                            };

                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                            } );
                                                        } }
                                                    />

                                                    <TextTransformControl
                                                        value={ effects[ index ].textTransform }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...effects ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                textTransform: value,
                                                            };

                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                            } );
                                                        } }
                                                    />

                                                    <LetterSpacingControl
                                                        defaultUnit="em"
                                                        value={ effects[ index ].letterSpacing }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...effects ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                letterSpacing: value,
                                                            };

                                                            setAttributes( {
                                                                [ effectName ]: effectValues,
                                                            } );
                                                        } }
                                                    />
                                                </FlexControl>
                                            </div>
                                        </>
                                    ) }
                                </div>
                            </div>
                        </Fragment>
                    );
                } ) }
            </>
        );
    }
}
