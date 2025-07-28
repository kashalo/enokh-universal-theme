import { Placeholder, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import templates from '../templates';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { getIcon } from '../../../../utils';

const TemplateSelector = ( props: QueryLoopLTemplateSelectorProps ): JSX.Element => {
    const { clientId, isDisabled } = props;
    const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

    if ( isDisabled ) {
        return <></>;
    }

    return (
        <Placeholder
            label={ __( 'Query Loop', 'enokh-blocks' ) }
            icon={ getIcon( 'query-loop' ) }
            instructions={ __( 'Choose a layout to start with.', 'enokh-blocks' ) }
            className="enokh-blocks-query-loop-layout-selector"
        >
            <div className="enokh-blocks-query-loop-layout-selector__content">
                { templates.map( ( template ) => {
                    return (
                        <Button
                            key={ `template-${ template.name }` }
                            onClick={ () => {
                                replaceInnerBlocks(
                                    clientId,
                                    createBlocksFromInnerBlocksTemplate( template.innerBlocks )
                                );
                            } }
                        >
                            { template.icon }
                            <p>{ template.title }</p>
                        </Button>
                    );
                } ) }
            </div>
        </Placeholder>
    );
};
export default TemplateSelector;
