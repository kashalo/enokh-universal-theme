interface LayoutControlsProps {
    attributes: ContainerBlockAttributes | ButtonBlockAttributes |CarouselPreviousAttributes;
    setAttributes: ( object ) => {};
    deviceType?: string;
    displayAttrPrefix?: string;
}

interface FlexDirectionControls {
    value: string;

    onChange( string );

    onReverse( string );

    label: string;
    directionValue: string;
    fallback: string;
}

interface isFlexItemProps {
    deviceType: string;
    display: string;
    displayTablet: string;
    displayMobile: string;
}

interface LayoutControlProps {
    value: string;

    onChange( string );

    label: string;
    attributeName: string;
    directionValue: string;
    fallback?: string;
    options?: any[];
}

interface ZIndexControlProps {
    value: number;
    label?: string;

    onChange( number );

    placeholder?: string;
}

interface ThemeWidthControlProps {
    value: string;

    onChange( string );
}

interface FlexChildControlsProps {
    attributes: ContainerBlockAttributes | ButtonBlockAttributes | CarouselPreviousAttributes;
    setAttributes: ( object ) => {};
}

interface UnitControlProps {
    label?: string;
    units?: string[];
    defaultUnit?: string;
    unitCount?: number;
    min?: number;
    max?: number;
    step?: number;
    id?: string;
    disabled?: boolean;
    overrideValue?: string | null;
    overrideAction?: () => null;

    onChange( string );

    value: string;
    placeholder?: string;
    help?: string;
    focusOnMount?: boolean;
    onFocus?: () => null;
    overrideUnits?: boolean;
}

interface SpacingControlsProps {
    attributes:
        | ContainerBlockAttributes
        | TextBlockAttributes
        | ButtonBlockAttributes
        | IconBlockAttributes
        | CarouselNavigationBlockAttributes
        | CarouselBlockAttributes
        | CarouselNextAttributes
        | CarouselPreviousAttributes
        | CarouselPlayPauseAttributes
        | SharingBlockAttributes;
    setAttributes: ( object ) => {};
    computedStyles: {
        clientId: string;
        attributes:
            | ContainerBlockAttributes
            | TextBlockAttributes
            | ButtonBlockAttributes
            | IconBlockAttributes
            | CarouselNavigationBlockAttributes
            | CarouselBlockAttributes
            | CarouselNextAttributes
            | CarouselPreviousAttributes
            | CarouselPlayPauseAttributes
            | SharingBlockAttributes;
        setAttributes: ( object ) => {};
        deviceType: string;
    };
}

interface DimensionsControlProps {
    label: string;
    units?: string[];
    attributeNames: string[];
    values: object;
    placeholders: object;

    onChange( object );
}

interface DeviceControlsProps {
    inlineWidth: boolean;
    stack: boolean;
    fill: boolean;

    onChangeInlineWidth( boolean );

    onChangeStack( boolean );

    onFillChange( boolean );
}

interface MaxWidthControlProps {
    value: string;

    onChange( string );

    disabled?: boolean;
    overrideValue?: string;
    overrideAction?: any;
    placeholder?: any;
}

interface HeightControlProps {
    value: string;

    onChange( string );

    placeholder: string;
}

interface MaxHeightControlProps {
    value: string;

    onChange( string );

    placeholder: string;
}

interface MinHeightControlProps {
    value: string;

    onChange( string );

    placeholder: string;
}

interface MinWidthControlProps {
    value: string;

    onChange( string );

    disabled?: boolean;
    placeholder: string;
}

interface WidthControlProps {
    value: string;

    onChange( string );

    placeholder: string;
}

interface SizingControlsProps {
    attributes: ContainerBlockAttributes | ButtonBlockAttributes | CarouselNextAttributes | CarouselPreviousAttributes;
    setAttributes: ( object ) => {};
}

interface ColorControlsProps {
    attributes:
        | ContainerBlockAttributes
        | ButtonBlockAttributes
        | IconBlockAttributes
        | CarouselNextAttributes
        | CarouselPreviousAttributes
        | CarouselPlayPauseAttributes
        | CarouselNavigationBlockAttributesType
        | TextBlockAttributes;
    setAttributes: ( object ) => {};
}

interface AlignmentControlProps {
    value: string;

    onChange( string );
}

interface FontSizeControlProps {
    value: string;

    onChange( string );

    placeholder?: string;
}

interface FontWeightControlProps {
    value: string;

    onChange( string );
}

interface LetterSpacingControlProps {
    value: string;

    onChange( string );

    placeholder?: string;
    defaultUnit: string;
}

interface LineHeightControlProps {
    value: string;

    onChange( string );

    placeholder?: string;
    defaultUnit: string;
}

interface TextTransformControlProps {
    value: string;

    onChange( string );
}

interface TypographyControlsProps {
    attributes:
        | ContainerBlockAttributes
        | TextBlockAttributes
        | ButtonBlockAttributes
        | CarouselNavigationBlockAttributes;
    setAttributes: ( object ) => {};
    computedStyles: {
        clientId: string;
        attributes:
            | ContainerBlockAttributes
            | TextBlockAttributes
            | ButtonBlockAttributes
            | CarouselNavigationBlockAttributes;
        setAttributes: ( object ) => {};
        deviceType: string;
        fontSize?: string;
        lineHeight?: string;
        letterSpacing?: string;
    };
}

interface StyleDropdownControlProps {
    value: string;

    onChange( string );
}

interface BorderControlsProps {
    attributes:
        | ContainerBlockAttributes
        | ButtonBlockAttributes
        | IconBlockAttributes
        | CarouselNavigationBlockAttributes
        | CarouselNextAttributes
        | CarouselPreviousAttributes
        | CarouselPlayPauseAttributes
        | CarouselScrollbarAttributes;
    setAttributes: ( object ) => {};
}

interface ShapeControlsProps {
    attributes: ContainerBlockAttributes;
    setAttributes: ( object ) => {};
}

interface BackgroundControlsProps {
    attributes: ContainerBlockAttributes;
    setAttributes: ( object ) => {};
}

interface ImageUrlControlProps {
    bgImage: { [ propName: string ]: any };
    setAttributes: ( object ) => {};
    isUsingFeaturedImage: boolean;
}

interface OptionControlProps {
    attributes: ContainerBlockAttributes;
    setAttributes: ( object ) => {};
}

interface ImageSizeControlProps {
    value: string;

    onChange( string );
}

interface SelectorControlProps {
    value: string;

    onChange( string );

    position: string;
    useInnerContainer: boolean;
}

interface ImageOpacityControlProps {
    isPseudoElement: boolean;

    onChange( number );

    value: number;
}

interface BackgroundItemControlsProps {
    attributes: ContainerBlockAttributes;
    effectOptions: Array< { label: string; value: string } >;
    setAttributes: ( object ) => {};
}
interface EffectControlsProps< T > {
    attributes: T;
    setAttributes: ( object ) => {};
    deviceType?: string;
}

interface EffectItemControlProps< T > {
    attributes: T;
    setAttributes: ( object ) => {};
    effectType: string;
    effectName: string;
    effectOptions: { label: string; value: string }[];
    effectLabel: string;
    onClose: Function;
    useEffectName: string;
}

interface DisplayControlsProps {
    attributes: ContainerBlockAttributes;
    setAttributes: ( object ) => {};
}

interface DynamicContentControlsProps {
    context: { [ propName: string ]: any };
    attributes: ContainerBlockAttributes | ButtonBlockAttributes;
    setAttributes: ( object ) => {};
    name: string;
}

interface PostTypeControlProps {
    help?: string;
    onChange( object );
    postType: string;
    value?: string;
}

interface SourceSelectControlProps {
    help?: string;
    onChange( object );
    postType: string;
    value?: string;
    name: string;
}

interface ContentTypeControlProps {
    dynamicContentType: string;
    setAttributes: ( object ) => {};
    name: string;
    isCaption: boolean;
    isSharing: boolean;
    dynamicSource: string;
}

interface ExcerptControlsProps {
    attributes: ContainerBlockAttributes | TextBlockAttributes | ButtonBlockAttributes;
    setAttributes: ( object ) => {};
}

interface AbsolutePositionControlProps {
    value: string;
    onChange( string );
    placeholder: string;
}

interface LineClampControlProps {
    value: string;
    onChange( string );
    placeholder?: string;
}

interface AspectRatioControlProps {
    value: string;
    onChange( string );
    label?: string;
    placeholder?: string;
    defaultValue?: string;
}

interface DividerControlsProps< T > {
    attributes: T;
    setAttributes: ( object ) => {};
}
