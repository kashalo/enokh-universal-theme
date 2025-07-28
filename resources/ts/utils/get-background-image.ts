import { hexToRGBA, getBackgroundImageUrl } from '../utils';
const getBackgroundImage = ( type, props ) => {
    const { attributes } = props;

    const {
        backgroundColor,
        backgroundColorOpacity,
        bgImage,
        bgImageInline,
        gradient,
        bgOptions,
        gradientColorOne,
        gradientColorOneOpacity,
        gradientColorTwo,
        gradientColorTwoOpacity,
        gradientColorStopOne,
        gradientColorStopTwo,
        gradientDirection,
        useDynamicData,
        dynamicContentType,
    } = attributes;

    let gradientValue = '';

    if ( gradient ) {
        let gradientColorStopOneValue = '',
            gradientColorStopTwoValue = '';

        const gradientColorOneValue = hexToRGBA( gradientColorOne, gradientColorOneOpacity );
        const gradientColorTwoValue = hexToRGBA( gradientColorTwo, gradientColorTwoOpacity );

        if ( gradientColorOne && '' !== gradientColorStopOne ) {
            gradientColorStopOneValue = ' ' + gradientColorStopOne + '%';
        }

        if ( gradientColorTwo && '' !== gradientColorStopTwo ) {
            gradientColorStopTwoValue = ' ' + gradientColorStopTwo + '%';
        }

        gradientValue =
            'linear-gradient(' +
            gradientDirection +
            'deg, ' +
            gradientColorOneValue +
            gradientColorStopOneValue +
            ', ' +
            gradientColorTwoValue +
            gradientColorStopTwoValue +
            ')';
    }

    if ( 'gradient' === type ) {
        return gradientValue;
    }

    let backgroundImage: string | boolean = false;

    const backgroundColorValue = hexToRGBA( backgroundColor, backgroundColorOpacity );

    if ( !! bgImage || ( useDynamicData && '' !== dynamicContentType ) ) {
        const url = getBackgroundImageUrl( props );
        if (
            'element' === bgOptions.selector &&
            ( backgroundColorValue || gradient ) &&
            'undefined' !== typeof bgOptions.overlay &&
            bgOptions.overlay
        ) {
            if ( gradient ) {
                backgroundImage = gradientValue + ', url(' + url + ')';
            } else if ( backgroundColorValue ) {
                backgroundImage =
                    'linear-gradient(0deg, ' +
                    backgroundColorValue +
                    ', ' +
                    backgroundColorValue +
                    '), url(' +
                    url +
                    ')';
            }
        } else {
            backgroundImage = 'url(' + url + ')';

            if ( bgImageInline && 'element' !== bgOptions.selector ) {
                backgroundImage = 'var(--background-image)';
            }
        }
    }

    return backgroundImage;
};
export default getBackgroundImage;
