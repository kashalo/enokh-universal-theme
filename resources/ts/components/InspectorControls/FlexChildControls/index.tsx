import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { getAttribute, getResponsivePlaceholder, hasNumericValue, getIcon } from '../../../utils';
import { PanelBody, BaseControl, Button, TextControl, Tooltip } from '@wordpress/components';
import UnitControl from '../../UnitControl';

const FlexChildControls = ( props: FlexChildControlsProps ): JSX.Element => {
    const { attributes, setAttributes } = props;
    const {
        id,
        supports: { flexChildPanel },
        deviceType,
    } = useContext( BlockContext );

    const componentProps = {
        attributes,
        deviceType,
    };

    const useInnerContainer = 'useInnerContainer' in attributes ? attributes.useInnerContainer : false;
    const isGrid = 'isGrid' in attributes ? attributes.isGrid : false;

    return (
        <PanelBody title={ __( 'Flex Child', 'enokh-blocks' ) } initialOpen={ false } className="enokh-blocks-panel-label">
            { flexChildPanel.flex && ( ! useInnerContainer || ( useInnerContainer && isGrid ) ) && (
                <BaseControl
                    className="enokh-blocks-flex-controls"
                    label={ __( 'Flex', 'enokh-blocks' ) }
                    id="enokh-blocks-flex-grow"
                >
                    <div className="enokh-blocks-utility-label">
                        <Tooltip text={ __( 'Reset', 'enokh-blocks' ) } position="top">
                            <Button
                                className="enokh-blocks-reset-button"
                                icon={ getIcon( 'reset' ) }
                                onClick={ () => {
                                    setAttributes( {
                                        [ getAttribute( 'flexGrow', { attributes, deviceType }, true ) ]: '',
                                        [ getAttribute( 'flexShrink', { attributes, deviceType }, true ) ]: '',
                                        [ getAttribute( 'flexBasis', { attributes, deviceType }, true ) ]: '',
                                    } );
                                } }
                            />
                        </Tooltip>
                    </div>

                    <div className="enokh-blocks-flex-controls-inner">
                        <TextControl
                            help={ __( 'Grow', 'enokh-blocks' ) }
                            id="enokh-blocks-flex-grow"
                            type={ 'number' }
                            value={ getAttribute( 'flexGrow', { attributes, deviceType } ) }
                            min="0"
                            step="1"
                            placeholder={ getResponsivePlaceholder( 'flexGrow', attributes, deviceType, '0' ) }
                            onChange={ ( value ) => {
                                setAttributes( {
                                    [ getAttribute( 'flexGrow', { attributes, deviceType }, true ) ]: value,
                                } );
                            } }
                            onBlur={ () => {
                                if ( '' !== getAttribute( 'flexGrow', { attributes, deviceType } ) ) {
                                    setAttributes( {
                                        [ getAttribute( 'flexGrow', { attributes, deviceType }, true ) ]: parseFloat(
                                            getAttribute( 'flexGrow', { attributes, deviceType } )
                                        ),
                                    } );
                                }
                            } }
                            onClick={ ( e ) => {
                                e.currentTarget.focus();
                            } }
                        />

                        <TextControl
                            help={ __( 'Shrink', 'enokh-blocks' ) }
                            id="enokh-blocks-flex-shrink"
                            type={ 'number' }
                            value={ getAttribute( 'flexShrink', { attributes, deviceType } ) }
                            min="0"
                            step="1"
                            placeholder={ getResponsivePlaceholder( 'flexShrink', attributes, deviceType, '1' ) }
                            onChange={ ( value ) => {
                                setAttributes( {
                                    [ getAttribute( 'flexShrink', { attributes, deviceType }, true ) ]: value,
                                } );
                            } }
                            onBlur={ () => {
                                if ( '' !== getAttribute( 'flexShrink', { attributes, deviceType } ) ) {
                                    setAttributes( {
                                        [ getAttribute( 'flexShrink', { attributes, deviceType }, true ) ]: parseFloat(
                                            getAttribute( 'flexShrink', { attributes, deviceType } )
                                        ),
                                    } );
                                }
                            } }
                            onClick={ ( e ) => {
                                e.currentTarget.focus();
                            } }
                        />

                        <div className="enokh-blocks-flex-basis-wrapper">
                            <UnitControl
                                help={ __( 'Basis', 'enokh-blocks' ) }
                                value={ getAttribute( 'flexBasis', { attributes, deviceType } ) }
                                placeholder={ getResponsivePlaceholder( 'flexBasis', attributes, deviceType ) }
                                onChange={ ( value ) => {
                                    setAttributes( {
                                        [ getAttribute( 'flexBasis', { attributes, deviceType }, true ) ]: value,
                                    } );
                                } }
                            />
                        </div>
                    </div>
                </BaseControl>
            ) }
            { flexChildPanel.order && ( ! useInnerContainer || ( useInnerContainer && isGrid ) ) && (
                <TextControl
                    type={ 'number' }
                    label={ __( 'Order', 'enokh-blocks' ) }
                    value={
                        hasNumericValue( getAttribute( 'order', componentProps ) )
                            ? getAttribute( 'order', componentProps )
                            : ''
                    }
                    placeholder={ getResponsivePlaceholder( 'order', attributes, deviceType ) }
                    onChange={ ( value ) => {
                        setAttributes( {
                            [ getAttribute( 'order', componentProps, true ) ]: parseFloat( value ),
                        } );
                    } }
                />
            ) }
        </PanelBody>
    );
};
export default FlexChildControls;
