export interface BlockAttributes {
    uniqueId: string;
    variant: string;
    autoplay: boolean;
    height: string;
    heightTablet: string;
    heightMobile: string;
    minHeight: string;
    minHeightTablet: string;
    minHeightMobile: string;
    itemPerSlide: number;
    itemPerSlideTablet: number;
    itemPerSlideMobile: number;
    spacing: { [ propName: string ]: any };
    speed: number;
    autoPlaySpeed: number;
    autoPlayDelay: number;
    loop: boolean;
    autoItemsPerSlide: boolean;
}

export interface BlockEditProps {
    isSelected: boolean;
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
    className: string;
    context: { [ propName: string ]: any };
}

export interface BlockInspectorControlProps {
    attributes: BlockAttributes;
    setAttributes( object );
    clientId: string;
}

export interface BlockComponentProps {
    attributes: BlockAttributes;
    setAttributes( object );
}

export interface TemplateSelectorProps {
    clientId: string;
    isDisabled?: boolean;
    setAttributes( object );
}

export interface BlockControlsProps {
    uniqueId: string;
    clientId: string;
    setAttributes( object );
}
