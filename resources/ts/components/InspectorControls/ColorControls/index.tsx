import { __ } from '@wordpress/i18n';
import ColorGroupControl from '../../ColorGroupControl';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { PanelBody } from '@wordpress/components';
import CustomPanel from '@enokh-blocks/components/CustomPanel';

const ColorControls = ( props: ColorControlsProps ): JSX.Element => {
    const { attributes, setAttributes } = props;
    const {
        id,
        blockName,
        supports: { colors },
    } = useContext( BlockContext );

    return (
        <CustomPanel
            title={ __( 'Colors', 'enokh-blocks' ) }
            initialOpen={ false }
            className="enokh-blocks-panel-label"
            id={ `${ id }ColorControls` }
        >
            <ColorGroupControl
                attributes={ attributes }
                setAttributes={ setAttributes }
                colors={ colors.elements }
                name={ blockName }
            />
        </CustomPanel>
    );
};
export default ColorControls;
