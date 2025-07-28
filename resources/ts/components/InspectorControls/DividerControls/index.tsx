import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { __ } from '@wordpress/i18n';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { SelectControl, BaseControl } from '@wordpress/components';
import { useDeviceAttributes } from '@enokh-blocks/stores';
import UnitControl from '@enokh-blocks/components/UnitControl';
import { getResponsivePlaceholder } from '@enokh-blocks/utils';
import ColorPickerControl from '@enokh-blocks/components/ColorPickerControl';

const orientationOptions = [
    { label: 'Default', value: '' },
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' },
];
const styleOptions = [
    { label: 'Default/Inherit', value: '' },
    { label: 'None', value: 'none' },
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
];
const attributeKey = 'divider';

const DividerControls = < T extends Record< string, any > >( props: DividerControlsProps< T > ): JSX.Element => {
    const { attributes, setAttributes } = props;
    const { divider } = attributes;
    const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
    const {
        id,
        supports: { dividerPanel },
        deviceType,
    } = useContext( BlockContext );

    let colorOpacity = deviceAttributes.divider.colorOpacity || '';
    colorOpacity = colorOpacity || colorOpacity === 0 ? colorOpacity : 1;

    return (
        <CustomPanel id={ `${ id }DividerControls` } title={ __( 'Divider', 'enokh-blocks' ) } initialOpen={ false }>
            <BaseControl>
                <span className="components-base-control__label">{ __( 'Color', 'enokh-blocks' ) }</span>
                <div className="enokh-blocks-component-gradient-control">
                    <ColorPickerControl
                        value={ deviceAttributes.divider.color || '' }
                        alpha={ true }
                        valueOpacity={ colorOpacity }
                        attrOpacity={ 'colorOpacity' }
                        onChange={ ( value ) => setDeviceAttributes( { color: value }, attributeKey ) }
                        onOpacityChange={ ( value ) => setDeviceAttributes( { colorOpacity: value }, attributeKey ) }
                        onClear={ () => setDeviceAttributes( { color: '' }, attributeKey ) }
                    />
                </div>
            </BaseControl>
            <SelectControl
                label={ __( 'Style', 'enokh-blocks' ) }
                value={ deviceAttributes.divider.style || '' }
                options={ styleOptions }
                onChange={ ( value ) => setDeviceAttributes( { style: value }, attributeKey ) }
            />
            <UnitControl
                label={ __( 'Thickness', 'enokh-blocks' ) }
                id="enokh-blocks-absolute-top-position"
                value={ deviceAttributes.divider.thickness || '' }
                placeholder={ getResponsivePlaceholder( 'thickness', attributes[ attributeKey ], deviceType ) }
                onChange={ ( value ) => setDeviceAttributes( { thickness: value }, attributeKey ) }
            />

            <SelectControl
                label={ __( 'Orientation', 'enokh-blocks' ) }
                value={ deviceAttributes.divider.orientation || '' }
                options={ orientationOptions }
                onChange={ ( value ) => setDeviceAttributes( { orientation: value }, attributeKey ) }
            />
        </CustomPanel>
    );
};

export default DividerControls;
