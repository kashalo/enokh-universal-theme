import { InspectorControls, useBlockEditingMode } from '@wordpress/block-editor';
import ResponsiveTabs from '../../../components/InspectorControls/BreakpointTabs';
import SpacingControls from '../../../components/InspectorControls/SpacingControls';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import TypographyControls from '../../../components/InspectorControls/TypographyControls';
import LayoutControls from '../../../components/InspectorControls/LayoutControls';
import EstimatedReadingTimeControls from '@enokh-blocks/editor/blocks/TextBlock/components/EstimatedReadingTimeControls';
import ColorControls from '@enokh-blocks/components/InspectorControls/ColorControls';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { BaseControl, RangeControl } from '@wordpress/components';
import { getAttribute } from '@enokh-blocks/utils';
import { __ } from '@wordpress/i18n';

const TextBlockInspectorControls = ( props: TextBlockInspectorControlsProps ): JSX.Element => {
    const { attributes, clientId, setAttributes } = props;
    const { deviceType, id } = useContext( BlockContext );
    const computedStyles = {
        deviceType,
        attributes,
        setAttributes,
        clientId,
    };

    /**
     * Do not display controls if the block itself enabled contentOnly editing
     */
    if ( useBlockEditingMode() === 'contentOnly' ) {
        return null;
    }

    const attrColumn = getAttribute( 'column', { attributes, deviceType }, true );

    return (
        <InspectorControls>
            <ResponsiveTabs />
            <LayoutControls attributes={ attributes } setAttributes={ setAttributes } />
            <SpacingControls
                attributes={ attributes }
                setAttributes={ setAttributes }
                computedStyles={ computedStyles }
            />
            <TypographyControls
                attributes={ attributes }
                setAttributes={ setAttributes }
                computedStyles={ computedStyles }
            />
            <CustomPanel title={ __( 'Columns', 'enokh-blocks' ) } initialOpen={ false } id={ `${ id }ColumnsControls` }>
                <BaseControl>
                    <span className="components-base-control__label">{ __( 'Columns', 'enokh-blocks' ) }</span>
                    <RangeControl
                        value={ attributes[ attrColumn ] ? attributes[ attrColumn ] : null }
                        onChange={ ( value: number ) => {
                            setAttributes( {
                                [ attrColumn ]: value,
                            } );
                        } }
                        min={ 0 }
                        max={ 12 }
                        step={ 1 }
                        initialPosition={ 0 }
                        help={ __( 'This requires "Display" block or inline-block to works correctly.', 'enokh-blocks' ) }
                    />
                </BaseControl>
            </CustomPanel>

            { attributes.useDynamicData &&
                !! attributes.dynamicContentType &&
                attributes.dynamicContentType === 'estimated-reading-time' &&
                deviceType === 'Desktop' && (
                    <EstimatedReadingTimeControls
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        clientId={ clientId }
                    />
                ) }
            <ColorControls attributes={ attributes } setAttributes={ setAttributes } />
        </InspectorControls>
    );
};
export default TextBlockInspectorControls;
