// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
/* eslint-disable import/no-unresolved */
import 'swiper/css';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { ScrollbarOptions } from 'swiper/types/modules/scrollbar';
import { Pagination, Autoplay, EffectCoverflow, Scrollbar } from 'swiper/modules';
import { carouselOption } from '../block/enum';

export default class MahCarousel {
    private readonly rootEl: HTMLElement;
    private readonly carouselWrapper: HTMLDivElement;
    private readonly itemsWrapper: HTMLElement;
    private readonly playPauseWrapper: HTMLDivElement;
    private swiper: Swiper;
    private readonly nextButtons: NodeListOf< HTMLButtonElement >;
    private readonly prevButtons: NodeListOf< HTMLButtonElement >;
    private readonly dotNavigationContent: HTMLSpanElement;
    private readonly navigationEl: HTMLDivElement | null;
    private readonly navigationVariant: string;
    private readonly scrollbarElement: HTMLDivElement | null;

    constructor( element: HTMLElement ) {
        if ( ! element ) {
            return;
        }

        this.rootEl = element;
        this.carouselWrapper = this.rootEl.querySelector( '.enokh-blocks-carousel-wrapper' );
        this.navigationEl = this.rootEl.querySelector( '.enokh-blocks-carousel-navigation' );
        this.navigationVariant = this.navigationEl ? this.navigationEl.dataset.pagination : '';
        this.itemsWrapper = this.rootEl.querySelector(
            '.enokh-blocks-carousel-items__container, .enokh-blocks-grid-wrapper'
        );
        this.playPauseWrapper = this.rootEl.querySelector( '.enokh-blocks-carousel-play-pause' );
        this.nextButtons = this.rootEl.querySelectorAll( '.enokh-blocks-carousel-next' );
        this.prevButtons = this.rootEl.querySelectorAll( '.enokh-blocks-carousel-previous' );
        this.scrollbarElement = this.rootEl.querySelector( '.enokh-blocks-carousel-scrollbar' );

        // Add class name for query loop
        if ( this.itemsWrapper.classList.contains( 'enokh-blocks-grid-wrapper' ) ) {
            this.itemsWrapper.className = '';
            this.itemsWrapper.classList.add( 'enokh-blocks-carousel-items__container' );
            this.itemsWrapper.classList.add( 'swiper-wrapper' );
        }

        if ( this.navigationEl ) {
            this.dotNavigationContent = this.rootEl.querySelector( '.enokh-blocks-carousel-navigation__items-wrapper' )
                .children[ 0 ] as HTMLSpanElement;
            this.rootEl.querySelector( '.enokh-blocks-carousel-navigation__items-wrapper' ).innerHTML = '';
        }
    }

    init = () => {
        this.initializeItems();
        this.initializeArrowButtons();
        this.initializePlayPause();

        const modules = [ Pagination, Autoplay, EffectCoverflow ];

        /**
         * Push scrollbar module if there's an element
         */
        let scrollbarConfig: null | ScrollbarOptions = null;
        let scrollbarTabletConfig: null | ScrollbarOptions = null;
        let scrollbarMobileConfig: null | ScrollbarOptions = null;

        if ( this.scrollbarElement ) {
            modules.push( Scrollbar );

            const dragSize = this.scrollbarElement.dataset.dragSize as number | 'auto';
            const dragSizeTablet = this.scrollbarElement.dataset.dragSizeTablet as number | 'auto';
            const dragSizeMobile = this.scrollbarElement.dataset.dragSizeMobile as number | 'auto';

            scrollbarConfig = {
                el: this.scrollbarElement,
                dragClass: 'enokh-blocks-carousel-scrollbar__drag',
                hide: false,
                draggable: true,
                dragSize,
            };

            scrollbarTabletConfig = {
                ...scrollbarConfig,
                dragSize: dragSizeTablet,
            };

            scrollbarMobileConfig = {
                ...scrollbarConfig,
                dragSize: dragSizeMobile,
            };
        }

        this.rootEl.classList.add( 'js' );

        const childrenLength = this.itemsWrapper.children.length;
        const isLoop = this.carouselWrapper.dataset.loop === 'true';
        const isAutoItemsPerSlide = this.carouselWrapper.dataset.autoItemsPerSlide === 'true';

        const swiperOptions: SwiperOptions = {
            modules,
            loop: isLoop,
            autoplay: {
                delay: parseInt( this.carouselWrapper.dataset.autoplayDelay ),
            },
            effect: 'fade',
            speed: parseInt( this.carouselWrapper.dataset.speed ),
            pagination: {
                enabled: !! this.navigationEl,
                el: '.enokh-blocks-carousel-navigation__items-wrapper',
                clickable: true,
                type: this.navigationVariant === 'fraction' ? 'fraction' : 'bullets',
                bulletActiveClass: 'active',
                renderBullet: ( _, className: string ) => {
                    return `<span class="${ className } enokh-blocks-carousel-navigation__item">${ this.dotNavigationContent.innerHTML }</span>`;
                },
            },
            wrapperClass: 'enokh-blocks-carousel-items__container',
            slideClass: 'enokh-blocks-carousel-item',
            slidesPerView: this.getSlidesPerView( isAutoItemsPerSlide, 'Mobile' ),
            slidesPerGroup:
                isLoop && childrenLength <= Number( this.carouselWrapper.dataset.itemPerSlideMobile )
                    ? parseInt( this.carouselWrapper.dataset.itemPerSlideMobile )
                    : parseInt( this.carouselWrapper.dataset.slidesPerGroupMobile ),
            spaceBetween: this.carouselWrapper.dataset.spaceBetweenMobile,
            breakpoints: {
                // when window width is >= 768px
                768: {
                    slidesPerView: this.getSlidesPerView( isAutoItemsPerSlide, 'Tablet' ),
                    slidesPerGroup:
                        isLoop && childrenLength <= Number( this.carouselWrapper.dataset.itemPerSlideTablet )
                            ? parseInt( this.carouselWrapper.dataset.itemPerSlideTablet )
                            : parseInt( this.carouselWrapper.dataset.slidesPerGroupTablet ),
                    spaceBetween: this.carouselWrapper.dataset.spaceBetweenTablet,
                    ...( scrollbarTabletConfig && { scrollbar: scrollbarTabletConfig } ),
                    ...( isAutoItemsPerSlide && { slidesPerGroupAuto: true } ),
                },
                // when window width is >= 1025
                1025: {
                    slidesPerView: this.getSlidesPerView( isAutoItemsPerSlide, '' ),
                    slidesPerGroup:
                        isLoop && childrenLength <= Number( this.carouselWrapper.dataset.itemPerSlide )
                            ? parseInt( this.carouselWrapper.dataset.itemPerSlide )
                            : parseInt( this.carouselWrapper.dataset.slidesPerGroup ),
                    spaceBetween: this.carouselWrapper.dataset.spaceBetween,
                    ...( scrollbarConfig && { scrollbar: scrollbarConfig } ),
                    ...( isAutoItemsPerSlide && { slidesPerGroupAuto: true } ),
                },
            },
            on: {
                afterInit: ( ctxSlider: Swiper ) => {
                    /**
                     * Stop if autoplay is disabled
                     */
                    if ( this.carouselWrapper.dataset.autoplay !== 'true' ) {
                        ctxSlider.autoplay.stop();
                    }

                    if ( this.playPauseWrapper && this.carouselWrapper.dataset.autoplay === 'true' ) {
                        this.playPauseWrapper.classList.add( 'running' );
                        this.playPauseWrapper.classList.remove( 'stop' );
                    }
                },
            },

            ...( scrollbarMobileConfig && { scrollbar: scrollbarMobileConfig } ),
            ...( isAutoItemsPerSlide && { slidesPerGroupAuto: true } ),
        };

        // Update settings for coverflow variant
        if ( this.carouselWrapper.dataset.effect === carouselOption.Coverflow ) {
            swiperOptions.effect = 'coverflow';
            swiperOptions.coverflowEffect = {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            };
            swiperOptions.centeredSlides = true;
        }

        this.swiper = new Swiper( this.carouselWrapper, swiperOptions );

        this.updateArrows();

        this.swiper.on( 'slideChange', () => {
            this.updateArrows();
        } );
    };

    getSlidesPerView = ( isAutoItemsPerSlide: boolean, breakpoint: '' | 'Tablet' | 'Mobile' ): number | 'auto' => {
        if ( isAutoItemsPerSlide ) {
            return 'auto';
        }
        return parseInt( this.carouselWrapper.dataset[ `itemPerSlide${ breakpoint }` ] );
    };

    updateArrows = () => {
        if ( this.carouselWrapper.dataset.autoplay === 'true' ) {
            return;
        }

        const { isEnd, isBeginning } = this.swiper;

        this.nextButtons.forEach( ( nextButton ) => {
            nextButton.disabled = isEnd;
        } );

        this.prevButtons.forEach( ( prevButton ) => {
            prevButton.disabled = isBeginning;
        } );
    };

    initializeItems = () => {
        const children = this.itemsWrapper.children;

        if ( children.length <= 0 ) {
            return;
        }
        for ( let i = 0; i < children.length; i++ ) {
            const childItem = children[ i ];
            childItem.classList.add( 'enokh-blocks-carousel-item' );
        }
    };

    initializeArrowButtons = () => {
        this.nextButtons.forEach( ( nextButton ) => {
            nextButton.addEventListener( 'click', () => {
                this.swiper.slideNext();
            } );
        } );

        this.prevButtons.forEach( ( prevButton ) => {
            prevButton.addEventListener( 'click', () => {
                this.swiper.slidePrev();
            } );
        } );
    };

    initializePlayPause = () => {
        if ( ! this.playPauseWrapper ) {
            return;
        }

        const handlePlayClick = () => {
            this.swiper.autoplay.start();
            this.playPauseWrapper.classList.remove( 'stop' );
            this.playPauseWrapper.classList.add( 'running' );
        };

        const handlePauseClick = () => {
            this.swiper.autoplay.stop();
            this.playPauseWrapper.classList.remove( 'running' );
            this.playPauseWrapper.classList.add( 'stop' );
        };

        this.playPauseWrapper.querySelector( '.play-button' ).addEventListener( 'click', handlePlayClick );
        this.playPauseWrapper.querySelector( '.pause-button' ).addEventListener( 'click', handlePauseClick );
    };
}
