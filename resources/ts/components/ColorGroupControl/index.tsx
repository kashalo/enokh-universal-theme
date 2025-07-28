import { applyFilters } from '@wordpress/hooks';
import ColorPickerControl from '../ColorPickerControl';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import { getAttribute } from '@enokh-blocks/utils';

const ColorGroupControl = ( props: ColorGroupControlProps ): JSX.Element => {
    const { setAttributes, attributes, colors } = props;

    const colorItems: any = applyFilters( 'enokh-universal-theme.editor.colorGroupItems', colors, props );

    const { deviceType } = useContext( BlockContext );
    return (
        <div className="enokh-blocks-color-group">
            { colorItems.map( ( colorItem, index ) => {
                return (
                    <div key={ index } className="enokh-blocks-color-group__row">
                        { !! colorItem.label && (
                            <span className="enokh-blocks-color-group__row-label">{ colorItem.label }</span>
                        ) }

                        { colorItem.items.map( ( color, colorIndex ) => {
                            const attrName = getAttribute( color.attribute, { attributes, deviceType }, true );
                            return (
                                <ColorPickerControl
                                    key={ colorIndex }
                                    label={ color?.label }
                                    tooltip={ color?.tooltip }
                                    value={ getAttribute( color.attribute, { attributes, deviceType } ) }
                                    alpha={ color.alpha || false }
                                    valueOpacity={ attributes[ color.attribute + 'Opacity' ] }
                                    onChange={ ( nextBackgroundColor ) =>
                                        setAttributes( {
                                            [ attrName ]: nextBackgroundColor,
                                        } )
                                    }
                                    onOpacityChange={ ( value ) =>
                                        setAttributes( {
                                            [ attrName + 'Opacity' ]: value,
                                        } )
                                    }
                                />
                            );
                        } ) }
                    </div>
                );
            } ) }
        </div>
    );
};
export default ColorGroupControl;
