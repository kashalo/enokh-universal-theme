import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useContext } from '@wordpress/element';
import { ToggleControl, Dropdown, Button } from '@wordpress/components';
import { getIcon } from '../../../utils';
import EffectItemControl from './components/EffectItemControl';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import BlockContext from '@enokh-blocks/block-context';

const EffectControls = < T extends Record< string, any > >( props: EffectControlsProps< T > ): JSX.Element => {
    const { attributes, setAttributes } = props;
    const {
        useBoxShadow,
        useTextShadow,
        boxShadows,
        textShadows,
        useTransform,
        transforms,
        transformDisableInEditor,
        useOpacity,
        opacities,
        opacityDisableInEditor,
        useTransition,
        transitions,
        useTypography,
        typographyEffects,
    } = attributes;
    const {
        id,
        supports: { effectsPanel },
    } = useContext( BlockContext );

    const targetOptions = [
        {
            label: __( 'Self', 'enokh-blocks' ),
            value: 'self',
        },
        {
            label: __( 'Custom Selector', 'enokh-blocks' ),
            value: 'customSelector',
        },
    ];

    return (
        <CustomPanel
            className="enokh-blocks-panel-label"
            id={ `${ id }EffectControls` }
            title={ __( 'Effects', 'enokh-blocks' ) }
            initialOpen={ false }
        >
            { effectsPanel.boxShadows && (
                <div className="enokh-blocks-dropdown-item">
                    <ToggleControl
                        label={
                            boxShadows.length > 0
                                ? /* translators: Number of transforms. */
                                  sprintf( __( 'Box Shadow (%s)', 'enokh-blocks' ), boxShadows.length )
                                : __( 'Box Shadow', 'enokh-blocks' )
                        }
                        checked={ !! useBoxShadow }
                        onChange={ ( value ) => {
                            const effectValues = [ ...boxShadows ];

                            if ( boxShadows.length < 1 && value ) {
                                effectValues.push( {
                                    state: 'normal',
                                    target: 'self',
                                    customSelector: '',
                                    inset: false,
                                    color: 'rgba(0,0,0,0.1)',
                                    colorOpacity: undefined,
                                    xOffset: 5,
                                    yOffset: 5,
                                    blur: 10,
                                    spread: '',
                                } );
                            }

                            setAttributes( {
                                useBoxShadow: value,
                                boxShadows: effectValues,
                            } );
                        } }
                    />
                    <Dropdown
                        popoverProps={ { placement: 'top-start' } }
                        focusOnMount={ true }
                        contentClassName="enokh-blocks-dropdown enokh-blocks-box-shadow-dropdown"
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <Button
                                isSecondary={ isOpen ? undefined : true }
                                isPrimary={ isOpen ? true : undefined }
                                icon={ isOpen ? getIcon( 'x' ) : getIcon( 'wrench' ) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ ( { onClose } ) => (
                            <div>
                                <Fragment>
                                    <EffectItemControl
                                        attributes={ attributes }
                                        setAttributes={ setAttributes }
                                        effectLabel={ __( 'Box Shadow', 'enokh-blocks' ) }
                                        effectType="box-shadow"
                                        effectName="boxShadows"
                                        useEffectName="useBoxShadow"
                                        effectOptions={ targetOptions }
                                        onClose={ onClose }
                                    />

                                    <div className="enokh-blocks-dropdown-actions">
                                        <Button
                                            isSecondary
                                            onClick={ () => {
                                                if ( ! useBoxShadow && boxShadows.length < 1 ) {
                                                    setAttributes( { useBoxShadow: true } );
                                                }

                                                const effectValues = [ ...boxShadows ];

                                                effectValues.push( {
                                                    state: 'normal',
                                                    target: 'self',
                                                    customSelector: '',
                                                    inset: false,
                                                    color: 'rgba(0,0,0,0.1)',
                                                    colorOpacity: undefined,
                                                    xOffset: 5,
                                                    yOffset: 5,
                                                    blur: 10,
                                                    spread: '',
                                                } );

                                                setAttributes( { boxShadows: effectValues } );
                                            } }
                                        >
                                            { __( 'Add Effect', 'enokh-blocks' ) }
                                        </Button>

                                        <Button isPrimary onClick={ onClose }>
                                            { __( 'Close', 'enokh-blocks' ) }
                                        </Button>
                                    </div>
                                </Fragment>
                            </div>
                        ) }
                    />
                </div>
            ) }

            { effectsPanel.textShadows && (
                <div className="enokh-blocks-dropdown-item">
                    <ToggleControl
                        label={
                            textShadows.length > 0
                                ? /* translators: Number of transforms. */
                                  sprintf( __( 'Text Shadow (%s)', 'enokh-blocks' ), textShadows.length )
                                : __( 'Text Shadow', 'enokh-blocks' )
                        }
                        checked={ !! useTextShadow }
                        onChange={ ( value ) => {
                            const effectValues = [ ...textShadows ];

                            if ( textShadows.length < 1 && value ) {
                                effectValues.push( {
                                    state: 'normal',
                                    target: 'self',
                                    customSelector: '',
                                    color: 'rgba(0,0,0,0.5)',
                                    colorOpacity: undefined,
                                    xOffset: 5,
                                    yOffset: 5,
                                    blur: 10,
                                } );
                            }

                            setAttributes( {
                                useTextShadow: value,
                                textShadows: effectValues,
                            } );
                        } }
                    />
                    <Dropdown
                        popoverProps={ { placement: 'top-start' } }
                        focusOnMount={ true}
                        contentClassName="enokh-blocks-dropdown enokh-blocks-text-shadow-dropdown"
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <Button
                                isSecondary={ isOpen ? undefined : true }
                                isPrimary={ isOpen ? true : undefined }
                                icon={ isOpen ? getIcon( 'x' ) : getIcon( 'wrench' ) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ ( { onClose } ) => (
                            <div>
                                <Fragment>
                                    <EffectItemControl
                                        attributes={ attributes }
                                        setAttributes={ setAttributes }
                                        effectLabel={ __( 'Text Shadow', 'enokh-blocks' ) }
                                        effectType="text-shadow"
                                        effectName="textShadows"
                                        useEffectName="useTextShadow"
                                        effectOptions={ targetOptions }
                                        onClose={ onClose }
                                    />

                                    <div className="enokh-blocks-dropdown-actions">
                                        <Button
                                            isSecondary
                                            onClick={ () => {
                                                if ( ! useTextShadow && textShadows.length < 1 ) {
                                                    setAttributes( { useTextShadow: true } );
                                                }

                                                const effectValues = [ ...textShadows ];

                                                effectValues.push( {
                                                    state: 'normal',
                                                    target: 'self',
                                                    customSelector: '',
                                                    color: 'rgba(0,0,0,0.5)',
                                                    colorOpacity: undefined,
                                                    xOffset: 5,
                                                    yOffset: 5,
                                                    blur: 10,
                                                } );

                                                setAttributes( { textShadows: effectValues } );
                                            } }
                                        >
                                            { __( 'Add Effect', 'enokh-blocks' ) }
                                        </Button>

                                        <Button isPrimary onClick={ onClose }>
                                            { __( 'Close', 'enokh-blocks' ) }
                                        </Button>
                                    </div>
                                </Fragment>
                            </div>
                        ) }
                    />
                </div>
            ) }

            { effectsPanel.transforms && (
                <div className="enokh-blocks-dropdown-item">
                    <ToggleControl
                        label={
                            transforms.length > 0
                                ? /* translators: Number of transforms. */
                                  sprintf( __( 'Transform (%s)', 'enokh-blocks' ), transforms.length )
                                : __( 'Transform', 'enokh-blocks' )
                        }
                        checked={ !! useTransform }
                        onChange={ ( value ) => {
                            setAttributes( {
                                useTransform: value,
                            } );
                        } }
                    />
                    <Dropdown
                        popoverProps={ { placement: 'top-start' } }
                        focusOnMount={ true}
                        contentClassName="enokh-blocks-dropdown enokh-blocks-transform-dropdown"
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <Button
                                isSecondary={ isOpen ? undefined : true }
                                isPrimary={ isOpen ? true : undefined }
                                icon={ isOpen ? getIcon( 'x' ) : getIcon( 'wrench' ) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ ( { onClose } ) => (
                            <div>
                                <Fragment>
                                    <EffectItemControl
                                        attributes={ attributes }
                                        setAttributes={ setAttributes }
                                        effectLabel={ __( 'Transform', 'enokh-blocks' ) }
                                        effectType="transforms"
                                        effectName="transforms"
                                        useEffectName="useTransform"
                                        effectOptions={ targetOptions }
                                        onClose={ onClose }
                                    />

                                    <div className="enokh-blocks-dropdown-actions">
                                        <Button
                                            isSecondary
                                            onClick={ () => {
                                                if ( ! useTransform && transforms.length < 1 ) {
                                                    setAttributes( { useTransform: true } );
                                                }

                                                const transformValues = [ ...transforms ];

                                                transformValues.push( {
                                                    type: '',
                                                    state: 'normal',
                                                    target: 'self',
                                                } );

                                                setAttributes( { transforms: transformValues } );
                                            } }
                                        >
                                            { __( 'Add Transform', 'enokh-blocks' ) }
                                        </Button>

                                        <Button isPrimary onClick={ onClose }>
                                            { __( 'Close', 'enokh-blocks' ) }
                                        </Button>

                                        <ToggleControl
                                            className="enokh-blocks-disable-in-editor"
                                            label={ __( 'Disable in editor', 'enokh-blocks' ) }
                                            help={ __(
                                                'Disable styles in the editor when this block is selected.',
                                                'enokh-blocks'
                                            ) }
                                            checked={ !! transformDisableInEditor }
                                            onChange={ ( value ) => {
                                                setAttributes( {
                                                    transformDisableInEditor: value,
                                                } );
                                            } }
                                        />
                                    </div>
                                </Fragment>
                            </div>
                        ) }
                    />
                </div>
            ) }

            { effectsPanel.opacity && (
                <div className="enokh-blocks-dropdown-item">
                    <ToggleControl
                        label={
                            opacities.length > 0
                                ? /* translators: Number of opacities. */
                                  sprintf( __( 'Opacity (%s)', 'enokh-blocks' ), opacities.length )
                                : __( 'Opacity', 'enokh-blocks' )
                        }
                        checked={ !! useOpacity }
                        onChange={ ( value ) => {
                            setAttributes( {
                                useOpacity: value,
                            } );
                        } }
                    />
                    <Dropdown
                        popoverProps={ { placement: 'top-start' } }
                        focusOnMount={true}
                        contentClassName="enokh-blocks-dropdown enokh-blocks-opacity-dropdown"
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <Button
                                isSecondary={ isOpen ? undefined : true }
                                isPrimary={ isOpen ? true : undefined }
                                icon={ isOpen ? getIcon( 'x' ) : getIcon( 'wrench' ) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ ( { onClose } ) => (
                            <div>
                                <Fragment>
                                    <EffectItemControl
                                        attributes={ attributes }
                                        setAttributes={ setAttributes }
                                        effectLabel={ __( 'Opacity', 'enokh-blocks' ) }
                                        effectType="opacity"
                                        effectName="opacities"
                                        useEffectName="useOpacity"
                                        effectOptions={ targetOptions }
                                        onClose={ onClose }
                                    />

                                    <div className="enokh-blocks-dropdown-actions">
                                        <Button
                                            isSecondary
                                            onClick={ () => {
                                                if ( ! useOpacity && opacities.length < 1 ) {
                                                    setAttributes( { useOpacity: true } );
                                                }

                                                const effectValues = [ ...opacities ];

                                                effectValues.push( {
                                                    state: 'normal',
                                                    target: 'self',
                                                    customSelector: '',
                                                    opacity: 1,
                                                } );

                                                setAttributes( { opacities: effectValues } );
                                            } }
                                        >
                                            { __( 'Add Opacity', 'enokh-blocks' ) }
                                        </Button>

                                        <Button isPrimary onClick={ onClose }>
                                            { __( 'Close', 'enokh-blocks' ) }
                                        </Button>

                                        <ToggleControl
                                            className="enokh-blocks-disable-in-editor"
                                            label={ __( 'Disable in editor', 'enokh-blocks' ) }
                                            help={ __(
                                                'Disable styles in the editor when this block is selected.',
                                                'enokh-blocks'
                                            ) }
                                            checked={ !! opacityDisableInEditor }
                                            onChange={ ( value ) => {
                                                setAttributes( {
                                                    opacityDisableInEditor: value,
                                                } );
                                            } }
                                        />
                                    </div>
                                </Fragment>
                            </div>
                        ) }
                    />
                </div>
            ) }

            { effectsPanel.transitions && (
                <div className="enokh-blocks-dropdown-item">
                    <ToggleControl
                        label={
                            transitions.length > 0
                                ? /* translators: Number of transitions. */
                                  sprintf( __( 'Transition (%s)', 'enokh-blocks' ), transitions.length )
                                : __( 'Transition', 'enokh-blocks' )
                        }
                        checked={ !! useTransition }
                        onChange={ ( value ) => {
                            const effectValues = [ ...transitions ];

                            if ( transitions.length < 1 && value ) {
                                effectValues.push( {
                                    state: 'normal',
                                    target: 'self',
                                    customSelector: '',
                                    timingFunction: 'ease',
                                    property: 'all',
                                    duration: 0.5,
                                    delay: '',
                                } );
                            }

                            setAttributes( {
                                useTransition: value,
                                transitions: effectValues,
                            } );
                        } }
                    />
                    <Dropdown
                        popoverProps={ { placement: 'top-start' } }
                        focusOnMount={true}
                        contentClassName="enokh-blocks-dropdown enokh-blocks-transition-dropdown"
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <Button
                                isSecondary={ isOpen ? undefined : true }
                                isPrimary={ isOpen ? true : undefined }
                                icon={ isOpen ? getIcon( 'x' ) : getIcon( 'wrench' ) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ ( { onClose } ) => (
                            <div>
                                <Fragment>
                                    <EffectItemControl
                                        attributes={ attributes }
                                        setAttributes={ setAttributes }
                                        effectLabel={ __( 'Transition', 'enokh-blocks' ) }
                                        effectType="transition"
                                        effectName="transitions"
                                        useEffectName="useTransition"
                                        effectOptions={ targetOptions }
                                        onClose={ onClose }
                                    />

                                    <div className="enokh-blocks-dropdown-actions">
                                        <Button
                                            isSecondary
                                            onClick={ () => {
                                                if ( ! useTransition && transitions.length < 1 ) {
                                                    setAttributes( { useTransition: true } );
                                                }

                                                const effectValues = [ ...transitions ];

                                                effectValues.push( {
                                                    state: 'normal',
                                                    target: 'self',
                                                    customSelector: '',
                                                    timingFunction: 'ease',
                                                    property: 'all',
                                                    duration: 0.5,
                                                    delay: '',
                                                } );

                                                setAttributes( { transitions: effectValues } );
                                            } }
                                        >
                                            { __( 'Add Transition', 'enokh-blocks' ) }
                                        </Button>

                                        <Button isPrimary onClick={ onClose }>
                                            { __( 'Close', 'enokh-blocks' ) }
                                        </Button>
                                    </div>
                                </Fragment>
                            </div>
                        ) }
                    />
                </div>
            ) }

            { effectsPanel.typography && (
                <div className="enokh-blocks-dropdown-item">
                    <ToggleControl
                        label={
                            typographyEffects.length > 0
                                ? /* translators: Number of typographyEffects. */
                                  sprintf( __( 'Typography (%s)', 'enokh-blocks' ), typographyEffects.length )
                                : __( 'Typography', 'enokh-blocks' )
                        }
                        checked={ !! useTypography }
                        onChange={ ( value ) => {
                            setAttributes( {
                                useTypography: value,
                            } );
                        } }
                    />
                    <Dropdown
                        popoverProps={ { placement: 'top-start' } }
                        focusOnMount={ true }
                        contentClassName="enokh-blocks-dropdown enokh-blocks-opacity-dropdown"
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <Button
                                isSecondary={ isOpen ? undefined : true }
                                isPrimary={ isOpen ? true : undefined }
                                icon={ isOpen ? getIcon( 'x' ) : getIcon( 'wrench' ) }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ ( { onClose } ) => (
                            <div>
                                <Fragment>
                                    <EffectItemControl
                                        attributes={ attributes }
                                        setAttributes={ setAttributes }
                                        effectLabel={ __( 'Typography', 'enokh-blocks' ) }
                                        effectType="typography"
                                        effectName="typographyEffects"
                                        useEffectName="useTypography"
                                        effectOptions={ targetOptions }
                                        onClose={ onClose }
                                    />

                                    <div className="enokh-blocks-dropdown-actions">
                                        <Button
                                            isSecondary
                                            onClick={ () => {
                                                if ( ! useTypography && typographyEffects.length < 1 ) {
                                                    setAttributes( { useTypography: true } );
                                                }

                                                const effectValues = [ ...typographyEffects ];

                                                effectValues.push( {
                                                    state: 'normal',
                                                    target: 'self',
                                                    customSelector: '',
                                                    fontWeight: '',
                                                    textTransform: '',
                                                } );

                                                setAttributes( { typographyEffects: effectValues } );
                                            } }
                                        >
                                            { __( 'Add Typography', 'enokh-blocks' ) }
                                        </Button>

                                        <Button isPrimary onClick={ onClose }>
                                            { __( 'Close', 'enokh-blocks' ) }
                                        </Button>
                                    </div>
                                </Fragment>
                            </div>
                        ) }
                    />
                </div>
            ) }
        </CustomPanel>
    );
};

export default EffectControls;
