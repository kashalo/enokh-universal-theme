import { BaseControl, Button, ButtonGroup, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import typographyOptions from '../options';

const AlignmentControl = ( props: AlignmentControlProps ): JSX.Element => {
    const { value, onChange } = props;
    const alignments = typographyOptions.alignments;

    return (
        <BaseControl label={ __( 'Text Alignment', 'enokh-blocks' ) } id="enokh-blocks-alignment-button-group">
            <div>
                <ButtonGroup className="enokh-blocks-alignment-button-group" id="enokh-blocks-alignment-button-group">
                    { Object.values( alignments ).map( ( alignment ) => {
                        return (
                            <Tooltip key={ alignment.align } text={ alignment.title }>
                                <Button
                                    isPrimary={ alignment.align === value }
                                    onClick={ () => onChange( alignment.align !== value ? alignment.align : '' ) }
                                    icon={ alignment.icon }
                                />
                            </Tooltip>
                        );
                    } ) }
                </ButtonGroup>
            </div>
        </BaseControl>
    );
};
export default AlignmentControl;
