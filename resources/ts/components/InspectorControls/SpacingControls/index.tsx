import { useContext } from '@wordpress/element';
import BlocksContext from '../../../block-context';
import { useDeviceAttributes } from '../../../stores';
import { __ } from '@wordpress/i18n';
import DimensionsControl from '../../DimensionsControl';
import { getResponsivePlaceholder } from '../../../utils';
import CustomPanel from '@enokh-blocks/components/CustomPanel';

const SpacingControls = ( props: SpacingControlsProps ): JSX.Element => {
    const { attributes, setAttributes, computedStyles } = props;
    const {
        id,
        supports: { spacing },
        deviceType,
    } = useContext( BlocksContext );
    const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
    const paddingAttributes = [ 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom' ];
    const marginAttributes = [ 'marginTop', 'marginLeft', 'marginRight', 'marginBottom' ];

    return (
        <CustomPanel id={ `${ id }SpacingControls` } title={ __( 'Spacing', 'enokh-blocks' ) } initialOpen={ false }>
            { spacing.padding && (
                <DimensionsControl
                    label={ __( 'Padding', 'enokh-blocks' ) }
                    attributeNames={ paddingAttributes }
                    values={ deviceAttributes.spacing }
                    placeholders={ paddingAttributes.reduce(
                        ( o, key ) => ( {
                            ...o,
                            [ key ]: getResponsivePlaceholder( key, attributes.spacing, deviceType, '' ),
                        } ),
                        {}
                    ) }
                    onChange={ ( values ) => {
                        setDeviceAttributes( values, 'spacing' );
                    } }
                />
            ) }

            { spacing.margin && (
                <DimensionsControl
                    label={ __( 'Margin', 'enokh-blocks' ) }
                    attributeNames={ marginAttributes }
                    values={ deviceAttributes.spacing }
                    placeholders={ marginAttributes.reduce(
                        ( o, key ) => ( {
                            ...o,
                            [ key ]: getResponsivePlaceholder(
                                key,
                                attributes.spacing,
                                deviceType,
                                computedStyles[ key ]
                            ),
                        } ),
                        {}
                    ) }
                    onChange={ ( values ) => setDeviceAttributes( values, 'spacing' ) }
                />
            ) }
        </CustomPanel>
    );
};
export default SpacingControls;
