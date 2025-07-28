import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getAttribute, getResponsivePlaceholder } from '@enokh-blocks/utils';
import { useContext } from '@wordpress/element';
import BlockContext from '@enokh-blocks/block-context';

const EstimatedReadingTimeControls: React.FunctionComponent< TextBlockInspectorControlsProps > = ( props ) => {
    const { deviceType } = useContext( BlockContext );
    const { attributes, setAttributes } = props;
    const { estimatedReadingTime } = attributes;

    return (
        <PanelBody title={ __( 'Estimated Reading Time', 'enokh-blocks' ) } initialOpen={ false }>
            <TextControl
                label={ __( 'Descriptive Text', 'enokh-blocks' ) }
                placeholder={ getResponsivePlaceholder( 'descriptiveText', estimatedReadingTime, deviceType, '' ) }
                value={ getAttribute( 'descriptiveText', { attributes: estimatedReadingTime, deviceType } ) ?? '' }
                onChange={ ( newVal ) => {
                    const attrName = getAttribute(
                        'descriptiveText',
                        {
                            attributes: estimatedReadingTime,
                            deviceType,
                        },
                        true
                    );

                    setAttributes( {
                        estimatedReadingTime: {
                            ...estimatedReadingTime,
                            [ attrName ]: newVal,
                        },
                    } );
                } }
                onClick={ ( e ) => {
                    e.currentTarget.focus();
                } }
            />

            <TextControl
                label={ __( 'Postfix', 'enokh-blocks' ) }
                placeholder={ getResponsivePlaceholder( 'postFix', estimatedReadingTime, deviceType, '' ) }
                value={ getAttribute( 'postFix', { attributes: estimatedReadingTime, deviceType } ) ?? '' }
                onChange={ ( newVal ) => {
                    const attrName = getAttribute(
                        'postFix',
                        {
                            attributes: estimatedReadingTime,
                            deviceType,
                        },
                        true
                    );

                    setAttributes( {
                        estimatedReadingTime: {
                            ...estimatedReadingTime,
                            [ attrName ]: newVal,
                        },
                    } );
                } }
                onClick={ ( e ) => {
                    e.currentTarget.focus();
                } }
            />

            <TextControl
                type="number"
                label={ __( 'Words per Minute', 'enokh-blocks' ) }
                placeholder={ getResponsivePlaceholder( 'wordsPerMin', estimatedReadingTime, deviceType, '' ) }
                value={ getAttribute( 'wordsPerMin', { attributes: estimatedReadingTime, deviceType } ) ?? '' }
                onChange={ ( newVal ) => {
                    const attrName = getAttribute(
                        'wordsPerMin',
                        {
                            attributes: estimatedReadingTime,
                            deviceType,
                        },
                        true
                    );

                    setAttributes( {
                        estimatedReadingTime: {
                            ...estimatedReadingTime,
                            [ attrName ]: newVal,
                        },
                    } );
                } }
                onClick={ ( e ) => {
                    e.currentTarget.focus();
                } }
            />
        </PanelBody>
    );
};
export default EstimatedReadingTimeControls;
