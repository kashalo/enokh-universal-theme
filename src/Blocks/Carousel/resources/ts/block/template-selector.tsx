import React from 'react';
import { Placeholder, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import templates from './templates';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { getIcon } from '@enokh-blocks/utils';
import { TemplateSelectorProps } from './types';
import { carouselOption } from './enum';

const TemplateSelector: React.FunctionComponent< TemplateSelectorProps > = ( props ) => {
    const { clientId, isDisabled, setAttributes } = props;
    const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

    if ( isDisabled ) {
        return <></>;
    }

    return (
        <Placeholder
            label={ __( 'Carousel', 'enokh-blocks' ) }
            icon={ getIcon( 'carousel' ) }
            instructions={ __( 'Choose a template to start with.', 'enokh-blocks' ) }
            className="enokh-blocks-carousel-layout-selector"
        >
            <div className="enokh-blocks-carousel-layout-selector__content">
                { templates.map( ( template ) => {
                    return (
                        <Button
                            key={ `template-${ template.name }` }
                            onClick={ () => {
                                replaceInnerBlocks(
                                    clientId,
                                    createBlocksFromInnerBlocksTemplate( template.innerBlocks )
                                );

                                if ( template.name === carouselOption.Coverflow ) {
                                    setAttributes( {
                                        variant: carouselOption.Coverflow,
                                        loop: true,
                                        height: 'fixed',
                                        minHeight: '400px',
                                    } );
                                }
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
