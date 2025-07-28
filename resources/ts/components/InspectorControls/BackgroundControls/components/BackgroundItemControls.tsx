import { hasNumericValue, getIcon } from '../../../../utils';
import CustomRangeControl from '../../../CustomRangeControl';
import ColorPickerControl from '../../../ColorPickerControl';
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Tooltip, Button, TextControl, SelectControl, BaseControl } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';

export default class BackgroundItemControls extends Component< BackgroundItemControlsProps > {
    render() {
        const { attributes, setAttributes, effectOptions } = this.props;

        const { advancedBackgrounds } = attributes;

        const bgImageSizes = [];
        const imageSizesConfig = EnokhBlocksEditor.Config.imageSizes;

        Object.keys( imageSizesConfig ).forEach( ( size ) => {
            bgImageSizes.push( {
                label: imageSizesConfig[ size ],
                value: imageSizesConfig[ size ],
            } );
        } );

        return (
            <Fragment>
                { advancedBackgrounds.map( ( effect, index ) => {

                    return (
                        <Fragment key={ index }>
                            <div className="enokh-blocks-dropdown-container">
                                <div className="enokh-blocks-dropdown-header">
                                    <Fragment>
                                        { ! advancedBackgrounds[ index ].type && (
                                            <SelectControl
                                                label={ __( 'Type', 'enokh-blocks' ) }
                                                /* @ts-ignore */
                                                value={ advancedBackgrounds[ index ].type }
                                                options={ [
                                                    {
                                                        label: __( 'Choose…', 'enokh-blocks' ),
                                                        value: '',
                                                    },
                                                    {
                                                        label: __( 'Image', 'enokh-blocks' ),
                                                        value: 'image',
                                                    },
                                                    {
                                                        label: __( 'Gradient', 'enokh-blocks' ),
                                                        value: 'gradient',
                                                    },
                                                ] }
                                                onChange={ ( value ) => {
                                                    const effectValues = [ ...advancedBackgrounds ];

                                                    if ( 'image' === value ) {
                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            type: value,
                                                            target: 'pseudo-element',
                                                            url: '',
                                                            id: '',
                                                            imageSize: 'full',
                                                            opacity: 1,
                                                            size: 'cover',
                                                            position: 'center center',
                                                            repeat: 'no-repeat',
                                                            attachment: 'scroll',
                                                        };
                                                    }

                                                    if ( 'gradient' === value ) {
                                                        effectValues[ index ] = {
                                                            ...effectValues[ index ],
                                                            type: value,
                                                            direction: 90,
                                                            colorOne: 'rgba(255, 255, 255, 0.1)',
                                                            colorTwo: 'rgba(0, 0, 0, 0.30)',
                                                        };
                                                    }

                                                    setAttributes( {
                                                        advancedBackgrounds: effectValues,
                                                        innerZindex: 1,
                                                    } );
                                                } }
                                            />
                                        ) }

                                        { 'gradient' === advancedBackgrounds[ index ].type && (
                                            <span className="enokh-blocks-dropdown-type-label">
                                                { __( 'Gradient', 'enokh-blocks' ) }
                                            </span>
                                        ) }

                                        { 'image' === advancedBackgrounds[ index ].type && (
                                            <span className="enokh-blocks-dropdown-type-label">
                                                { __( 'Image', 'enokh-blocks' ) }
                                            </span>
                                        ) }

                                        <Tooltip text={ __( 'Delete Background', 'enokh-blocks' ) }>
                                            <Button
                                                className="enokh-blocks-delete-transform"
                                                onClick={ () => {
                                                    // eslint-disable-next-line
                                                    if (window.confirm(__('This will permanently delete this background.', 'enokh-blocks'))) {
                                                        const effectValues = [ ...advancedBackgrounds ];

                                                        effectValues.splice( index, 1 );
                                                        setAttributes( { advancedBackgrounds: effectValues } );
                                                    }
                                                } }
                                                icon={ getIcon( 'trash' ) }
                                            />
                                        </Tooltip>
                                    </Fragment>
                                </div>

                                { !! advancedBackgrounds[ index ].type && (
                                    <div className="enokh-blocks-dropdown-options">
                                        <div className="enokh-blocks-dropdown-option-device">
                                            <SelectControl
                                                label={ __( 'Device', 'enokh-blocks' ) }
                                                /* @ts-ignore */
                                                value={ advancedBackgrounds[ index ].device }
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
                                                    const effectValues = [ ...advancedBackgrounds ];

                                                    effectValues[ index ] = {
                                                        ...effectValues[ index ],
                                                        device: value,
                                                    };

                                                    setAttributes( {
                                                        advancedBackgrounds: effectValues,
                                                    } );
                                                } }
                                            />
                                        </div>

                                        <div className="enokh-blocks-dropdown-option-state">
                                            <SelectControl
                                                label={ __( 'State', 'enokh-blocks' ) }
                                                /* @ts-ignore */
                                                value={ advancedBackgrounds[ index ].state }
                                                options={ [
                                                    {
                                                        label: __( 'Normal', 'enokh-blocks' ),
                                                        value: 'normal',
                                                    },
                                                    {
                                                        label: __( 'Hover', 'enokh-blocks' ),
                                                        value: 'hover',
                                                    },
                                                ] }
                                                onChange={ ( value ) => {
                                                    const effectValues = [ ...advancedBackgrounds ];

                                                    effectValues[ index ] = {
                                                        ...effectValues[ index ],
                                                        state: value,
                                                    };

                                                    setAttributes( {
                                                        advancedBackgrounds: effectValues,
                                                    } );
                                                } }
                                            />
                                        </div>

                                        { effectOptions.length > 1 && (
                                            <Fragment>
                                                <div className="enokh-blocks-dropdown-option-target">
                                                    <SelectControl
                                                        label={ __( 'Target', 'enokh-blocks' ) }
                                                        value={ advancedBackgrounds[ index ].target }
                                                        options={ effectOptions }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...advancedBackgrounds ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                target: value,
                                                            };

                                                            setAttributes( {
                                                                advancedBackgrounds: effectValues,
                                                            } );
                                                        } }
                                                    />
                                                </div>

                                                { 'customSelector' === advancedBackgrounds[ index ].target && (
                                                    <div className="enokh-blocks-dropdown-custom-selector">
                                                        <TextControl
                                                            label={ __( 'Custom Selector', 'enokh-blocks' ) }
                                                            type={ 'text' }
                                                            placeholder=".enokh-blocksicon"
                                                            value={
                                                                advancedBackgrounds[ index ].customSelector
                                                                    ? advancedBackgrounds[ index ].customSelector
                                                                    : ''
                                                            }
                                                            onChange={ ( value ) => {
                                                                const effectValues = [ ...advancedBackgrounds ];

                                                                effectValues[ index ] = {
                                                                    ...effectValues[ index ],
                                                                    customSelector: value,
                                                                };

                                                                setAttributes( {
                                                                    advancedBackgrounds: effectValues,
                                                                } );
                                                            } }
                                                        />
                                                    </div>
                                                ) }
                                            </Fragment>
                                        ) }

                                        <div className="enokh-blocks-dropdown-separator"></div>

                                        { 'gradient' === advancedBackgrounds[ index ].type && (
                                            <Fragment>
                                                <div className="enokh-blocks-dropdown-option">
                                                    <CustomRangeControl
                                                        label={ __( 'Direction', 'enokh-blocks' ) }
                                                        value={
                                                            hasNumericValue( advancedBackgrounds[ index ].direction )
                                                                ? advancedBackgrounds[ index ].direction
                                                                : 1
                                                        }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...advancedBackgrounds ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                direction: value,
                                                            };

                                                            setAttributes( {
                                                                advancedBackgrounds: effectValues,
                                                            } );
                                                        } }
                                                        rangeMin={ 0 }
                                                        rangeMax={ 360 }
                                                        step={ 1 }
                                                    />
                                                </div>

                                                <div className="enokh-blocks-dropdown-separator"></div>

                                                <div className="enokh-blocks-dropdown-option enokh-blocks-dropdown-option-no-grow">
                                                    <BaseControl
                                                        id="enokh-blocks-box-shadow-color-one"
                                                        className="enokh-blocks-box-shadow-color"
                                                        label={ __( 'Color', 'enokh-blocks' ) }
                                                    >
                                                        <ColorPickerControl
                                                            value={ advancedBackgrounds[ index ].colorOne }
                                                            alpha={ true }
                                                            valueOpacity={
                                                                hasNumericValue(
                                                                    advancedBackgrounds[ index ].colorOneOpacity
                                                                )
                                                                    ? advancedBackgrounds[ index ].colorOneOpacity
                                                                    : 1
                                                            }
                                                            onChange={ ( value ) => {
                                                                const effectValues = [ ...advancedBackgrounds ];

                                                                effectValues[ index ] = {
                                                                    ...effectValues[ index ],
                                                                    colorOne: value,
                                                                };

                                                                setAttributes( {
                                                                    advancedBackgrounds: effectValues,
                                                                } );
                                                            } }
                                                            onOpacityChange={ ( value ) => {
                                                                const effectValues = [ ...advancedBackgrounds ];

                                                                effectValues[ index ] = {
                                                                    ...effectValues[ index ],
                                                                    colorOneOpacity: value,
                                                                };

                                                                setAttributes( {
                                                                    advancedBackgrounds: effectValues,
                                                                } );
                                                            } }
                                                        />
                                                    </BaseControl>
                                                </div>

                                                <div className="enokh-blocks-dropdown-option">
                                                    <CustomRangeControl
                                                        label={ __( 'Stop One(%)', 'enokh-blocks' ) }
                                                        value={
                                                            hasNumericValue( advancedBackgrounds[ index ].stopOne )
                                                                ? advancedBackgrounds[ index ].stopOne
                                                                : ''
                                                        }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...advancedBackgrounds ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                stopOne: value,
                                                            };

                                                            setAttributes( {
                                                                advancedBackgrounds: effectValues,
                                                            } );
                                                        } }
                                                        rangeMin={ 0 }
                                                        rangeMax={ 100 }
                                                        step={ 1 }
                                                    />
                                                </div>

                                                <div className="enokh-blocks-dropdown-option enokh-blocks-dropdown-option-no-grow">
                                                    <BaseControl
                                                        id="enokh-blocks-box-shadow-color-two"
                                                        className="enokh-blocks-box-shadow-color"
                                                        label={ __( 'Color', 'enokh-blocks' ) }
                                                    >
                                                        <ColorPickerControl
                                                            value={ advancedBackgrounds[ index ].colorTwo }
                                                            alpha={ true }
                                                            valueOpacity={
                                                                hasNumericValue(
                                                                    advancedBackgrounds[ index ].colorTwoOpacity
                                                                )
                                                                    ? advancedBackgrounds[ index ].colorTwoOpacity
                                                                    : 1
                                                            }
                                                            onChange={ ( value ) => {
                                                                const effectValues = [ ...advancedBackgrounds ];

                                                                effectValues[ index ] = {
                                                                    ...effectValues[ index ],
                                                                    colorTwo: value,
                                                                };

                                                                setAttributes( {
                                                                    advancedBackgrounds: effectValues,
                                                                } );
                                                            } }
                                                            onOpacityChange={ ( value ) => {
                                                                const effectValues = [ ...advancedBackgrounds ];

                                                                effectValues[ index ] = {
                                                                    ...effectValues[ index ],
                                                                    colorTwoOpacity: value,
                                                                };

                                                                setAttributes( {
                                                                    advancedBackgrounds: effectValues,
                                                                } );
                                                            } }
                                                        />
                                                    </BaseControl>
                                                </div>

                                                <div className="enokh-blocks-dropdown-option">
                                                    <CustomRangeControl
                                                        label={ __( 'Stop Two(%)', 'enokh-blocks' ) }
                                                        value={
                                                            hasNumericValue( advancedBackgrounds[ index ].stopTwo )
                                                                ? advancedBackgrounds[ index ].stopTwo
                                                                : ''
                                                        }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...advancedBackgrounds ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                stopTwo: value,
                                                            };

                                                            setAttributes( {
                                                                advancedBackgrounds: effectValues,
                                                            } );
                                                        } }
                                                        rangeMin={ 0 }
                                                        rangeMax={ 100 }
                                                        step={ 1 }
                                                    />
                                                </div>
                                            </Fragment>
                                        ) }

                                        { 'image' === advancedBackgrounds[ index ].type && (
                                            <Fragment>
                                                <div className="enokh-blocks-dropdown-option">
                                                    <BaseControl
                                                        id="enokh-blocks-background-image-upload"
                                                        label={ __( 'Image URL', 'enokh-blocks' ) }
                                                    >
                                                        <div className="enokh-blocks-bg-image-wrapper">
                                                            { advancedBackgrounds[ index ].url && (
                                                                <img
                                                                    src={ advancedBackgrounds[ index ].url }
                                                                    width="30"
                                                                    height="30"
                                                                    alt={ __(
                                                                        'Background image preview',
                                                                        'enokh-blocks'
                                                                    ) }
                                                                />
                                                            ) }

                                                            <TextControl
                                                                type={ 'text' }
                                                                value={ advancedBackgrounds[ index ].url || '' }
                                                                onChange={ ( value ) => {
                                                                    const effectValues = [ ...advancedBackgrounds ];

                                                                    effectValues[ index ] = {
                                                                        ...effectValues[ index ],
                                                                        url: value,
                                                                    };

                                                                    setAttributes( {
                                                                        advancedBackgrounds: effectValues,
                                                                    } );
                                                                } }
                                                            />

                                                            <div className="enokh-blocks-background-image-action-buttons">
                                                                <MediaUpload
                                                                    title={ __( 'Set background image', 'enokh-blocks' ) }
                                                                    onSelect={ ( media ) => {
                                                                        let size =
                                                                            advancedBackgrounds[ index ].imageSize;

                                                                        if (
                                                                            'undefined' === typeof media.sizes[ size ]
                                                                        ) {
                                                                            size = 'full';
                                                                        }

                                                                        const effectValues = [ ...advancedBackgrounds ];

                                                                        effectValues[ index ] = {
                                                                            ...effectValues[ index ],
                                                                            url: media.sizes[ size ].url,
                                                                            id: media.id,
                                                                        };

                                                                        setAttributes( {
                                                                            advancedBackgrounds: effectValues,
                                                                        } );
                                                                    } }
                                                                    onClose={ () => {
                                                                        (
                                                                            document.querySelector(
                                                                                '.enokh-blocks-bg-image-wrapper input'
                                                                            ) as HTMLInputElement
                                                                         ).focus();
                                                                        (
                                                                            document.querySelector(
                                                                                '.enokh-blocks-background-dropdown'
                                                                            ) as HTMLElement
                                                                         ).style.zIndex = '';
                                                                    } }
                                                                    allowedTypes={ [ 'image' ] }
                                                                    value={ advancedBackgrounds[ index ].id || '' }
                                                                    modalClass="editor-enokh-blocks-container-background__media-modal"
                                                                    render={ ( { open } ) => (
                                                                        <Tooltip
                                                                            text={ __(
                                                                                'Open the Media Library',
                                                                                'enokh-blocks'
                                                                            ) }
                                                                        >
                                                                            <Button
                                                                                onClick={ () => {
                                                                                    (
                                                                                        document.querySelector(
                                                                                            '.enokh-blocks-background-dropdown'
                                                                                        ) as HTMLElement
                                                                                     ).style.zIndex = '1';
                                                                                    open();
                                                                                } }
                                                                                className="is-secondary is-small"
                                                                            >
                                                                                { __( 'Browse', 'enokh-blocks' ) }
                                                                            </Button>
                                                                        </Tooltip>
                                                                    ) }
                                                                />
                                                            </div>
                                                        </div>
                                                    </BaseControl>
                                                </div>

                                                { 'undefined' !== typeof advancedBackgrounds[ index ].id &&
                                                    advancedBackgrounds[ index ].id && (
                                                        <div className="enokh-blocks-dropdown-option">
                                                            <SelectControl
                                                                label={ __( 'Image Size', 'enokh-blocks' ) }
                                                                value={ advancedBackgrounds[ index ].imageSize }
                                                                options={ bgImageSizes }
                                                                onChange={ ( value ) => {
                                                                    const effectValues = [ ...advancedBackgrounds ];

                                                                    effectValues[ index ] = {
                                                                        ...effectValues[ index ],
                                                                        imageSize: value,
                                                                    };

                                                                    setAttributes( {
                                                                        advancedBackgrounds: effectValues,
                                                                    } );
                                                                } }
                                                            />
                                                        </div>
                                                    ) }

                                                <div className="enokh-blocks-dropdown-separator"></div>

                                                <div className="enokh-blocks-dropdown-option">
                                                    <TextControl
                                                        label={ __( 'Size', 'enokh-blocks' ) }
                                                        value={ advancedBackgrounds[ index ].size }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...advancedBackgrounds ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                size: value,
                                                            };

                                                            setAttributes( {
                                                                advancedBackgrounds: effectValues,
                                                            } );
                                                        } }
                                                    />
                                                </div>

                                                <div className="enokh-blocks-dropdown-option">
                                                    <TextControl
                                                        label={ __( 'Position', 'enokh-blocks' ) }
                                                        value={ advancedBackgrounds[ index ].position }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...advancedBackgrounds ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                position: value,
                                                            };

                                                            setAttributes( {
                                                                advancedBackgrounds: effectValues,
                                                            } );
                                                        } }
                                                    />
                                                </div>

                                                <div className="enokh-blocks-dropdown-option">
                                                    <SelectControl
                                                        label={ __( 'Repeat', 'enokh-blocks' ) }
                                                        /* @ts-ignore */
                                                        value={ advancedBackgrounds[ index ].repeat }
                                                        options={ [
                                                            { label: 'no-repeat', value: 'no-repeat' },
                                                            { label: 'repeat', value: 'repeat' },
                                                            { label: 'repeat-x', value: 'repeat-x' },
                                                            { label: 'repeat-y', value: 'repeat-y' },
                                                        ] }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...advancedBackgrounds ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                repeat: value,
                                                            };

                                                            setAttributes( {
                                                                advancedBackgrounds: effectValues,
                                                            } );
                                                        } }
                                                    />
                                                </div>

                                                <div className="enokh-blocks-dropdown-option">
                                                    <SelectControl
                                                        label={ __( 'Attachment', 'enokh-blocks' ) }
                                                        /* @ts-ignore */
                                                        value={ advancedBackgrounds[ index ].attachment }
                                                        options={ [
                                                            { label: 'scroll', value: '' },
                                                            { label: 'fixed', value: 'fixed' },
                                                            { label: 'local', value: 'local' },
                                                        ] }
                                                        onChange={ ( value ) => {
                                                            const effectValues = [ ...advancedBackgrounds ];

                                                            effectValues[ index ] = {
                                                                ...effectValues[ index ],
                                                                attachment: value,
                                                            };

                                                            setAttributes( {
                                                                advancedBackgrounds: effectValues,
                                                            } );
                                                        } }
                                                    />
                                                </div>
                                            </Fragment>
                                        ) }
                                    </div>
                                ) }
                            </div>
                        </Fragment>
                    );
                } ) }
            </Fragment>
        );
    }
}
