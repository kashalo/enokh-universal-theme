import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

const QueryLoopBlockControls = ( props: QueryLoopBlockBlockControlsProps ) => {
    const { clientId } = props;
    const { insertBlocks } = useDispatch( 'core/block-editor' );

    const defaultPaginationButtonAttributes = {
        useDynamicData: true,
        isPagination: true,
    };
    const defaultPaginationStyling = {
        display: 'inline-flex',
        justifyContent: 'center',
    };
    const paginationTemplate = [
        'enokh-blocks/container',
        {
            marginTop: '20',
            variantRole: 'button-container',
            display: 'flex',
            isPagination: true,
        },
        [
            [
                'enokh-blocks/button',
                Object.assign( {}, defaultPaginationButtonAttributes, defaultPaginationStyling, {
                    text: __( 'Previous', 'enokh-blocks' ),
                    dynamicLinkType: 'pagination-prev',
                    dynamicLinkRemoveIfEmpty: true,
                } ),
            ],
            [
                'enokh-blocks/button',
                Object.assign( {}, defaultPaginationButtonAttributes, defaultPaginationStyling, {
                    text: __( '1 2 … 10', 'enokh-blocks' ),
                    dynamicContentType: 'pagination-numbers',
                } ),
            ],
            [
                'enokh-blocks/button',
                Object.assign( {}, defaultPaginationButtonAttributes, defaultPaginationStyling, {
                    text: __( 'Next', 'enokh-blocks' ),
                    dynamicLinkType: 'pagination-next',
                    dynamicLinkRemoveIfEmpty: true,
                } ),
            ],
        ],
    ];

    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon={ getIcon( 'add-pagination' ) }
                    label={ __( 'Add Pagination', 'enokh-blocks' ) }
                    onClick={ () => {
                        insertBlocks(
                            createBlocksFromInnerBlocksTemplate( [ paginationTemplate ] ),
                            undefined,
                            clientId
                        );
                    } }
                    showTooltip
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

export default QueryLoopBlockControls;
