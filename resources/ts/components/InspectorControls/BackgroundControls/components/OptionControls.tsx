import ImageSizeControl from './ImageSizeControl';
import SelectorControl from './SelectorControl';
import ImageOpacityControl from './ImageOpacityControl';
import { Notice, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const OptionControls = ( props: OptionControlProps ): JSX.Element => {
    const { attributes, setAttributes } = props;
    const {
        bgImage,
        bgOptions,
        bgImageSize,
        useDynamicData,
        dynamicContentType,
        innerZindex,
        useInnerContainer,
        position,
        overflowX,
        overflowY,
    } = attributes;

    return (
        <>
            { !! bgOptions.overlay ? (
                <>
                    <ToggleControl
                        label={ __( 'Background Color Overlay', 'enokh-blocks' ) }
                        checked={ !! bgOptions.overlay }
                        onChange={ ( nextOverlay ) => {
                            setAttributes( {
                                bgOptions: {
                                    overlay: nextOverlay,
                                },
                            } );
                        } }
                    />

                    <Notice className="enokh-blocks-option-notice" status="info" isDismissible={ false }>
                        { __(
                            'The background color overlay option is deprecated. Toggle this option to use the new method.',
                            'enokh-blocks'
                        ) }
                    </Notice>
                </>
            ) : (
                <>
                    { ( ( bgImage && bgImage.id ) || ( useDynamicData && '' !== dynamicContentType ) ) && (
                        <ImageSizeControl
                            value={ bgImageSize }
                            onChange={ ( value ) => setAttributes( { bgImageSize: value } ) }
                        />
                    ) }

                    <SelectorControl
                        value={ bgOptions.selector }
                        position={ position }
                        useInnerContainer={ useInnerContainer }
                        onChange={ ( value ) => {
                            setAttributes( { bgOptions: { selector: value } } );

                            if (
                                useInnerContainer &&
                                'pseudo-element' === value &&
                                ! innerZindex &&
                                0 !== innerZindex
                            ) {
                                setAttributes( { innerZindex: 1 } );
                            }

                            if ( ! useInnerContainer && 'pseudo-element' === value ) {
                                setAttributes( {
                                    position: ! position ? 'relative' : position,
                                    overflowX: ! overflowX ? 'hidden' : overflowX,
                                    overflowY: ! overflowY ? 'hidden' : overflowY,
                                } );
                            }
                        } }
                    />

                    <ImageOpacityControl
                        value={ bgOptions.opacity }
                        isPseudoElement={ 'pseudo-element' === bgOptions.selector }
                        onChange={ ( value ) => {
                            setAttributes( {
                                bgOptions: { opacity: value, selector: 'pseudo-element' },
                            } );

                            if ( useInnerContainer && ! innerZindex && 0 !== innerZindex ) {
                                setAttributes( { innerZindex: 1 } );
                            }

                            if ( ! useInnerContainer ) {
                                setAttributes( {
                                    position: ! position ? 'relative' : position,
                                    overflowX: ! overflowX ? 'hidden' : overflowX,
                                    overflowY: ! overflowY ? 'hidden' : overflowY,
                                } );
                            }
                        } }
                    />
                </>
            ) }
        </>
    );
};
export default OptionControls;
