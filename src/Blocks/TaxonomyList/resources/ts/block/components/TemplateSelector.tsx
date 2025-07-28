import { Placeholder, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import templates from '../templates';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { getIcon } from '@enokh-blocks/utils';
import { category as icon } from '@wordpress/icons';

const TemplateSelector = ( props: QueryLoopLTemplateSelectorProps ): JSX.Element => {
    const { clientId, isDisabled } = props;
    const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

    if ( isDisabled ) {
        return <></>;
    }

    return (
        <Placeholder
            label={ __( 'Enokh Taxonomy List', 'enokh-blocks' ) }
            instructions={ __( 'Choose a layout to start with.', 'enokh-blocks' ) }
            className="enokh-blocks-taxonomy-list-layout-selector"
        >
            <div className="enokh-blocks-taxonomy-list-layout-selector__content">
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
