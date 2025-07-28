import { Fragment, useContext, useEffect, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { store, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import ContainerBlockInspectorControls from './inpector-controls';
import BlockContext, { withBlockContext } from '../../../block-context';
import withDeviceType from '../../../hoc/withDeviceType';
import withSetAttributes from '../../../hoc/withSetAttributes';
import withDynamicContent from '../../../hoc/withDynamicContent';
import classnames from 'classnames';
import withUniqueId from '../../../hoc/withUniqueId';
import { getAllShapes, getBackgroundImageUrl, hasUrl } from '../../../utils';
import RootRenderer from '../../../components/RootRenderer';
import ContainerChildAppender from './components/Appender';
import GridBlockItem from './components/GridBlockItem';
import './components/ConditionalSizing';
import './components/TabHeaderSupport';
import './filters';
import ContainerBlockStyles from './components/ContainerBlockStyles';
import ContainerBlockControls from '@enokh-blocks/editor/blocks/ContainerBlock/block-controls';
import ContainerBlockAdvancedInspectorControls from '@enokh-blocks/editor/blocks/ContainerBlock/advanced-inspector-controls';
import _isEqual from 'lodash/isEqual';
import TabItemHeader from '@enokh-blocks/editor/blocks/ContainerBlock/components/TabItemHeader';
import _values from 'lodash/values';
import _isEmpty from 'lodash/isEmpty';

const ContainerBlockEdit = ( props: ContainerBlockProps ): JSX.Element => {
    const { setAttributes, attributes, clientId, className, isSelected, context } = props;
    const classNames = classnames( 'enokh-blocks-container', className, `enokh-blocks-container-${ attributes.uniqueId }` );
    const { deviceType } = useContext( BlockContext );
    const [ contextState, setContextState ] = useState( JSON.stringify( context ) );
    const {
        uniqueId,
        align,
        anchor,
        templateLock,
        isGrid,
        gridId,
        isQueryLoopItem,
        isTermQueryLoopItem,
        bgImageInline,
        bgOptions,
        isCarouselItem,
        sizing,
        tagName,
        dynamicBackgroundColor,
        dynamicContentType,
        useDynamicData,
        isTabHeader,
        tabPanelId,
        isAccordionItemHeader,
        isAccordionItemHeaderInner,
        isAccordionItemContent,
        divider,
    } = attributes;
    const innerBlocks = useSelect( ( select ) => {
        const { getBlock } = select( 'core/block-editor' ) as any;
        return getBlock( clientId );
    }, [] );
    const innerBlocksCount = innerBlocks ? innerBlocks.innerBlocks.length : 0;
    const hasChildBlocks = innerBlocksCount > 0;
    const supportsLayout = useSelect( ( select ) => {
        const { getSettings } = select( store ) as any;

        return getSettings().supportsLayout || false;
    }, [] );
    const hasStyling =
        !! attributes.backgroundColor ||
        !! attributes.bgImage ||
        attributes.borderSizeTop ||
        attributes.borderSizeRight ||
        attributes.borderSizeBottom ||
        attributes.borderSizeLeft;
    const accordionIdCtx = context[ 'enokh-blocks/accordionId' ];
    const hasEmptyDivider = ! divider || _values( divider ).every( _isEmpty );

    let blockAttributes: any = {
        className: classnames( {
            classNames,
            'enokh-blocks-container': true,
            [ `enokh-blocks-container-${ uniqueId }` ]: true,
            [ `${ className }` ]: undefined !== className,
            'enokh-blocks-container-empty': ! hasChildBlocks,
            'enokh-blocks-container-visual-guides': ! hasChildBlocks && ! hasStyling && ! isSelected,
            [ `align${ align }` ]: supportsLayout,
            [ `enokh-blocks-accordion-header enokh-blocks-accordion-header-${ accordionIdCtx }` ]: !! isAccordionItemHeader,
            [ `enokh-blocks-accordion-header-inner enokh-blocks-accordion-header-inner-${ accordionIdCtx }` ]:
                !! isAccordionItemHeaderInner,
            [ `enokh-blocks-accordion-header-content enokh-blocks-accordion-header-content-${ accordionIdCtx }` ]:
                !! isAccordionItemContent,
            'enokh-blocks-has-divider': ! hasEmptyDivider,
        } ),
        id: anchor ? anchor : null,
        'data-align': align && ! supportsLayout ? align : null,
    };

    // Link Wrapper
    if ( hasUrl( attributes ) ) {
        let linkAttributes = {
            href: '#',
            onClick: ( e ) => {
                e.preventDefault();
            },
        };

        if ( attributes.linkType === 'hidden-link' ) {
            linkAttributes = {
                // @ts-ignore
                style: {
                    cursor: 'pointer',
                },
            };
        }

        blockAttributes = {
            ...blockAttributes,
            ...linkAttributes,
        };
    }

    // Inline background image
    const backgroundUrl = getBackgroundImageUrl( props );

    if ( bgImageInline && backgroundUrl ) {
        let imageAttributeName = 'background-image';

        if ( 'element' !== bgOptions.selector ) {
            imageAttributeName = '--' + imageAttributeName;
        }

        blockAttributes.style = {
            [ imageAttributeName ]: 'url(' + backgroundUrl + ')',
        };
    }

    // Dynamic background colour from the species term
    const hasDynamicBgColour = !! dynamicBackgroundColor && useDynamicData && 'species-term' === dynamicContentType;
    if ( !! hasDynamicBgColour ) {
        blockAttributes.style = {
            'background-color': dynamicBackgroundColor,
        };
    }

    // Get all shapes to array
    const allShapes = getAllShapes();
    const blockProps = useBlockProps( blockAttributes );

    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        templateLock: templateLock || false,
        renderAppender: () => (
            <ContainerChildAppender clientId={ clientId } isSelected={ isSelected } attributes={ attributes } />
        ),
    } );

    // Grid
    const { getBlockParents, getBlocksByClientId } = useSelect( ( select ) => select( 'core/block-editor' ), [] );

    useEffect( () => {
        // @ts-ignore
        const parentBlockId = getBlockParents( clientId, true );

        if ( parentBlockId.length > 0 ) {
            // @ts-ignore
            const parentBlocks = getBlocksByClientId( parentBlockId );

            if ( parentBlocks.length > 0 ) {
                if ( 'enokh-blocks/grid' === parentBlocks[ 0 ].name ) {
                    const parentGridId = parentBlocks[ 0 ].attributes.uniqueId;

                    if ( parentGridId !== gridId ) {
                        setAttributes( {
                            isGrid: true,
                            gridId: parentGridId,
                        } );
                    }
                } else if ( isGrid && ! isQueryLoopItem && ! isTermQueryLoopItem ) {
                    setAttributes( {
                        isGrid: false,
                        gridId: '',
                    } );
                }
            }
        } else if ( isGrid && ! isQueryLoopItem && ! isTermQueryLoopItem ) {
            setAttributes( {
                isGrid: false,
                gridId: '',
            } );
        }

        /**
         * Tab item header
         */
        const tabPanelIdCtx = context[ 'enokh-blocks/tabPanelId' ];
        if ( isTabHeader && tabPanelIdCtx !== tabPanelId ) {
            setAttributes( {
                tabPanelId: tabPanelIdCtx,
            } );
        }
    } );

    let TagNameWrapper = tagName;
    if ( hasUrl( attributes ) && attributes.linkType === 'wrapper' ) {
        TagNameWrapper = 'a';
    }

    // Carousel
    useEffect( () => {
        if ( ! isCarouselItem || _isEqual( contextState, JSON.stringify( context ) ) ) {
            return;
        }

        const cHeight = context[ 'enokh-blocks/height' ];
        const cHeightTablet = context[ 'enokh-blocks/heightTablet' ];
        const cHeightMobile = context[ 'enokh-blocks/heightMobile' ];
        setAttributes( {
            sizing: {
                ...sizing,
                minHeight: cHeight === 'fixed' ? context[ 'enokh-blocks/minHeight' ] : 'auto',
                minHeightTablet: cHeightTablet === 'fixed' ? context[ 'enokh-blocks/minHeightTablet' ] : 'auto',
                minHeightMobile: cHeightMobile === 'fixed' ? context[ 'enokh-blocks/minHeightMobile' ] : 'auto',
                width: 100 / parseInt( context[ 'enokh-blocks/carouselItemPerSlide' ] ) + '%',
                widthTablet: 100 / parseInt( context[ 'enokh-blocks/carouselItemPerSlideTablet' ] ) + '%',
                widthMobile: 100 / parseInt( context[ 'enokh-blocks/carouselItemPerSlideMobile' ] ) + '%',
            },
        } );

        setContextState( JSON.stringify( context ) );
    }, [ JSON.stringify( context ) ] );

    return (
        <Fragment>
            { ! isTabHeader && (
                <>
                    <ContainerBlockInspectorControls
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        clientId={ clientId }
                    />
                    <ContainerBlockAdvancedInspectorControls
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        clientId={ clientId }
                    />
                    <ContainerBlockControls
                        attributes={ attributes }
                        setAttributes={ setAttributes }
                        clientId={ clientId }
                    />
                </>
            ) }

            <ContainerBlockStyles { ...props } />

            <RootRenderer name={ EnokhBlocksEditor.Blocks.ContainerBlock.name } clientId={ clientId } align={ align }>
                <GridBlockItem isGrid={ isGrid } uniqueId={ uniqueId }>
                    <TabItemHeader isTabHeader={ isTabHeader } uniqueId={ tabPanelId }>
                        <TagNameWrapper { ...blockProps }>
                            <>
                                { innerBlocksProps.children }
                                { /*Shapes*/ }
                                <Fragment>
                                    { !! attributes.shapeDividers.length && (
                                        <div className="enokh-blocks-shapes">
                                            { attributes.shapeDividers.map( ( location, index ) => {
                                                const shapeNumber = index + 1;

                                                return (
                                                    <Fragment key={ index }>
                                                        { 'undefined' !==
                                                            typeof allShapes[
                                                                attributes.shapeDividers[ index ].shape
                                                            ] && (
                                                            <div
                                                                className={ classnames( {
                                                                    'enokh-blocks-shape': true,
                                                                    [ `enokh-blocks-shape-${ shapeNumber }` ]: true,
                                                                } ) }
                                                                dangerouslySetInnerHTML={ {
                                                                    __html: allShapes[
                                                                        attributes.shapeDividers[ index ].shape
                                                                    ].icon,
                                                                } }
                                                            />
                                                        ) }
                                                    </Fragment>
                                                );
                                            } ) }
                                        </div>
                                    ) }
                                </Fragment>
                            </>
                        </TagNameWrapper>
                    </TabItemHeader>
                </GridBlockItem>
            </RootRenderer>
        </Fragment>
    );
};

export default compose(
    withSetAttributes,
    withDeviceType,
    withBlockContext,
    withDynamicContent,
    withUniqueId
)( ContainerBlockEdit );
