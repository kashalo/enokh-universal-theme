import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { Tooltip, Button } from '@wordpress/components';
import MinHeightControl from './components/MinHeightControl';
import WidthControl from './components/WidthControl';
import MaxWidthControl from './components/MaxWidthControl';
import HeightControl from './components/HeightControl';
import MinWidthControl from './components/MinWidthControl';
import MaxHeightControl from './components/MaxHeightControl';
import { getResponsivePlaceholder, getIcon, getAttribute } from '../../../utils';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import AspectRatioControl from '@enokh-blocks/components/AspectRatioControl';

const SizingControls = ( props: SizingControlsProps ) => {
    const {
        id,
        supports: { sizingPanel },
        deviceType,
    } = useContext( BlockContext );
    const { attributes, setAttributes } = props;

    const { useGlobalMaxWidth = false, sizing } = attributes;
    const useInnerContainer = 'useInnerContainer' in attributes ? attributes.useInnerContainer : false;
    const isGrid = 'isGrid' in attributes ? attributes.isGrid : false;

    function getValue( name ) {
        return sizing && sizing[ getAttribute( name, { attributes, deviceType }, true ) ]
            ? sizing[ getAttribute( name, { attributes, deviceType }, true ) ]
            : '';
    }

    return (
        <CustomPanel
            title={ __( 'Sizing', 'enokh-blocks' ) }
            initialOpen={ false }
            className="enokh-blocks-panel-label"
            id={ `${ id }SizingControls` }
        >
            <div className="enokh-blocks-sizing-fields">
                { sizingPanel.width && (
                    <WidthControl
                        value={ getValue( 'width' ) }
                        placeholder={ getResponsivePlaceholder( 'width', attributes.sizing, deviceType ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                sizing: {
                                    [ getAttribute( 'width', { attributes, deviceType }, true ) ]: value,
                                },
                            } );
                        } }
                    />
                ) }

                { sizingPanel.height && (
                    <HeightControl
                        value={ getValue( 'height' ) }
                        placeholder={ getResponsivePlaceholder( 'height', attributes.sizing, deviceType ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                sizing: {
                                    [ getAttribute( 'height', { attributes, deviceType }, true ) ]: value,
                                },
                            } );
                        } }
                    />
                ) }

                { sizingPanel.minWidth && (
                    <MinWidthControl
                        value={ getValue( 'minWidth' ) }
                        placeholder={ getResponsivePlaceholder( 'minWidth', attributes.sizing, deviceType ) }
                        disabled={ isGrid }
                        onChange={ ( value ) => {
                            setAttributes( {
                                sizing: {
                                    [ getAttribute( 'minWidth', { attributes, deviceType }, true ) ]: value,
                                },
                            } );
                        } }
                    />
                ) }

                { sizingPanel.minHeight && (
                    <MinHeightControl
                        value={ getValue( 'minHeight' ) }
                        placeholder={ getResponsivePlaceholder( 'minHeight', attributes.sizing, deviceType ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                sizing: {
                                    [ getAttribute( 'minHeight', { attributes, deviceType }, true ) ]: value,
                                },
                            } );
                        } }
                    />
                ) }

                { sizingPanel.maxWidth && (
                    <MaxWidthControl
                        value={ getValue( 'maxWidth' ) }
                        placeholder={ getResponsivePlaceholder( 'maxWidth', attributes.sizing, deviceType ) }
                        overrideValue={ !! useGlobalMaxWidth ? EnokhBlocksEditor.Config.containerWidth : null }
                        disabled={ useInnerContainer || isGrid || ( useGlobalMaxWidth && 'Desktop' === deviceType ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                sizing: {
                                    [ getAttribute( 'maxWidth', { attributes, deviceType }, true ) ]: value,
                                },
                            } );
                        } }
                        overrideAction={ () => {
                            if (
                                ! sizingPanel.useGlobalMaxWidth ||
                                useInnerContainer ||
                                isGrid ||
                                'Desktop' !== deviceType ||
                                getValue( 'maxWidth' )
                            ) {
                                return null;
                            }

                            return (
                                <Tooltip text={ __( 'Use global max-width', 'enokh-blocks' ) }>
                                    <Button
                                        icon={ getIcon( 'globe' ) }
                                        // @ts-ignore
                                        variant={ !! useGlobalMaxWidth ? 'primary' : '' }
                                        onClick={ () => {
                                            setAttributes( {
                                                useGlobalMaxWidth: useGlobalMaxWidth ? false : true,
                                            } );
                                        } }
                                    />
                                </Tooltip>
                            );
                        } }
                    />
                ) }

                { sizingPanel.maxHeight && (
                    <MaxHeightControl
                        value={ getValue( 'maxHeight' ) }
                        placeholder={ getResponsivePlaceholder( 'maxHeight', attributes.sizing, deviceType ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                sizing: {
                                    [ getAttribute( 'maxHeight', { attributes, deviceType }, true ) ]: value,
                                },
                            } );
                        } }
                    />
                ) }

                { sizingPanel.aspectRatio && (
                    <AspectRatioControl
                        value={ getValue( 'aspectRatio' ) }
                        placeholder={ getResponsivePlaceholder( 'aspectRatio', attributes.sizing, deviceType ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                sizing: {
                                    [ getAttribute( 'aspectRatio', { attributes, deviceType }, true ) ]: value,
                                },
                            } );
                        } }
                    />
                ) }
            </div>
        </CustomPanel>
    );
};
export default SizingControls;
