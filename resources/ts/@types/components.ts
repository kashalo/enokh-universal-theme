interface UnitDropdownProps {
    value: string;
    units: string[];
    disabled: boolean;

    onChange( string );
}

interface ColorItem {
    group: string;
    label: string;
    items: any[];
}

interface ColorGroupControlProps {
    setAttributes( object );

    name: string;
    attributes:
        | ContainerBlockAttributes
        | ButtonBlockAttributes
        | IconBlockAttributes
        | CarouselNextAttributes
        | CarouselPreviousAttributes
        | CarouselPlayPauseAttributes
        | CarouselNavigationBlockAttributesType
        | TextBlockAttributes;
    colors: ColorItem[];
}

interface ColorPickerControlsProps {
    value: string;
    label?: string;
    attrOpacity?: string;
    tooltip?: string;
    alpha: boolean;
    valueOpacity?: number;

    onChange( string );

    onOpacityChange?: ( value: number ) => void;
    onClear?: () => void;
}

interface GradientControlProps {
    attributes: any;

    setAttributes( object );

    attrGradient: string;
    attrGradientDirection: string;
    attrGradientColorOne: string;
    attrGradientColorOneOpacity: string;
    attrGradientColorStopOne: string;
    attrGradientColorTwo: string;
    attrGradientColorTwoOpacity: string;
    attrGradientColorStopTwo: string;
    defaultColorOne: string;
    defaultColorTwo: string;
}

interface CustomRangeControlProps {
    label: string;
    value: number | string;

    onChange( value: string | number );

    rangeMin?: number;
    rangeMax?: number;
    inputMin?: string | number;
    inputMax?: string | number;
    step?: number;
    help?: string;
    beforeIcon?: string;
    initialPosition?: string;
    placeholder?: string;
}

interface TaxonomSelectControlProps {
    taxonomy: string;
    label?: string;

    onChange( value );

    value: number[];
    help?: string;
    placeholder?: string;
}

interface SingleTaxonomySelectControlProps extends Omit< TaxonomSelectControlProps, 'value' > {
    value: number | undefined;
}

interface SvgIconItem {
    label: string;
    icon: string;
}

interface IconPickerControlProps {
    attributes: ButtonBlockAttributes;
    setAttributes( object );
    id: string;
}

interface CustomPanelProps {
    title: string;
    initialOpen: boolean;
    id: string;
    children: React.ReactNode;
    className?: string;
}

interface IconSelectControlAttributes {
    icon: string;
    iconGroup: string;
}

interface IconSelectControlProps {
    attributes: IconSelectControlAttributes;
    onclick: ( icon: string, iconGroup: string ) => void;
    onReset: () => void;
}

interface ColourTabPanelProps {
    name: string;
    colors: { [ p: string ]: any }[];
    attributes: { [ p: string ]: any };
    deviceType: string;
    setAttributes( object );
    sync: boolean;
    currentTabName: string;
}
