import { __ } from '@wordpress/i18n';
import { BlockInspectorControlProps } from '../types';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';
import CustomPanel from '@enokh-blocks/components/CustomPanel';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import UnitControl from '@enokh-blocks/components/UnitControl';

export const SizingControls = ( props: BlockInspectorControlProps ) => {
    const { attributes, setAttributes } = props;
    const { deviceType, id } = useContext( BlockContext );
    const { sizing } = attributes;

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
                <UnitControl
                    label={ __( 'Width', 'enokh-blocks' ) }
                    id="enokh-blocks-carousel-scrollbar-width"
                    value={ getValue( 'width' ) }
                    placeholder={ getResponsivePlaceholder( 'width', attributes.sizing, deviceType ) }
                    help={ __( 'The width of the entire scrollbar.', 'enokh-blocks' ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            sizing: {
                                [ getAttribute( 'width', { attributes, deviceType }, true ) ]: value,
                            },
                        } );
                    } }
                />

                <UnitControl
                    label={ __( 'Height', 'enokh-blocks' ) }
                    id="enokh-blocks-carousel-scrollbar-height"
                    value={ getValue( 'height' ) }
                    placeholder={ getResponsivePlaceholder( 'height', attributes.sizing, deviceType ) }
                    help={ __( 'The height of the scrollbar.', 'enokh-blocks' ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            sizing: {
                                [ getAttribute( 'height', { attributes, deviceType }, true ) ]: value,
                            },
                        } );
                    } }
                />

                <UnitControl
                    label={ __( 'Drag', 'enokh-blocks' ) }
                    id="enokh-blocks-carousel-scrollbar-drag"
                    value={ getValue( 'drag' ) }
                    placeholder={ getResponsivePlaceholder( 'drag', attributes.sizing, deviceType ) }
                    help={ __( 'Size of scrollbar draggable element in px or just enter auto', 'enokh-blocks' ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            sizing: {
                                [ getAttribute( 'drag', { attributes, deviceType }, true ) ]: value,
                            },
                        } );
                    } }
                    units={ [ 'px' ] }
                    overrideUnits={ true }
                />

                <div>{ /*Just a placeholder for column on the panel*/ }</div>
            </div>
        </CustomPanel>
    );
};
