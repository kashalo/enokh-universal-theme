interface blockShapeItem {
    label: string;
    icon: string;
}

interface blockShapeItems {
    group: string;
    shapes: blockShapeItem[];
}

type CanvasPartItem = [ blockName: string, attributes: Record< string, any >, innerBlocks: any[] ];

/** A variant of a Canvas block */
interface VariantDefinition {
    /** Named parts keyed by templateArea */
    parts: Record< string, CanvasPartItem >;
    /** Variant-specific settings (e.g. backgroundColor, showBorder, etc.) */
    settings: Record< string, any >;
}

interface EnokhBlocksEditorInterface {
    Blocks: {
        ContainerBlock: ContainerBlockConfig;
        GridBlock: GridBlockConfig;
        QueryLoopBlock: QueryLoopBlockConfig;
        TextBlock: TextBlockConfig;
        TermFeaturedImageBlock: TermFeaturedImageBlockConfig;
        TableOfContent: TableOfContentBlockConfig;
        ButtonBlock: ButtonBlockConfig;
        TabPanelBlock: TabPanelConfig;
        TabBlock: TabBlockConfig;
    };
    Config: {
        containerWidth: string;
        blockShapes: {
            [ propName: string ]: blockShapeItems;
        };
        icons: {
            [ propName: string ]: {
                group: string;
                svgs: { [ propName: string ]: SvgIconItem };
            };
        };
        imageSizes: string[];
        placeholderImageURL: string;
    };
    CanvasBlockVariants: {
        [ blockName: string ]: {
            [ variantKey: string ]: VariantDefinition;
        };
    };
}

interface EnokhBlocksTermIconConfigInterface {
    iconInputName: string;
    iconSetInputName: string;
    icons: {
        [ propName: string ]: {
            group: string;
            svgs: { [ propName: string ]: SvgIconItem };
        };
    };
}

interface MahBlockCanvasDropdown {
    label: string;
    value: string;
    templateName?: string;
    disabled?: boolean;
}

type CarouselNavigationBlockAttributesType =
    import('../../../src/Blocks/CarouselNavigation/resources/ts/block/types').BlockAttributes;
interface CarouselNavigationBlockAttributes extends CarouselNavigationBlockAttributesType {}

type CarouselBlockAttributesType =
    import('../../../src/Blocks/Carousel/resources/ts/block/types').BlockAttributes;
interface CarouselBlockAttributes extends CarouselBlockAttributesType {}

type CarouselNextAttributesType =
    import('../../../src/Blocks/CarouselNext/resources/ts/block/types').BlockAttributes;
interface CarouselNextAttributes extends CarouselNextAttributesType {}

type CarouselPreviousAttributesType =
    import('../../../src/Blocks/CarouselPrevious/resources/ts/block/types').BlockAttributes;
interface CarouselPreviousAttributes extends CarouselPreviousAttributesType {}

type CarouselPlayPauseAttributesType =
    import('../../../src/Blocks/CarouselPlayPause/resources/ts/block/types').BlockAttributes;
interface CarouselPlayPauseAttributes extends CarouselPlayPauseAttributesType {}

type IconBlockAttributesType = import('../../../src/Blocks/Icon/resources/ts/block/types').BlockAttributes;
interface IconBlockAttributes extends IconBlockAttributesType {}

type SharingBlockAttributesType = import('../../../src/Blocks/Sharing/resources/ts/block/types').BlockAttributes;
interface SharingBlockAttributes extends SharingBlockAttributesType {}

type CarouselScrollbarAttributesType =
    import('../../../src/Blocks/CarouselScrollbar/resources/ts/block/types').BlockAttributes;
interface CarouselScrollbarAttributes extends CarouselScrollbarAttributesType {}

declare let EnokhBlocksEditor: EnokhBlocksEditorInterface;
declare let EnokhBlocksTermIconConfig: EnokhBlocksTermIconConfigInterface;
