import { getIcon } from '../../../utils';
import { ToggleControl, TextControl, SelectControl, Button, Dropdown } from '@wordpress/components';
import { useContext, Fragment } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { __ } from '@wordpress/i18n';
import GradientControl from '../../GradientControl';
import OptionControls from './components/OptionControls';
import ImageUrlControl from './components/ImageUrlControl';
import BackgroundItemControls from './components/BackgroundItemControls';
import CustomPanel from '@enokh-blocks/components/CustomPanel';

const BackgroundControls = ( props: BackgroundControlsProps ): JSX.Element => {
    const { attributes, setAttributes } = props;
    const {
        isInQueryLoop,
        supports: { backgroundPanel },
        id,
    } = useContext( BlockContext );

    const {
        bgImage,
        bgOptions,
        bgImageInline,
        useDynamicData,
        dynamicContentType,
        isQueryLoopItem,
        advancedBackgrounds,
        useAdvancedBackgrounds,
    } = attributes;

    return (
        <CustomPanel
            title={ __( 'Backgrounds', 'enokh-blocks' ) }
            initialOpen={ false }
            className={ 'enokh-blocks-panel-label' }
            id={ `${ id }BackgroundControls` }
        >
            <Fragment>
                <div className="enokh-blocks-dropdown-item">
                    <ToggleControl
                        label={
                            advancedBackgrounds.length > 0
                                ? `${ __( 'Advanced ', 'enokh-blocks' ) } ${ advancedBackgrounds.length }`
                                : __( 'Advanced', 'enokh-blocks' )
                        }
                        checked={ !! useAdvancedBackgrounds }
                        onChange={ ( value ) => {
                            setAttributes( {
                                useAdvancedBackgrounds: value,
                            } );
                        } }
                    />
                    <Dropdown
                        popoverProps={ { placement: 'top-start' } }
                        focusOnMount={ true }
                        contentClassName="enokh-blocks-dropdown enokh-blocks-background-dropdown"
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
                                    <BackgroundItemControls
                                        attributes={ attributes }
                                        setAttributes={ setAttributes }
                                        effectOptions={ [
                                            {
                                                label: __( 'Self', 'enokh-blocks' ),
                                                value: 'self',
                                            },
                                            {
                                                label: __( 'Pseudo Element', 'enokh-blocks' ),
                                                value: 'pseudo-element',
                                            },
                                        ] }
                                    />

                                    <div className="enokh-blocks-dropdown-actions">
                                        <Button
                                            isSecondary
                                            onClick={ () => {
                                                const gradientValues = [ ...advancedBackgrounds ];

                                                gradientValues.push( {
                                                    target: 'self',
                                                    device: 'all',
                                                    state: 'normal',
                                                } );

                                                setAttributes( { advancedBackgrounds: gradientValues } );
                                            } }
                                        >
                                            { __( 'Add Background', 'enokh-blocks' ) }
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
            </Fragment>

            { ! useAdvancedBackgrounds && (
                <>
                    { !! backgroundPanel.backgroundImage && (
                        <>
                            <ImageUrlControl
                                bgImage={ bgImage }
                                setAttributes={ setAttributes }
                                isUsingFeaturedImage={ useDynamicData && 'featured-image' === dynamicContentType }
                            />

                            { ( !! bgImage || ( useDynamicData && 'featured-image' === dynamicContentType ) ) && (
                                <>
                                    <ToggleControl
                                        label={ __( 'Use inline style', 'enokh-blocks' ) }
                                        disabled={
                                            useDynamicData &&
                                            'featured-image' === dynamicContentType &&
                                            ( isQueryLoopItem || isInQueryLoop )
                                        }
                                        checked={ !! bgImageInline }
                                        onChange={ ( value ) => setAttributes( { bgImageInline: value } ) }
                                    />

                                    <OptionControls attributes={ attributes } setAttributes={ setAttributes } />

                                    <TextControl
                                        label={ __( 'Size', 'enokh-blocks' ) }
                                        value={ bgOptions.size }
                                        onChange={ ( nextSize ) => setAttributes( { bgOptions: { size: nextSize } } ) }
                                    />

                                    <TextControl
                                        label={ __( 'Position', 'enokh-blocks' ) }
                                        value={ bgOptions.position }
                                        onChange={ ( nextPosition ) =>
                                            setAttributes( {
                                                bgOptions: { position: nextPosition },
                                            } )
                                        }
                                    />

                                    <SelectControl
                                        label={ __( 'Repeat', 'enokh-blocks' ) }
                                        options={ [
                                            { label: 'no-repeat', value: 'no-repeat' },
                                            { label: 'repeat', value: 'repeat' },
                                            { label: 'repeat-x', value: 'repeat-x' },
                                            { label: 'repeat-y', value: 'repeat-y' },
                                        ] }
                                        // @ts-ignore
                                        value={ bgOptions.repeat }
                                        onChange={ ( nextRepeat ) =>
                                            setAttributes( {
                                                bgOptions: { repeat: nextRepeat },
                                            } )
                                        }
                                    />

                                    <SelectControl
                                        label={ __( 'Attachment', 'enokh-blocks' ) }
                                        // @ts-ignore
                                        value={ bgOptions.attachment }
                                        options={ [
                                            { label: 'scroll', value: '' },
                                            { label: 'fixed', value: 'fixed' },
                                            { label: 'local', value: 'local' },
                                        ] }
                                        onChange={ ( nextAttachment ) =>
                                            setAttributes( {
                                                bgOptions: { attachment: nextAttachment },
                                            } )
                                        }
                                    />
                                </>
                            ) }
                        </>
                    ) }

                    { !! backgroundPanel.backgroundGradient && (
                        <GradientControl
                            attributes={ attributes }
                            setAttributes={ setAttributes }
                            attrGradient={ 'gradient' }
                            attrGradientDirection={ 'gradientDirection' }
                            attrGradientColorOne={ 'gradientColorOne' }
                            attrGradientColorStopOne={ 'gradientColorStopOne' }
                            attrGradientColorTwo={ 'gradientColorTwo' }
                            attrGradientColorStopTwo={ 'gradientColorStopTwo' }
                            attrGradientColorOneOpacity={ 'gradientColorOneOpacity' }
                            attrGradientColorTwoOpacity={ 'gradientColorTwoOpacity' }
                            defaultColorOne=""
                            defaultColorTwo=""
                        />
                    ) }
                </>
            ) }
        </CustomPanel>
    );
};

export default BackgroundControls;
