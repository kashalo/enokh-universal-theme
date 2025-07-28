import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import HorizontalGapControl from './components/HorizontalGapControl';
import { getAttribute, getResponsivePlaceholder } from '../../../utils';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import ResponsiveTabs from '../../../components/InspectorControls/BreakpointTabs';
import VerticalGapControl from './components/VerticalGapControl';
import DividerControls from '@enokh-blocks/components/InspectorControls/DividerControls';

const GridlockInspectorControls = ( props: GridBlockInspectorControlsProps ): JSX.Element => {
    const { setAttributes, attributes, clientId } = props;
    const {
        verticalAlignment,
        verticalAlignmentTablet,
        verticalAlignmentMobile,
        horizontalAlignment,
        horizontalAlignmentTablet,
        horizontalAlignmentMobile,
    } = attributes;
    const { deviceType } = useContext( BlockContext );
    const horizontalGapAttribute = getAttribute( 'horizontalGap', { attributes, deviceType }, true );
    const verticalGapAttribute = getAttribute( 'verticalGap', { attributes, deviceType }, true );


    return (
        <>
            <InspectorControls>
                <ResponsiveTabs />
                <PanelBody title={ __( 'Display', 'enokh-blocks' ) } initialOpen={ false }>
                    <HorizontalGapControl
                        value={ getAttribute( 'horizontalGap', { attributes, deviceType } ) }
                        placeholder={ getResponsivePlaceholder( 'horizontalGap', attributes, deviceType ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                [ horizontalGapAttribute ]: value,
                            } );
                        } }
                    />

                    <VerticalGapControl
                        value={ getAttribute( 'verticalGap', { attributes, deviceType } ) }
                        placeholder={ getResponsivePlaceholder( 'verticalGap', attributes, deviceType ) }
                        onChange={ ( value ) => {
                            setAttributes( {
                                [ verticalGapAttribute ]: value,
                            } );
                        } }
                    />

                    { deviceType === 'Desktop' && (
                        <>
                            <SelectControl
                                label={ __( 'Vertical Alignment', 'enokh-blocks' ) }
                                // @ts-ignore
                                value={ verticalAlignment }
                                options={ [
                                    { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                    { label: __( 'Top', 'enokh-blocks' ), value: 'flex-start' },
                                    { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                    { label: __( 'Bottom', 'enokh-blocks' ), value: 'flex-end' },
                                ] }
                                onChange={ ( value ) => {
                                    setAttributes( {
                                        verticalAlignment: value,
                                    } );
                                } }
                            />

                            <SelectControl
                                label={ __( 'Horizontal Alignment', 'enokh-blocks' ) }
                                // @ts-ignore
                                value={ horizontalAlignment }
                                options={ [
                                    { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                    { label: __( 'Left', 'enokh-blocks' ), value: 'flex-start' },
                                    { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                    { label: __( 'Right', 'enokh-blocks' ), value: 'flex-end' },
                                ] }
                                onChange={ ( value ) => {
                                    setAttributes( {
                                        horizontalAlignment: value,
                                    } );
                                } }
                            />
                        </>
                    ) }

                    { deviceType === 'Tablet' && (
                        <>
                            <SelectControl
                                label={ __( 'Vertical Alignment', 'enokh-blocks' ) }
                                // @ts-ignore
                                value={ verticalAlignmentTablet }
                                options={ [
                                    { label: __( 'Inherit', 'enokh-blocks' ), value: 'inherit' },
                                    { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                    { label: __( 'Top', 'enokh-blocks' ), value: 'flex-start' },
                                    { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                    { label: __( 'Bottom', 'enokh-blocks' ), value: 'flex-end' },
                                ] }
                                onChange={ ( value ) => {
                                    setAttributes( {
                                        verticalAlignmentTablet: value,
                                    } );
                                } }
                            />

                            <SelectControl
                                label={ __( 'Horizontal Alignment', 'enokh-blocks' ) }
                                // @ts-ignore
                                value={ horizontalAlignmentTablet }
                                options={ [
                                    { label: __( 'Inherit', 'enokh-blocks' ), value: 'inherit' },
                                    { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                    { label: __( 'Left', 'enokh-blocks' ), value: 'flex-start' },
                                    { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                    { label: __( 'Right', 'enokh-blocks' ), value: 'flex-end' },
                                ] }
                                onChange={ ( value ) => {
                                    setAttributes( {
                                        horizontalAlignmentTablet: value,
                                    } );
                                } }
                            />
                        </>
                    ) }

                    { deviceType === 'Mobile' && (
                        <>
                            <SelectControl
                                label={ __( 'Vertical Alignment', 'enokh-blocks' ) }
                                // @ts-ignore
                                value={ verticalAlignmentMobile }
                                options={ [
                                    { label: __( 'Inherit', 'enokh-blocks' ), value: 'inherit' },
                                    { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                    { label: __( 'Top', 'enokh-blocks' ), value: 'flex-start' },
                                    { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                    { label: __( 'Bottom', 'enokh-blocks' ), value: 'flex-end' },
                                ] }
                                onChange={ ( value ) => {
                                    setAttributes( {
                                        verticalAlignmentMobile: value,
                                    } );
                                } }
                            />

                            <SelectControl
                                // @ts-ignore
                                label={ __( 'Horizontal Alignment', 'enokh-blocks' ) }
                                // @ts-ignore
                                value={ horizontalAlignmentMobile }
                                options={ [
                                    { label: __( 'Inherit', 'enokh-blocks' ), value: 'inherit' },
                                    { label: __( 'Default', 'enokh-blocks' ), value: '' },
                                    { label: __( 'Left', 'enokh-blocks' ), value: 'flex-start' },
                                    { label: __( 'Center', 'enokh-blocks' ), value: 'center' },
                                    { label: __( 'Right', 'enokh-blocks' ), value: 'flex-end' },
                                ] }
                                onChange={ ( value ) => {
                                    setAttributes( {
                                        horizontalAlignmentMobile: value,
                                    } );
                                } }
                            />
                        </>
                    ) }
                </PanelBody>
                <DividerControls< GridBlockAttributes > attributes={ attributes } setAttributes={ setAttributes } />
            </InspectorControls>
        </>
    );
};

export default GridlockInspectorControls;
