import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import FontSizeControl from './components/FontSizeControl';
import FontWeightControl from './components/FontWeightControl';
import TextTransformControl from './components/TextTransformControl';
import LetterSpacingControl from './components/LetterSpacingControl';
import LineHeightControl from './components/LineHeightControl';
import AlignmentControl from './components/AlignmentControl';
import FlexControl from '../../FlexControl';
import { getAttribute, getResponsivePlaceholder } from '../../../utils';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import LineClampControl from '@enokh-blocks/components/InspectorControls/TypographyControls/components/LineClampControl';

const TypographyControls = ( props: TypographyControlsProps ) => {
    const { attributes, setAttributes, computedStyles } = props;
    const {
        id,
        supports: { typography: typographySupports },
        deviceType,
    } = useContext( BlockContext );
    const { typography } = attributes;
    return (
        <CustomPanel
            id={ `${ id }TypographyControls` }
            title={ __( 'Typography', 'enokh-blocks' ) }
            initialOpen={ false }
            className="enokh-blocks-panel-label"
        >
            { typographySupports.alignment && (
                <AlignmentControl
                    value={ getAttribute( 'textAlign', { attributes: typography, deviceType } ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            typography: {
                                [ getAttribute( 'textAlign', { attributes: typography, deviceType }, true ) ]: value,
                            },
                        } );
                    } }
                />
            ) }

            { ( typographySupports.fontWeight || typographySupports.textTransform ) && (
                <FlexControl>
                    <FontWeightControl
                        value={ getAttribute( 'fontWeight', { attributes: typography, deviceType } ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                typography: {
                                    [ getAttribute( 'fontWeight', { attributes: typography, deviceType }, true ) ]:
                                        value,
                                },
                            } );
                        } }
                    />

                    <TextTransformControl
                        value={ getAttribute( 'textTransform', { attributes: typography, deviceType } ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                typography: {
                                    [ getAttribute( 'textTransform', { attributes: typography, deviceType }, true ) ]:
                                        value,
                                },
                            } );
                        } }
                    />
                </FlexControl>
            ) }

            { typographySupports.fontSize && (
                <FontSizeControl
                    value={ getAttribute( 'fontSize', { attributes: typography, deviceType } ) }
                    placeholder={ getResponsivePlaceholder(
                        'fontSize',
                        typography,
                        deviceType,
                        computedStyles.fontSize
                    ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            typography: {
                                [ getAttribute( 'fontSize', { attributes: typography, deviceType }, true ) ]: value,
                            },
                        } );
                    } }
                />
            ) }

            { typographySupports.lineHeight && (
                <LineHeightControl
                    defaultUnit="em"
                    value={ getAttribute( 'lineHeight', { attributes: typography, deviceType } ) }
                    placeholder={ getResponsivePlaceholder(
                        'lineHeight',
                        typography,
                        deviceType,
                        computedStyles.lineHeight
                    ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            typography: {
                                [ getAttribute( 'lineHeight', { attributes: typography, deviceType }, true ) ]: value,
                            },
                        } );
                    } }
                />
            ) }

            { typographySupports.letterSpacing && (
                <LetterSpacingControl
                    defaultUnit="em"
                    value={ getAttribute( 'letterSpacing', { attributes: typography, deviceType } ) }
                    placeholder={ getResponsivePlaceholder(
                        'letterSpacing',
                        typography,
                        deviceType,
                        computedStyles.letterSpacing
                    ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            typography: {
                                [ getAttribute( 'letterSpacing', { attributes: typography, deviceType }, true ) ]:
                                    value,
                            },
                        } );
                    } }
                />
            ) }

            { typographySupports.lineClamp && (
                <LineClampControl
                    value={ getAttribute( 'lineClamp', { attributes: typography, deviceType } ) }
                    placeholder={ getResponsivePlaceholder( 'lineClamp', typography, deviceType, '0' ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            typography: {
                                [ getAttribute( 'lineClamp', { attributes: typography, deviceType }, true ) ]: value,
                            },
                        } );
                    } }
                />
            ) }
        </CustomPanel>
    );
};
export default TypographyControls;
