import { __ } from '@wordpress/i18n';
import { BlockAttributes, BlockInspectorControlProps } from '../types';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import AbsoluteTopControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/AbsoluteTopControl';
import AbsoluteBottomControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/AbsoluteBottomControl';
import AbsoluteLeftControl from '@enokh-blocks/components/InspectorControls/LayoutControls/components/AbsoluteLeftControl';

interface DisplayControlsProps extends Omit< BlockInspectorControlProps, 'attributes' > {
    attributes: BlockAttributes[ 'display' ];
}

export const DisplayControls = ( props: DisplayControlsProps ) => {
    const { attributes, setAttributes } = props;
    const { deviceType, id } = useContext( BlockContext );

    const computedProps = {
        ...props,
        deviceType,
    };

    return (
        <CustomPanel
            title={ __( 'Display', 'enokh-blocks' ) }
            initialOpen={ false }
            className="enokh-blocks-panel-label"
            id={ `${ id }DisplayControls` }
        >
            <div className="enokh-blocks-sizing-fields">
                <AbsoluteTopControl
                    value={ getAttribute( 'absoluteTop', computedProps ) }
                    placeholder={ getResponsivePlaceholder( 'absoluteTop', attributes, deviceType ) }
                    onChange={ ( value ) =>
                        setAttributes( {
                            [ getAttribute( 'absoluteTop', computedProps, true ) ]: value,
                        } )
                    }
                />

                <AbsoluteBottomControl
                    value={ getAttribute( 'absoluteBottom', computedProps ) }
                    placeholder={ getResponsivePlaceholder( 'absoluteBottom', attributes, deviceType ) }
                    onChange={ ( value ) =>
                        setAttributes( {
                            [ getAttribute( 'absoluteBottom', computedProps, true ) ]: value,
                        } )
                    }
                />

                <AbsoluteLeftControl
                    value={ getAttribute( 'absoluteLeft', computedProps ) }
                    placeholder={ getResponsivePlaceholder( 'absoluteLeft', attributes, deviceType ) }
                    onChange={ ( value ) =>
                        setAttributes( {
                            [ getAttribute( 'absoluteLeft', computedProps, true ) ]: value,
                        } )
                    }
                />

                <div></div>
            </div>
        </CustomPanel>
    );
};
