import { __ } from '@wordpress/i18n';
import DimensionsControl from '@enokh-blocks/components/DimensionsControl';
import useDeviceAttributes from '@enokh-blocks/stores/useDeviceAttributes';
import { getResponsivePlaceholder } from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

export default function IconPadding( { attributes, setAttributes } ) {
    const { deviceType } = useContext( BlockContext );
    const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
    const attributeNames = [ 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom' ];

    return (
        <DimensionsControl
            label={ __( 'Padding', 'enokh-blocks' ) }
            attributeNames={ attributeNames }
            values={ deviceAttributes.iconStyles }
            placeholders={ attributeNames.reduce(
                ( o, key ) => ( {
                    ...o,
                    [ key ]: getResponsivePlaceholder( key, attributes.iconStyles, deviceType, '' ),
                } ),
                {}
            ) }
            onChange={ ( newAttributes ) => setDeviceAttributes( newAttributes, 'iconStyles' ) }
        />
    );
}
